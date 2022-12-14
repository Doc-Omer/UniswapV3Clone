import { ehters } from "ethers";
import { ethers } from "hardhat";
import Web3Modal from "web3modal";

import {
    TokenAAddress,
    TokenAABI,
    TokenBAddress,
    TokenBABI,
    SingleSwapAddress,
    SingleSwapABI,
    MultiHopSwapAddress,
    MultiHopSwapABI,
    IWETHAddress,
    IWETHABI
} from "../Context/constants";


//Check if wallet is connected
export const checkWalletConnection = async()=> {
    try {
        if(!window.ethereum) return console.log("Install MetaMask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

//Connect wallet
export const connectWallet = async()=> {
    try {
        if(!window.ethereum) return console.log("Install MetaMask");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

//Fetching contract-------------------------------------------

//TokenA fetching
export  const fetchTokenAContract = (signerOrProvider) => 
    new ethers.Contract(TokenAAddress, TokenAABI, signerOrProvider);

//Connecting with TokenA contract
export const connectingWithTokenA = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchTokenAContract(signer)
    } catch (error) {
        console.log(error);
    }
}

//TokenB fetching
export  const fetchTokenBContract = (signerOrProvider) => 
    new ethers.Contract(TokenBAddress, TokenBABI, signerOrProvider);

//Connecting with TokenB contract
export const connectingWithTokenB = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchTokenBContract(signer)
    } catch (error) {
        console.log(error);
    }
}

//SingleSwap fetching
export  const fetchSingleSwapContract = (signerOrProvider) => 
    new ethers.Contract(SingleSwapAddress, SingleSwapABI, signerOrProvider);

//Connecting with SingleSwap contract
export const connectingWithSingleSwap = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSingleSwapContract(signer)
    } catch (error) {
        console.log(error);
    }
}

//MultiHopSwap fetching
export  const fetchMultiHopSwapContract = (signerOrProvider) => 
    new ethers.Contract(MultiHopSwapAddress, MultiHopSwapABI, signerOrProvider);

//Connecting with MultiHopSwap contract
export const connectingWithMultiHopSwap = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchMultiHopSwapContract(signer)
    } catch (error) {
        console.log(error);
    }
}

//DAI fetching
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export  const fetchDAIContract = (signerOrProvider) => 
    new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);

//Connecting with SingleSwap contract
export const connectingWithDAI = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchIWETHContract(signer)
    } catch (error) {
        console.log(error);
    } 
}

//IWETH fetching
export  const fetchIWETHContract = (signerOrProvider) => 
    new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//Connecting with SingleSwap contract
export const connectingWithIWETH = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchDAIContract(signer)
    } catch (error) {
        console.log(error);
    } 
}