//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";


interface IWETH{

    function deposit() external payable;

    function withdraw(uint) external;

    function totalySupply() external view returns(uint);

    function balanceOf(address accouint) external view returns(uint);

    function transfer(address recipient, uint amount) external view returns(uint);

    function allowance(address spender, uint amount) external returns(bool);

    function approve(address spender, uint amount) external returns(bool);

    function transferFrom(address sender, address recipient, uint amount) external returns(bool);

    event Transfer(address indexed from, address indexed to, uint value);

    event Approve(address indexed owner, address indexed spender, uint value);
}