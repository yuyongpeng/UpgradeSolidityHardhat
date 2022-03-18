# UpgradeSolidityHardhat

基于hardhat的协约更新和调试Demo

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```


# 编译协约
```
$ npx hardhat compile
```
会将contracts目录下的协约编译后，在artifacts下生成json文件

# 部署可升级协约
```
# 部署3个协约 ProxyAdmin.sol  TransparentUpgradeableProxy.sol  用户的协约.sol
$ npx hardhat run scripts/deploy.js
# 升级用户协约。调用ProxyAdmin.sol的方法。(需要修改upgrade.js文件的 proxyAddress的参数)
$ npx hardhat run scripts/upgrade.js
// 使用hardhat自带的节点，会包如下的错误，需要使用ganache的节点不会有问题。
// (node:78017) UnhandledPromiseRejectionWarning: Error: Contract at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 doesn't look like an ERC 1967 proxy with a logic contract address
```
* signer(发起交易账号):                                    0x7C195d4FC1eaDe64DCfa47EF4530E080B02EEc6F
* adminProxy(管理协约Address):                             0x7b73d1b27c04b4c616ADfF9F8EB5bd53F769d9e5
* proxyAddress(代理协约的Address, 用户具体调用的协约):        0x0C6bFa8107804bC72dDBCa761F1d1BD9BABc9A88
* implAddress(逻辑协约Address)                             0xA182e0Ec30E2D15809F109E165Ad8a8642b8a991



# 测试协约
```
$ npx hardhat test
```
console.sol 协约调试，只能使用hardhat自带的节点。不能通过RPC调用第三方节点。否则没有输出。


















