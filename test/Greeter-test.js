const { expect, assert } = require("chai");
const { ethers, upgrades} = require("hardhat");

describe("==== Greeter ====", function () {

  before(async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();
    this.greeter = greeter;
  });

  it("Should return the new greeting once it's changed", async function () {

    expect(await this.greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await this.greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await this.greeter.greet()).to.equal("Hola, mundo!");
  });

  it("setAB array", async function(){
    // 数组传参调用
    const a = ethers.BigNumber.from(12);
    const b = ethers.BigNumber.from(23);
    await this.greeter.setAB([12, 23]);
    expect(await this.greeter.getA()).to.equal(12);
    expect(await this.greeter.getB()).to.equal(23);

    // 结构体调用
    const s = {x:33, y:44};
    await this.greeter.setS(s);
    expect(await this.greeter.getSx()).to.equal(33);
    expect(await this.greeter.getSy()).to.equal(44);

  });
});
