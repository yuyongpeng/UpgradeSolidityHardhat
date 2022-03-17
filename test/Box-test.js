const { expect } = require("chai");
const { ethers, upgrades} = require("hardhat");

describe("Box", function () {
  before(async function () {

    const box = await ethers.getContractFactory("Box");
    const instance = await upgrades.deployProxy(box, [42], {initializer: "initialize"});
    await instance.deployed();
    const proxyAdmin = await upgrades.admin.getInstance();
    const signer = await box.signer.getAddress();
    const implAddress = await upgrades.erc1967.getImplementationAddress(instance.address);

    this.instance = instance;

  });

  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("testValue", async function(){
    await this.instance.setValue(3);
    let value = await this.instance.getValue();
    console.log(value);
    expect(await this.instance.getValue()).equals(3);
  });

});
