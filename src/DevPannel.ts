import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";
import DataBus from "./DataBus";
import Langue from "./Langue";
import Image = Laya.Image;
import List = Laya.List;
import Handler = Laya.Handler;
import ItemDev from "./ItemDev";
import DevDetail from "./DevDetail";
import TipPannel from "./TipPannel";
export default class DevPannel extends ui.DevPannelUI {
    /** @prop {name:devType, tips:"整数类型示例", type:Int, default:1}*/
    private devTypeArr: Array<number> = [1,2,3];
    private selectColorArr:Array<number>=[1,2,3,4,5,6];
    private sort:'ASC'|'DESC'='DESC';
    private devArr:Array<Image>=[];
    private btnColorArr:Array <Laya.Sprite>=[];    
    private list: List = new List();
    private list2: List = new List();
    private hasInitList:boolean=false;
    private listData0:Array<IMachine>
    private listData:Array<any> //我的设备数据
    private listData2:Array<any>;// 选择的设备数据完整。包括数量为0的
    private listData2Simple:Array<any>;// 选择的设备数据。去掉了数量为0的
    private dataBus:DataBus = DataBus.getDataBus(); 
    private devDetail:DevDetail=new DevDetail();
    private loading:boolean=false;
    private curMax:number=0;
    private curDevIndex:number=0;
    constructor() { super(); }
    
    onEnable(): void {
        this.btnColorArr=[this.color1,this.color2,this.color3,this.color4,this.color5,this.color6];
        this.devArr=[this.btnDev1,this.btnDev2,this.btnDev3]

        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        //this.btnDev1.on(Laya.Event.CLICK,this,this.btnDevClick)
        //this.btnDev2.on(Laya.Event.CLICK,this,this.btnDevClick)
        //this.btnDev3.on(Laya.Event.CLICK,this,this.btnDevClick)
        this.sort_btn.on(Laya.Event.CLICK,this,this.sortClick)
        this.addClose_btn.on(Laya.Event.CLICK,this,this.addCloseClick)
        this.btnOk.on(Laya.Event.CLICK,this,this.btnOkClick)
        
        
        for(let i in this.btnColorArr){
            this.btnColorArr[i].on(Laya.Event.CLICK,this,this.btnColorClick)
        }
        this.selectAll_btn.on(Laya.Event.CHANGE,this,this.selectAllClick)
        this.auto_btn.on(Laya.Event.CLICK,this,this.autoClick)
        this.stakeTokenNft_btn.on(Laya.Event.CLICK,this,this.stakeTokenNft)
        this.get_btn.on(Laya.Event.CLICK,this,this.getClick)


        //创建列表
        this.list.itemRender = ItemDev;
        this.list.repeatX = 3;
        //this.list.repeatY = 4;
        this.list.x = 50;
        this.list.y = 125;
        this.list.height=900;
        this.list.spaceX=100;
        this.list.spaceY=20;
        //使用但隐藏滚动条
        this.list.vScrollBarSkin = "";
        this.list.selectEnable = true;
        //this.list.mouseHandler=new Handler(this,this.onClickList)
        this.list.selectHandler = new Handler(this, this.onSelect);
        this.list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(this.list)


        //创建列表
        this.list2.itemRender = ItemDev;
        //this.list2.repeatX = 6;
        this.list2.repeatY = 1;
        this.list2.x = 50;
        this.list2.y = 1069;
        this.list2.height=150;
        this.list2.width=635;
        this.list2.spaceX=20;
        this.list2.spaceY=20;
        //使用但隐藏滚动条
        this.list2.hScrollBarSkin = "";
        this.list2.selectEnable = true;
        //this.list.mouseHandler=new Handler(this,this.onClickList)
        //this.list2.selectHandler = new Handler(this, this.onSelect);
        this.list2.renderHandler = new Handler(this, this.updateItem2);
        this.addChild(this.list2)
        this.list2.array=[];
        
        
        this.stakeTokenNft_btn.disabled=false
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()
        this.addDev_mc.visible=this.devDetail.visible=false
        this.addChild(this.addDev_mc)
        this.addChild(this.devDetail)
        Laya.stage.on(GameEvent.DETAILE,this,this.onDetaile)
        Laya.stage.on(GameEvent.DEL,this,this.onDel)
    }
    addCloseClick=(e:Laya.Event)=>{
        this.addDev_mc.visible=false;
    }
    btnOkClick=(e:Laya.Event)=>{
        this.addDev_mc.visible=false;
        var addNum:number=Number(this.addNum_txt.text)
        if(addNum>this.curMax){
            alert('不能超过'+this.curMax)
            return
        }
        if(addNum<0){
            alert('不能小于0')
            return
        }
        //增加设备
        this.listData[this.curDevIndex].balance-=addNum
        this.listData2[this.curDevIndex].balance+=addNum

        this.list.array =this.listData

        this.listData2Simple=this.listData2.filter((item)=>{
            return item.balance>0
        })
        this.list2.array =this.listData2Simple
    }

