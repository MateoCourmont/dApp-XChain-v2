export const ShippingContractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_userRoleAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "carrier",
        type: "address",
      },
    ],
    name: "ShipmentAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ShipmentCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ShipmentDelivered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ShipmentInTransit",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "acceptShipment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_pickupLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "_deliveryLocation",
        type: "string",
      },
    ],
    name: "createShipment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingShipments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "carrier",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "pickupLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "deliveryLocation",
            type: "string",
          },
          {
            internalType: "enum ShippingContract.ShipmentStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "paymentReleased",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "pickupDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deliveryDate",
            type: "uint256",
          },
        ],
        internalType: "struct ShippingContract.Shipment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getShipment",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "carrier",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "pickupLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "deliveryLocation",
            type: "string",
          },
          {
            internalType: "enum ShippingContract.ShipmentStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "paymentReleased",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "pickupDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deliveryDate",
            type: "uint256",
          },
        ],
        internalType: "struct ShippingContract.Shipment",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "markAsDelivered",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "releasePayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "shipmentCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "shipmentInTransit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "shipments",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "carrier",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "pickupLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "deliveryLocation",
        type: "string",
      },
      {
        internalType: "enum ShippingContract.ShipmentStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "paymentReleased",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "pickupDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deliveryDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "userRole",
    outputs: [
      {
        internalType: "contract IUserRole",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
