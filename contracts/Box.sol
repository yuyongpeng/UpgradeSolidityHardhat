// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract Box is OwnableUpgradeable {
    uint256 private value;
    uint256 private value2;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Increments the stored value by 1
    function increment() public  {
        value = value + 1;
        emit ValueChanged(value);
        console.log("value: %i", value);
    }

    // Stores a new value in the contract
    function initialize(uint256 newValue) public initializer {
        OwnableUpgradeable.__Ownable_init();
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }

    function setValue(uint256 value_) public {
        value = value_;
        console.log("bbbbb %i", value);
        emit ValueChanged(value);
    }

    function getValue() public view returns (uint256) {
        return value;
    } 

}