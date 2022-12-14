import tokenA from './TokenA.json';
import tokenB from './TokenB.json';
import singleSwap from './SingleSwap.json';
import multiHopSwap from './MultiHopSwap.json';
import IWETH from './IWETH.json';

//TokenA
export const TokenAAddress = "0xaB837301d12cDc4b97f1E910FC56C9179894d9cf";
export const TokenAABI = tokenA.abi;

//TokenB
export const TokenBAddress = "0x4ff1f64683785E0460c24A4EF78D582C2488704f";
export const TokenBABI = tokenB.abi;

//SingleSwap
export const SingleSwapAddress = "0x0F527785e39B22911946feDf580d87a4E00465f0";
export const SingleSwapABI = singleSwap.abi;

//MultiHopSwap
export const MultiHopSwapAddress = "0x1D3EDBa836caB11C26A186873abf0fFeB8bbaE63";
export const MultiHopSwapABI = multiHopSwap.abi;

//IWETH
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;