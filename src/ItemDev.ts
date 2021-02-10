import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";

export default class ItemDev extends ui.ItemDevUI {
    //public static WID: number = 147;
    //public static HEI: number = 134;
    public static WID: number = 147;
    public static HEI: number = 121;
    private static machinaWid:Array<Array<number>>=[[230,123],[293,209],[312,133]]
    private sn:number
    constructor() { super(); 
        this.size(ItemDev.WID, ItemDev.HEI);
    }
    
    onEnable(): void {
        this.del_btn.visible=false
        this.more_btn.on(Laya.Event.CLICK,this,this.moreClick)        
        this.del_btn.on(Laya.Event.CLICK,this,this.delClick)        
    }

    moreClick(event):void{
        Laya.stage.event(GameEvent.DETAILE,this.sn);//发送事件，在devPannel里监听
        event.stopPropagation();//阻止冒泡
    }
    delClick(event):void{
        Laya.stage.event(GameEvent.DEL,this.sn);//发送事件，在devPannel里监听
        event.stopPropagation();//阻止冒泡
    }

    onDisable(): void {
    }

    public setItem(sn:number,itemData:any,flag:number=1): void {
        this.sn=sn
        var __scale=(ItemDev.WID-40)/ItemDev.machinaWid[itemData.type-1][0]
        var __y=(ItemDev.HEI- ItemDev.machinaWid[itemData.type-1][1]*__scale)-10
        
        this.img.scaleX=this.img.scaleY=__scale
        this.img.y=__y;
        this.img.x=20;
        this.img.skin ='machine/m'+itemData.type +'_'+itemData.color+'.png'; //"machine/m1_1.png"
        this.bg.skin='gameimg/border'+itemData.color+'.png'
        this.balance_txt.text='×'+itemData.balance

        if(flag==1){
            if(itemData.selected){
                //this.bg.skin='gameimg/bg2.png'
                this.more_btn.visible=true
            }else{
                //this.bg.skin='gameimg/bg1.png'
                this.more_btn.visible=false
            } 
            this.del_btn.visible=false
        }else if(flag==2){
            this.del_btn.visible=true
            this.more_btn.visible=false
        }
               
    }
}