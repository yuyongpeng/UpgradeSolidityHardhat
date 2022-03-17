//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    uint256 public a;
    uint256 public b;
    S public s;
    struct S {
        uint256 x;
        uint256 y;
    }

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    // 测试数组传参
    function setAB(uint256[] memory ab) public {
        a = ab[0];
        b = ab[1];
    }

    function getA() public view returns (uint256) {
        console.log("a: %i", a);
        return a;
    }

    function getB() public view returns (uint256) {
        console.log("b: %i", b);
        return b;
    }

    // 测试结构体传参
    function setS(S memory s_) public {
        s = s_;
        console.log("s.x: %i", s.x);
        console.log("s.y: %i", s.y);
    }

    function getSx() public view returns (uint256) {
        console.log("s.x: %i", s.x);
        return s.x;
    }

    function getSy() public view returns (uint256) {
        console.log("s.y: %i", s.y);
        return s.y;
    }
}
