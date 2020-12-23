import { ui } from "./ui/layaMaxUI";

export default class SetPannel extends ui.SetPannelUI {
    
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