// scripts/upgrade_box.js
const { ethers, upgrades } = require("hardhat");

// 代理协约地址
const proxyAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  const box = await ethers.getContractFactory("Box");
  const instance = await upgrades.upgradeProxy(proxyAddress, box);
  await instance.deployed();
  const proxyAdmin = await upgrades.admin.getInstance();
  const signer = await box.signer.getAddress();
  const implAddress = await upgrades.erc1967.getImplementationAddress(instance.address);

  console.log("signer(发起交易账号): \t\t\t\t\t", signer);  // 
  console.log("adminProxy(管理协约Address): \t\t\t\t", proxyAdmin.address);
  console.log("proxyAddress(代理协约的Address, 用户具体调用的协约):\t", instance.address);
  console.log("implAddress(逻辑协约Address)\t\t\t\t", implAddress);

}

main();