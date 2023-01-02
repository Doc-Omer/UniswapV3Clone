//SPDX-License-Identifier: MIT
pragma solidity >= 0.0.7 < 0.9.0;
// for use nested array 
pragma abicoder v2;


import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "hardhat/console.sol";

contract SwapMultiHope{
    ISwapRouter public constant swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    address public constant DAI = 0x5C221E77624690fff6dd741493D735a17716c26B;
    address public constant WETH9 = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    address public constant USDC = 0x07865c6E87B9F70255377e024ace6630C1Eaa37F;

    uint24 public constant poolFee = 3000;
    event LOGS(string, uint);


    function swapExactInputMultihop(uint256 amountIn) external returns (uint256 amountOut) {
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params =
            ISwapRouter.ExactInputParams({
                path: abi.encodePacked(WETH9, poolFee, USDC, poolFee, WETH9, poolFee, DAI), // input, thirdToken, output
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn, // exect ammount in
                amountOutMinimum: 0
            });

        amountOut = swapRouter.exactInput(params);
        emit LOGS("amountOut is: ", amountOut);
    }



    function swapExactOutputMultihop(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputParams memory params =
            ISwapRouter.ExactOutputParams({
                path: abi.encodePacked(DAI, poolFee, WETH9, poolFee, USDC, poolFee, WETH9),  // output, thirdToken, input
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut, // exect amount out
                amountInMaximum: amountInMaximum // max amount in
            });

        amountIn = swapRouter.exactOutput(params);
        emit LOGS("amountIn is: ", amountIn);

        // If the swap did not require the full amountInMaximum to achieve the exact amountOut then we refund msg.sender and approve the router to spend 0.
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);
            TransferHelper.safeTransferFrom(WETH9, address(this), msg.sender, amountInMaximum - amountIn);
        
            emit LOGS("return amount is: ", amountInMaximum - amountIn);
        }
    }
}


