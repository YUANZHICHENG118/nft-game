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
/**
 * 游戏相关http 接口
 */
declare class NftApi {
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
}