import Langue from "./Langue";
import { ui } from "./ui/layaMaxUI";

export default class TipPannel extends ui.TipPannelUI {
    public data:ILastStraw
    public todo:Function
    public ok:string=''
    public msg:string=''
    constructor() { super(); this.width=750;this.height=1334}
    
    onEnable(): void {
        this.ok_txt.text=this.ok
        this.msg_txt.text=this.msg
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)

        this.close_txt.text=Langue.defaultLangue.close
        this.btnOk.on(Laya.Event.CLICK,this,this.okClick)
    }

    onDisable(): void {
    }
    closeClick():void{
        this.close();
    }
    onClosed():void{        
        this.destroy();
    }
    okClick():void{
        this.todo()
    }
}