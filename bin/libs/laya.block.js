(function (global, factory, BigNumber, Laya) {
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

    const machine=[
        {
        "type": 3,
        "color": 1,
        "load": 0,
        "mining": 1,
        "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/1.png"
    }, {
        "type": 3,
        "color": 2,
        "load": 0,
        "mining": 2,
        "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/2.png"
    }, {
        "type": 3,
        "color": 3,
        "load": 0,
        "mining": 5,
        "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/3.png"
    }, {
        "type": 3,
        "color": 4,
        "load": 0,
        "mining": 10,
        "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/4.png"
    }, {
        "type": 3,
        "color": 5,
        "load": 0,
        "mining": 30,
        "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/5.png"
    }, {
        "type": 3,
        "color": 6,
        "load": 0,
        "mining": 100,
        "img": "https://nft-files.s3.us-east-2.amazonaws.com/3/6.png"
    },

        {
            "type": 1,
            "color": 1,
            "load": 10,
            "mining": 1,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/1.png"
        },

        {
            "type": 1,
            "color": 2,
            "load": 20,
            "mining": 2,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/2.png"
        },

        {
            "type": 1,
            "color": 3,
            "load": 50,
            "mining": 5,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/3.png"
        },

        {
            "type": 1,
            "color": 4,
            "load": 100,
            "mining": 10,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/4.png"
        },

        {
            "type": 1,
            "color": 5,
            "load": 300,
            "mining": 30,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/5.png"
        },

        {
            "type": 1,
            "color": 6,
            "load": 1000,
            "mining": 100,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/1/6.png"
        }, {
            "type": 2,
            "color": 1,
            "load": 1,
            "mining": 10,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/1.png"
        },

        {
            "type": 2,
            "color": 2,
            "load": 2,
            "mining": 20,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/2.png"
        },

        {
            "type": 2,
            "color": 3,
            "load": 5,
            "mining": 50,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/3.png"
        },

        {
            "type": 2,
            "color": 4,
            "load": 10,
            "mining": 100,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/4.png"
        },

        {
            "type": 2,
            "color": 5,
            "load": 30,
            "mining": 300,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/5.png"
        },

        {
            "type": 2,
            "color": 6,
            "load": 100,
            "mining": 1000,
            "img": "https://nft-files.s3.us-east-2.amazonaws.com/2/6.png"
        }

    ]

    //服务器选区
    const gameServer = [{id: 1, name: 'Crypto Mine矿池', token: "CM"}];
    //游戏合约地址
    const gameAddress = "0xbe093cafa572635a28fa2c9cea051c6a2dd36fa5";
    const gameABI = [
        {"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"address","name":"erc1155Address","type":"address"},{"internalType":"address payable","name":"_proAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"ERC1155","outputs":[{"internalType":"contract IERC1155","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERC20Token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LAST_STRAW_PERCNET","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ONE_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ORE_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"OUT_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"RANKING_AWARD_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"START_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"avi","outputs":[{"internalType":"uint256[18]","name":"_carIds","type":"uint256[18]"},{"internalType":"uint256","name":"len","type":"uint256"},{"internalType":"uint256","name":"erc1155Amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"carIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cars","outputs":[{"internalType":"uint256","name":"fertility","type":"uint256"},{"internalType":"uint256","name":"carry","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"cat","outputs":[{"internalType":"uint256[18]","name":"_carIds","type":"uint256[18]"},{"internalType":"uint256","name":"len","type":"uint256"},{"internalType":"uint256","name":"erc1155Amount","type":"uint256"},{"internalType":"uint256[]","name":"carNum","type":"uint256[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"carId","type":"uint256"},{"internalType":"uint256","name":"len","type":"uint256"}],"name":"findCarId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"_version","type":"uint256"}],"name":"findRank","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getDigGross","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"_version","type":"uint8"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getPersonalStats","outputs":[{"internalType":"uint256[6]","name":"stats","type":"uint256[6]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getRecord","outputs":[{"internalType":"bool","name":"drawStatus","type":"bool"},{"internalType":"uint256","name":"digGross","type":"uint256"},{"internalType":"bool","name":"lastStraw","type":"bool"},{"internalType":"uint8","name":"ranking","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"}],"name":"getSorts","outputs":[{"internalType":"address[10]","name":"","type":"address[10]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getVersionAward","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"history","outputs":[{"internalType":"uint256","name":"ethAmount","type":"uint256"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"complete","type":"uint256"},{"internalType":"uint256","name":"actual","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"indexs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"obtainCar","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"obtainRecord","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_values","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pairSwap","outputs":[{"internalType":"contract PairSwap","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"records","outputs":[{"internalType":"bool","name":"drawStatus","type":"bool"},{"internalType":"uint256","name":"digGross","type":"uint256"},{"internalType":"bool","name":"lastStraw","type":"bool"},{"internalType":"uint8","name":"ranking","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"sn","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"fertility","type":"uint256"},{"internalType":"uint256","name":"carry","type":"uint256"}],"name":"setId","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256[]","name":"sns","type":"uint256[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"fertilities","type":"uint256[]"},{"internalType":"uint256[]","name":"carries","type":"uint256[]"}],"name":"setIds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"sorts","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"stakeAmount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"userCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"investment","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"}],"name":"withdrawAward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawCapital","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];


    // erc20Token
    const erc20TokenAddress = "0x1Ad74A1180EF9f902ac2d6A7602476f6a7FD46Fe";
    const erc20TokenABI = [
        {"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"minter_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

    //erc115Token
    const erc1155TokenAddres = "0x71b1a3656908f45204Fe1c902D1A0836DBeC2Bfb";
    const erc1155TokenABI = [
        {"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_proxyRegistryAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"bool","name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_uri","type":"string"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"URI","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address[]","name":"_owners","type":"address[]"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_quantities","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"batchMint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_initialOwner","type":"address"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"create","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creators","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"isOperator","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_newBaseMetadataURI","type":"string"}],"name":"setBaseMetadataURI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"setCreator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]


    const ethToken = {
        address: '',
        name: 'ETH',
        symbol: 'ETH',
        decimals: Math.pow(10, 18),
        scale:4 //保留小数位
    }
    // erc20 token
    const erc20Token = {
        address: erc20TokenAddress,
        name: 'Crypto Mine',
        symbol: 'CM',
        decimals: Math.pow(10, 18),
        scale:2,
        approveAmount: 100000 //授权金额
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
     * 获取矿山数据/ 游戏数据
     * @returns {*[]}
     */
    const getMineData = async () => {
        const version= await  getGameVersion();
        const total=await getTotalMin()
        const history=await getGameHistory(version);
        const surplus=parseInt(total)-parseFloat(history["complete"])
        return new Promise(function (resolve, reject) {
            resolve({id: parseInt(version)+1, total: parseInt(total), surplus: surplus})
        });
    }
    /**
     * 获取用户基础数据
     * @returns {Promise<any>}
     */
    const getUserBase = async () => {
        const version=await getGameVersion()
        const address=await getAccount()
        const history=await getGameHistory(version);
        const complete=parseFloat(history["complete"])

        const contract = gameContract();
        const userGlobal = await contract.methods.getPersonalStats(version,address).call();
        const ethAmount=(userGlobal[2]/ethToken.decimals).toFixed(ethToken.scale)
        const tokenAmount=(userGlobal[3]/ethToken.decimals).toFixed(erc20Token.scale)
        const assign=userGlobal[0]
        const amount=parseFloat(userGlobal[1])
        const rank=11
        const rate=(amount/(complete||1)).toFixed(2)
        const reward=100

        const data = {
            address:address ,
            ethAmount: ethAmount,
            tokenAmount: tokenAmount,
            assign:assign,
            amount: amount,
            rank: rank,
            rate: rate,
            reward: reward
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

        let data = [];
        const contract = token1155Contract();
        const address=await getAccount();
        let _address=[];
        let ids=[];
        for (let i = 1; i <= 18; i++) {
            ids.push(i);
            _address.push(address)
        }
        let balanceArr = await contract.methods.balanceOfBatch(_address, ids).call()

        balanceArr.map((item,index)=>{
            let machine = {};

            let i=index+1;

            machine['id'] = i;
            machine['balance'] = parseInt(item);

            let newObj = {};
            Object.assign(newObj, machine,getMachineAttribute(i) )

            data.push(newObj);

        })

        return new Promise(function (resolve, reject) {
            resolve(data)
        });
    }

    /**
     * 获取设备属性 By 设备id
     * @param id
     * @returns {*}
     */
    const getMachineAttribute=(id)=>{

       return machine[id-1]
    }

    /**
     * 获取用户收益
     * @returns {Promise<any>}
     */
    const getUserIncome = async () => {
        const address = await  getAccount()
        const version = await  getGameVersion()
        const contract = gameContract();
        const incomes=[];

        for(let i=0;i<=version;i++){
            let income={id:i+1}
            const data = await contract.methods.getVersionAward(version,address).call();

            //eth 收益
            let ethReward=parseFloat(data[0]/ethToken.decimals).toFixed(ethToken.scale)
            //token 收益
            let tokenReward=parseFloat(data[1]/erc20Token.decimals).toFixed(erc20Token.scale)
            //派出设备数
            let machineNum=parseInt(data[2])
            // true false
            let receive=data[3]
                income["ethReward"]=ethReward;
            income["tokenReward"]=tokenReward;
            income["machineNum"]=machineNum;
            income["receive"]=receive;

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
     * @returns {Promise<void>}
     */
    const getUserIncomeDetail=async(version,address)=>{


        const data = [{
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
        return contract.methods.allowance(await getAccount(), gameAddress).call().then(data => {
            console.log("getTokenAllowance===", data)
            return data > 0;
        })
    }

    /**
     * erc20 授权
     * @returns {Promise<boolean>}
     */
    const tokenApprove = async () => {
        const contract = tokenContract();
        let amount = new BigNumber(erc20Token.approveAmount * erc20Token.decimals);
        let _amount = '0x' + amount.toString(16)
        const gasAmount = await contract.methods.approve(gameAddress, _amount).estimateGas({
            from: await getAccount(),
            value: 0
        });

        return contract.methods.approve(gameAddress, _amount).send({
            from: await getAccount(),
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
    const stakeToken = async (value) => {
        const contract = gameContract();
        let amount = new BigNumber(value * erc20Token.decimals);
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
    const stakeTokenNft = async (ids, amounts) => {

        const contract = token1155Contract();
        const data='0x00'

        const gasAmount = await contract.methods.safeBatchTransferFrom(await getAccount(),gameAddress,ids, amounts,data).estimateGas({
            from: await getAccount(),
            to: gameAddress,
            value: 0,
        });
        return contract.methods.safeBatchTransferFrom(await getAccount(),gameAddress,ids, amounts,data).send({
            from: await getAccount(),
            to: gameAddress,
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


    // 获取当前账号
    const getAccount = async () => {
        const accounts = await web3.eth.getAccounts();
        account = accounts?.[0] || "0x000000000"
        return account
    }
    // 获取eth余额
    const getEthBalance = async () => {
        const balance = await web3.eth.getBalance(account || await getAccount());
        return parseFloat(balance / ethToken.decimals).toFixed(ethToken.scale);
    }
    // 获取token余额
    const getTokenBalance = async () => {
        const contract = tokenContract();
        return contract.methods.balanceOf(await getAccount()).call().then(data => {
            return parseFloat(data / erc20Token.decimals).toFixed(erc20Token.scale);
        })
    }

    // 获取游戏期数
    const getGameVersion=async ()=>{
        const contract = gameContract();
        const version = await contract.methods.version().call();
        return parseInt(version);
    }

    // 获取矿山总量
    const getTotalMin=async ()=>{
        const contract = gameContract();
        const amount = await contract.methods.ORE_AMOUNT().call();
        return amount;
    }

    /**
     * 获取某期 eth分红数量 token分红数量 已挖矿数量 运走数量
     * @param v
     * @returns {Promise<void>}
     */
    const getGameHistory=async (v)=>{
        const contract = gameContract();
        const data = await contract.methods.history(v).call();
        return data;
    }

    /**
     * 提取收益
     * @param v
     */
    const withdrawAward= async (v)=>{

        const contract = gameContract();

        const gasAmount = await contract.methods.withdrawAward(v-1).estimateGas({
            value: 0,
        });
        return contract.methods.withdrawCapital(v-1).send({
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
    const withdrawCapital= async ()=>{

        const contract = gameContract();

        const gasAmount = await contract.methods.withdrawCapital().estimateGas({
            from: await getAccount(),
            value: 0,
        });
        return contract.methods.withdrawCapital().send({
            from: await getAccount(),
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
    const getUserStake=async ()=>{
        const contract = gameContract();
        const data = await contract.methods.users(await getAccount()).call();
        return new Promise(function (resolve, reject) {
            resolve({id:data['id'],investment:parseFloat(data['investment']/erc20Token.decimals).toFixed(erc20Token.scale)})
        });

    }

    /**
     * 获取前10名和最后一击
     */
    const getRankTop=async ()=>{
        const contract = gameContract();
        const version= await getGameVersion();
        const sorts = await contract.methods.getSorts(version).call();
        let results = await Promise.all(sorts.map(async (item,index)=>{
           // if(item==="0x0000000000000000000000000000000000000000") return;
            const userGlobal = await contract.methods.getPersonalStats(version,item).call();
            let machine=parseFloat("20")
            let load=parseFloat(userGlobal[1])
            let rank={id:index+1,address:item,machine:machine,load:load};
            return rank
        }))
        return new Promise(function (resolve, reject) {
            resolve(results)
        });
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
        erc20Token: erc20Token,
        getGameServer: getGameServer,
        getMineData: getMineData,
        getUserBase: getUserBase,
        getUserMachine: getUserMachine,
        getUserIncome: getUserIncome,
        getUserIncomeDetail:getUserIncomeDetail,
        getTokenAllowance: getTokenAllowance,
        tokenApprove: tokenApprove,
        stakeToken: stakeToken,
        receive1155: receive1155,
        getTokenNftAllowance: getTokenNftAllowance,
        tokenNftApprove: tokenNftApprove,
        stakeTokenNft: stakeTokenNft,
        withdrawCapital:withdrawCapital,
        withdrawAward:withdrawAward,
        initWeb3: initWeb3,
        getAccount: getAccount,
        getEthBalance: getEthBalance,
        getTokenBalance: getTokenBalance,
        getUserStake:getUserStake,
        getGameHistory:getGameHistory,
        getRankTop:getRankTop

    }


    if (!noGlobal) {
        window.LayaBlock = block;
    }
    return LayaBlock;
})
