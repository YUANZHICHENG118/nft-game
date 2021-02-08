import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";
import DataBus from "./DataBus";
import Langue from "./Langue";
import ItemCommission from "./ItemCommission";
import ItemIncome from "./ItemIncome";
import List = Laya.List;
import Handler = Laya.Handler;
import PlayDetaiPannel from "./PlayDetaiPannel";
export default class MePannel extends ui.MePannelUI {
    private clicked1:boolean=false
    private clicked2:boolean=false
    private btnType:number=0
    private list1: List = new List();    
    private list2: List = new List();    
    private listData1:Array<any>
    private listData2:Array<any>
    private loading:boolean=false
    private itemX:number=0
    private itemY:number=42
    private playDetailPannel:PlayDetaiPannel
    private dataBus:DataBus = DataBus.getDataBus(); 
    constructor() { super(); }
    
    public setIcon():void{
        //this.tokenIcon.skin=DataBus.userBase.tokenIcon;
        //this.ethIcon.skin=DataBus.userBase.ethIcon;
    }
    onEnable(): void {
        this.on(Laya.Event.CLICK,this,this.thisClick)
        this.nick2_txt.visible=this.btnSetName.visible=this.lockPan_mc.visible=false;
        
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnCopyRef.on(Laya.Event.CLICK,this,this.copyRef)
        this.btnSetName.on(Laya.Event.CLICK,this,this.btnSetNameClick)
        this.nick_txt.on(Laya.Event.CLICK,this,this.nickClick)

        this.btn0.on(Laya.Event.CLICK,this,this.btnClick)
        this.btn1.on(Laya.Event.CLICK,this,this.btnClick)
        this.btn2.on(Laya.Event.CLICK,this,this.btnClick)
        this.btnWen1.on(Laya.Event.CLICK,this,this.btnWenClick)
        this.btnCloseLock.on(Laya.Event.CLICK,this,this.btnCloseLockClick)
        this.btnUnLock.on(Laya.Event.CLICK,this,this.btnUnLockClick)
        this.btnLock.on(Laya.Event.CLICK,this,this.btnLockClick)
        this.btnOk.on(Laya.Event.CLICK,this,this.btnOkClick)
        this.tip_mc.x=1000;
        this.group0.visible=true
        this.group1.visible=this.group2.visible=false

        //创建列表1,我的收益
        this.list1.itemRender = ItemIncome;
        this.list1.repeatX = 1;
        //this.list1.repeatY = 4;
        this.list1.x = this.itemX;
        this.list1.y = this.itemY;
        this.list1.height=1100;
        this.list1.width=688;
        this.list1.spaceX=0;
        this.list1.spaceY=5;
        //使用但隐藏滚动条
        this.list1.vScrollBarSkin = "";
        this.list1.selectEnable = true;
        this.list1.selectHandler = new Handler(this, this.onSelect1);
        this.list1.renderHandler = new Handler(this, this.updateItem1);
        this.list1.array =this.listData1
        this.group1.addChild(this.list1) 

        //创建列表2,我的返佣
        this.list2.itemRender = ItemCommission;
        this.list2.repeatX = 1;
        //this.list2.repeatY = 4;
        this.list2.x = this.itemX;
        this.list2.y = this.itemY;
        this.list2.height=1100;
        this.list2.width=688;
        this.list2.spaceX=0;
        this.list2.spaceY=5;
        //使用但隐藏滚动条
        this.list2.vScrollBarSkin = "";
        this.list2.selectEnable = true;
        this.list2.selectHandler = new Handler(this, this.onSelect2);
        this.list2.renderHandler = new Handler(this, this.updateItem2);
        this.list2.array =this.listData2
        this.group2.addChild(this.list2) 

        this.playDetailPannel=new PlayDetaiPannel()
        this.playDetailPannel.visible=false
        this.addChild(this.playDetailPannel)

        Laya.stage.on(GameEvent.INCOME_MORE,this,this.onList1More)
        Laya.stage.on(GameEvent.COMMISSION_MORE,this,this.onList2More)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()        
    }
    btnOkClick=(e:Laya.Event)=>{
        this.lockPan_mc.visible=false;
        alert('btnOkClick'+this.lockNum2_txt.text)
    }
    btnLockClick=(e:Laya.Event)=>{
        alert('btnLockClick')
    }
    btnUnLockClick=(e:Laya.Event)=>{
        this.lockPan_mc.visible=true;
    }
    btnCloseLockClick=(e:Laya.Event)=>{
        this.lockPan_mc.visible=false;
    }
    btnWenClick=(e:Laya.Event)=>{
        this.tip_mc.x=325;
        this.tip_txt.text=DataBus.userBase.remark
        e.stopPropagation()
    }
    thisClick=()=>{
        if(this.tip_mc.x<1000){
            this.tip_mc.x=1000
        }
    }
    onList1More=(e:IIncome)=>{
        this.playDetailPannel.loadData(e)
        this.playDetailPannel.visible=true        
    }

