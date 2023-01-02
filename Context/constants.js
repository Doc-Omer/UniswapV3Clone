import fooToken from '../artifacts/contracts/ERC20Foo.sol/FooToken.json';
import barToken from '../artifacts/contracts/ERC20Bar.sol/BarToken.json';
import singleSwapToken from '../artifacts/contracts/SingleSwapToken.sol/SingleSwapToken.json';
import swapMultiHope from '../artifacts/contracts/SwapMultiHope.sol/SwapMultiHope.json';
import iweth from '../artifacts/contracts/Interfaces/IWETH.sol/IWETH.json';
import erc20 from '../artifacts/contracts/Interfaces/IERC_20.sol/IERC_20.json';
// require('dotenv').config();



export const FooTokenABI = fooToken.abi;
export const BarTokenABI = barToken.abi;
export const SingleSwapTokenABI = singleSwapToken.abi;
export const SwapMultiHopeABI = swapMultiHope.abi;
export const IWETHABI = iweth.abi;
export const ERC20ABI = erc20.abi;


export const FooTokenAddress = "0xfBcFAe89D28a1434E971F7abF6A3EaC7C7a08903";
export const BarTokenAddress = "0xa14f7F24F88b40C27fDaa9A24aD79dAF1d7255b4";
export const SingleSwapTokenAddress = "0xC0277148e804B180F340e02d87E106ebDf5F53D2";
export const SwapMultiHopeAddress = "0xE08eB087BFe6Acb4f4e76c6A624b2e2e231514F4";
// export const IWETHAddress = process.env.WETH;
export const IWETHAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
// export const DAIAddress = process.env.DAI;
export const DAIAddress = "0x5C221E77624690fff6dd741493D735a17716c26B";
