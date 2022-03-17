const { expect, assert } = require("chai");
const { ethers, upgrades} = require("hardhat");

describe("==== Box ====", function () {
  before(async function () {

    const box = await ethers.getContractFactory("Box");
    const instance = await upgrades.deployProxy(box, [42], {initializer: "initialize"});
    await instance.deployed();
    const proxyAdmin = await upgrades.admin.getInstance();
    const signer = await box.signer.getAddress();
    const implAddress = await upgrades.erc1967.getImplementationAddress(instance.address);

    this.instance = instance;

  });

  it("testValue", async function(){
    await this.instance.setValue(3);
    let value = await this.instance.getValue();
    console.log(value);
    assert.equal(await this.instance.getValue(), 3);
  });

});
