const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ShippingContract", function () {
  let userRole, shippingContract;
  let owner, sender, carrier, receiver;

  beforeEach(async function () {
    [owner, sender, carrier, receiver] = await ethers.getSigners();

    // Deploy UserRole
    const UserRole = await ethers.getContractFactory("UserRole");
    userRole = await UserRole.deploy();
    await userRole.waitForDeployment();

    // Assign roles
    await userRole.connect(sender).setRole(1); // Sender
    await userRole.connect(carrier).setRole(2); // Carrier

    // Deploy ShippingContract with address of UserRole
    const ShippingContract = await ethers.getContractFactory(
      "ShippingContract"
    );
    shippingContract = await ShippingContract.deploy(userRole.getAddress());
    await shippingContract.waitForDeployment();
  });

  it("should create a shipment", async function () {
    const price = ethers.parseEther("1.0");

    await expect(
      shippingContract
        .connect(sender)
        .createShipment(
          "Colis Test",
          receiver.getAddress(),
          price,
          "Paris",
          "Lyon",
          { value: price }
        )
    ).to.emit(shippingContract, "ShipmentCreated");

    const shipment = await shippingContract.getShipment(1);
    expect(shipment.name).to.equal("Colis Test");
    expect(shipment.sender).to.equal(await sender.getAddress());
    expect(shipment.receiver).to.equal(await receiver.getAddress());
    expect(shipment.price).to.equal(price);
  });

  it("should allow carrier to accept shipment", async function () {
    const price = ethers.parseEther("1.0");

    await shippingContract
      .connect(sender)
      .createShipment(
        "Colis Test",
        receiver.getAddress(),
        price,
        "Paris",
        "Lyon",
        {
          value: price,
        }
      );

    await expect(shippingContract.connect(carrier).acceptShipment(1)).to.emit(
      shippingContract,
      "ShipmentAccepted"
    );

    const shipment = await shippingContract.getShipment(1);
    expect(shipment.carrier).to.equal(await carrier.getAddress());
    expect(shipment.status).to.equal(1); // Accepted
  });

  it("should allow carrier to mark as in transit", async function () {
    const price = ethers.parseEther("1.0");

    await shippingContract
      .connect(sender)
      .createShipment(
        "Colis Test",
        receiver.getAddress(),
        price,
        "Paris",
        "Lyon",
        {
          value: price,
        }
      );

    await shippingContract.connect(carrier).acceptShipment(1);
    await expect(
      shippingContract.connect(carrier).shipmentInTransit(1)
    ).to.emit(shippingContract, "ShipmentInTransit");

    const shipment = await shippingContract.getShipment(1);
    expect(shipment.status).to.equal(2); // InTransit
  });

  it("should allow carrier to mark as delivered and sender to release payment", async function () {
    const price = ethers.parseEther("1.0");

    await shippingContract
      .connect(sender)
      .createShipment(
        "Colis Test",
        receiver.getAddress(),
        price,
        "Paris",
        "Lyon",
        {
          value: price,
        }
      );

    await shippingContract.connect(carrier).acceptShipment(1);
    await expect(shippingContract.connect(carrier).markAsDelivered(1)).to.emit(
      shippingContract,
      "ShipmentDelivered"
    );

    const balanceBefore = await ethers.provider.getBalance(carrier.address);

    const tx = await shippingContract.connect(sender).releasePayment(1);
    await tx.wait();

    const balanceAfter = await ethers.provider.getBalance(carrier.getAddress());
    expect(balanceAfter).to.be.above(balanceBefore);

    const shipment = await shippingContract.getShipment(1);
    expect(shipment.status).to.equal(4); // Paid
  });
});
