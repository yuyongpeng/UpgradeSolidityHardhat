const { ethers, upgrades} = require("hardhat");

async function main() {

  // ethers.getSigners();

  const box = await ethers.getContractFactory("Box");
  const instance = await upgrades.deployProxy(box, [42], {initializer: "initialize"});
  await instance.deployed();
  const proxyAdmin = await upgrades.admin.getInstance();
  const signer = await box.signer.getAddress();
  const implAddress = await upgrades.erc1967.getImplementationAddress(instance.address);

  // 使用指定的address构造对象
  // const Box2 = await ethers.getContractFactory("Box");
  // const box2 = Box2.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  // const box2 = await ethers.getContractAt("Box", instance.address);


  console.log("signer(发起交易账号): \t\t\t\t\t", signer);  // 
  console.log("adminProxy(管理协约Address): \t\t\t\t", proxyAdmin.address);
  console.log("proxyAddress(代理协约的Address, 用户具体调用的协约):\t", instance.address);
  console.log("implAddress(逻辑协约Address)\t\t\t\t", implAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
