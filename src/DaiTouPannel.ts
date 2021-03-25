import DataBus from "./DataBus";
import { ui } from "./ui/layaMaxUI";
import Langue from "./Langue";
import GameEvent from "./GameEvent";
import Handler = Laya.Handler;

export default class DaiTouPannel extends ui.DaiTouPannelUI {
    private dataBus:DataBus = DataBus.getDataBus();
    public hasInit:boolean=false

    constructor() { super(); }

    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btn0.on(Laya.Event.CLICK,this,this.btn0Click)
        //this.btn1.on(Laya.Event.CLICK,this,this.btn1Click)
        this.btn2.on(Laya.Event.CLICK,this,this.btn2Click)
        this.btn3.on(Laya.Event.CLICK,this,this.btn3Click)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.initData()
        this.onLanguage()
    }

    onDisable(): void {
    }

    onLanguage=()=>{
        let arr=['t12','t13','t15','t16','t17','t18']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }
    }

    closeClick():void{
        this.visible=false;
    }
    btn0Click():void{
        this.btn0.disabled=true;
        LayaBlock.reg().then((d:any)=>{
            this['t13_txt'].text=Langue.defaultLangue['t14']
            this.dataBus.showToast("SUCCESS")
        })
    }

    btn2Click():void{
        LayaBlock.getEarn().then((d:any)=>{
            if(d&&d.data>0){
                LayaBlock.draw().then((d:any)=>{
                    this.dataBus.showToast("SUCCESS")
                })
            }else{
                this.dataBus.showToast("Earn amount low")
            }

        })

    }
    btn3Click():void{
        LayaBlock.getLock().then((d:any)=>{
            if(d&&d.data>0){
                LayaBlock.drawToken().then((d:any)=>{
                    this.dataBus.showToast("SUCCESS")
                })
            }else{
                this.dataBus.showToast("Lock amount low")
            }

        })
    }

    initData=()=>{
        LayaBlock.hasReg().then((d:any)=>{
            if(d&&d.data){
                this.btn0.disabled=true;
                this['t13_txt'].text=Langue.defaultLangue['t14']
            }
        }).catch(e=>{
            console.log("e===")
        })

        LayaBlock.getPlatAddress().then((d:any)=>{
            this.zhuanZhangDiZhi_txt.text=d&&d.data
        }).catch(e=>{
            console.log("e===")
        })

        LayaBlock.getEarn().then((d:any)=>{
            this.tokenAmount_txt.text=d&&d.data
        }).catch(e=>{
            console.log("e===")
        })

        LayaBlock.getLock().then((d:any)=>{
            // this.lockAmount_txt.text=d&&d.data
        }).catch(e=>{
            console.log("e===")
        })



        if(this.hasInit==true){
            return
        }
        this.hasInit=true
    }
}