    onDetaile=(e:number)=>{   
        this.devDetail.visible=true;
        let d:IMachine=this.listData0[e]
        this.devDetail.setData(d)
    }
    onDel=(e:number)=>{
        console.log(e)
        //获得对应原始数组的索引和还原的数字
        let addNum=this.listData2Simple[e].balance
        let __index:number=this.listData2Simple[e].index
        //原始数组数据还原        
        this.listData[__index].balance+=addNum
        //选中数组归零
        this.listData2[__index].balance=0
        //更新列表
        this.list.array =this.listData
        this.listData2Simple=this.listData2.filter((item)=>{
            return item.balance>0
        })
        this.list2.array =this.listData2Simple
    }

    onLanguage=()=>{
        let arr=['nav1_3','nav1_4','nav1_5','nav1_6','nav1_7','nav1_8','nav1_9']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
    }
    getClick(){
        alert('getClick')
    }
    stakeTokenNft(){
        if(this.loading==true){
            return;
        }
        if(this.listData2Simple.length==0){
            alert(Langue.defaultLangue.alert1)
            return;
        }
        var obj:object={}
        for(var i in this.listData2Simple){
            let id=this.listData2Simple[i].id
            obj[id]=this.listData2Simple[i].balance
        }
        this.listData2Simple=[];
        this.list2.array=[];
        console.log('派出数据：',obj)

        this.dataBus.showLoading();this.loading=true;
        LayaBlock.stakeTokenNft(obj,(d:ITransactionError)=>{
            console.log("d------",d.message);
            this.dataBus.hideLoading();
            this.loading=false;
            this.event('showWaitTip');//home里监听
        }).then((d:ITransaction)=>{
            console.log('stakeTokenNft=====派车接口返回数据:',d)
            //这个对象如果返回 status=0x1
            if(d.status==true){                
               // Laya.SoundManager.playSound("sound/machine.mp3",0);
            }            
        }).catch((e:ITransactionError)=>{
            this.dataBus.hideLoading()
            this.loading=false;
            console.log('error=====派车接口返回数据:',e.message)
        })
        this.closeClick()
        this.event(GameEvent.LANGUAGE_CHANGE)
    }
    selectAllClick(e:Laya.Event){
        for(let i in this.listData){
            this.listData[i].selected=this.selectAll_btn.selected
        }
        this.list.array =this.listData

        this.listData&&this.listData.map(item=>{
            this.updateSum(item)
        })
    }
    autoClick(e:Laya.Event){
        console.log("自动匹配")
    }
    public sortClick(){
        if(this.sort=='DESC'){
            this.sort='ASC'
            this.nav1_1_txt.text=Langue.defaultLangue['nav1_1']
        }else{
            this.sort='DESC'
            this.nav1_1_txt.text=Langue.defaultLangue['nav1_2']
        }
        this.updateList()
    }
    public initList(){        
        if(this.hasInitList==true){
            return
        }
        this.devTypeArr = [1,2,3];
        this.selectColorArr=[1,2,3,4,5,6];
        this.sort='DESC';
        this.btnDev1.skin='gameimg/dev1_2.png'
        this.btnDev2.skin='gameimg/dev2_2.png'
        this.btnDev3.skin='gameimg/dev3_2.png'
        this.btnColorArr=[this.color1,this.color2,this.color3,this.color4,this.color5,this.color6];        
        for(let i in this.btnColorArr){            
            this.btnColorArr[i].alpha=1
        }
        this.sort='ASC'
        this.nav1_1_txt.text=Langue.defaultLangue['nav1_1']
        this.selectAll_btn.selected=false
        this.auto_btn.selected=false
        this.updateList()
    }

