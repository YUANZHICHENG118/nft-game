import { ui } from "./ui/layaMaxUI";
import List = Laya.List;
import Handler = Laya.Handler;
export default class MePannel extends ui.MePannelUI {
    private loading:boolean=false
    private btnType:number=0

    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnCopyRef.on(Laya.Event.CLICK,this,this.copyRef)

        this.btn0.on(Laya.Event.CLICK,this,this.btnClick)
        this.btn1.on(Laya.Event.CLICK,this,this.btnClick)
        this.btn2.on(Laya.Event.CLICK,this,this.btnClick)
        this.group0.visible=true
        this.group1.visible=this.group2.visible=false
    }

    private btnClick(e:Laya.Event):void{
        if(this.loading==true){
            //return;
        }
        let curBtn:Laya.Image=e.currentTarget as Laya.Image        
        let selectBtnType=Number(curBtn.name.charAt(3))
        console.log(this.btnType,selectBtnType)
        if(this.btnType==selectBtnType){
            return
        }else{
            this.btnType=selectBtnType
        }
        
        this.btn0.skin=this.btn1.skin=this.btn2.skin='gameimg/labBg0.png'
        curBtn.skin='gameimg/labBg1.png'
        this.group0.visible=this.group1.visible=this.group2.visible=false
        this['show'+this.btnType]()
    }

    show0():void{
        console.log('show0')
        this.group0.visible=true
    }

    show1():void{
        console.log('show1')
        this.group1.visible=true
    }

    show2():void{
        console.log('show2')
        this.group2.visible=true
    }

    copyRef():void{
        eval('window.clipboardData.setData("text","hello")');
    }
    loadData():void{    
        console.log('getUserBase')  
        LayaBlock.getUserBase().then((d:IUserBase)=>{
            console.log(d)
            this.nick_txt.text=d.nick
            this.address_txt.text=d.address
            this.tokenAmount_txt.text=d.tokenAmount+''
            this.ref_txt.text=d.ref
        })
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}