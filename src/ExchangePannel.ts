import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";
import DataBus from "./DataBus";
import Langue from "./Langue";

export default class ExchangePannel extends ui.ExchangePannelUI {
    private dataBus:DataBus = DataBus.getDataBus(); 
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()
    }

    onLanguage=()=>{
        let arr=[]
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
    }

    onDisable(): void {
        
    }

    closeClick():void{
        this.visible=false;
    }
}