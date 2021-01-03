export default class GameEvent extends Laya.Script {
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"flag1"}*/
    public static FLAG1: string = "flag1";
    public static CLOSE_PANNEL:string='closePannel';//关闭窗口
    public static LANGUAGE_CHANGE:string='languageChange'  //语言切换
    public static DETAILE:string='detaile'  //详细
    constructor() { super(); }
}