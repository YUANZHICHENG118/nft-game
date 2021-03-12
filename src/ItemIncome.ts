import Langue from "./Langue";
import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";
import DataBus from "./DataBus";

export default class ItemIncome extends ui.ItemIncomeUI {
    private itemData:IIncome
    private dataBus:DataBus = DataBus.getDataBus();

    constructor() { super(); this.width=660;this.height=80;}

    onEnable(): void {
        this.btn.on(Laya.Event.CLICK,this,this.btnClick)
        this.btnReceive.on(Laya.Event.CLICK,this,this.btnReceiveClick)
    }

    btnReceiveClick(event):void{
        if(this.itemData.status==false){
            return
        }

        this.btnReceive.disabled=true
        LayaBlock.withdrawAward(this.itemData.gameId).then((d:ITransaction)=>{
            this.dataBus.showToast("SUCCESS")
            console.log('交易结果：',d)
        })
        event.stopPropagation();//阻止冒泡
    }
    btnClick(event):void{
        Laya.stage.event(GameEvent.INCOME_MORE,this.itemData);//发送事件，在devPannel里监听
        event.stopPropagation();//阻止冒泡
    }

    onDisable(): void {
    }
    public setItem(sn:number,itemData:IIncome): void {
        this.itemData=itemData
        this.id_txt.text=itemData.gameId+''
        this.machineNum_txt.text=itemData.machineNum+''
        this.reward_txt.text=itemData.ethReward+''
        //this.reward_txt.text=itemData.ethReward+'/'+itemData.tokenReward
        this.btnReceive.disabled=!itemData.status
        if(Number(itemData.ethReward)+Number(itemData.tokenReward)==0){
            itemData.receive=false
        }
        if(itemData.receive){
            this.receive_txt.text=Langue.defaultLangue.nav5_5
            this.btnReceive.skin='gameimg/smallBtn1.png'
        }else{
            this.receive_txt.text=Langue.defaultLangue.nav5_4
            this.btnReceive.skin='gameimg/smallBtn0.png'
        }
    }
}