    onList2More=(e:ICommission)=>{
        console.log(e)
        alert('返佣弹出什么呢？')
        //this.playDetailPannel.loadData(e)
        //this.playDetailPannel.visible=true        
    }

    onLanguage=()=>{
        let arr=['nav4_1','nav4_2','nav4_3','nav4_4','nav4_4_1','nav4_5','nav4_6','nav4_7','nav4_8','nav5_1','nav5_2','nav5_3','nav6_1','nav6_2','nav6_3']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
    }

    private updateItem1(cell:ItemIncome, index: number): void {
        cell.setItem(index,this.listData1[index]);
    }

    private onSelect1(index: number): void {
       //this.listData1[index].selected=!this.listData1[index].selected
    }

    private updateItem2(cell:ItemCommission, index: number): void {
        cell.setItem(index,this.listData2[index]);
    }

    private onSelect2(index: number): void {
       //this.listData1[index].selected=!this.listData1[index].selected
    }

    private btnClick(e:Laya.Event):void{
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
        this.group0.visible=true
    }

    show1():void{
        this.group1.visible=true
        if(this.clicked1==false){
            this.loadData1()
        }        
    }

    show2():void{
        this.group2.visible=true
        if(this.clicked2==false){
            this.loadData2()
        }    
    }

    loadData1():void{
        this.clicked1=true
        this.dataBus.showLoading();this.loading=true;
        LayaBlock.getUserIncome().then((d:IIncome[])=>{
            this.dataBus.hideLoading();this.loading=false
            console.log('我的收益',d)
            this.list1.array =this.listData1=d            
        })
    }

    loadData2():void{
        this.clicked2=true
        this.dataBus.showLoading();this.loading=true;
        LayaBlock.getCommission().then((d:ICommission[])=>{
            this.dataBus.hideLoading();this.loading=false;
            this.list2.array =this.listData2=d         
        })
    }

    nickClick():void{
        this.nick2_txt.visible=this.btnSetName.visible=true
    }
    btnSetNameClick():void{
        //提交姓名
        DataBus.userBase.nick=this.nick_txt.text=this.nick2_txt.text
        this.nick2_txt.visible=this.btnSetName.visible=false
        let nick:INick= {nick:this.nick2_txt.text, address:DataBus.userBase.address}
        LayaBlock.saveNick(nick).then((d:IResult)=>{
            console.log('d==',d)
            if(Boolean(d)==false){
                alert('保存失败')
            }
        })
    }
    copyRef():void{
        eval('copy("'+DataBus.userBase.ref+'")');
        this.dataBus.showToast(Langue.defaultLangue.copySuccess)
    }
    loadData():void{    
        this.dataBus.showLoading();this.loading=true;
        LayaBlock.getUserBase().then((d:IUserBase)=>{  
            this.dataBus.hideLoading();this.loading=false;          
            DataBus.userBase=d
            if(d.nick==null || d.nick==''){
                this.nick2_txt.text=''
                this.nick2_txt.visible=this.btnSetName.visible=true
            }else{
                this.nick_txt.text=this.nick2_txt.text=d.nick
            }            
            this.address_txt.text=d.address
            this.ethAmount_txt.text='ETH:'+d.ethAmount
            this.tokenAmount_txt.text=d.tokenSymbol+':'+d.tokenAmount
            this.ref_txt.text=d.ref
            this.nick2_txt
        })
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }
}