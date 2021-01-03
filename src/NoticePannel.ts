import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";
import DataBus from "./DataBus";
import Util from "./Util";
import Langue from "./Langue";

export default class NoticePannel extends ui.NoticePannelUI {   
    private dataBus:DataBus = DataBus.getDataBus(); 
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk.on(Laya.Event.CLICK,this,this.closeClick)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()
    }

    onLanguage=()=>{
        let arr=['notice','home_0']
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
    loadData=()=>{
        LayaBlock.getNotice().then((d:INotice)=>{
            console.log(d)
            this.title_txt.text=d.title;
            this.content_txt.text=d.content
            this.time_txt.text=Util.getDateStrFormatByMs(d.time*1000,'Y-M-D h:m:s')
        })
    }
}