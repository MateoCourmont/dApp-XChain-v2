// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUserRole {
    function getRole(address _user) external view returns (string memory);
}

contract ShippingContract {
    IUserRole public userRole;

    constructor(address _userRoleAddress) {
        userRole = IUserRole(_userRoleAddress);
    }

    enum ShipmentStatus { Pending, Accepted, InTransit, Delivered, Paid }

    struct Shipment {
        uint id;
        string name;
        address sender;
        address carrier;
        address receiver;
        uint price;
        string pickupLocation;
        string deliveryLocation;
        ShipmentStatus status;
        bool paymentReleased;
        uint pickupDate;
        uint deliveryDate;
    }

    uint public shipmentCount;
    mapping(uint => Shipment) public shipments;

    event ShipmentCreated(uint id, address sender);
    event ShipmentAccepted(uint id, address carrier);
    event ShipmentInTransit(uint id);
    event ShipmentDelivered(uint id);
    event PaymentReleased(uint id);

    // --- Role modifiers ---
    modifier onlySenderRole() {
        require(
            keccak256(bytes(userRole.getRole(msg.sender))) == keccak256(bytes("Sender")),
            "Not a sender"
        );
        _;
    }

    modifier onlyCarrierRole() {
        require(
            keccak256(bytes(userRole.getRole(msg.sender))) == keccak256(bytes("Carrier")),
            "Not a carrier"
        );
        _;
    }

    modifier onlySender(uint shipmentId) {
        require(msg.sender == shipments[shipmentId].sender, "Not the sender");
        _;
    }

    modifier onlyCarrier(uint shipmentId) {
        require(msg.sender == shipments[shipmentId].carrier, "Not the carrier");
        _;
    }

    modifier shipmentExists(uint id) {
        require(id > 0 && id <= shipmentCount, "Shipment does not exist");
        _;
    }

    // --- Core logic ---

    function createShipment(
        string memory _name,
        address _receiver,
        uint _price,
        string memory _pickupLocation,
        string memory _deliveryLocation
    ) external onlySenderRole {
        shipmentCount++;
        shipments[shipmentCount] = Shipment({
            id: shipmentCount,
            name: _name,
            sender: msg.sender,
            carrier: address(0),
            receiver: _receiver,
            price: _price,
            pickupLocation: _pickupLocation,
            deliveryLocation: _deliveryLocation,
            status: ShipmentStatus.Pending,
            paymentReleased: false,
            pickupDate: 0, 
            deliveryDate: 0
        });

        emit ShipmentCreated(shipmentCount, msg.sender);
    }

    function acceptShipment(uint _id) external onlyCarrierRole shipmentExists(_id) {
        Shipment storage s = shipments[_id];
        require(s.status == ShipmentStatus.Pending, "Already accepted");

        s.carrier = msg.sender;
        s.status = ShipmentStatus.Accepted;

        emit ShipmentAccepted(_id, msg.sender);
    }

    function shipmentInTransit(uint _id) external onlyCarrier(_id) shipmentExists(_id) {
        Shipment storage s = shipments[_id];
        require(s.status == ShipmentStatus.Accepted, "Shipment not accepted yet");

        s.status = ShipmentStatus.InTransit;
        s.pickupDate = block.timestamp;
        emit ShipmentInTransit(_id);
    }

    function markAsDelivered(uint _id) external onlyCarrier(_id) shipmentExists(_id) {
        Shipment storage s = shipments[_id];
        require(
            s.status == ShipmentStatus.InTransit || s.status == ShipmentStatus.Accepted,
            "Cannot mark as delivered"
        );

        s.status = ShipmentStatus.Delivered;
        s.deliveryDate = block.timestamp;
        emit ShipmentDelivered(_id);
    }

    function releasePayment(uint _id) external payable onlySender(_id) shipmentExists(_id) {
        Shipment storage s = shipments[_id];
        require(s.status == ShipmentStatus.Delivered, "Not delivered yet");
        require(!s.paymentReleased, "Payment already released");
        require(msg.value == s.price, "Incorrect payment amount");

        s.paymentReleased = true;
        s.status = ShipmentStatus.Paid;

        (bool success, ) = s.carrier.call{value: msg.value}("");
        require(success, "Payment transfer failed");

        emit PaymentReleased(_id);
    }

    function getShipment(uint _id) external view shipmentExists(_id) returns (Shipment memory) {
        return shipments[_id];
    }

    function getPendingShipments() external view returns (Shipment[] memory) {
    uint256 pendingCount = 0;
    for (uint256 i = 1; i <= shipmentCount; i++) {
        if (shipments[i].status == ShipmentStatus.Pending) {
            pendingCount++;
        }
    }

    Shipment[] memory pendingShipments = new Shipment[](pendingCount);
    uint256 index = 0;
    
    for (uint256 i = 1; i <= shipmentCount; i++) {
        if (shipments[i].status == ShipmentStatus.Pending) {
            pendingShipments[index] = shipments[i];
            index++;
        }
    }

    return pendingShipments;
}
}
