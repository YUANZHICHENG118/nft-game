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


    //服务器选区
    const gameServer=[{id:1,name:'ABC矿池',token:"ABC"}];
    //游戏合约地址
    const gameAddress = "0xf44b736101dcd2f9cce8d1885947c24c996c7bb5";
    const gameABI = [{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"address","name":"erc1155Address","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"ERC1155","outputs":[{"internalType":"contract IERC1155","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERC1155BASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERC20Token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"dig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getDigGross","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"version","type":"uint8"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getPersonalStats","outputs":[{"internalType":"uint256[10]","name":"stats","type":"uint256[10]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getRandom","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"version","type":"uint256"}],"name":"getSorts","outputs":[{"internalType":"address[10]","name":"","type":"address[10]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_version","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getVersionAward","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"obtainCar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pairSwap","outputs":[{"internalType":"contract PairSwap","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"sn","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"setIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"stakeAmount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"versionTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawCapital","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    // erc20Token
    const erc20TokenAddress = "";
    const erc20TokenABI = [];
    // erc
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
        ethereum.request({ method: 'eth_requestAccounts' })
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
    const getGameServer=()=>{
        return new Promise(function(resolve, reject){
            resolve(gameServer)
        });
    }

    /**
     * 获取矿山数据
     * @returns {*[]}
     */
    const getMineData=()=>{
        return new Promise(function(resolve, reject){
            resolve({id:1,total:20000,surplus:1000})
        });
    }
    /**
     * 获取用户基础数据
     * @returns {Promise<any>}
     */
    const getUserBase=()=>{
        return new Promise(function(resolve, reject){
            resolve({ethBalance:10,tokenBalance:100,amount: 100, rank: 10, rate: 0.2, reward: 100})
        });
    }

    /**
     * 获取用户设备数据
     * @returns {Promise<any>}
     */
    const getUserMachine=()=>{
        const data=[{
            balance:100,
            type:1,
            color:1,
            load:10,
            mining:1,
            img:'https://nft-files.s3.us-east-2.amazonaws.com/1/1.png',
            remark:''
        },{
            balance:200,
            type:2,
            color:2,
            load:10,
            mining:1,
            img:'https://nft-files.s3.us-east-2.amazonaws.com/2/2.png',
            remark:''
        }]
        return new Promise(function(resolve, reject){
            resolve(data)
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
        getGameServer:getGameServer,
        getMineData:getMineData,
        getUserBase:getUserBase,
        getUserMachine:getUserMachine,
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
