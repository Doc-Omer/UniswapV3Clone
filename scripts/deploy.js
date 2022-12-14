
const hre = require("hardhat");

async function main() {

//ERC20 TokenA

  const TokenA = await hre.ethers.getContractFactory("TokenA");
  const tokenA = await TokenA.deploy();
  await tokenA.deployed();
  console.log("TokenA deployed to ",tokenA.address);

//ERC20 TokenB

  const TokenB = await hre.ethers.getContractFactory("TokenB");
  const tokenB = await TokenB.deploy();
  await tokenB.deployed();
  console.log('TokenB deployed to ',tokenB.address);

//ERC20 SingleSwap

  const SingleSwap = await hre.ethers.getContractFactory("SingleSwap");
  const singleSwap = await SingleSwap.deploy();
  await singleSwap.deployed();
  console.log("SingleSwap deployed to ",singleSwap.address);

//ERC20 MultiHopSwap

  const MultiHopSwap = await hre.ethers.getContractFactory("MultiHopSwap");
  const multiHopSwap = await MultiHopSwap.deploy();
  await multiHopSwap.deployed();
  console.log("MultiHopSwap deployed to ",multiHopSwap.address);  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
