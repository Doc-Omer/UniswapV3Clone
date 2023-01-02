// npx hardhat --network goerli test


// const { expect } = require("chai");
// const { ethers} = require("hardhat");
// require('dotenv').config();

// const ALCHEMY_URL_GOERLI = process.env.ALCHEMY_URL_GOERLI;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

// const DAI = "0x5C221E77624690fff6dd741493D735a17716c26B";
// const WETH9 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
// const USDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

// describe("SingleSwapToken", () => {
//   let singleSwapToken;
//   let accounts;
//   let weth;
//   let dai;
//   let usdc;


//   const private_key_string = PRIVATE_KEY;
//   const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL_GOERLI);
//   accounts = new ethers.Wallet(private_key_string, provider);
//   console.log("==> address: ", accounts.address);
//   // const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
//   // singleSwapToken = await SingleSwapToken.deploy();
//   // await singleSwapToken.deployed();

//   // weth = await ethers.getContractAt("IWETH", WETH9);
//   // dai = await ethers.getContractAt("IERC20", DAI);
//   // usdc = await ethers.getContractAt("IERC20", USDC);

//   //  console.log("==> singleSwapToken contract address: ", singleSwapToken.address);

//   before(async () => {
//     console.log("==> run before block.");
//   });

//   it("swapExactInputSingle", async () => {
//     const amountIn = 1n ** 18n;

//     // Deposit DAI
//     await weth.deposit({ value: amountIn });
//     await weth.approve(singleSwapToken.address, amountIn);

//     // // Swap
//     await singleSwapToken.swapExactInputSingle(amountIn);
//     console.log("DAI balance", await dai.balanceOf(accounts.address));
//   });

//   it("swapExactOutputSingle", async () => {
//     const wethAmountInMax = 1n ** 18n
//     const daiAmountOut = 100n * 10n ** 18n

//     // Deposit WETH
//     await weth.deposit({ value: wethAmountInMax })
//     await weth.approve(singleSwapToken.address, wethAmountInMax)

//     // Swap
//     await singleSwapToken.swapExactOutputSingle(daiAmountOut, wethAmountInMax)
//     console.log("DAI balance", await dai.balanceOf(accounts[0].address))
//   })
// });