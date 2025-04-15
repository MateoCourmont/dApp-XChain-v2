const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserRole", function () {
  let UserRole, userRole, owner, addr1, addr2;

  beforeEach(async function () {
    UserRole = await ethers.getContractFactory("UserRole");
    [owner, addr1, addr2] = await ethers.getSigners();
    userRole = await UserRole.deploy();
    await userRole.waitForDeployment(); // Attendre que le contrat soit déployé
  });

  it("should start with no role", async function () {
    const role = await userRole.getRole(addr1.address);
    expect(role).to.equal("None");
  });

  it("should allow setting a role once", async function () {
    await userRole.connect(addr1).setRole(1); // 1 = Sender
    const role = await userRole.getRole(addr1.address);
    expect(role).to.equal("Sender");
  });

  it("should not allow setting a role twice", async function () {
    await userRole.connect(addr1).setRole(2); // 2 = Carrier
    await expect(userRole.connect(addr1).setRole(1)).to.be.revertedWith(
      "Role already set"
    );
  });

  it("should revert on invalid role", async function () {
    await expect(userRole.connect(addr1).setRole(3)).to.be.revertedWith(
      "Invalid role"
    );
  });

  it("should allow multiple users with different roles", async function () {
    await userRole.connect(addr1).setRole(1); // Sender
    await userRole.connect(addr2).setRole(2); // Carrier

    const role1 = await userRole.getRole(addr1.address);
    const role2 = await userRole.getRole(addr2.address);

    expect(role1).to.equal("Sender");
    expect(role2).to.equal("Carrier");
  });
});
