import { ui } from "./ui/layaMaxUI";

export default class EntrancePannel extends ui.EntrancePannelUI {
    
    constructor() { super(); }
    
    onEnable(): void {
        this.btnEnter.on(Laya.Event.CLICK,this,this.enterGame)
    }

    onDisable(): void {
    }

    enterGame():void{
        console.log('xxx99')
        Laya.Scene.closeAll()
        Laya.Scene.open('Home.scene');

    }

}