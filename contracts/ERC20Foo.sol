//SPDX-License-Identifier: MIT
pragma solidity >= 0.0.7 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FooToken is ERC20{

    constructor() ERC20("FT", "Foo"){
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}