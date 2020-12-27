
/**
 * 返回结果接口
 */
interface IResult{
    code:number,
    msg:string,
    data:object
}

// 游戏加载背景描述
interface IGameLoadDec {
    /**
     * 中文
     */
    zh: string;
    /**
     * 英文
     */
    en: string;

    /**
     * 韩语
     */
    kr: string;

}

//昵称
interface INick{
    nick:string,
    address:string
}
//公告
interface INotice{
    id:number,
    title:string,
    time:number,
    content:string
}

//邮件
interface IEmail{
    id:number,
    type:number,// 0普通邮件  1领取邮件（只有领取邮件出现领取按钮）
    title:string,
    time:number,
    content:string,
    del:number,//0 未删除 1 已删除
    read:number //0 未读 1 已读
    receive:number // 0未领取 1 已领取
}

//帮助
interface IHelp extends INotice{
}

//返佣明细
interface ICommission{
    nick:string,
    address:string, // 地址
    amount:number, //数量
    txId?:string, // 哈希
    receive:number // 0未领取 1 已领取
}


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
    symbol: string;

    decimals: number,
    scale: number,
    approveAmount: number, //授权金额
    erc20TokenAddress:string,
    gameAddress:string,
    erc1155TokenAddres:string
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

//首页我的基础数据
interface IUserBase {
    /**
     * 昵称
     */
    nick?:string,
    /**
     * 地址
     */
    address: string,
    /**
     * eth 数量
     */
    ethAmount: number,
    /**
     * token 数量
     */
    tokenAmount: number,
    /**
     * token 名字
     */
    tokenSymbol:string,

    /**
     * 要求链接
     */
    ref:string,

}

//首页我的基础数据
interface IUserMine {
    /**
     * 地址
     */
    address: string,
    /**
     * 预计eth 收益
     */
    ethAmount: number,
    /**
     * 预计token 收益
     */
    tokenAmount: number,
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
interface IMachine {
    //erc1155 id
    id: number,
    //余额
    balance: number,
    //合约地址
    address: string,
    // 类型
    type: number,
    // 颜色
    color: number,
    // 载重
    load: number,
    // 采矿数
    mining: number,
    //等级 1普通 2中级 3高级
    level: number,
    // 图片
    img: string,
    //描述
    remark: string
}

/**
 * 查询数据接口
 */
interface IMachineSearch {
    //余额
    sort?: 'ASC' | 'DESC',
    // 类型
    type?: number[],
    // 颜色
    color?: number[]
}

/**
 * 我的收益
 */
interface IIncome {

    id: number,//期数
    address:string,//地址
    machineNum: number,//派出设备数
    reward: number, // 收益
    tokenReward: number,//token 收益
    ethReward: number,//eth 收益
    digGross:number,//运走量
    lastStraw:boolean,// 是否最后一击
    ranking:number,//前10排名
    receive: boolean, // false未领取 true已领取


}

/**
 * 我的收益详情/派出车辆详情
 */
interface IIncomeDetail {
    //汽车id
    id: number,
    // 载重
    load: number,
    // 采矿数
    mining: number,
    // 图片
    img: string,
    //数量
    amount:number
}

/**
 * 区块链交易返回数据
 */
interface ITransaction {
    transactionHash: string,
    blockHash: string,
    blockNumber: number,
    status: boolean,
    from: string,
    to: string,
    gasUsed: number
}

/**
 * 区块链异常数据
 */
interface ITransactionError {
    code: number,
    message: string
}

/**
 * 质押返回哈希
 */
interface IApprove extends ITransaction {
}

/**
 * 用户质押数据
 */
interface IStake {
    //用户id
    id: number,
    // 质押数量
    investment: number
}

/**
 * 排名数据
 */
interface IRank {
    //期数
    gameId: number,
    //排名
    id: number,
    //用户地址或昵称
    address: string,
    //派出设备数量
    machine: number,
    //运走数量
    load: number,
}

/**
 * 最后一击
 */
interface ILastStraw {
    //期数
    gameId: number,
    //用户地址或昵称
    address: string,
    //挖矿数量
    machine: number,
    //运走数量
    load: number,
    // hash
    txId?: string
}

/**
 * 我的排名
 */
interface IUserRank extends IRank {

}

/**
 * 前N名 和最后一击
 */
interface IRankTop extends IRank {

}

/**
 * 某一期派出明细
 */
interface IPlayDetail {
    //期数
    gameId: number,
    //派出设备
    machineIds: number[]
    //派出设备对应的数量
    machineAmounts: number[]
    //挖矿数量
    machine: number,
    //运走数量
    load: number,
    //交易hash
    txId: string,
}

/**
 * ETH区块链相关
 */
declare class LayaBlock {

    static currentAccount: string;

    static ethToken: object;

    /**
     * 交易连接地址
     */
    static exchangeUrl: string;

    /**
     * eth区块链浏览器地址
     */
    static blockChainUrl: string;

