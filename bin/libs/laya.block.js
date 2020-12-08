(function (global, factory, BigNumber,Laya) {
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

    // erc1155代币id 1-18分别对应:采矿车1-6;翻斗车7-12;挖掘机13-18 颜色顺序[白 绿 蓝 紫 粉 橙 ]
    // A 采矿车 B 翻斗车 C 挖掘机
    
    const machineA=[
        {
        "type":3,
        "color":1,
        "load":0,
        "mining":1,
        "img":"https://nft-files.s3.us-east-2.amazonaws.com/3/1.png"
    },{
            "type":3,
            "color":2,
            "load":0,
            "mining":2,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/3/2.png"
        },{
            "type":3,
            "color":3,
            "load":0,
            "mining":5,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/3/3.png"
        },{
            "type":3,
            "color":4,
            "load":0,
            "mining":10,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/3/4.png"
        },{
            "type":3,
            "color":5,
            "load":0,
            "mining":30,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/3/5.png"
        },{
            "type":3,
            "color":6,
            "load":0,
            "mining":100,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/3/6.png"
        }]
    const machineB=[
        {
            "type":1,
            "color":1,
            "load":10,
            "mining":1,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/1/1.png"
        },

        {
            "type":1,
            "color":2,
            "load":20,
            "mining":2,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/1/2.png"
        },

        {
            "type":1,
            "color":3,
            "load":50,
            "mining":5,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/1/3.png"
        },

        {
            "type":1,
            "color":4,
            "load":100,
            "mining":10,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/1/4.png"
        },

        {
            "type":1,
            "color":5,
            "load":300,
            "mining":30,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/1/5.png"
        },

        {
            "type":1,
            "color":6,
            "load":1000,
            "mining":100,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/1/6.png"
        }
    ]
    const machineC=[
        {
            "type":2,
            "color":1,
            "load":1,
            "mining":10,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/2/1.png"
        },

        {
            "type":2,
            "color":2,
            "load":2,
            "mining":20,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/2/2.png"
        },

        {
            "type":2,
            "color":3,
            "load":5,
            "mining":50,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/2/3.png"
        },

        {
            "type":2,
            "color":4,
            "load":10,
            "mining":100,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/2/4.png"
        },

        {
            "type":2,
            "color":5,
            "load":30,
            "mining":300,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/2/5.png"
        },

        {
            "type":2,
            "color":6,
            "load":100,
            "mining":1000,
            "img":"https://nft-files.s3.us-east-2.amazonaws.com/2/6.png"
        }
    ]
    
    //服务器选区
    const gameServer = [{id: 1, name: 'Crypto Mine矿池', token: "CM"}];
    //游戏合约地址
    const gameAddress = "0x740809F6e4800095ACada019bfFcafd506DD8FD7";
    const gameABI = [{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"address","name":"erc1155Address","type":"address"},{"internalType":"address payable","name":"_proAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"ERC1155","outputs":[{"internalType":"contract IERC1155","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERC20Token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LAST_STRAW_PERCNET","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ONE_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ORE_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"RANKING_AWARD_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"START_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"carIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cars","outputs":[{"internalType":"uint256","name":"fertility","type":"uint256"},{"internalType":"uint256","name":"carry","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"carId","type":"uint256"}],"name":"findCarId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"_version","type":"uint256"}],"name":"findRank","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getDigGross","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"_version","type":"uint8"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getPersonalStats","outputs":[{"internalType":"uint256[6]","name":"stats","type":"uint256[6]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getRecord","outputs":[{"internalType":"bool","name":"drawStatus","type":"bool"},{"internalType":"uint256","name":"digGross","type":"uint256"},{"internalType":"bool","name":"lastStraw","type":"bool"},{"internalType":"uint8","name":"ranking","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"}],"name":"getSorts","outputs":[{"internalType":"address[10]","name":"","type":"address[10]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getVersionAward","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"history","outputs":[{"internalType":"uint256","name":"ethAmount","type":"uint256"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"complete","type":"uint256"},{"internalType":"uint256","name":"actual","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"indexs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"obtainCar","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"obtainRecord","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_values","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pairSwap","outputs":[{"internalType":"contract PairSwap","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"records","outputs":[{"internalType":"bool","name":"drawStatus","type":"bool"},{"internalType":"uint256","name":"digGross","type":"uint256"},{"internalType":"bool","name":"lastStraw","type":"bool"},{"internalType":"uint8","name":"ranking","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"sn","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"fertility","type":"uint256"},{"internalType":"uint256","name":"carry","type":"uint256"}],"name":"setIds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"sorts","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"stakeAmount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"userCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"investment","type":"uint256"},{"internalType":"uint256","name":"withdrawVersion","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawCapital","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];


    // erc20Token
    const erc20TokenAddress = "0x5E97390031cC1B4E48488a0a270a74A9C73578a2";
    const erc20TokenABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"minter_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

    //erc115Token
    const erc1155TokenAddres = "0x842dcfDFa421F66CadB5d524D75Af3D3F03bA531";
    const erc1155TokenABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_proxyRegistryAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"bool","name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_uri","type":"string"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"URI","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address[]","name":"_owners","type":"address[]"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_quantities","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"batchMint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_initialOwner","type":"address"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"create","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creators","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"isOperator","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_newBaseMetadataURI","type":"string"}],"name":"setBaseMetadataURI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"setCreator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]


    const ethToken = {
        address: '',
        name:'ETH',
        symbol: 'ETH',
        decimals: Math.pow(10, 18),
    }
    // erc20 token
    const erc20Token = {
        address: erc20TokenAddress,
        name:'Crypto Mine',
        symbol: 'CM',
        decimals: Math.pow(10, 18),
        approveAmount:10000000 //授权金额
    }

    //初始化合约
    const baseContract = (abi, address) => {
        return new web3.eth.Contract(abi, address);
    }
    // 初始化游戏合约
    const gameContract = () => {
        return baseContract(gameABI, gameAddress);
    }

    // 初始化Token合约
    const tokenContract = () => {
        return baseContract(erc20TokenABI, erc20TokenAddress);
    }

    // 初始化Token1155合约
    const token1155Contract = () => {
        return baseContract(erc1155TokenABI, erc1155TokenAddres);
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
        ethereum.request({method: 'eth_requestAccounts'})
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


    /**
     * 获取游戏分区数据
     * @returns {*[]}
     */
    const getGameServer = () => {
        return new Promise(function (resolve, reject) {
            resolve(gameServer)
        });
    }

    /**
     * 获取矿山数据
     * @returns {*[]}
     */
    const getMineData = () => {
        return new Promise(function (resolve, reject) {
            resolve({id: 1, total: 20000, surplus: 1000})
        });
    }
    /**
     * 获取用户基础数据
     * @returns {Promise<any>}
     */
    const getUserBase = async () => {
        const data = {
            address: await getAccount(),
            ethBalance: 10,
            tokenBalance: 100,
            amount: 100,
            rank: 10,
            rate: 0.2,
            reward: 100
        }
        return new Promise(function (resolve, reject) {
            resolve(data)
        });
    }

    /**
     * 获取用户设备数据
     * @returns {Promise<any>}
     */
    const getUserMachine = async () => {

        let data=[];
        const contract = token1155Contract();
        for(let i=1;i<=18;i++){
            let machine={};
            let balance= await contract.methods.balanceOf(await getAccount(),i).call()
            //let uri= await contract.methods.uri(i).call()
            // let xhr = new Laya.HttpRequest();
            // let _d= xhr.send(uri+".json","","get","json");//发送了一个get请求，携带的参数为a = xxxx,b=xxx

            let detail=[];
            if(i<=6){
                detail=machineA
            }
            if(i>6&&i<=12){
                detail=machineB
            }
            if(i>12){
                detail=machineC
            }
            let mod=i%6;
            machine['id']=i;
            machine['balance']=balance;

            let newObj = {};
            Object.assign(newObj,machine,detail[mod>0?mod-1:5])

            data.push(newObj);
        }

       // console.log("getUserMachine===",data)

        return new Promise(function (resolve, reject) {
            resolve(data)
        });
    }

    /**
     * 获取用户收益
     * @returns {Promise<any>}
     */
    const getUserIncome = async () => {
        const address = await  getAccount()
        const data = [{
            gameId: 1,//期数
            machineNum: 100,//派出设备数
            reward: 1000, // 收益
            receive: 0, // 0未领取 1 已领取
            detail: [{
                id: 1,
                // 载重
                load: 10,
                // 采矿数
                mining: 100,
                // 图片
                img: 'https://nft-files.s3.us-east-2.amazonaws.com/1/1.png',
                reward: 100, // 收益
                txId: '0xooooo'
            }, {
                id: 2,
                // 载重
                load: 10,
                // 采矿数
                mining: 100,
                // 图片
                img: 'https://nft-files.s3.us-east-2.amazonaws.com/2/2.png',
                reward: 100, // 收益
                txId: '0xbbbbb'
            }]
        }, {
            gameId: 2,//期数
            machineNum: 10,//派出设备数
            reward: 100, // 收益
            receive: 1, // 0未领取 1 已领取
            detail: [{
                id: 1,
                // 载重
                load: 10,
                // 采矿数
                mining: 100,
                // 图片
                img: 'https://nft-files.s3.us-east-2.amazonaws.com/1/1.png',
                reward: 100, // 收益
                txId: '0xooooo'
            }, {
                id: 2,
                // 载重
                load: 10,
                // 采矿数
                mining: 100,
                // 图片
                img: 'https://nft-files.s3.us-east-2.amazonaws.com/2/2.png',
                reward: 100, // 收益
                txId: '0xbbbbb'
            }]
        }]
        return new Promise(function (resolve, reject) {
            resolve(data)
        });
    }


    /**
     * erc20 是否已经授权
     * @returns {Promise<boolean>}
     */
    const getTokenAllowance = async () => {
        const contract = tokenContract();
        return contract.methods.allowance(await getAccount(),gameAddress).call().then(data => {
            console.log("getTokenAllowance===",data)
            return data>0;
        })
    }

    /**
     * erc20 授权
     * @returns {Promise<boolean>}
     */
    const tokenApprove = async () => {
        const contract = tokenContract();
        let amount =new BigNumber(erc20Token.approveAmount*erc20Token.decimals);
        let _amount = '0x' + amount.toString(16)
        const gasAmount = await contract.methods.approve(gameAddress,_amount).estimateGas({
            from: await getAccount(),
            value: 0
        });

        return contract.methods.approve(gameAddress,_amount).send({
            from: await getAccount(),
            value: 0,
            gasLimit: gasAmount
        }).then(data => {
            console.log("approve ====",data)
            return data;
        }).catch(e=>{
            console.log("approve error===",e)
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
    const stakeToken = async (value) => {
        const contract = gameContract();
        let amount =new BigNumber(value*erc20Token.decimals);
        let _amount = '0x' + amount.toString(16)
        const gasAmount = await contract.methods.stake(_amount).estimateGas({
            from: await getAccount(),
            value: 0
        });

        return contract.methods.stake(_amount).send({
            from: await getAccount(),
            value: 0,
            gasLimit: gasAmount
        }).then(data => {
            console.log("stake ====",data)
            return data;
        }).catch(e=>{
            console.log("stake error===",e)
            return new Promise(function (resolve, reject) {
                reject(e)
            });
        })
    }

    /**
     * 领取erc1155 NFT
     * @returns {Promise<any>}
     */
    const receive1155 = async () => {
        const contract = gameContract();

        const gasAmount = await contract.methods.obtainCar().estimateGas({
            from: await getAccount(),
            value: 0
        });

        return contract.methods.obtainCar().send({
            from: await getAccount(),
            value: 0,
            gasLimit: gasAmount
        }).then(data => {
            console.log("receive1155 ====",data)
            return data;
        }).catch(e=>{
            console.log("receive error===",e)
            return new Promise(function (resolve, reject) {
                reject(e)
            });
        })
    }



    /**
     * erc1155 是否已经授权
     * @returns {Promise<boolean>}
     */
    const getTokenNftAllowance = (id) => {
        return new Promise(function (resolve, reject) {
            resolve(false)
        });
    }

    /**
     * erc1155 授权
     * @returns {Promise<boolean>}
     */
    const tokenNftApprove = (id) => {
        return new Promise(function (resolve, reject) {
            resolve({txId: '0xpppppp'})
        });
    }


    /**
     * 质押erc1155 派出设备挖矿
     * @param {number[]} ids
     * @param {number[]} amounts
     * @returns {Promise<ITransaction>}
     */
    const stakeTokenNft = (ids, amounts) => {
        return new Promise(function (resolve, reject) {
            resolve({txId: '0xpppppp'})
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
        return balance / ethToken.decimals;
    }
    // 获取token余额
    const getTokenBalance = async () => {
        const contract = tokenContract();
        return contract.methods.balanceOf(await getAccount()).call().then(data => {
            return data/erc20Token.decimals;
        })
    }
    // 转账115
    const transferERC115 = async (params, callback) => {

    }
    //测试查询nft 游戏数据
    const getGameInfo = () => {
        const contract = gameContract();
        return contract.methods.getGlobalStats(0).call().then(data => {
            return data;
        })
    }

    //测试转账接口
    const superNode = async () => {
        const contract = gameContract();
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

    const calculateGasMargin = (value) => {
        const gas = new BigNumber(value).multipliedBy(new BigNumber(10000).plus(new BigNumber(10000))).dividedBy(new BigNumber(10000))
        return gas;
    }
    var block = {
        currentAccount: account,
        ethToken: ethToken,
        erc20Token:erc20Token,
        getGameServer: getGameServer,
        getMineData: getMineData,
        getUserBase: getUserBase,
        getUserMachine: getUserMachine,
        getUserIncome: getUserIncome,
        getTokenAllowance: getTokenAllowance,
        tokenApprove: tokenApprove,
        stakeToken: stakeToken,
        receive1155:receive1155,
        getTokenNftAllowance: getTokenNftAllowance,
        tokenNftApprove: tokenNftApprove,
        stakeTokenNft: stakeTokenNft,
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
