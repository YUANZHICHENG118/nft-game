(function (global, factory) {
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
    const contractAddress = "";
    const tokenAddress = "";
    const contractABI = [];
    const tokenABI = [];
    const ethToken = {
        address: '',
        symbol: 'ETH',
        decimals: Math.pow(10, 18),
    }

    // 初始化web3
    const initWeb3 = () => {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            //this.connect();
        } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
            window.web3 = new Web3(web3.currentProvider);
        }
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
    const handleAccountsChanged = function (accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log("Please connect to MetaMask.");
            return "";
        } else {
            return accounts[0];
        }
    }
    var block = {
        currentAccount: account,
        ethToken: ethToken,
        initWeb3: initWeb3,
        getAccount: getAccount,
        getEthBalance: getEthBalance,
        getTokenBalance: getTokenBalance,
        transferERC115: transferERC115

    }
    if (!noGlobal) {
        window.LayaBlock = block;
    }
    return LayaBlock;
})
