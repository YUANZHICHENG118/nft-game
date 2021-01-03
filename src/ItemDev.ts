import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";

export default class ItemDev extends ui.ItemDevUI {
    public static WID: number = 147;
    public static HEI: number = 134;
    private static machinaWid:Array<Array<number>>=[[230,123],[293,209],[312,133]]
    private sn:number
    constructor() { super(); 
        this.size(ItemDev.WID, ItemDev.HEI);
    }
    
    onEnable(): void {
        this.btn.on(Laya.Event.CLICK,this,this.btnClick)        
    }

    btnClick(event):void{
        Laya.stage.event(GameEvent.DETAILE,this.sn);//发送事件，在devPannel里监听
        event.stopPropagation();//阻止冒泡
    }

    onDisable(): void {
    }

    public setItem(sn:number,itemData:any): void {
        this.sn=sn
        var __scale=(ItemDev.WID-20)/ItemDev.machinaWid[itemData.type-1][0]
        var __y=0.5*(ItemDev.HEI- ItemDev.machinaWid[itemData.type-1][1]*__scale)
        
        this.img.scaleX=this.img.scaleY=__scale
        this.img.y=__y;
        this.img.skin ='machine/m'+itemData.type +'_'+itemData.color+'.png'; //"machine/m1_1.png"

        if(itemData.selected){
            this.bg.skin='gameimg/bg2.png'
            this.btn.visible=true
        }else{
            this.bg.skin='gameimg/bg1.png'
            this.btn.visible=false
        }        
    }
}