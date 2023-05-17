const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // USDC contract address in Goerli testnet
  const usdcAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; // Add the address of USDC token
  
  // treasury address in Georli testnet
  const treasuryAddress = "0xe0F12E592B08548a3F0568B51087A6fE69D450aC"; // Add the address of treasury

  console.log("Deploying contracts with the account:", deployer.address);

  const L28DToken = await hre.ethers.getContractFactory("L28D");
  const l28dToken = await L28DToken.deploy(usdcAddress, treasuryAddress);

  await l28dToken.deployed();

  // we deployed to 0x52E805540e8D95276E2A4c97b61b39Ce51474715
  // 0x1c4787026CAAEB0DD4b53195e3c7eeb9bB0E47D9
  console.log("L28DToken deployed to:", l28dToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
