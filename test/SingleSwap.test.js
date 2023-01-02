// npx hardhat node --fork https://eth-goerli.g.alchemy.com/v2/Pk45XQqmiWuKjwka4DYOOxeE4Ia8Wtix
// npx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/ZvmdipXxS6C0HUcHs7MqZCnWVt-0m3rr


// npx hardhat test test/SingleSwap.test.js

const { expect } = require("chai");
const { ethers} = require("hardhat");
require('dotenv').config();

const ALCHEMY_URL_GOERLI = process.env.ALCHEMY_URL_GOERLI;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const WETH9 = process.env.WETH; // WETH9
const DAI = process.env.DAI; // DAI
const USDC = process.env.USDC; // USDC

describe("SingleSwapToken", () => {
  let singleSwapToken;
  let accounts;
  let weth;
  let dai;
  let usdc;


  // create signer and provider
  // accounts = await ethers.getImpersonatedSigner("0x4B2bB6Acd422aA769d0E16F55620150d12941dF3");
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/"); // ethereum provider with ethers.js
  accounts = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider); //wallet creating with private key
   
  before(async () => {
    console.log("==> address: ", accounts.address);
    console.log("==> address balance: ", (await provider.getBalance(accounts.address)).toString());
    console.log("==> address balance in eth: ", ethers.utils.formatEther(await provider.getBalance(accounts.address)));

    // get contract from .sol file
    const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
    singleSwapToken = await SingleSwapToken.connect(accounts).deploy();
    await singleSwapToken.deployed();

    // create the instance of weth, dai and usdc
    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);


    console.log("==> singleSwapToken contract address: ", singleSwapToken.address);
    // console.log("==> weth totalSupplay: ", (await weth.totalSupply()).toString());
    // console.log("==> dai totalSupplay: ", (await dai.totalSupply()).toString());
    // console.log("==> usdc totalSupplay: ", (await usdc.totalSupply()).toString());




    // manually create the instance for IWETH_JSON 
    const IWETH_JSON = require("../artifacts/contracts/Interfaces/IWETH.sol/IWETH.json");
    const IWETH_ABI = new ethers.utils.Interface(IWETH_JSON.abi); //providing interface of
    const weth_contract = new ethers.Contract(WETH9, IWETH_ABI, accounts);
    await weth_contract.totalSupply().then((result)=>{console.log("==> result: ", result.toString());})


    // manually create the instance for IERC_20_JSON
    const IERC20_JSON = require("../artifacts/contracts/Interfaces/IERC_20.sol/IERC_20.json");
    const IERC20_ABI = new ethers.utils.Interface(IERC20_JSON.abi); //providing interface of
    const dai_contract = new ethers.Contract(DAI, IERC20_ABI, accounts);
    const usdc_contract = new ethers.Contract(USDC, IERC20_ABI, accounts);
    console.log("==> dai_contract totalSupply: ", (await dai_contract.totalSupply()).toString());
    console.log("==> usdc_contract totalSupply: ", (await usdc_contract.totalSupply()).toString());

    weth = weth_contract;
    dai = dai_contract;
    usdc = usdc_contract;

    // // manually create the instance for singleSwap_JSON 
    // const singleSwap_JSON = require("../artifacts/contracts/SingleSwapToken.sol/SingleSwapToken.json");
    // let singleSwap_ABI = new ethers.utils.Interface(singleSwap_JSON.abi); //providing interface of
    // let singleSwap_contract = new ethers.Contract(singleSwapToken.address, singleSwap_ABI, accounts);
    // console.log("==> singleSwapToken poolFees: ", await singleSwap_contract.poolFee());
    // console.log("==> singleSwapToken getEthBalance: ", await singleSwap_contract.getEthBalance(WETH9));
    // console.log("==> singleSwapToken getEthBalance2: ", await singleSwap_contract.getEthBalance2(WETH9));
  });



  it("swapExactInputSingle", async () => {
    console.log("--swapExactInputSingle start--");
    const amountIn = 5n * 10n**18n;
    

    // Deposit WETH
    await weth.deposit({ value: amountIn })
    await weth.approve(singleSwapToken.address, amountIn);
  
    // Swap
    const tx = await singleSwapToken.swapExactInputSingle(amountIn);

    // Wait until the tx has been confirmed (default is 1 confirmation)
    const receipt = await tx.wait();
    const LOGS = receipt.events.find(event => event.event === 'LOGS');
    const [msg, value] = LOGS.args;
    console.log("LOGS: ", msg, value.toString());

    // check dai balance of signer
    console.log("swapExactInputSingle DAI balance", (await dai.balanceOf(accounts.address)).toString());
  });



  it("swapExactOutputSingle", async () => {
    console.log("--swapExactOutputSingle start--");
    const wethAmountInMax = 10n * 10n**18n;
    const daiAmountOut = 100n * 10n ** 18n;

    // Deposit WETH
    await weth.deposit({ value: wethAmountInMax });
    await weth.approve(singleSwapToken.address, wethAmountInMax);
    
    // Swap
    const tx = await singleSwapToken.swapExactOutputSingle(daiAmountOut, wethAmountInMax);

    // Wait until the tx has been confirmed (default is 1 confirmation)
    const receipt = await tx.wait();
    const LOGS = receipt.events.find(event => event.event === 'LOGS');
    const [msg, value] = LOGS.args;
    console.log("LOGS: ", msg, value.toString());

    // check dai balance of signer
    console.log("swapExactOutputSingle DAI balance", (await dai.balanceOf(accounts.address)).toString());
  })
});