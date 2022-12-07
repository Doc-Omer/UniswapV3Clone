//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "./IWETH.sol";

contract SingleSwapToken{
    ISwapRouter public constant swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    /// @notice swapExactInputSingle swaps a fixed amount of DAI for a maximum possible amount of WETH9
    /// using the DAI/WETH9 0.3% pool by calling `exactInputSingle` in the swap router.
    /// @dev The calling address must approve this contract to spend at least `amountIn` worth of its DAI for this function to succeed.
    /// @param amountIn The exact amount of DAI that will be swapped for WETH9.
    /// @return amountOut The amount of WETH9 received.
    function swapExactInputSingle(uint amountIn)external returns(uint amountOut){
        // msg.sender must approve this contract. 
        //How the swap actually works? First, we have to transfer the funds to Uniswap smart contract and then
        // we are going to approve the uniswap contract to spend the token on behalf of us. 
  
        // Transfer the specified amount of DAI to this contract.
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this),amountIn);

        // Approve the router to spend DAI. we are approving the swapRotuer address to spend the token on our behalf 
        TransferHelper.safeApprove(WETH9,address(swapRouter), amountIn);
        // IWETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2).approve(address(0xE592427A0AEce92De3Edee1F18E0157C05861564), amountIn);
        //
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: WETH9,     //The contract address of the inbound token
            tokenOut: DAI,  //The contract address of the outbound token
            fee: 3000,      //The fee tier of the pool, used to determine the correct pool contract in which to execute the swap
            recipient: msg.sender,  //the destination address of the outbound token
            deadline: block.timestamp,  //the unix time after which a swap will fail, to protect against long-pending transactions and wild swings in prices
            amountIn: amountIn,     
            amountOutMinimum: 0,    //we are setting to zero, but this is a significant risk in production. For a real deployment, this value should be calculated using our SDK or an onchain price oracle - this helps protect against getting an unusually bad price for a trade due to a front running sandwich or another type of price manipulation
            sqrtPriceLimitX96: 0    //We set this to zero - which makes this parameter inactive. In production, this value can be used to set the limit for the price the swap will push the pool to, which can help protect against price impact or for setting up logic in a variety of price-relevant mechanisms.
        });


        //calls the function with the above 'params'
        amountOut = swapRouter.exactInputSingle(params);
    }
    
    //Exact output swaps a minimum possible amount of the input token for a fixed amount of the outbound token. 
    function swapExactOutputSingle(uint amountOut, uint amountInMaximum) external returns(uint amountIn){
        
        // Transfer the specified amount of DAI to this contract.
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(WETH9, address(this), amountInMaximum);
        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
                tokenIn: WETH9,
                tokenOut: DAI,
                fee: 3000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });
        //calling the function with the params
        amountIn = swapRouter.exactOutputSingle(params);

        // if amountIn is less than the 
        if(amountIn < amountInMaximum){
            TransferHelper.safeApprove(WETH9, address(swapRouter),0);

            TransferHelper.safeTransfer(WETH9, msg.sender, amountInMaximum - amountIn);
        }
    }
}


