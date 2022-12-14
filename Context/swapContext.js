import React, {useState, useEffect, use} from 'react';
import { ethers, BigNumber } from 'ethers';
import Web3Modal from 'web3modal';

//internal imports
import{
    checkWalletConnection,
    connectWallet,
    connectingWithTokenA,
    connectingWithTokenB,
    connectingWithSingleSwap,
    connectingWithMultiHopSwap,
    connectingWithIWETH,
    connectingWithDAI
} from '../Utils/appFeatures';

import { IWETH } from './constants';
import ERC20 from './ERC20.json';

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
    const swap = "Welcome to swap token";
    //usestate
    const [account, setAccount] = useState('');
    const [ether, setEther] = useState('');
    const [networkConnect, setNetworkConnect] = useState('');
    const [weth9, setWeth9] = useState('');
    const [dai, setDai] = useState('');
    const [tokenData, setTokenData] = useState([]);
    const addToken = [
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "0xaB837301d12cDc4b97f1E910FC56C9179894d9cf",
        "0x4ff1f64683785E0460c24A4EF78D582C2488704f"
    ]; 
//Fetch Data
    const fetchingData = async() => {
        try {
            //get user account
            const userAccount = await checkWalletConnection();
            setAccount(userAccount);
            //create Provider
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            //check balance
            const balance = await provider.getBalance(userAccount);
            console.log(balance);
        } catch (error) {
            console.log(error);
        }
    }
    return <SwapTokenContext.Provider value={{swap}}>{children}</SwapTokenContext.Provider>;
};