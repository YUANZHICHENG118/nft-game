import { ui } from "./ui/layaMaxUI";

export default class NoticePannel extends ui.NoticeUI {    
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk.on(Laya.Event.CLICK,this,this.closeClick)
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}