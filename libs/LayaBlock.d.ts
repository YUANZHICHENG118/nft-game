/**
 * ETH区块链相关
 */
declare class LayaBlock {

    static currentAccount:string;

    static ethToken:object;

    /*
        初始化web3
    */
    static initWeb3(): void;


    /**
     * 获取当前地址
     */
    static getAccount():Promise<string>;

    /**
     * 获取eth余额
     */
    static getEthBalance(): Promise<number>;

    /**
     * 获取token余额
     */
    static getTokenBalance(): Promise<number>;

    /**
     * 转账ERC115
     */
    static transferERC115(params:any,callback:any): void;

}