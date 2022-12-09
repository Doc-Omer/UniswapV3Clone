import {ethers} from "ethers";
import Web3Modal from 'web3modal'

import {
    BooTokenAddress,
    BooTokenAbi,
    LifeTokenAddress,
    LifeTokenAbi,
    SingleSwapTokenAddress,
    SinglSwapTokenAbi,
    SwapMultiHopAddress,
    SwapMultiHopAbi,
    IWETHAddress,
    IWETHAbi
} from "../Context/constants"

//check if wallet is connected.
export const checkIfWalletConnect = async() => {
    try {
        if (!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAccount = accounts[0];
        return firstAccount

    } catch (error) {
        console.log("error");
    }
}

//Connect Wallet
export const connectWallet = async() => {
    try {
        if (!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method: "eth_requestsAccounts",
        })
        const firstAccount = accounts[0];
        return firstAccount
    } catch (error) {
        console.log(error);
    }
}

//Fetching contract------------------------

//Boo token fetching
export const fetchBooContract = (signerOrProvider) =>
 new ethers.Contract(BooTokenAddress, BooTokenAbi, signerOrProvider); 

//connecting with BooToken contract
export const connectingWithBooToken = async() => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer =  provider.getSigner();
        const contract = fetchBooContract(signer);
        return contract;
    } catch (error) {
        console.log(error)
    }
};

//Life token fetching
export const fetchLifeContract = (signerOrProvider) =>
 new ethers.Contract(LifeTokenAddress, LifeTokenAbi, signerOrProvider); 

//connecting with LifeToken contract
export const connectingWithLifeToken = async() => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer =  provider.getSigner();
        const contract = fetchLifeContract(signer);
        return contract;
    } catch (error) {
        console.log(error)
    }
};


//Single Swap Contract  fetching
export const fetchSingleSwapContract = (signerOrProvider) =>
 new ethers.Contract(SingleSwapTokenAddress, SinglSwapTokenAbi, signerOrProvider); 

//connecting with Single Swap Contract
export const connectingWithSingleSwap = async() => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer =  provider.getSigner();
        const contract = fetchSingleSwapContract(signer);
        return contract;
    } catch (error) {
        console.log(error)
    }
};

// //Life token fetching
// export const fetchMultiHopContract = (signerOrProvider) =>
//  new ethers.Contract(SwapMultiHopAddress, SwapMultiHopAbi, signerOrProvider); 

// //connecting with LifeToken contract
// export const connectingWithMultiSwap = async() => {
//     try {
//         const web3modal = new Web3Modal();
//         const connection = await web3modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const signer =  provider.getSigner();
//         const contract = fetchMultiHopContract(signer);
//         return contract;
//     } catch (error) {
//         console.log(error)
//     }
// };


//IWETH fetching
export const fetchIWETHContract = (signerOrProvider) =>
 new ethers.Contract(IWETHAddress, IWETHAbi, signerOrProvider); 

//connecting with IWETH interface
export const connectingWithIWETH = async() => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer =  provider.getSigner();
        const contract = fetchIWETHContract(signer);
        return contract;
    } catch (error) {
        console.log(error)
    }
};


//DAI fetching
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (signerOrProvider) =>
 new ethers.Contract(DAIAddress, IWETHAbi, signerOrProvider); 

//connecting with DAI interface
export const connectingWithDAI = async() => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer =  provider.getSigner();
        const contract = fetchDAIContract(signer);
        return contract;
    } catch (error) {
        console.log(error)
    }
};
