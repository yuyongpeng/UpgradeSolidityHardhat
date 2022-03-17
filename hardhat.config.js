const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
// require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
const { FromKeystore, ToKeystore } = require("./wallet");

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   // Deploying
//   const Box = await ethers.getContractFactory("Params");
//   const instance = await upgrades.deployProxy(Box, [42]);
//   await instance.deployed();

//   // Upgrading
//   // const BoxV2 = await ethers.getContractFactory("BoxV2");
//   // const upgraded = await upgrades.upgradeProxy(instance.address, BoxV2);
// }

// main();


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

require("@nomiclabs/hardhat-web3");

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async taskArgs => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });
  
// // 部署可升级协约
// task("deploy", "Deploys a contract")
//   .addParam("contract", "The contract's name")
//   .setAction(async taskArgs => {
//     const greeter = ethers.getContractFactory("Greeter");
//     const instance = await upgrades.deployProxy(greeter);
//     await instance.deployed();
//   // const { contract } = taskArgs;
//   // const Contract = require(`./contracts/${contract}`);
//   // const contractInstance = await Contract.deploy();
//   // console.log(contractInstance.address);
// });
// // 升级协约
// task("upgrade", "Upgrades a contract") 
//   .addParam("contract", "The contract's name")
//   .setAction(async taskArgs => {
//     const { contract } = taskArgs;
//     const gretter = await ethers.getContractFactory("Greeter");
//     const upgraded = await upgrades.upgradeProxy(gretter.address, gretter);
// });

task("toKeystore", "encrypt private key and save to keystore")
    .addPositionalParam("prikey", "private key")
    .addPositionalParam("passwd", "password to encrypto")
    .setAction(async function ({ prikey, passwd }) {
        const jsonKeystore = await ToKeystore(prikey, passwd);
        const { address } = JSON.parse(jsonKeystore);
        if (!fs.existsSync(KeystoreDir))
            fs.mkdirSync(KeystoreDir, { recursive: true });
        const KeystoreFile = `${KeystoreDir}/${address}.keystore.json`;
        fs.writeFileSync(KeystoreFile, jsonKeystore);
        console.log(`saved in ${KeystoreFile}`);
    });

task("fromKeystore", "decrypt a keystore file")
    .addPositionalParam("keyfile", "keystore file path")
    .addPositionalParam("passwd", "password to decrypto")
    .setAction(async function ({ keyfile, passwd }) {
      const jsonKeystore = fs.readFileSync(keyfile)
      const prikey = FromKeystore(jsonKeystore, passwd)
      console.log("prikey:", prikey)
    });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.4",
// };
module.exports = {
  // defaultNetwork: "develop",
  networks: {
      hardhat: {
          chainId: 31337,
          gas: 12000000,
          blockGasLimit: 0x1fffffffffffff,
          allowUnlimitedContractSize: true,
          timeout: 1800000,
          accounts: {
              mnemonic:
                  "test test test test test test test test test test test junk",
              initialIndex: 0,
              count: 20,
              path: "m/44'/60'/0'/0",
              accountsBalance: "10000000000000000000000000",
          },
      },
      develop: {
          url: "http://localhost:8545",
          accounts: ["2615df5abe9b00f6c8bddd9d213ecbd9c82f18001357332a07cf6a61d21a1b1f","531d9e03ea577e817a27fe310f3fe429249c7c613540f0fd71d0693e5cf557f1"]
      },
      // ...networks(mainnet, "main", prikeys()),
      // ...networks(testnet, "test", prikeys()),
  },
  solidity: {
      version: "0.8.4",
      settings: {
          optimizer: {
              enabled: true,
              runs: 1,
          },
          evmVersion: "istanbul",
          outputSelection: {
              "*": {
                  "": ["ast"],
                  "*": [
                      "evm.bytecode.object",
                      "evm.deployedBytecode.object",
                      "abi",
                      "evm.bytecode.sourceMap",
                      "evm.deployedBytecode.sourceMap",
                      "metadata",
                  ],
              },
          },
      },
  },
  paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts",
  },
  typechain: {
      outDir: "./typechain",
      target: process.env.TYPECHAIN_TARGET || "ethers-v5",
  },
};