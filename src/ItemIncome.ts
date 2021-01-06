import Langue from "./Langue";
import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";

export default class ItemIncome extends ui.ItemIncomeUI {
    private itemData:IIncome
    constructor() { super(); this.width=660;this.height=80;}
    
    onEnable(): void {
        this.btn.on(Laya.Event.CLICK,this,this.btnClick)  
        this.btnReceive.on(Laya.Event.CLICK,this,this.btnReceiveClick)
    }

    btnReceiveClick():void{
        LayaBlock.withdrawAward(this.itemData.id).then((d:ITransaction)=>{
            console.log('这个时候回到区块链交易，等交易完成改为已领取 同时变灰不可点击');
            console.log('交易结果：',d)
        })
    }
    btnClick(event):void{
        Laya.stage.event(GameEvent.INCOME_MORE,this.itemData);//发送事件，在devPannel里监听
        event.stopPropagation();//阻止冒泡
    }

    onDisable(): void {
    }
    public setItem(sn:number,itemData:IIncome): void {
        this.itemData=itemData
        this.id_txt.text=itemData.id+''
        this.machineNum_txt.text=itemData.machineNum+''
        this.reward_txt.text=itemData.ethReward+'/'+itemData.tokenReward
        if(itemData.receive){
            this.receive_txt.text=Langue.defaultLangue.nav5_5
            this.btnReceive.skin='gameimg/smallBtn1.png'
        }else{
            this.receive_txt.text=Langue.defaultLangue.nav5_4
            this.btnReceive.skin='gameimg/smallBtn0.png'
        }
    }
}