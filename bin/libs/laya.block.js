window.LayaBlock = (function (exports,Laya,LayaSocket) {
    'use strict';

    //加载时的描述
    let gameLoadDec = {
        'zh-CN':'公元2020年2月22日，在cmswap坐标0xlddkk0394处发现一个金矿。于是很多淘客们开始了挖矿致富。',
        'en-US':'On February 22nd, 2020, a gold deposit was discovered at the coordinate of cmswap. So many Taoke began to mine to get rich',
        'kr':'서기 2020 년 2 월 22 일, cmswap 좌표 0 xldkk 0394 곳 에서 금광 을 발견 하 였 다.그 러 자 많은 방문객 들 이 광산 을 파고 부자 가 되 기 시작 했다.'
    };

    //设备规则
    let machineRemark = {
        'zh-CN':'规则描述规则描述规则描述规则描述规则描述规则描述',
        'en-US':'Rule，Rule，Rule，Rule，Rule，Rule，',
        'kr':'Rule，Rule，Rule，Rule，Rule，Rule，Rule，'
    };

// erc1155代币id 1-18分别对应:采矿车1-6;翻斗车7-12;挖掘机13-18 颜色顺序[白 绿 蓝 紫 粉 橙 ]

    const machine = [
        {
            "type": 3,
            "color": 1,
            "load": 0,
            "mining": 1,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/1.png"
        }, {
            "type": 3,
            "color": 2,
            "load": 0,
            "mining": 2,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/2.png"
        }, {
            "type": 3,
            "color": 3,
            "load": 0,
            "mining": 5,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/3.png"
        }, {
            "type": 3,
            "color": 4,
            "load": 0,
            "mining": 10,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/4.png"
        }, {
            "type": 3,
            "color": 5,
            "load": 0,
            "mining": 30,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/5.png"
        }, {
            "type": 3,
            "color": 6,
            "load": 0,
            "mining": 100,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/6.png"
        },

        {
            "type": 1,
            "color": 1,
            "load": 10,
            "mining": 1,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/1.png"
        },

        {
            "type": 1,
            "color": 2,
            "load": 20,
            "mining": 2,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/2.png"
        },

        {
            "type": 1,
            "color": 3,
            "load": 50,
            "mining": 5,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/3.png"
        },

        {
            "type": 1,
            "color": 4,
            "load": 100,
            "mining": 10,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/4.png"
        },

        {
            "type": 1,
            "color": 5,
            "load": 300,
            "mining": 30,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/5.png"
        },

        {
            "type": 1,
            "color": 6,
            "load": 1000,
            "mining": 100,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/6.png"
        }, {
            "type": 2,
            "color": 1,
            "load": 1,
            "mining": 10,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/1.png"
        },

        {
            "type": 2,
            "color": 2,
            "load": 2,
            "mining": 20,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/2.png"
        },

        {
            "type": 2,
            "color": 3,
            "load": 5,
            "mining": 50,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/3.png"
        },

        {
            "type": 2,
            "color": 4,
            "load": 10,
            "mining": 100,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/4.png"
        },

        {
            "type": 2,
            "color": 5,
            "load": 30,
            "mining": 300,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/5.png"
        },

        {
            "type": 2,
            "color": 6,
            "load": 100,
            "mining": 1000,
            "level": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/6.png"
        }

    ];

    const dev=true;
    //服务器选区
    const gameServer = [
        {
            name: 'Crypto Mine',
            symbol: 'CM',
            decimals: Math.pow(10, 18),
            scale: 4,
            approveAmount: 100000, //授权金额
            erc20TokenAddress: "0x4c543Fdc21d0F076FCEa4F92ce9BBCa70990FF6c",
            gameAddress: "0xFb0eFEb05Bc05F32f03BB63227111747835e5033",
            erc1155TokenAddress: "0xC5E887eA752eb452430c8D8bbD37E20b94621B41"

        }
    ];
    //const socketUrl = dev?"ws://127.0.0.1/ws":"wss://api.cmblk.com/ws";
    const socketUrl = "wss://api.cmblk.com/ws";
    const apiUrl=dev?"":"https://api.cmblk.com";
    //交易所地址
    const exchangeUrl = "https://app.cmblk.com";
    //区块链浏览器地址
    const blockChainUrl = "https://ropsten.etherscan.io";

    const defaultAddress = "0x0000000000000000000000000000000000000000";

    //游戏合约地址
    const gameABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "MiningPoolAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "token1155Address",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256[2]",
                    "name": "fee",
                    "type": "uint256[2]"
                }
            ],
            "name": "DeveloperFee",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                }
            ],
            "name": "LastStraw",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Mining",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "ObtainCar",
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
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "sn",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fertility",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "carry",
                    "type": "uint256"
                }
            ],
            "name": "SetCarIndex",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "UpdateRank",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[2]",
                    "name": "amounts",
                    "type": "uint256[2]"
                }
            ],
            "name": "WithdrawAward",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "LAST_STRAW_PERCNET",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ONE_DAY",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ORE_AMOUNT",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "OUT_RATE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "RANKING_AWARD_PERCENT",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "carIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "cars",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "sn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "fertility",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "carry",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                }
            ],
            "name": "crown",
            "outputs": [
                {
                    "internalType": "address[10]",
                    "name": "ranking",
                    "type": "address[10]"
                },
                {
                    "internalType": "uint256[10]",
                    "name": "digGross",
                    "type": "uint256[10]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "dailyOutput",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "determinate",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "usable",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "counts",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256",
                    "name": "len",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "token1155Amount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_carId",
                    "type": "uint256"
                }
            ],
            "name": "getDepartCars",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                }
            ],
            "name": "getGlobalStats",
            "outputs": [
                {
                    "internalType": "uint256[5]",
                    "name": "stats",
                    "type": "uint256[5]"
                },
                {
                    "internalType": "address",
                    "name": "lastStrawUser",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
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
                    "internalType": "uint256[8]",
                    "name": "stats",
                    "type": "uint256[8]"
                },
                {
                    "internalType": "bool[3]",
                    "name": "stats2",
                    "type": "bool[3]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "departs",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                }
            ],
            "name": "getRanking",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "name": "getVersionAward",
            "outputs": [
                {
                    "internalType": "uint256[2]",
                    "name": "amounts",
                    "type": "uint256[2]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "history",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "complete",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "actual",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "lastStraw",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "expiry",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "allowed",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "obtainCar",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_values",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "onERC1155BatchReceived",
            "outputs": [
                {
                    "internalType": "bytes4",
                    "name": "",
                    "type": "bytes4"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "onERC1155Received",
            "outputs": [
                {
                    "internalType": "bytes4",
                    "name": "",
                    "type": "bytes4"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pool",
            "outputs": [
                {
                    "internalType": "contract MiningPool",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "rank",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "records",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "drawStatus",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "digGross",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "lastStraw",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "sn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "fertility",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "carry",
                    "type": "uint256"
                }
            ],
            "name": "setCarIndex",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[]",
                    "name": "sns",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "fertilities",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "carries",
                    "type": "uint256[]"
                }
            ],
            "name": "setCarIndexs",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                }
            ],
            "name": "sortRank",
            "outputs": [
                {
                    "internalType": "address[10]",
                    "name": "ranking",
                    "type": "address[10]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceID",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token1155",
            "outputs": [
                {
                    "internalType": "contract IERC1155",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "version",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_version",
                    "type": "uint256"
                }
            ],
            "name": "withdrawAward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    // erc20Token
    const erc20TokenABI = [
        {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "decimals",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "initialBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "chainId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "MintFinished",
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "DOMAIN_SEPARATOR",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "PERMIT_TYPEHASH",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "_nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "finishMinting",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "mintingFinished",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "holder",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "expiry",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "permit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "version",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    //erc115Token
    const erc1155TokenABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_proxyRegistryAddress",
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
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "_approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
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
                    "name": "_operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_ids",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "TransferBatch",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "TransferSingle",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_uri",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "URI",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOf",
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
                    "internalType": "address[]",
                    "name": "_owners",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_ids",
                    "type": "uint256[]"
                }
            ],
            "name": "balanceOfBatch",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
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
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_quantities",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "batchMint",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_initialOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_initialSupply",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_uri",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "create",
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
            "name": "creators",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isOperator",
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
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_quantity",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "mint",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_amounts",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeBatchTransferFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "_approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_newBaseMetadataURI",
                    "type": "string"
                }
            ],
            "name": "setBaseMetadataURI",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_ids",
                    "type": "uint256[]"
                }
            ],
            "name": "setCreator",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "_interfaceID",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
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
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
            "name": "tokenSupply",
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
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "totalSupply",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "uri",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const ethToken = {
        address: '',
        name: 'ETH',
        symbol: 'ETH',
        decimals: Math.pow(10, 18),
        scale: 4 //保留小数位
    }


    class LayaBlock {
        constructor() {
            this.account = undefined;
            this.erc20TokenAddress = "";
            this.erc1155TokenAddress = "";
            this.gameAddress = "";
            this.lan="zh-CN";
            this.erc20Token = {
                name: 'Crypto Mine',
                symbol: 'CM',
                decimals: Math.pow(10, 18),
                scale: 2,
                approveAmount: 100000 //授权金额
            }
            this.DIS={
                type: "10", // 广播派车
                subKey: "10",
                socket: undefined,
                heartTimer: undefined,
                msgHandle: undefined
            };
            this.machineGo=()=>{}
            /**
             * MAINNET = 1,
             * ROPSTEN = 3,
             * RINKEBY = 4,
             * GÖRLI = 5,
             * KOVAN = 42
             * @type {number}
             */
            this.chainId = 1

        }

        /**
         * 设置语言
         * @param lan
         */
        static setLanguage=(lan)=>{
            this.lan=lan||"zh-CN";
            localStorage.setItem("lan",lan);
        }

        /**
         * 获取语言
         * @param lan
         */
        static getLanguage=()=>{

            let lan=localStorage.getItem("lan")||this.lan;
            if(null==lan){
                var language = (navigator.browserLanguage || navigator.language).toLowerCase();
                if(language.indexOf('zh')>-1){
                    lan="zh-CN";
                }else if(language.indexOf('en')>-1){
                    lan="en-US";
                }else if(language.indexOf('kr')>-1){
                    lan="kr";
                }else{
                    lan="en-US";
                }
            }
            this.lan=lan;
            return lan;

        }

        //初始化合约
        static baseContract = (abi, address) => {
            return new web3.eth.Contract(abi, address);
        }
        // 初始化游戏合约
        static gameContract = () => {
            return this.baseContract(gameABI, this.gameAddress);
        }

        // 初始化Token合约
        static  tokenContract = () => {
            return this.baseContract(erc20TokenABI, this.erc20TokenAddress);
        }

        // 初始化Token1155合约
        static token1155Contract = () => {
            return this.baseContract(erc1155TokenABI, this.erc1155TokenAddress);
        }
        // 初始化web3
        static initWeb3 = () => {
            if (window.ethereum) {
                this.chainId = parseInt(window.ethereum.chainId)
                window.web3 = new Web3(ethereum);
                this.connectWallet();
            } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
                window.web3 = new Web3(web3.currentProvider);
            }
        }


        // 链接钱包
        static connectWallet = () => {

            ethereum.request({method: 'eth_requestAccounts'})
                .then(data => {
                    console.log("===data,", data);
                    this.account = data ? data[0] : undefined
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

            // 监听账号变化
            ethereum.on('accountsChanged', function (data) {
                console.log("accountsChanged",data[0])
                this.account = data ? data[0] : undefined

                //移除设备缓存数据
                localStorage.removeItem("machine")
            })
        }


        /**
         * 获取游戏分区数据
         * @returns {*[]}
         */
        static getGameServer = () => {
            return new Promise(function (resolve, reject) {
                resolve(gameServer)
            });
        }

        /**
         * 选择游戏/选择具体矿池
         * @param machineGo()发车
         * @param game
         */
        static activeGame = async (game,machineGo) => {
            this.selectData={load:0,mining:0,total:0}
            this.erc20TokenAddress = game.erc20TokenAddress;
            this.erc1155TokenAddress = game.erc1155TokenAddress;
            this.gameAddress = game.gameAddress;
            this.machineGo=machineGo;
            this.version = await  this.getGameVersion();
            this.lan="zh-CN";
            this.erc20Token = {
                name: game.name,
                symbol: game.symbol,
                decimals: game.decimals,
                scale: game.scale,
                approveAmount: game.approveAmount //授权金额
            }

            this.DIS={
                type: "10", // 广播派车
                    subKey: "10",
                    socket: undefined,
                    heartTimer: undefined,
                    msgHandle: this.disMsgHandle
            };


            // 连接
            this.DIS.socket = new LayaSocket.Socket(
                socketUrl,
                {},
                this.disConnectHandle
            );
        }
        static  disMsgHandle=(msg)=> {

            if(this.machineGo){
                console.log("msg====",msg)
                let ids=msg.body.minecartIds.split(",");
                let amounts=msg.body.minecartNums.split(",");
                let cars=[];
                let that=this;
                amounts&&amounts.map((item,index)=>{
                    for(let i=0;i<parseInt(item);i++){
                        let car=this.getMachineAttribute(ids[index]);
                        let obj={id:parseInt(ids[index]),type:car.type,color:car.color,nick:msg.body.nick||this.addressSub(msg.body.address)};
                        cars.push(obj)
                    }
                })
                cars.map((item,index)=>{
                    setTimeout(function(){
                        that.machineGo(item)
                    },index*1000);
                })
            }
        }

        static disConnectHandle = async () =>{

            this.DIS.socket.send({
                action: "1",
                type: this.DIS.type,
                body: this.account||await this.getAccount()
            });
            this.DIS.heartTimer = setInterval(() => {
                this.DIS.socket.send({
                    action: "5",
                    type: this.DIS.type,
                    body: this.account
                });
            }, 10000);
            this.DIS.socket.on(this.DIS.subKey, this.DIS.msgHandle);
        }

        static getErc20Token = () => {
            return {...this.erc20Token}
        }

        /**
         * 获取矿山数据/ 游戏数据
         * @returns {*[]}
         */
        static getMineData = async () => {
            const version = await  this.getGameVersion();
            const total = await this.getTotalMin()
            const history = await this.getGameHistory(version);
            const surplus = parseInt(total) - parseFloat(history["complete"])
            return new Promise(function (resolve, reject) {
                resolve({id: parseInt(version) + 1, total: parseInt(total), surplus: surplus})
            });
        }
        /**
         * 获取用户首页挖矿基础数据
         * @returns {Promise<any>}
         */
        static  getUserMine = async () => {
            let req= new Laya.HttpRequest();
            const version = await this.getGameVersion()
            const address = await this.getAccount()
            const history = await this.getGameHistory(version);
            const complete = parseFloat(history["complete"])

            const contract = this.gameContract();
            const userGlobal = await contract.methods.getPersonalStats(version, address).call();
            const ethAmount = (userGlobal["stats"][3] / ethToken.decimals).toFixed(ethToken.scale)
            const tokenAmount = (userGlobal["stats"][2] / ethToken.decimals).toFixed(this.erc20Token.scale)
            const assign = userGlobal["stats"][7]
            const amount = parseFloat(userGlobal["stats"][1])
            let rank = parseFloat(userGlobal["stats"][6])
            const rate = (amount / (complete || 1)).toFixed(2)
            const reward = 100


            return new Promise(function(resolve, reject){
                if(rank<11){
                    const _data = {
                        address: address,
                        ethAmount: ethAmount,
                        tokenAmount: tokenAmount,
                        assign: assign,
                        amount: amount,
                        rank: rank,
                        rate: rate,
                        reward: reward
                    }

                    resolve(_data)
                    return;
                }
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    rank=data&&data.data.myRank;
                    const _data = {
                        address: address,
                        ethAmount: ethAmount,
                        tokenAmount: tokenAmount,
                        assign: assign,
                        amount: amount,
                        rank: rank,
                        rate: rate,
                        reward: reward
                    }

                    resolve(_data)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/gamerecord/currRank",{gameid:version,address:address},"post","json")
            });

        }

        /**
         * 获取用户设备数据
         * @params 查询参数
         * @returns {Promise<any>}
         */
        static getUserMachine = async (params) => {
            let lan=this.getLanguage();

            const rule=machineRemark[lan]

            //保存数据到缓存
            const machine = localStorage.getItem("machine");
            let data = machine ? JSON.parse(machine) : await this.getNft1155();
            data.sort((a, b) => b.mining - a.mining)
            if (params) {
                data = params['type'] ? data.filter(item => params.type.includes(item.type)) : data;
                data = params['color'] ? data.filter(item => params.color.includes(item.color)) : data;
                data = params['sort'] ? data.sort((a, b) => params['sort'] === "ASC" ? a.mining - b.mining : b.mining - a.mining) : data;
            }
            return new Promise(function (resolve, reject) {
                let _d=data.map(v=>{return {...v,remark:rule}})
                resolve(_d)
            });
        }


        /**
         * 从链上获取1155 并且保存到缓存
         */
        static  getNft1155 = async () => {

            let data = [];
            const contract = this.token1155Contract();
            const address = await this.getAccount();
            let _address = [];
            let ids = [];
            for (let i = 1; i <= 18; i++) {
                ids.push(i);
                _address.push(address)
            }
            let balanceArr = await contract.methods.balanceOfBatch(_address, ids).call()

            balanceArr.map((item, index) => {
                let machine = {};

                let i = index + 1;

                machine['id'] = i;
                //machine['balance'] = parseInt(item);

                let newObj = {};
                for (let j = 0; j < parseInt(item); j++) {
                    machine['balance'] = 1;
                    let {img, ...params} = this.getMachineAttribute(i)
                    Object.assign(newObj, machine, params)
                    data.push(newObj);
                }
            })

            if(data.length>0){
                //保存数据到缓存
                localStorage.setItem("machine", JSON.stringify(data));
            }

            return data;

        }

        /**
         * 获取设备属性 By 设备id
         * @param id
         * @returns {*}
         */
        static getMachineAttribute = (id) => {

            return machine[id - 1]
        }

        /**
         * 计算某一组 运走能力
         * @param ids
         * @param amounts
         * @returns {*}
         */
        static getMachinePower = (ids,amounts) => {

            let load=0;
            let mining=0;
            let totalCars=amounts.reduce((a,b)=>a+b);
            ids.map((item,index)=>{
                let machine=this.getMachineAttribute(item);
                load=load+(machine.load*amounts[index])
                mining=mining+(machine.mining*amounts[index])
            })

           return {load:load>=mining?mining:load,mining,totalCars}
        }

        /**
         * 选择设备计算总挖矿 总运走 车辆总数
         * @param id
         * @param selected 选中/移除 true/false
         * @returns {*}
         */
        static selectMachine = (machineId,selected) => {

            let car= this.getMachineAttribute(machineId);
            let _load=car.load>=car.mining?car.mining:car.load;
            let load=selected?this.selectData.load+parseInt(_load):this.selectData.load-parseInt(_load);
            let mining=selected?this.selectData.mining+parseInt(car.mining):this.selectData.mining-parseInt(car.mining);
            let total=selected?this.selectData.total+1:this.selectData.total-1;

           this.selectData={load,mining,total}


            return {load:load,mining,total}
        }

        /**
         * 获取用户收益
         * @returns {Promise<any>}
         */
        static getUserIncome = async () => {
            const address = await  this.getAccount()
            const version = await  this.getGameVersion()
            const contract = this.gameContract();
            const incomes = [];

            for (let i = 0; i <= version; i++) {
                let income = {id: i + 1}
                //const data = await contract.methods.getVersionAward(version, address).call();
                const record = await contract.methods.getPersonalStats(version, address).call();

                //eth 收益
                let ethReward = parseFloat(record["stats"][3] / ethToken.decimals).toFixed(ethToken.scale);
                //token 收益
                debugger
                let tokenReward = parseFloat(record["stats"][2] / this.erc20Token.decimals).toFixed(this.erc20Token.scale);
                //派出设备数
                let machineNum = record["stats"][7];
                // true false
                let receive = record["stats2"][0];
                income["ranking"] = address;

                income["ethReward"] = ethReward;
                income["tokenReward"] = tokenReward;
                income["machineNum"] = machineNum;
                income["receive"] = receive;

                income["digGross"] = record["stats"][1];
                income["lastStraw"] = record["stats2"][1];
                income["ranking"] = record["stats"][6];

                incomes.push(income)
            }
            return new Promise(function (resolve, reject) {
                resolve(incomes)
            });
        }

        /**
         * 查询我的某期收益详情
         * @param version
         * @param address
         * @param txId
         * @returns {Promise<void>}
         */
        static  getUserIncomeDetail = async (version, address, txId) => {

            const data = [{
                id: 1,
                // 载重
                load: 10,
                // 采矿数
                mining: 100,
                // 图片
                img: 'https://nft-files.s3.us-east-2.amazonaws.com/1/1.png',
                amount: 20
            }, {
                id: 2,
                // 载重
                load: 10,
                // 采矿数
                mining: 100,
                // 图片
                img: 'https://nft-files.s3.us-east-2.amazonaws.com/2/2.png',
                amount: 20
            }]
            return new Promise(function (resolve, reject) {
                resolve(data)
            });
        }
        /**
         * erc20 是否已经授权
         * @returns {Promise<boolean>}
         */
        static  getTokenAllowance = async () => {
            const contract = this.tokenContract();
            return contract.methods.allowance(await this.getAccount(), this.gameAddress).call().then(data => {
                console.log("getTokenAllowance===", data)
                return data > 0;
            })
        }

        /**
         * erc20 授权
         * @returns {Promise<boolean>}
         */
        static tokenApprove = async () => {
            const contract = this.tokenContract();
            let amount = new BigNumber(this.erc20Token.approveAmount * this.erc20Token.decimals);
            let _amount = '0x' + amount.toString(16)
            const gasAmount = await contract.methods.approve(this.gameAddress, _amount).estimateGas({
                from: await this.getAccount(),
                value: 0
            });

            return contract.methods.approve(this.gameAddress, _amount).send({
                from: await this.getAccount(),
                value: 0,
                gasLimit: gasAmount
            }).then(data => {
                console.log("approve ====", data)
                return data;
            }).catch(e => {
                console.log("approve error===", e)
                return new Promise(function (resolve, reject) {
                    reject(e)
                });
            })
        }

        /**
         * 质押erc20
         * @param {number} value 质押数量
         * @returns {Promise<ITransaction>}
         */
        static  stakeToken = async (value) => {
            const contract = this.gameContract();
            let amount = new BigNumber(value * this.erc20Token.decimals);
            let _amount = '0x' + amount.toString(16)
            const gasAmount = await contract.methods.stake(_amount).estimateGas({
                from: await this.getAccount(),
                value: 0
            });

            return contract.methods.stake(_amount).send({
                from: await this.getAccount(),
                value: 0,
                gasLimit: gasAmount
            }).then(data => {
                console.log("stake ====", data)
                return data;
            }).catch(e => {
                console.log("stake error===", e)
                return new Promise(function (resolve, reject) {
                    reject(e)
                });
            })
        }

        /**
         * 领取erc1155 NFT
         * @returns {Promise<any>}
         */
        static  receive1155 = async () => {
            const contract = this.gameContract();

            const gasAmount = await contract.methods.obtainCar().estimateGas({
                from: await this.getAccount(),
                value: 0
            });

            return contract.methods.obtainCar().send({
                from: await this.getAccount(),
                value: 0,
                gasLimit: gasAmount
            }).then(data => {
                console.log("receive1155 ====", data)
                return data;
            }).catch(e => {
                console.log("receive error===", e)
                return new Promise(function (resolve, reject) {
                    reject(e)
                });
            })
        }


        /**
         * erc1155 是否已经授权
         * @returns {Promise<boolean>}
         */
        static  getTokenNftAllowance = (id) => {
            return new Promise(function (resolve, reject) {
                resolve(false)
            });
        }

        /**
         * erc1155 授权
         * @returns {Promise<boolean>}
         */
        static tokenNftApprove = (id) => {
            return new Promise(function (resolve, reject) {
                resolve({txId: '0xpppppp'})
            });
        }


        /**
         * 质押erc1155 派出设备挖矿
         * @param {} obj  {17:5,18:6}
         * @param ()=>void
         * @param {number[]} amounts
         * @returns {Promise<ITransaction>}
         */
        static  stakeTokenNft = async (obj,call) => {


            let ids = Object.keys(obj).map((k) => parseInt(k));
            let amounts = Object.keys(obj).map((v) => obj[v]);
            let gameId=await await  this.getGameVersion();

            console.log("obg====", ids, amounts)

            const contract = this.token1155Contract();
            const data = '0x00'

            const gasAmount = await contract.methods.safeBatchTransferFrom(await this.getAccount(), this.gameAddress, ids, amounts, data).estimateGas({
                from: await this.getAccount(),
                to: this.gameAddress,
                value: 0,
            });
            return contract.methods.safeBatchTransferFrom(await this.getAccount(), this.gameAddress, ids, amounts, data).send({
                from: await this.getAccount(),
                to: this.gameAddress,
                value: 0,
                gasLimit: gasAmount
            }).on('transactionHash', (hash) => {
                console.log("hash===", hash)
                if(call)call({transactionHash:hash})
                this.submitTx(gameId,this.account,ids,amounts,hash)
               return {transactionHash:hash}
            }).on('confirmation', (confirmationNumber, receipt) => {
                console.log("confirmationNumber===", confirmationNumber)
                if(confirmationNumber>=12)receipt();
            }).on('receipt', (data) => {
                console.log("approve ====", data)
                localStorage.removeItem("machine");
                this.getUserMachine();
                return data;
            }).on('error', function (e, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.

                return e;

            });

        }


        // 获取当前账号
        static getAccount = async () => {
            const accounts = await web3.eth.getAccounts();
            const currAccount = accounts ? accounts[0] : "0x000000000";
            this.account = currAccount
            return currAccount
        }

        // 获取eth余额
        static  getEthBalance = async () => {
            const balance = await web3.eth.getBalance(await this.getAccount());
            return parseFloat(balance / ethToken.decimals).toFixed(ethToken.scale);
        }
        // 获取token余额
        static getTokenBalance = async () => {
            const contract = this.tokenContract();
            return contract.methods.balanceOf(await this.getAccount()).call().then(data => {
                return parseFloat(data / this.erc20Token.decimals).toFixed(this.erc20Token.scale);
            })
        }

        // 获取游戏期数
        static  getGameVersion = async () => {
            const contract = this.gameContract();
            const version = await contract.methods.version().call();
            return parseInt(version);
        }

        // 获取矿山总量
        static  getTotalMin = async () => {
            const contract = this.gameContract();
            const amount = await contract.methods.ORE_AMOUNT().call();
            return amount;
        }

        /**
         * 获取某期 eth分红数量 token分红数量 已挖矿数量 运走数量
         * @param v
         * @returns {Promise<void>}
         */
        static getGameHistory = async (v) => {
            const contract = this.gameContract();
            const data = await contract.methods.history(v).call();
            return data;
        }

        /**
         * 提取收益
         * @param v
         */
        static   withdrawAward = async (v) => {

            const contract = this.gameContract();

            const gasAmount = await contract.methods.withdrawAward(v - 1).estimateGas({
                value: 0,
            });
            return contract.methods.withdrawCapital(v - 1).send({
                value: 0,
                gasLimit: gasAmount
            }).then(data => {
                console.log("withdrawAward ====", data)
                return data;
            }).catch(e => {
                console.log("withdrawAward error===", e)
                return new Promise(function (resolve, reject) {
                    reject(e)
                });
            })

        }

        /**
         * 赎回质押token
         */
        static withdrawCapital = async () => {

            const contract = this.gameContract();

            const gasAmount = await contract.methods.withdrawCapital().estimateGas({
                from: await this.getAccount(),
                value: 0,
            });
            return contract.methods.withdrawCapital().send({
                from: await this.getAccount(),
                value: 0,
                gasLimit: gasAmount
            }).then(data => {
                console.log("withdrawCapital ====", data)
                return data;
            }).catch(e => {
                console.log("withdrawCapital error===", e)
                return new Promise(function (resolve, reject) {
                    reject(e)
                });
            })

        }
        /**
         * 获取用户质押数据
         * @returns {Promise<void>}
         */
        static  getUserStake = async () => {
            const contract = this.gameContract();
            const data = await contract.methods.users(await this.getAccount()).call();
            return new Promise(function (resolve, reject) {
                resolve({
                    id: data['id'],
                    investment: parseFloat(data['investment'] / this.erc20Token.decimals).toFixed(this.erc20Token.scale)
                })
            });

        }

        /**
         * 我的排名
         * @param gameId 期数
         * @returns {number}
         */
        static getUserRank = async (gameId) => {
            const contract = this.gameContract();

            const _version = await this.getGameVersion();
            let version = gameId ? gameId : _version;
            let address=this.account||await this.getAccount();

            let req= new Laya.HttpRequest();

            const userGlobal = await contract.methods.getPersonalStats(version, address).call();
            let machine = parseFloat("20")
            let load = parseFloat(userGlobal["stats"][1])
            let userRank = {gameId: version, id: 10000, address: address, addressShort: this.addressSub(address), machine: machine, load: load};
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    userRank.id=data&&data.data.myRank;

                    resolve(userRank)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/gamerecord/currRank",{gameid:version,address:address},"post","json")
            });
        }

        /**
         * 地址截取
         */
        static addressSub=(address)=>{

            return address.substring(0,3)+"***"+address.substring(address.length-3,address.length)

        }
        /**
         * 获取前10名
         */
        static  getRankTop10 = async () => {
            const contract = this.gameContract();
            const version = await this.getGameVersion();
            const sorts = await contract.methods.sortRank(version).call();
            let results = await Promise.all(sorts.map(async (item, index) => {
                if (defaultAddress === item) {
                    return {gameId: version, id: index + 1, address: "--",addressShort:"--", machine: 0, load: 0};
                }
                const nick=await  this.getNick(item)

                const userGlobal = await contract.methods.getPersonalStats(version, item).call();
                let machine = parseFloat("20")
                let load = parseFloat(userGlobal["stats"][1])
                let rank = {gameId: version, id: index + 1,address:item, addressShort:nick.nick|| this.addressSub(item), machine: machine, load: load};
                return rank
            }))
            return new Promise(function (resolve, reject) {
                resolve(results)
            });
        }

        /**
         * 获取前50名
         */
        static getRankTop50 = async () => {
            let req= new Laya.HttpRequest();
            let version=this.version||await this.getGameVersion();
            let that=this;
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{

                    const topCurrArr=data&&data.data&&data.data.topCurrArr;
                    const rank=[];
                    topCurrArr&&topCurrArr.map((item,index)=>{
                       let _rank = {
                            gameId: parseInt(item["gameid"]),
                            id: index + 1,

                            address:  item["address"],
                           addressShort:item["nickname"]|| that.addressSub(item["address"]),
                            machine: parseInt(item["miningNum"]),
                            load: parseInt(item["obtainNum"]),
                        }
                        rank.push(_rank);

                    })
                    resolve(rank)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/gamerecord/currRank",{gameid:version},"post","json")
            });

        }

        /**
         * 获取全网前50名
         */
        static  getGameRankTop50 = async () => {
            let req= new Laya.HttpRequest();
            let that=this;
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    console.log("getGameRankTop50===",data)
                    const topAllArr=data&&data.data&&data.data.topAllArr;
                    const rank=[];
                    topAllArr&&topAllArr.map((item,index)=>{
                        let _rank = {
                            gameId: parseInt(item["gameid"]),
                            id: index + 1,
                            address: item["address"],
                            addressShort:item["nickname"]|| that.addressSub(item["address"]),
                            machine: parseInt(item["miningNum"]),
                            load: parseInt(item["obtainNum"]),
                        }
                        rank.push(_rank);

                    })
                    resolve(rank)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/gamerecord/allRank",{},"post","json")
            });


        }

        /**
         * 获取最后一击
         */
        static  getLastStraw = async () => {
            const contract = this.gameContract();
            const version = await this.getGameVersion();
            const history = await contract.methods.history(version).call();
            const address = history["lastStraw"];
            let data = {gameId: version, address: "--",addressShort:"--", machine: 0, load: 0};
            if (defaultAddress != address) {
                const userGlobal = await contract.methods.getPersonalStats(version, address).call();
                data = {gameId: version, address: address,
                    addressShort: this.addressSub(address),
                    machine: machine, load: parseFloat(userGlobal["stats"][1])};
            }
            return new Promise(function (resolve, reject) {
                resolve(data)
            });
        }


        /**
         * 获取某一期派出明细
         */
        static  getPlayDetail = async (gameId, address) => {

            let req= new Laya.HttpRequest();
            let that=this;
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    const detail=data&&data.data;
                    const results=[];
                    detail&&detail.map((item,index)=>{
                        let ids=item['minecartIds'].split(",");
                        let amounts=item['minecartNums'].split(",");

                        let power=that.getMachinePower(ids,amounts)
                        let d={
                            //期数
                            gameId: item.gameid,
                            //派出设备
                            machineIds: ids,
                            //派出设备对应的数量
                            machineAmounts: amounts,
                            //挖矿数量
                            machine: power.mining,
                            //运走数量
                            load: power.load,
                            txId: item["txid"]
                        }
                        results.push(d);

                    })
                    resolve(results)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/dispatchrecord/getRecords?gameid="+gameId+"&address="+address,"","get","json")
            });

        }


        /**
         * 用户基础数据
         * @returns {Promise<void>}
         */
        static  getUserBase = async () => {
            const address=this.account||await this.getAccount();
            const nick=await this.getNick(address)
            const results = {
                /**
                 * 昵称
                 */
                nick: nick?nick.nick:"" ,
                /**
                 * 地址
                 */
                address: address,
                /**
                 * eth 数量
                 */
                ethAmount: await this.getEthBalance(),
                /**
                 * token 数量
                 */
                tokenAmount: await this.getTokenBalance(),
                /**
                 * token 名字
                 */
                tokenSymbol: this.erc20Token.symbol,

                /**
                 * 要求链接
                 */
                ref: exchangeUrl + "/#/?ref=" + address,
            }

            return new Promise(function (resolve, reject) {
                resolve(results)
            });

        }


        /**
         * 保存派发记录
         * @param gameId
         * @param address
         * @param ids
         * @param amounts
         * @param txId
         */
       static submitTx=(gameId,address,ids,amounts,txId)=>{
           let minecartIds=ids.join();
           let minecartNums=amounts.join()
            const data= {gameid:gameId,address,minecartIds,minecartNums,txid:txId};
            let req= new Laya.HttpRequest();

           req.once(Laya.Event.COMPLETE, this, (data)=>{
                console.log("data=》",data)
            });
            req.once(Laya.Event.ERROR, this, (data)=>{

            });
            req.send(apiUrl+"/nft/api/dispatchrecord/add",data,"post")

        }



        /*************后台查询数据相关****************/

        static getGameLoadDec=()=>{
            let lan=this.getLanguage();
            return new Promise(function(resolve, reject){
                resolve({dec:gameLoadDec[lan]})
            });
        }

        /**
         * 获取nick
         * @param address
         * @returns {Promise<any>}
         */
        static getNick=(address)=>{

            let req= new Laya.HttpRequest();
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    resolve(data&&data.data)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/user/nick/"+address,"","get","json")
            });
        }

        /**
         * 保存nick
         * @param address
         * @returns {Promise<any>}
         */
        static saveNick=(data)=>{
            let req= new Laya.HttpRequest();
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    resolve(data&&data.data)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/user/changeName",{address:data.address,nickname:data.nick},"post","json")
            });
        }

        /**
         * 获取最新公告
         * @returns {Promise<any>}
         */
        static getNotice=async ()=>{
            let req= new Laya.HttpRequest();
            let address=this.account||await this.getAccount();
            let lan=this.lan|| this.getLanguage();
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    const _data=data&&data.data&&data.data["records"][0];
                    const title=_data["title"]||_data["content"].substring(0,20);
                    const notice={title:title,content:_data["content"],time:new Date(_data["createTime"]).getTime()/1000}
                    resolve(notice)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/messagerecord/getAnnouncementPage?current=1&size=1&address="+address,"","get","json",["language",lan])
            });
        }

        /**
         * 获取邮件
         * @returns {Promise<any>}
         */
        static getEmail= async ()=>{
            let req= new Laya.HttpRequest();
            let address=this.account||await this.getAccount();
            let lan=this.lan|| this.getLanguage();
            return new Promise(function(resolve, reject){
                req.once(Laya.Event.COMPLETE, this, (data)=>{
                    const row=data&&data.data&&data.data["records"];
                    const _data=[];
                    row.map((item,index)=>{
                        let _d={
                            id:1,
                            type:1,
                            title:item["title"]||item["content"].substring(0,20),
                            time:new Date(item["createTime"]).getTime()/1000,
                            content:item["content"],
                            del:item["status"]===30?1:0,//0 未删除 1 已删除
                            read:item["status"]===10?0:item["status"]===20?1:-1, //0 未读 1 已读
                            receive:1 // 0未领取 1 已领取
                        };

                        _data.push(_d);
                    })

                    resolve(_data)
                });
                req.once(Laya.Event.ERROR, this, (data)=>{

                });
                req.send(apiUrl+"/nft/api/messagerecord/getMessagePage?current=1&size=5&address="+address,"","get","json",["language",lan])
            });

            // const data=[{
            //     id:1,
            //     type:0,
            //     title:"领取token",
            //     time:1607050113,
            //     content:"领取token内容",
            //     del:0,//0 未删除 1 已删除
            //     read:0, //0 未读 1 已读
            //     receive:0 // 0未领取 1 已领取
            // },{
            //     id:2,
            //     type:1,
            //     title:"测试测试",
            //     time:1607050113,
            //     content:"测试测试",
            //     del:1,//0 未删除 1 已删除
            //     read:1, //0 未读 1 已读
            //     receive:1 // 0未领取 1 已领取
            // }]

        }

        /**
         * 获取帮助数据
         * @returns {Promise<any>}
         */
        static getHelp=()=>{
            const data=[{
                id:1,
                title:'帮助文档测的',
                time:1607050113,
                content:'内容测试'
            },{
                id:1,
                title:'帮助文档测的',
                time:1607050113,
                content:'内容测试'
            }]
            return new Promise(function(resolve, reject){
                resolve(data)
            });
        }

        /**
         * 我的佣金明细
         * @returns {Promise<any>}
         */
        static getCommission=()=>{
            const data=[{
                nick:'第二敌人',
                address:'0xsssssssssss', // 地址
                amount:100, //数量
                txId:'', // 哈希
                receive:0 // 0未领取 1 已领取
            },{
                nick:'第五敌人',
                address:'0xsssssssssss', // 地址
                amount:100, //数量
                txId:'', // 哈希
                receive:1 // 0未领取 1 已领取
            }]
            return new Promise(function(resolve, reject){
                resolve(data)
            });
        }

        static copy=(text)=>{

        }
    }
    new LayaBlock();
    exports.blockChainUrl = blockChainUrl;
    exports.exchangeUrl = exchangeUrl;
    exports.ethToken = ethToken;
    exports.setLanguage=LayaBlock.setLanguage;
    exports.getLanguage=LayaBlock.getLanguage;
    exports.erc20Token = LayaBlock.getErc20Token;
    exports.activeGame = LayaBlock.activeGame;
    exports.getGameServer = LayaBlock.getGameServer;
    exports.getMineData = LayaBlock.getMineData;
    exports.getUserBase = LayaBlock.getUserBase;
    exports.getUserMine = LayaBlock.getUserMine;
    exports.getUserMachine = LayaBlock.getUserMachine;
    exports.getUserIncome = LayaBlock.getUserIncome;
    exports.getUserIncomeDetail = LayaBlock.getUserIncomeDetail;
    exports.getTokenAllowance = LayaBlock.getTokenAllowance;
    exports.tokenApprove = LayaBlock.tokenApprove;
    exports.stakeToken = LayaBlock.stakeToken;
    exports.receive1155 = LayaBlock.receive1155;
    exports.getTokenNftAllowance = LayaBlock.getTokenNftAllowance;
    exports.tokenNftApprove = LayaBlock.tokenNftApprove;
    exports.stakeTokenNft = LayaBlock.stakeTokenNft;
    exports.withdrawCapital = LayaBlock.withdrawCapital;
    exports.withdrawAward = LayaBlock.withdrawAward;
    exports.initWeb3 = LayaBlock.initWeb3;
    exports.getAccount = LayaBlock.getAccount;
    exports.getEthBalance = LayaBlock.getEthBalance;
    exports.getTokenBalance = LayaBlock.getTokenBalance;
    exports.getUserStake = LayaBlock.getUserStake;
    exports.getGameHistory = LayaBlock.getGameHistory;
    exports.getUserRank = LayaBlock.getUserRank;
    exports.getRankTop10 = LayaBlock.getRankTop10;
    exports.getRankTop50 = LayaBlock.getRankTop50;
    exports.getGameRankTop50 = LayaBlock.getGameRankTop50;
    exports.getLastStraw = LayaBlock.getLastStraw;
    exports.getPlayDetail = LayaBlock.getPlayDetail;

    exports.getGameLoadDec= LayaBlock.getGameLoadDec;
    exports.getNick= LayaBlock.getNick;
    exports.saveNick= LayaBlock.saveNick;
    exports.getNotice= LayaBlock.getNotice;
    exports.getEmail= LayaBlock.getEmail;
    exports.getHelp= LayaBlock.getHelp;
    exports.getCommission= LayaBlock.getCommission;
    exports.selectMachine=LayaBlock.selectMachine;

    return exports;

}({},Laya,LayaSocket));
