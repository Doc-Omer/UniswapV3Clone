import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { Token, currencyAmount, TradeType, Percent } from "@uniswap/sdk-core";

import Web3Modal from "web3modal";
import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice } from "../Utils/swapUpdatePrice";

//INTernal import
import {
  checkIfWalletConnect,
  connectWallet,
  connectingWithBooToken,
  connectingWithLifeToken,
  connectingWithSingleSwap,
  connectingWithIWETH,
  connectingWithDAI,
} from "../Utils/appFeatures";

import { IWETHAbi } from "./constants";
import ERC20 from "./ERC20.json";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  //useState
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");

  const [tokenData, setTokendata] = useState([]);

  const addToken = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "0x3883f5e181fccaF8410FA61e12b59BAd963fb645",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  ];

  //Boo address
  //Life address

  //Fetch data

  const fetchingData = async () => {
    try {
      //Get user account
      const userAccount = await checkIfWalletConnect();

      setAccount(userAccount);

      //Create provider
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      //check balance
      const balance = await provider.getBalance(userAccount);

      const convertBal = BigNumber.from(balance).toString();
      const ether = ethers.utils.formatEther(convertBal);

      //get network name
      const network = await provider.getNetwork();
      setNetworkConnect(network);

      //All token balance and data
      addToken.map(async (el, i) => {
        //Getting contracts
        const contract = new ethers.Contract(el, ERC20, provider);
        //getting balance of token
        const userBalance = await contract.balanceOf(userAccount);

        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        //get Data: name and symbol
        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });
      });
      //WETH balance

      const wethContract = await connectingWithIWETH();
      const wethBal = await wethContract.balanceOf(userAccount);
      const wethToken = BigNumber.from(wethBal).toString();
      const convertwethTokenBal = ethers.utils.formatEther(wethToken);

      setWeth9(convertwethTokenBal);

      //DAI
      const daiContract = await connectingWithDAI();
      const daiBal = await daiContract.balanceOf(userAccount);
      const daiToken = BigNumber.from(daiBal).toString();
      const convertDaiTokenBal = ethers.utils.formatEther(daiToken);

      setWeth9(convertDaiTokenBal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  //Single Swap Token
  const singleSwapToken = async ({ token1, token2, swapAmount }) => {
    console.log("Token 1: ", await token1.tokenAddress);
    console.log("Token 2: ", await token2.tokenAddress);
    console.log("Swap Amount: ", swapAmount);

    try {
      let singleSwapToken;
      let weth;
      let dai;

      singleSwapToken = await connectingWithSingleSwap();
      weth = await connectingWithIWETH();
      dai = await connectingWithDAI();
      console.log("135");
      const decimals0 = 18;
      const inputAmount = swapAmount;
      const amountIn = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals0
      );
      console.log("142");

      console.log("Amount In: ", amountIn);

      await weth.deposit({ value: amountIn });
      console.log("147");
      await weth.approve(singleSwapToken.address, amountIn);
      console.log("149");
      //SWAP
      const transaction = await singleSwapToken.swapExactInputSingle(
        token1.tokenAddress,
        token2.tokenAddress,
        amountIn,
        {
          gasLimit: 300000,
        }
      );
      console.log("159");
      await transaction.wait();
      console.log("161");
      console.log(transaction);
      const daiBalance = await dai.balanceOf(account);
      console.log("daiBalance: ", daiBalance);
      const transferAmount = BigNumber.from(daiBalance).toString();
      console.log("Transfer amount: ", transferAmount);
      const ethValue = ethers.utils.formatEther(transferAmount);
      setDai(ethValue);
      console.log("Dai Balance: ", ethValue);
      console.log("ETH balance:", balance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwapTokenContext.Provider
      value={{
        singleSwapToken,
        connectWallet,
        getPrice,
        swapUpdatePrice,
        account,
        weth9,
        dai,
        networkConnect,
        ether,
        tokenData,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
