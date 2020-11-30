(function (global, factory,BigNumber) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }

// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    let account = undefined;
    //合约地址
    const gameAddress = "0x66B1012F689305aBf28577d5300740f6117ca30C";
    const tokenAddress = "";
    const gameABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "conf",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "pzt",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "subAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "partnerAward",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint8",
                    "name": "awardType",
                    "type": "uint8"
                }
            ],
            "name": "AllotSubAward",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "referrer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "node",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "partnerDirectAward",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "partnerBecomeAward",
                    "type": "uint256"
                }
            ],
            "name": "ApplyForPartner",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "referrer",
                    "type": "address"
                }
            ],
            "name": "Registration",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "changeAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "exchangeAmout",
                    "type": "uint256"
                }
            ],
            "name": "Subscribe",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "subAward",
                    "type": "uint256"
                }
            ],
            "name": "WithdrawAward",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "addressIndexs",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "version",
                    "type": "uint8"
                }
            ],
            "name": "applyForPartner",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "conf",
                    "type": "address"
                }
            ],
            "name": "changeConfig",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "pzsAddress",
                    "type": "address"
                }
            ],
            "name": "changePZS",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "version",
                    "type": "uint8"
                }
            ],
            "name": "getGlobalStats",
            "outputs": [
                {
                    "internalType": "uint256[9]",
                    "name": "stats",
                    "type": "uint256[9]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "name": "getNodeAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "nodeAddress",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "version",
                    "type": "uint8"
                },
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "name": "getPersonalStats",
            "outputs": [
                {
                    "internalType": "uint256[10]",
                    "name": "stats",
                    "type": "uint256[10]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "pzsImpl",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "regist",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "version",
                    "type": "uint8"
                }
            ],
            "name": "subscribe",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "teamCountLimit",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "totalSubEth",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "underway",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "version",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "addList",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "referAddress",
                    "type": "address"
                }
            ],
            "name": "upgrade",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "userCounter",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "active",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "referrer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "node",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "direcCount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "indirectCount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "teamCount",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "version",
                    "type": "uint8"
                }
            ],
            "name": "withdrawAward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const tokenABI = [];
    const gasLimit=21000;
    const ethToken = {
        address: '',
        symbol: 'ETH',
        decimals: Math.pow(10, 18),
    }

    //初始化合约
    const baseContract = (abi, address) => {
        return new web3.eth.Contract(abi, address);
    }
    // 初始化游戏合约
    const nftContract = () => {
        return baseContract(gameABI, gameAddress);
    }

    // 初始化web3
    const initWeb3 = () => {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            connect();
        } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
            window.web3 = new Web3(web3.currentProvider);
        }
    }

    // 链接钱包
    const connect = () => {
        ethereum.send("eth_requestAccounts")
            .then(data => {
                console.log("===data,", data);
                account = data?.[0]
            })
            .catch(err => {
                console.log("===err,", err);
                if (err.code === 4001) {
                    // EIP 1193 userRejectedRequest error
                    console.log("Please connect to MetaMask.");
                } else {
                    console.error(err);
                }
            });
    }
    // 获取当前账号
    const getAccount = async () => {
        const accounts = await web3.eth.getAccounts();
        account = accounts?.[0] || "0x000000000"
        return account
    }
    // 获取eth余额
    const getEthBalance = async () => {
        const balance = await web3.eth.getBalance(account || await getAccount());
        console.log("this.account", balance / ethToken.decimals);
        return balance / ethToken.decimals;
    }
    // 获取token余额
    const getTokenBalance = async () => {

    }
    // 转账115
    const transferERC115 = async (params, callback) => {

    }
    //测试查询nft 游戏数据
    const getGameInfo = () => {
        const contract = nftContract();
        return contract.methods.getGlobalStats(0).call().then(data => {
            return data;
        })
    }

    //测试转账接口
    const superNode = async () => {
        const contract = nftContract();
        let fee = 5;
        let amount = web3.utils.toWei(fee.toString(), 'ether');
        let _amount = web3.utils.toHex(amount)
        const gasAmount = await contract.methods.applyForPartner(0).estimateGas({
            from: await getAccount(),
            value: _amount
        });

        return contract.methods.applyForPartner(0).send({
            from: await getAccount(),
            value: _amount,
            gasLimit: gasAmount

        }).then(data => {
            debugger
        })
    }
    const handleAccountsChanged = function (accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log("Please connect to MetaMask.");
            return "";
        } else {
            return accounts[0];
        }
    }

    const calculateGasMargin=(value)=> {
        const gas= new BigNumber(value).multipliedBy(new BigNumber(10000).plus(new BigNumber(10000))).dividedBy(new BigNumber(10000))
        return gas;
    }
    var block = {
        currentAccount: account,
        ethToken: ethToken,
        initWeb3: initWeb3,
        getAccount: getAccount,
        getEthBalance: getEthBalance,
        getTokenBalance: getTokenBalance,
        transferERC115: transferERC115,
        getGameInfo: getGameInfo,
        superNode: superNode

    }
    if (!noGlobal) {
        window.LayaBlock = block;
    }
    return LayaBlock;
})
