import { ui } from "./ui/layaMaxUI";

export default class RankPannel extends ui.RankPannelUI {
    
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}