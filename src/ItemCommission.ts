import { ui } from "./ui/layaMaxUI";

export default class ItemCommission extends ui.ItemCommissionUI {
    
    constructor() { super(); this.width=660;this.height=80;}
    
    onEnable(): void {
    }

    onDisable(): void {
    }
    public setItem(sn:number,itemData:any): void {
        this.nick_txt.text=itemData.nick
        this.address_txt.text=itemData.address
        this.amount_txt.text=itemData.amount
        if(itemData.receive){
            this.receive_txt.text='已领取'
            this.btnReceive.skin='gameimg/smallBtn1.png'
        }else{
            this.receive_txt.text='领取'
            this.btnReceive.skin='gameimg/smallBtn0.png'
        }
    }
}