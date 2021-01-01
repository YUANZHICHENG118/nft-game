import DataBus from "./DataBus";
import { ui } from "./ui/layaMaxUI";

export default class EntrancePannel extends ui.EntrancePannelUI {
    private gameServerList:IGameServer[]
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
                this.enterGame();
            }
        })
        this.btnEnter.on(Laya.Event.CLICK,this,this.enterGame)
    }

    onDisable(): void {
    }

    enterGame():void{
        console.log('★==========',this.gameServerList[this.serverCombo.selectedIndex])
        DataBus.gameServer=this.gameServerList[this.serverCombo.selectedIndex]
        Laya.Scene.closeAll()
        Laya.Scene.open('Home.scene');
    }
}