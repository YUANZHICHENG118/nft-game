import { ui } from "./ui/layaMaxUI";
import GameEvent from "./GameEvent";
import DataBus from "./DataBus";
import Langue from "./Langue";
import ItemRank from "./ItemRank";
import List = Laya.List;
import Handler = Laya.Handler;
import PlayDetaiPannel from "./PlayDetaiPannel";
export default class RankPannel extends ui.RankPannelUI {
    private sort:'ASC'|'DESC'='DESC'; 
    private list: List = new List();    
    private hasInitList:boolean=false;
    private listData:Array<any>=[]
    private lastItem:ItemRank
    private myItem:ItemRank
    private itemX:number=30
    private itemY0:number=189
    private itemY1:number=290
    private loading:boolean=false
    private rankType:number=0
    private dataBus:DataBus = DataBus.getDataBus(); 
    private playDetailPannel:PlayDetaiPannel
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        //创建列表
        this.list.itemRender = ItemRank;
        this.list.repeatX = 1;
        //this.list.repeatY = 4;
        this.list.x = this.itemX;
        this.list.y = this.itemY1;
        this.list.height=1000;
        this.list.spaceX=20;
        this.list.spaceY=10;
        //使用但隐藏滚动条
        this.list.vScrollBarSkin = "";
        this.list.selectEnable = true;
        this.list.selectHandler = new Handler(this, this.onSelect);
        this.list.renderHandler = new Handler(this, this.updateItem);
        this.list.array =this.listData
        this.addChild(this.list) 

        //最后一击
        this.lastItem=new ItemRank();
        this.lastItem.x=this.itemX;
        this.lastItem.y=this.itemY0;
        this.addChild(this.lastItem)
        //我的排名
        this.myItem=new ItemRank();
        this.myItem.x=this.itemX;
        this.myItem.y=1220;
        this.addChild(this.myItem)

        this.rankType0.on(Laya.Event.CLICK,this,this.rankTypeClick)
        this.rankType1.on(Laya.Event.CLICK,this,this.rankTypeClick)
        this.rankType2.on(Laya.Event.CLICK,this,this.rankTypeClick)
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        Laya.stage.on(GameEvent.RANK_MORE,this,this.onRankMore)
        this.onLanguage()

        this.playDetailPannel=new PlayDetaiPannel()
        this.playDetailPannel.visible=false
        this.addChild(this.playDetailPannel)
    }

    onRankMore=(e:any)=>{
        console.log(e)
        this.playDetailPannel.loadData(e)
        this.playDetailPannel.visible=true        
    }
    onLanguage=()=>{
        let arr=['nav3_0','nav3_1','nav3_2','nav3_3','nav3_4','nav3_5']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
    }

    private rankTypeClick(e:Laya.Event):void{
        if(this.loading==true){
            return;
        }
        let curBtn:Laya.Image=e.currentTarget as Laya.Image        
        let selectRankType=Number(curBtn.name.charAt(8))
        if(this.rankType==selectRankType){
            return
        }else{
            this.rankType=selectRankType
        }
        
        this.rankType0.skin=this.rankType1.skin=this.rankType2.skin='gameimg/labBg0.png'
        curBtn.skin='gameimg/labBg1.png'
        this.updateList()
    }

    private updateItem(cell:ItemRank, index: number): void {
        cell.setItem(index,this.listData[index]);
    }

    private onSelect(index: number): void {
       this.listData[index].selected=!this.listData[index].selected
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }

    public initList(){
        if(this.hasInitList==true){
            return
        }
        this.hasInitList=true
        this.sort='DESC';
        this.rankType0.skin='gameimg/labBg1.png'
        this.rankType1.skin='gameimg/labBg0.png'
        this.rankType2.skin='gameimg/labBg0.png'
        this.sort='ASC'
        this.updateList()
    }

    updateList(){
        console.log('rankType:',this.rankType);
        this.loading=true
        if(this.rankType==0){
            this.loadData10()
            this.loadDataMe()
            this.loadDataLast()
            this.myItem.visible=this.lastItem.visible=true
            this.list.y=this.itemY1
        }else if(this.rankType==1){
            this.loadData50()
            this.loadDataMe()
            this.loadDataLast()
            this.myItem.visible=this.lastItem.visible=true;
            this.list.y=this.itemY1
        }else if(this.rankType==2){
            this.loadData100()
            this.myItem.visible=this.lastItem.visible=false;
            this.list.y=this.itemY0
        }        
    }
    loadDataMe():void{  
        LayaBlock.getUserRank().then((d:IUserRank)=>{
            console.log('me:::::',d,typeof d)
            this.myItem.setItem(-1,d)
            this.myItem.sn_txt.text='ME'
        })
    }

    loadDataLast():void{        
        LayaBlock.getLastStraw().then((d:ILastStraw)=>{
            console.log('last:::::',d,typeof d)
            this.lastItem.setItem(-1,d)
            this.lastItem.sn_txt.text='LAST'
        })
    }

    loadData10():void{        
        LayaBlock.getRankTop10().then((d:IRankTop[])=>{
            console.log(d,typeof d)
            this.listData=[]
            for(let i in d){
                this.listData.push({sn:i,load:d[i].load,addressShort:d[i].addressShort,address:d[i].address,gameId:d[i].gameId})
            }
            this.list.array =this.listData
            this.loading=false
        })
    }

    loadData50():void{        
        LayaBlock.getRankTop50().then((d:IRankTop[])=>{
            console.log(d,typeof d)
            this.listData=[]
            for(let i in d){
                this.listData.push({sn:i,load:d[i].load,addressShort:d[i].addressShort,address:d[i].address,gameId:d[i].gameId})
            }
            this.list.array =this.listData
            this.loading=false
        })
    }

    loadData100():void{        
        LayaBlock.getGameRankTop50().then((d:IRankTop[])=>{
            console.log(d,typeof d)
            this.listData=[]
            for(let i in d){
                this.listData.push({sn:i,load:d[i].load,addressShort:d[i].addressShort,address:d[i].address,gameId:d[i].gameId})
            }
            this.list.array =this.listData
            this.loading=false
        })
    }
}