const { ethers } = require("hardhat");

async function main() {
  // Adresse de ton contrat déployé sur Sepolia
  const contractAddress = "0x033C6d2b14C729E5cDc6F54904dFE2618951bcF3"; // Remplace par l'adresse de ton contrat

  // ABI du contrat
  const abi = [
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
      inputs: [
        {
          internalType: "address",
          name: "_carrier",
          type: "address",
        },
      ],
      name: "getActiveShipment",
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
          internalType: "address",
          name: "_carrier",
          type: "address",
        },
      ],
      name: "getInTransitShipment",
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
      inputs: [],
      name: "getShipments",
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
  ];

  // Créer une instance du contrat
  const [deployer] = await ethers.getSigners();
  console.log("Connecté avec l'adresse :", deployer.address);

  const contract = new ethers.Contract(contractAddress, abi, deployer);

  // Obtenir le nombre total d'expéditions
  const count = await contract.shipmentCount();
  console.log(`Il y a ${count} expéditions.`);

  // Boucler sur les expéditions et afficher leurs informations
  for (let i = 1; i <= count; i++) {
    const shipment = await contract.getShipment(i);
    console.log(`\nExpédition ${shipment.id}:`);
    console.log(`Nom: ${shipment.name}`);
    console.log(`Expéditeur: ${shipment.sender}`);
    console.log(`Transporteur: ${shipment.carrier}`);
    console.log(`Destinataire: ${shipment.receiver}`);
    console.log(`Prix: ${ethers.formatUnits(shipment.price, 18)} ETH`);
    console.log(`Lieu de retrait: ${shipment.pickupLocation}`);
    console.log(`Lieu de livraison: ${shipment.deliveryLocation}`);
    console.log(`Statut: ${shipment.status}`);
    console.log(`Paiement libéré: ${shipment.paymentReleased}`);
    console.log(
      `Date de retrait: ${new Date(
        shipment.pickupDate * 1000
      ).toLocaleString()}`
    );
    console.log(
      `Date de livraison: ${new Date(
        shipment.deliveryDate * 1000
      ).toLocaleString()}`
    );
  }
}

// Lancer la fonction principale
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
