//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SwapMultiHop{
    ISwapRouter public constant swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

/*
Exact input multi hop swaps will swap a fixed amount on a given input token for 
the maximum amount possible for a given output, 
and can include an arbitrary number of intermediary swaps.

fixed amount input --> maximum amount output
*/
    function swapExactInputMultihop(uint amountIn) external returns (uint amountOut){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
            /*
                The path is a sequence of (tokenAddress - fee - tokenAddress), 
                which are the variables needed to compute each pool contract address in our sequence of swaps. 
                The multihop swap router code will automatically find the correct pool with these variables, 
                and execute the swap needed within each pool in our sequence.
            */
            path: abi.encodePacked(
                WETH9,
                uint24(3000),
                USDC,
                uint24(100),
                DAI
            ),  
            //WETH9 will be first converted into USDC and then USDC will be converted into DAI
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0
        });

        amountOut = swapRouter.exactInput(params);

    } 

    //An exact output swap will swap a variable amount of the input token for a fixed amount of the outbound token. 
    function swapExactOutputMultihop(uint amountOut, uint amountInMaximum) external returns (uint amountIn){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputParams memory params = ISwapRouter.ExactOutputParams({
            path: abi.encodePacked(
                DAI,
                uint24(100),
                USDC,
                uint24(3000),
                WETH9
            ),
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum
        });

        amountIn = swapRouter.exactOutput(params);

        if(amountIn < amountInMaximum){
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);
            TransferHelper.safeTransferFrom(WETH9, address(this),msg.sender, amountInMaximum - amountIn);
        }

    }
}