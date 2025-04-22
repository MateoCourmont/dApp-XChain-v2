async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Déploiement avec l'adresse :", deployer.address);

  const userRoleAddress = "0x19CF2c5cCa8BF8a43C47E16a01725dDDA679D305";

  const Contract = await ethers.getContractFactory("ShippingContract");

  const contract = await Contract.deploy(userRoleAddress);

  await contract.waitForDeployment();

  const deployedAddress = await contract.getAddress();
  console.log(
    "Contrat ShippingContract déployé à l'adresse :",
    deployedAddress
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
