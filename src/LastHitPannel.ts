import Langue from "./Langue";
import { ui } from "./ui/layaMaxUI";

export default class LastHitPannel extends ui.LastHitPannelUI {
    public data:ILastStraw
    constructor() { super(); this.width=750;this.height=1334}
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.msg_txt.text=this.data.gameId+Langue.defaultLangue.lastHit
        this.verify_txt.text=Langue.defaultLangue.verify
        this.close_txt.text=Langue.defaultLangue.close
        this.btnVerify.on(Laya.Event.CLICK,this,this.gotoVerify)
    }

    onDisable(): void {
    }
    closeClick():void{
        this.close();
    }
    onClosed():void{        
        this.destroy();
    }
    gotoVerify():void{
        Laya.Browser.window.location.href = LayaBlock.blockChainUrl+'/tx/'+this.data.txId
    }
}