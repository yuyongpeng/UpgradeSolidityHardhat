// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BoxV2 is OwnableUpgradeable {
    uint256 private value;
    uint256 private value2;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Increments the stored value by 1
    function increment() public  {
        OwnableUpgradeable.__Ownable_init();
        value = value + 1;
        emit ValueChanged(value);
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
}