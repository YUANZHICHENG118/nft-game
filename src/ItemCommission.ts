import GameEvent from "./GameEvent";
import Langue from "./Langue";
import { ui } from "./ui/layaMaxUI";

export default class ItemCommission extends ui.ItemCommissionUI {
    private itemData:ICommission
    constructor() { super(); this.width=660;this.height=80;}
    
    onEnable(): void {
        this.btn.visible=false;
        this.btn.on(Laya.Event.CLICK,this,this.btnClick)   
    }

    onDisable(): void {
    }
    public setItem(sn:number,itemData:ICommission): void {
        this.itemData=itemData
        this.nick_txt.text=itemData.nick
        this.address_txt.text=itemData.address
        this.amount_txt.text=itemData.amount+''
        if(itemData.receive){
            this.receive_txt.text=Langue.defaultLangue.nav5_6
            this.btnReceive.skin='gameimg/smallBtn1.png'
        }else{
            this.receive_txt.text=Langue.defaultLangue.nav5_7
            this.btnReceive.skin='gameimg/smallBtn0.png'
        }
    }

    btnClick(event):void{
        Laya.stage.event(GameEvent.COMMISSION_MORE,this.itemData);//发送事件，在devPannel里监听
        event.stopPropagation();//阻止冒泡
    }
}