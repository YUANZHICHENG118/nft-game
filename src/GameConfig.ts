/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import DevPannel from "./DevPannel"
import EntrancePannel from "./EntrancePannel"
import Home from "./Home"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=750;
    static height:number=1333;
    static scaleMode:string="showall";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="center";
    static startScene:any="EntrancePannel.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("DevPannel.ts",DevPannel);
        reg("EntrancePannel.ts",EntrancePannel);
        reg("Home.ts",Home);
    }
}
GameConfig.init();