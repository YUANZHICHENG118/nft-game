// 服务器
interface IGameServer {
    /**
     * 服务器ID
     */
    Id:number;
    /**
     * 服务器名称
     */
    name: string;

    /**
     * 服务器token
     */
    token: string;

}
// 矿山数据
interface IMine{
    /**
     * 游戏id
     */
    id:number,
    /**
     * 总量
     */
    total:number,
    /**
     * 剩余
     */
    surplus:number,
}
/**
 * ETH区块链相关
 */
declare class LayaBlock {

    static currentAccount:string;

    static ethToken:object;


    /**
     * 服务器选区，如果数组长度为1 则直接进入loading 页面，如果是>1 需求选区
     * @returns {Promise<IGameServer[]>}
     */
    static getGameServer():Promise<IGameServer[]>;

    /**
     *
     * @returns {IMine}
     */
    static getMineData():Promise<IMine>;


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

    /**
     * 获取游戏基本信息
     * @returns {Promise<any>}
     */
    static getGameInfo():Promise<any>;

    /**
     * 测试调用钱包转账
     * @returns {Promise<any>}
     */
    static superNode():Promise<any>;



}