import { ui } from "./ui/layaMaxUI";

export default class ItemIncome extends ui.ItemIncomeUI {
    
    constructor() { super(); this.width=660;this.height=80;}
    
    onEnable(): void {
    }

    onDisable(): void {
    }
    public setItem(sn:number,itemData:any): void {
        this.id_txt.text=itemData.id
        this.machineNum_txt.text=itemData.machineNum
        this.reward_txt.text=itemData.ethReward+'/'+itemData.tokenReward
        if(itemData.receive){
            this.receive_txt.text='已领取'
            this.btnReceive.skin='gameimg/smallBtn1.png'
        }else{
            this.receive_txt.text='领取'
            this.btnReceive.skin='gameimg/smallBtn0.png'
        }
    }
}