    /**
     * 设置语言
     * @param {string} lan
     */
    static setLanguage(lan:string):void;

    /**
     * 获取当前语言
     * @returns {string}
     */
    static getLanguage():string

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
     * 激活服务
     * @params machineGo 车辆运动
     * @param {IGameServer} game
     */
    static activeGame(game:IGameServer,machineGo:any):void;

    /**
     * 获取矿山数据/游戏数据
     * @returns {IMine}
     */
    static getMineData(): Promise<IMine>;


    /**
     * 获取用户首页挖矿基础数据
     * @returns {Promise<IUserMine>}
     */
    static getUserMine(): Promise<IUserMine>;

    /**
     * 我的设备NFT
     * @param {IMachineSearch} params
     * @returns {Promise<IMachine[]>}
     */
    static getUserMachine(params?: IMachineSearch): Promise<IMachine[]>;



    /**
     * erc20 是否已经授权
     * @returns {Promise<boolean>}
     */
    static getTokenAllowance(): Promise<boolean>;

    /**
     * erc20 授权
     * @returns {Promise<IApprove | ITransactionError>}
     */
    static tokenApprove(): Promise<IApprove | ITransactionError>;

    /**
     * 赎回质押erc20
     * @returns {Promise<IApprove | ITransactionError>}
     */
    static withdrawCapital(): Promise<ITransaction | ITransactionError>;


    /**
     * 质押erc20
     * @param {number} amount 质押数量
     * @returns {Promise<ITransaction>}
     */
    static stakeToken(amount: number): Promise<ITransaction | ITransactionError>;

    /**
     * 领取1155
     * @returns {Promise<ITransaction | ITransactionError>}
     */
    static receive1155(): Promise<ITransaction | ITransactionError>;


    /**
     * 质押erc1155 派出设备挖矿
     * @param {Object} obj {17:5,18:9}
     * @returns {Promise<ITransaction>}
     */
    static stakeTokenNft(obj: Object): Promise<ITransaction>;


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
     * 某一期派出明细
     */
    static getPlayDetail(gameId: number,address:string): Promise<IPlayDetail[]>;


    /**********************导航排名相关功能*********************************/

    /**
     * 我的排名
     * @param {number} gameId
     * @returns {Promise<number>}
     */
    static getUserRank(gameId?: number): Promise<IUserRank>;

    /**
     * 获取当期前10名
     */
    static getRankTop10(): Promise<IRankTop[]>;

    /**
     * 获取当期前50名
     */
    static getRankTop50(): Promise<IRankTop[]>;

    /**
     * 获取全网前50
     */
    static getGameRankTop50(): Promise<IRankTop[]>;

    /**
     * 获取最后一击
     * @returns {Promise<ILastStraw>}
     */
    static getLastStraw(): Promise<ILastStraw>;



  /**********************导航我的相关功能*********************************/
    /**
     * 获取用户基础数据
     * @returns {Promise<IUserBase>}
     */
    static getUserBase(): Promise<IUserBase>;


    /**
     * 我的收益
     * @returns {Promise<IIncome[]>}
     */
    static getUserIncome(): Promise<IIncome[]>;

    /**
     * 我的收益详情
     * @param {number} version 期数
     * @param {string} address 地址
     * @param {txId} address 哈希
     * @returns {Promise<IIncomeDetail[]>}
     */
    static getUserIncomeDetail(version: number, address: string,txId:string): Promise<IIncomeDetail[]>;

    /**
     * 提取收益
     * @param {number} version 期数
     * @returns {Promise<ITransaction | ITransactionError>}
     */
    static withdrawAward(version: number): Promise<ITransaction | ITransactionError>;


    /**
     * 定时刷新设备数据，游戏页面加载完成调用
     */
    static timerNFT(): void;



    /**
     * 加载游戏背景描述
     * @returns {Promise<IGameLoadDec>}
     */
    static getGameLoadDec(): Promise<IGameLoadDec>;

    /**
     * 获取昵称
     * @param {string} address
     * @returns {Promise<INick>}
     */
    static getNick(address:string):Promise<INick>;

    /**
     * 保存昵称
     * @param {INick} nick
     * @returns {Promise<IResult>}
     */
    static saveNick(nick:INick):Promise<IResult>;

    /**
     * 获取公告
     * @returns {Promise<INotice>}
     */
    static getNotice():Promise<INotice>;

    /**
     * 获取邮件
     * @param {string} address
     * @returns {Promise<IEmail[]>}
     */
    static getEmail(address:string):Promise<IEmail[]>;

    /**
     * 获取帮助数据
     * @returns {Promise<IHelp[]>}
     */
    static getHelp():Promise<IHelp[]>

    /**
     * 获取返佣明细
     * @param {string} address
     * @returns {Promise<ICommission[]>}
     */
    static getCommission(address:string):Promise<ICommission[]>


}
