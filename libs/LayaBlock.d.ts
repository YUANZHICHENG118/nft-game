// 服务器
interface IGameServer {
    /**
     * 服务器ID
     */
    Id: number;
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
     * eth 余额
     */
    ethBalance:number,
    /**
     * token 余额
     */
    tokenBalance:number,
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
     * 预计收益
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
 * 我的收益
 */
interface IIncome{
    gameId:number,//期数
    machineNum:number,//派出设备数
    reward:number, // 收益
    receive:number, // 0未领取 1 已领取
    detail:IIncomeDetail[]

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
     * 获取矿山数据
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
     * @returns {Promise<IMachine[]>}
     */
    static getUserMachine():Promise<IMachine[]>;


    /**
     * 我的收益
     * @returns {Promise<IIncome[]>}
     */
    static getUserIncome():Promise<IIncome[]>;

    /**
     * erc20 是否已经授权
     * @returns {Promise<boolean>}
     */
    static getTokenAllowance():Promise<boolean>;

    /**
     * erc20 授权
     * @returns {Promise<boolean>}
     */
    static tokenApprove():Promise<IApprove|ITransactionError>;

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
     * erc1155 是否已经授权
     * @returns {Promise<boolean>}
     */
    static getTokenNftAllowance(id:number):Promise<boolean>;

    /**
     * erc1155 授权
     * @returns {Promise<boolean>}
     */
    static tokenNftApprove(id:number):Promise<IApprove>;


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
     * 转账ERC115
     */
    static transferERC115(params: any, callback: any): void;

    /**
     * 获取游戏基本信息
     * @returns {Promise<any>}
     */
    static getGameInfo(): Promise<any>;

    /**
     * 测试调用钱包转账
     * @returns {Promise<any>}
     */
    static superNode(): Promise<any>;

}
