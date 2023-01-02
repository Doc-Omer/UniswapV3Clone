
// npx hardhat run scripts/deploy.js --network localhost


const hre = require("hardhat");

async function main() {
  // ERC20 BOO TOKEN
  const FooToken = await hre.ethers.getContractFactory("FooToken");
  const fooToken = await FooToken.deploy();
  await fooToken.deployed();
  console.log(`export const FooTokenAddress = "${fooToken.address}";`);

  // ERC20 LIFE TOKEN
  const BarToken = await hre.ethers.getContractFactory("BarToken");
  const barToken = await BarToken.deploy();
  await barToken.deployed();
  console.log(`export const BarTokenAddress = "${barToken.address}";`);


  //SingleSwapToken
  const SingleSwapToken = await hre.ethers.getContractFactory(
    "SingleSwapToken"
  );
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.deployed();
  console.log(`export const SingleSwapTokenAddress = "${singleSwapToken.address}";`);

  //SwapMultiHope
  const SwapMultiHope = await hre.ethers.getContractFactory("SwapMultiHope");
  const swapMultiHope = await SwapMultiHope.deploy();
  await swapMultiHope.deployed();
  console.log(`export const SwapMultiHopeAddress = "${swapMultiHope.address}";`);

  // //USER DATA CONTRACT
  // const UserStorageData = await hre.ethers.getContractFactory(
  //   "UserStorageData"
  // );
  // const userStorageData = await UserStorageData.deploy();
  // await userStorageData.deployed();
  // console.log(`UserStorageData deployed to ${userStorageData.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
