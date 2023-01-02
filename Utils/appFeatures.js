import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
    FooTokenAddress,
    FooTokenABI,
    BarTokenAddress,
    BarTokenABI,
    SingleSwapTokenAddress,
    SingleSwapTokenABI,
    SwapMultiHopeAddress,
    SwapMultiHopeABI,
    IWETHAddress,
    IWETHABI,
    DAIAddress,
    ERC20ABI
//   userStorageDataAddrss,
//   userStorageDataABI,
} from "../Context/constants";










//CHECK IF WALLET IS CONNECT
export const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const firstAccount = accounts[0];
      return firstAccount;
    } catch (error) {
      console.log(error);
    }
  };
  
  //CONNECT WALLET
  export const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const firstAccount = accounts[0];
      return firstAccount;
    } catch (error) {
      console.log(error);
    }
  };
  
  //FETCHING CONTRACT------------------------
  
  //FOO TOKEN FETCHING
  export const fetchFooContract = (signerOrProvider) => {
    return new ethers.Contract(FooTokenAddress, FooTokenABI, signerOrProvider);
  };

  //CONNECTING With BOO TOKEN CONTRACT
  export const connectingWithFooToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchFooContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  
  //FETCHING CONTRACT------------------------
  
  //BAR TOKEN FETCHING
  export const fetchBarContract = (signerOrProvider) => {
    return new ethers.Contract(BarTokenAddress, BarTokenABI, signerOrProvider);
  };

  //CONNECTING With LIFE TOKEN CONTRACT
  export const connectingWithBarToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchBarContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  
  //FETCHING CONTRACT------------------------
  
  //SingleSwapToken TOKEN FETCHING
  export const fetchSingleSwapContract = (signerOrProvider) => {
    return new ethers.Contract(SingleSwapTokenAddress, SingleSwapTokenABI, signerOrProvider);
  };

  //CONNECTING With SingleSwapToken TOKEN CONTRACT
  export const connectingWithSingleSwapToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSingleSwapContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  
  //FETCHING CONTRACT------------------------
  
  //IWTH TOKEN FETCHING
  export const fetchIWTHContract = (signerOrProvider) =>{
    return new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);
  };

  //CONNECTING With SingleSwapToken TOKEN CONTRACT
  export const connectingWithIWTHToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchIWTHContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  
  //FETCHING CONTRACT------------------------
  
  //DAI TOKEN FETCHING
  export const fetchDAIContract = (signerOrProvider) => {
   return new ethers.Contract(DAIAddress, ERC20ABI, signerOrProvider);
  };

  //CONNECTING With SingleSwapToken TOKEN CONTRACT
  export const connectingWithDAIToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      console.log("provider", provider);

      const contract = fetchDAIContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  

//   //USER CONTRACT CONNECTION---------
//   export const fetchUserStorageContract = (signerOrProvider) =>
//     new ethers.Contract(
//       userStorageDataAddrss,
//       userStorageDataABI,
//       signerOrProvider
//     );
  
//   //CONNECTING With SingleSwapToken TOKEN CONTRACT
//   export const connectingWithUserStorageContract = async () => {
//     try {
//       const web3modal = new Web3Modal();
//       const connection = await web3modal.connect();
//       const provider = new ethers.providers.Web3Provider(connection);
//       const signer = provider.getSigner();
//       const contract = fetchUserStorageContract(signer);
//       return contract;
//     } catch (error) {
//       console.log(error);
//     }
//   };
  

  //NEW MULTIHOP
  export const fetchMultiHopeContract = (signerOrProvider) =>
    new ethers.Contract(SwapMultiHopeAddress, SwapMultiHopeABI, signerOrProvider);
  
  //CONNECTING With SingleSwapToken TOKEN CONTRACT
  export const connectingWithMultiHopeContract = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchMultiHopeContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };