// 服务器
interface IGameServer {
    /**
     * 服务器ID
     */
    id: number;
    /**
     * 服务器名称
     */
    name: string;

    /**
     * 服务器token
     */
    token: string;

}

// 矿山数据/游戏数据
interface IMine {
    /**
     * 游戏id
     */
    id: number,
    /**
     * 总量
     */
    total: number,
    /**
     * 剩余
     */
    surplus: number,
}

//我的基础数据
interface IUserBase {
    /**
     * 地址
     */
    address:string,
    /**
     * 预计eth 收益
     */
    ethAmount:number,
    /**
     * 预计token 收益
     */
    tokenAmount:number,
    /**
     * 派出数量
     */
    assign: number,
    /**
     * 挖矿数量
     */
    amount: number,
    /**
     * 排行
     */
    rank: number,
    /**
     * 占比
     */
    rate: number,
    /**
     * 预计收益计算为美金
     */
    reward: number
}

/**
 * 我的设备数据 NFT
 * 类型type 1:翻斗车 2 挖掘机 3 采矿车
 * 颜色 color 1:白色 2:绿 3 蓝 4 紫 5粉 6 橙色
 */
interface IMachine{
    //erc1155 id
    id:number,
    //余额
    balance:number,
    //合约地址
    address:string,
    // 类型
    type:number,
    // 颜色
    color:number,
    // 载重
    load:number,
    // 采矿数
    mining:number,
    // 图片
    img:string,
    //描述
    remark:string
}

/**
 * 查询数据接口
 */
interface IMachineSearch{
    //余额
    sort?:'ASC'|'DESC',
    // 类型
    type?:number,
    // 颜色
    color?:number[]
}

/**
 * 我的收益
 */
interface IIncome{
    id:number,//期数
    machineNum:number,//派出设备数
    reward:number, // 收益
    tokenReward:number,//token 收益
    ethReward:number,//eth 收益
    receive:boolean, // false未领取 true已领取


}
/**
 * 我的收益详情
 */
interface IIncomeDetail{
    id:number,
    // 载重
    load:number,
    // 采矿数
    mining:number,
    // 图片
    img:string,
    reward:number, // 收益
    tokenReward:number,//token 收益
    ethReward:number,//eth 收益
    txId:string
}

/**
 * 区块链交易返回数据
 */
interface ITransaction{
    transactionHash:string,
    blockHash:string,
    blockNumber:number,
    status:boolean,
    from:string,
    to:string,
    gasUsed:number
}

/**
 * 区块链异常数据
 */
interface ITransactionError{
    code:number,
    message:string
}

/**
 * 质押返回哈希
 */
interface IApprove extends  ITransaction{
}

/**
 * 用户质押数据
 */
interface IStake{
    //用户id
    id:number,
    // 质押数量
    investment:number
}

/**
 * 排名数据
 */
interface IRank{
    //排名
    id:number,
    //用户地址
    address:string,
    //派出设备数量
    machine:number,
    //运走数量
    load:number,
}

/**
 * 前10名 和最后一击
 */
interface IRankTop extends IRank{

}

/**
 * ETH区块链相关
 */
declare class LayaBlock {

    static currentAccount: string;

    static ethToken: object;


    /**
     * 初始化web3
     */
    static initWeb3(): void;

    /**
     * 服务器选区，如果数组长度为1 则直接进入loading 页面，如果是>1 需求选区
     * @returns {Promise<IGameServer[]>}
     */
    static getGameServer(): Promise<IGameServer[]>;

    /**
     * 获取矿山数据/游戏数据
     * @returns {IMine}
     */
    static getMineData(): Promise<IMine>;


    /**
     * 获取用户基础数据
     * @returns {Promise<IUserBase>}
     */
    static getUserBase(): Promise<IUserBase>;

    /**
     * 我的设备NFT
     * @param {IMachineSearch} params
     * @returns {Promise<IMachine[]>}
     */
    static getUserMachine(params?:IMachineSearch):Promise<IMachine[]>;


    /**
     * 我的收益
     * @returns {Promise<IIncome[]>}
     */
    static getUserIncome():Promise<IIncome[]>;

    /**
     * 我的收益详情
     * @param {number} version 期数
     * @param {string} address 地址
     * @returns {Promise<IIncomeDetail[]>}
     */
    static getUserIncomeDetail(version:number,address:string):Promise<IIncomeDetail[]>;

    /**
     * erc20 是否已经授权
     * @returns {Promise<boolean>}
     */
    static getTokenAllowance():Promise<boolean>;

    /**
     * erc20 授权
     * @returns {Promise<IApprove | ITransactionError>}
     */
    static tokenApprove():Promise<IApprove|ITransactionError>;

    /**
     * 赎回质押erc20
     * @returns {Promise<IApprove | ITransactionError>}
     */
    static withdrawCapital():Promise<ITransaction|ITransactionError>;

    /**
     * 提取收益
     * @param {number} version 期数
     * @returns {Promise<ITransaction | ITransactionError>}
     */
    static withdrawAward(version:number):Promise<ITransaction|ITransactionError>;


    /**
     * 质押erc20
     * @param {number} amount 质押数量
     * @returns {Promise<ITransaction>}
     */
    static stakeToken(amount:number):Promise<ITransaction|ITransactionError>;

    /**
     * 领取1155
     * @returns {Promise<ITransaction | ITransactionError>}
     */
    static receive1155():Promise<ITransaction|ITransactionError>;


    /**
     * 质押erc1155 派出设备挖矿
     * @param {number[]} id
     * @param {number[]} amount
     * @returns {Promise<ITransaction>}
     */
    static stakeTokenNft(ids:number[],amounts:number[]):Promise<ITransaction>;


    /**
     * 获取当前地址
     */
    static getAccount(): Promise<string>;

    /**
     * 获取eth余额
     */
    static getEthBalance(): Promise<number>;

    /**
     * 获取token余额
     */
    static getTokenBalance(): Promise<number>;

    /**
     * 获取用户质押数据
     */
    static getUserStake(): Promise<IStake>;

    /**
     * 获取当期前10名和最后一击
     */
    static getRankTop(): Promise<IRankTop[]>;

    /**
     * 定时刷新设备数据，游戏页面加载完成调用
     */
    static timerNFT():void;

}
