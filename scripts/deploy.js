
const hre = require("hardhat");

async function main() {
  
  const BooToken = await hre.ethers.getContractFactory("BooToken");
  const booToken = await BooToken.deploy();
  await booToken.deployed();
  console.log('Boo token Deployed to: ', booToken.address);

  const LifeToken = await hre.ethers.getContractFactory("LifeToken");
  const lifeToken = await LifeToken.deploy();
  await lifeToken.deployed();
  console.log('Life token Deployed to: ', lifeToken.address);

  const SingleSwapToken = await hre.ethers.getContractFactory("SingleSwapToken");
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.deployed();
  console.log('SingleSwapToken Deployed to: ', singleSwapToken.address);

  const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
  const swapMultiHop = await SwapMultiHop.deploy();
  await swapMultiHop.deployed();
  console.log('SwapMultiHop Deployed to: ', swapMultiHop.address);


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
