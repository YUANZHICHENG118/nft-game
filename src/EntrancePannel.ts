import DataBus from "./DataBus";
import Langue from "./Langue";
import { ui } from "./ui/layaMaxUI";

export default class EntrancePannel extends ui.EntrancePannelUI {
    private gameServerList:IGameServer[]
    private info:string='...'
    private wordPos:number=0
    constructor() { super(); }
    
    onEnable(): void {
        LayaBlock.getGameServer().then((d:IGameServer[])=>{
            console.log('gameServer:',d);
            this.gameServerList=d;
            var labels:Array<string>=[]
            for(let i in d){
                labels.push(d[i].name)
            }
            this.serverCombo.labels=labels.join()
            if(labels.length==1){
                this.serverCombo.selectedIndex=0;
                //this.enterGame();
            }
        })
        //加载游戏描述
        LayaBlock.getGameLoadDec().then((d:IGameLoadDec)=>{
            if(d.dec==undefined){
                d.dec='......'
            }
            this.info=d.dec
            let lang:string=LayaBlock.getLanguage()
            Langue.setLanguage(lang)
            console.log('game 描述：',d)
            Laya.timer.frameLoop(5,this,this.printWord)
            this.onLanguage()
        })
        
        this.btnEnter.on(Laya.Event.CLICK,this,this.enterGame)        
    }

    onLanguage=()=>{
        //切换语言
        let arr=['start']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
    }

    printWord():void{
        this.wordPos++
        this.info_txt.text=this.info.substring(0,this.wordPos)
        if(this.wordPos==this.info.length){
            Laya.timer.clearAll(this)
        }
    }

    onDisable(): void {
    }

    enterGame():void{
        Laya.timer.clearAll(this)
        DataBus.gameServer=this.gameServerList[this.serverCombo.selectedIndex]
        Laya.Scene.closeAll()
        Laya.Scene.open('Home.scene');
    }
}