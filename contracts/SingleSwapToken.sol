//SPDX-License-Identifier: MIT
pragma solidity >= 0.0.7 < 0.9.0;
// for use nested array 
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "hardhat/console.sol";


contract SingleSwapToken{
    ISwapRouter public constant swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    address public constant DAI = 0x5C221E77624690fff6dd741493D735a17716c26B;
    address public constant WETH9 = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    address public constant USDC = 0x07865c6E87B9F70255377e024ace6630C1Eaa37F;

    uint24 public constant poolFee = 3000;
    event LOGS(string, uint);


    function swapExactInputSingle(uint amountIn)external returns(uint amountOut){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: WETH9,     //The contract address of the inbound token
            tokenOut: DAI,  //The contract address of the outbound token
            fee: poolFee,      //The fee tier of the pool, used to determine the correct pool contract in which to execute the swap
            recipient: msg.sender,  //the destination address of the outbound token
            deadline: block.timestamp,  //the unix time after which a swap will fail, to protect against long-pending transactions and wild swings in prices
            amountIn: amountIn,     
            amountOutMinimum: 0,    //we are setting to zero, but this is a significant risk in production. For a real deployment, this value should be calculated using our SDK or an onchain price oracle - this helps protect against getting an unusually bad price for a trade due to a front running sandwich or another type of price manipulation
            sqrtPriceLimitX96: 0    //We set this to zero - which makes this parameter inactive. In production, this value can be used to set the limit for the price the swap will push the pool to, which can help protect against price impact or for setting up logic in a variety of price-relevant mechanisms.
        });

        amountOut = swapRouter.exactInputSingle(params);
        emit LOGS("amountOut is: ", amountOut);
    }
    


    function swapExactOutputSingle(uint amountOut, uint amountInMaximum) external returns(uint amountIn){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
                tokenIn: WETH9,
                tokenOut: DAI,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        amountIn = swapRouter.exactOutputSingle(params);
        emit LOGS("amountIn is: ", amountIn);
        
        //if amountIn is less than the 
        if(amountIn < amountInMaximum){
            TransferHelper.safeApprove(WETH9, address(swapRouter),0);
            TransferHelper.safeTransfer(WETH9, msg.sender, amountInMaximum - amountIn);

            emit LOGS("return amount is: ", amountInMaximum - amountIn);
        }
    }
}


