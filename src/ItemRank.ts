import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";

export default class ItemRank extends ui.ItemRankUI{
    private sn:number
    private itemData:any
    constructor() { super(); this.width=750;this.height=80;}
    
    onEnable(): void {
        this.btn.on(Laya.Event.CLICK,this,this.btnClick)     
    }

    onDisable(): void {
    }
    public setItem(sn:number,itemData:any): void {
        this.sn=sn
        this.itemData=itemData
        this.load_txt.text=itemData.load;
        this.address_txt.text=itemData.addressShort;
        if(sn==-1){
            this.snImg.visible=false;
            this.sn_txt.visible=true;
            this.bg.skin='gameimg/rankbg1.png'
        }else if(sn<=2){
            this.snImg.visible=true;
            this.sn_txt.visible=false
            this.snImg.skin='gameimg/sn'+(sn+1)+'.png'
            this.bg.skin='gameimg/rankbg1.png'
        }else{
            this.snImg.visible=false;
            this.sn_txt.visible=true;
            this.sn_txt.text=sn+1+''
            this.bg.skin='gameimg/rankbg0.png'
        }
    }

    btnClick(event):void{
        Laya.stage.event(GameEvent.RANK_MORE,this.itemData);//发送事件，在devPannel里监听
        event.stopPropagation();//阻止冒泡
    }
}