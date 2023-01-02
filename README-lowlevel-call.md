
# Contract Example:

```
//SPDX-License-Identifier: MIT
pragma solidity >= 0.0.7 < 0.9.0;

import "hardhat/console.sol";


interface IWETH{
    function decimals() external view returns(uint8);
    function totalSupply() external view returns(uint);
}


contract lowLevelCall {
    function getEthBalance(address _address) public{
        console.log("==> log", 1);
        (bool success, bytes memory data) = _address.call(
            abi.encodeWithSignature("totalSupply()")
        );
        console.log("==> log: ", 2, "succcess: ", success);
        console.log("==> Data: ");         console.logBytes(data);

        require(success, "call failed");
        (uint256 amount) = abi.decode(data, (uint256));
        console.log("==> log", 3);
        console.log("==> balance", amount);
    }

    function getEthBalance2(address _address) public view{
        console.log("==> log", 1);
        IWETH iweth = IWETH(_address);
        console.log("==> log", 2);
        uint8 amount = iweth.decimals();
        console.log("==> balance", amount);
        
        uint amountTotal = iweth.totalSupply();
        console.log("==> balance", amountTotal);
    }
}
```



# HardHat.config.js

```
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
    solidity: "0.8.17",

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
  
    networks:{
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY]
        }
    }
};
```



# Fork Mainnet and Goerli using HardHat

### Goerli Fork
`npx hardhat node --fork https://eth-goerli.g.alchemy.com/v2/Pk45XQqmiWuKjwka4DYOOxeE4Ia8Wtix`

### Mainnet Fork
`npx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/ZvmdipXxS6C0HUcHs7MqZCnWVt-0m3rr`


# Test Starting scrpit

```
const { expect } = require("chai");
const { ethers} = require("hardhat");
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/"); 
const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider); 
const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
singleSwapToken = await SingleSwapToken.connect(accounts).deploy();
await singleSwapToken.deployed();

console.log("==> singleSwapToken poolFees: ", await singleSwapToken.poolFee());


// second to get deployed contract
const singleSwap_JSON = require("/home/abdullah/ethereum/UniswapV3-Clone/artifacts/contracts/SwapToken.sol/SingleSwapToken.json");
let singleSwap_ABI = new ethers.utils.Interface(singleSwap_JSON.abi); //providing interface of
let singleSwap_contract = new ethers.Contract(singleSwapToken.address, singleSwap_ABI, accounts);
console.log("==> singleSwapToken poolFees: ", await singleSwap_contract.poolFee());
```