    loadData(params:IMachineSearch):void{   
        this.dataBus.showLoading()
        LayaBlock.getUserMachine(params).then((d:IMachine[])=>{
            this.dataBus.hideLoading()
            console.log('设备列表：', d)
            this.listData0=d
            this.listData=[]
            this.listData2=[]
            for(let i in d){
                //选择列表数据
                this.listData.push({index:i,id:d[i].id,balance:d[i].balance,type:d[i].type,color:d[i].color,selected:false})
                //选中列表数据
                this.listData2.push({index:i,id:d[i].id,balance:0,type:d[i].type,color:d[i].color,selected:false})
            }
            this.list.array =this.listData

            console.log('★this.listData2:',this.listData2)
            this.list2.array =this.listData2Simple
            
            if(this.listData.length==0){
                let tipPannel:TipPannel=new TipPannel();
                tipPannel.msg=Langue.defaultLangue.t10
                tipPannel.ok=Langue.defaultLangue.t11
                tipPannel.todo=()=>{
                    Laya.Browser.window.location.href = LayaBlock.exchangeUrl
                }
                tipPannel.popup(false,true)
            }
        })
    }

    private updateItem(cell:ItemDev, index: number): void {
        cell.setItem(index,this.listData[index]);
    }
    private updateItem2(cell:ItemDev, index: number): void {
        cell.setItem(index,this.listData2Simple[index],2);
    }

    private onSelect(index: number): void {
        this.listData[index].selected=!this.listData[index].selected
        this.updateSum(this.listData[index])
        this.addDev_mc.visible=true;
        this.addNum_txt.text=''
        this.addTitle_txt.text='请输入派出数量,最多'+this.listData[index].balance
        this.curMax=this.listData[index].balance
        this.curDevIndex=index
    }

    private updateSum(car:any){
        // let sumLoad:number=0
        // let sumMining:number=0
        // let total:number=0
        // for(var i in this.listData){
        //     console.log('i',i)
        //     if(this.listData[i].selected==true){
        //         console.log('---',i)
        //         sumLoad+=this.listData0[i].load
        //         sumMining+=this.listData0[i].mining
        //         total+=1
        //     }
        // }

        let selectData:ISelect={load:0,mining:0,total:0,realLoad:0}
        let id:number=car.id
        if(car.selected==true){
            selectData= LayaBlock.selectMachine(id,true)
        }else{
            selectData= LayaBlock.selectMachine(id,false)
        }

        this.sumLoad_txt.text=selectData.realLoad.toString()+""
        this.sumMining_txt.text=selectData.mining.toString()+""
        this.total_txt.text=selectData.total.toString()+""
    }

    private onClickList(e:Laya.Event):void{
        console.log(e.type)
    }
    
    btnColorClick(e:Laya.Event){
        let colorX:Laya.Sprite=e.currentTarget as Laya.Sprite
        colorX.alpha=colorX.alpha>0.5?0:1;
        this.selectColorArr=[];
        for(let i in this.btnColorArr){            
            if(this.btnColorArr[i].alpha>0.5){
                this.selectColorArr.push(1+Number(i))
            }            
        }
        this.updateList()      
    }

    btnDevClick(e:Laya.Event):void{
        let curBtn:Laya.Image=e.currentTarget as Laya.Image
        let type:number=Number(curBtn.skin.charAt(11))
        console.log('===',curBtn.skin.charAt(13))
        let color:number=Number(curBtn.skin.charAt(13));
        color=color==1?2:1
        curBtn.skin='gameimg/dev'+type+'_'+color+'.png'
        console.log('curBtn.skin=',curBtn.skin)
        this.devTypeArr=[]
        for(var i in this.devArr){
            if(this.devArr[i].skin.indexOf('_2.png')>0){
                this.devTypeArr.push(Number(i)+1)
            }
        }
        console.log(this.devTypeArr)
        this.updateList()
    }

    updateList(){
        const params:IMachineSearch={
            type:this.devTypeArr,
            color:this.selectColorArr,
            sort:this.sort
        }
        console.log('params',params);
        this.loadData(params)  
    }

    closeClick():void{
        let sumLoad:number=0
        let sumMining:number=0
        let total:number=0
        this.sumLoad_txt.text=sumLoad+''
        this.sumMining_txt.text=sumMining+''
        this.total_txt.text=total+''

        this.visible=false;
    }

    onDisable(): void {
    }
}