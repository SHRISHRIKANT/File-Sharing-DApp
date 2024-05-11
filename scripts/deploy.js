const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Files = await ethers.getContractFactory("Files");
  console.log("Starting deployment of FileShare contract...");
  const files = await Files.deploy();

  console.log("Waiting for the contract to be deployed...");
  await files.deployed(); // Wait for the contract to be deployed
  console.log(files)
  console.log("FileShare contract deployed successfully!");
  console.log("FileShare deployed to:", files.address);
}

main().catch((error) => {
  console.error("Error deploying contract:", error);
  process.exitCode = 1;
});