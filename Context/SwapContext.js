import React, {useState, useEffect} from 'react'
import {ethers,  BigNumber} from 'ethers';

import Web3Modal from "web3modal";

//INTernal import
import {
    checkIfWalletConnect,
    connectWallet,
    connectingWithBooToken,
    connectingWithLifeToken,
    connectingWithSingleSwap,
    connectingWithIWETH,
    connectingWithDAI
} from '../Utils/appFeatures';

import { IWETHAbi } from './constants';
// import { }
import ERC20 from './ERC20.json'

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({children}) => {

    //useState
    const [account, setAccount] = useState('')
    const [ether, setEther] = useState('')
    const [networkConnect, setNetworkConnect] = useState('')
    const [weth9, setWeth9] = useState('')
    const [dai, setDai] = useState('')

    const [tokenData, setTokendata] = useState([])

    const addToken = [
                      "0xDDa0648FA8c9cD593416EC37089C2a2E6060B45c",
                      "0xccA9728291bC98ff4F97EF57Be3466227b0eb06C"];
                      //WETH address
                      //Boo address
                      //Life address 

    //Fetch data

    const fetchingData = async() => {
        try {
            //Get user account
            const userAccount  = await checkIfWalletConnect();
            setAccount(userAccount)
            
            //Create provider
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);

            //check balance
            const balance = await provider.getBalance(userAccount);
            const convertBal = BigNumber.from(balance).toString();
            const ethValue = ethers.utils.formatEther(convertBal);

            //get network name
            const network = await provider.getNetwork();
            setNetworkConnect(network)


            //All token balance and data
            addToken.map(async(el,i) => {
                //Getting contracts
                const contract = new ethers.Contract(el,ERC20,provider);
                //getting balance of token
                const userBalance = await contract.balanceOf(userAccount);
                const tokenLeft = BigNumber.from(userBalance).toString();
                const convertTokenBal = ethers.utils.formatEther(tokenLeft)

                //get Data: name and symbol
                const symbol = await contract.symbol();
                const name = await contract.name();

                tokenData.push({
                    name: name,
                    symbol: symbol,
                    tokenBalance: convertTokenBal,
                })

            });
            //WETH balance
            const wethContract = await connectingWithIWETH();
            const wethBal = await wethContract.balanceOf(userAccount);
            const wethToken = BigNumber.from(wethBal).toString();
            const convertwethTokenBal = ethers.utils.formatEther(wethToken);

            setWeth9(convertwethTokenBal)

            //DAI
            const daiContract = await connectingWithDAI();
            const daiBal = await daiContract.balanceOf(userAccount);
            const daiToken = BigNumber.from(daiBal).toString();
            const convertDaiTokenBal = ethers.utils.formatEther(daiToken);

            setWeth9(convertDaiTokenBal)

        } catch (error) {
            console.log(error);
        }
    }
 
    useEffect(()=>{
        fetchingData();
    }, []);

    //Single Swap Token
    const singleSwapToken = async() => {
        try {
            let singleSwapToken
            let weth
            let dai

            singleSwapToken = await connectingWithSingleSwap();
            weth = await connectingWithIWETH();
            dai = await connectingWithDAI();

            const amountIn = 10n **18n;

            await weth.deposit({value: amountIn})
            await weth.approve(singleSwapToken.address, amountIn);

            //SWAP
            await singleSwapToken.swapExactInputSingle(amountIn, {
                gasLimit: 300000
            })

            const balance = await dai.balanceOf(account);
            const transferAmount = BigNumber.from(balance).toString();
            const ethValue = ethers.utils.formatEther(transferAmount)
            setDai(ethValue);
            console.log("Dai Balance: ", ethValue);
             
        } catch (error) {
            console.log(error);
        }
    }

    



    return <SwapTokenContext.Provider value={{singleSwapToken, connectWallet, account, weth9, dai, networkConnect, ether, tokenData}}>
        {children}
    </SwapTokenContext.Provider>
}