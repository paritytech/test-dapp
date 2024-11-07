// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MMCheck {

    receive() external payable {
        require(msg.value > 0xfff, "Insufficient amount");
        (bool success, ) = msg.sender.call{value: msg.value}("");
        require(success, "Transfer failed");
    }
}

