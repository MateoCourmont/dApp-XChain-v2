async function main() {
  const Contract = await ethers.getContractFactory("UserRole");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  console.log("Contrat déployé à l'adresse :", await contract.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
