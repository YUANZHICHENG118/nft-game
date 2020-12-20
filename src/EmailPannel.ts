import { ui } from "./ui/layaMaxUI";

export default class EmailPannel extends ui.EmailUI {
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk1.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk2.on(Laya.Event.CLICK,this,this.closeClick)
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}