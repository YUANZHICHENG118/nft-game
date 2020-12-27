import ItemRank from "./ItemRank";
import { ui } from "./ui/layaMaxUI";
import List = Laya.List;
import Handler = Laya.Handler;
export default class RankPannel extends ui.RankPannelUI {
    private sort:'ASC'|'DESC'='DESC'; 
    private list: List = new List();    
    private hasInitList:boolean=false;
    private listData:Array<any>
    private lastItem:ItemRank
    private myItem:ItemRank
    private itemX:number=30
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        //创建列表
        this.list.itemRender = ItemRank;
        this.list.repeatX = 1;
        //this.list.repeatY = 4;
        this.list.x = this.itemX;
        this.list.y = 290;
        this.list.height=1000;
        this.list.spaceX=20;
        this.list.spaceY=10;
        //使用但隐藏滚动条
        this.list.vScrollBarSkin = "";
        this.list.selectEnable = true;
        this.list.selectHandler = new Handler(this, this.onSelect);
        this.list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(this.list) 

        //最后一击
        this.lastItem=new ItemRank();
        this.lastItem.x=this.itemX;
        this.lastItem.y=189;
        this.addChild(this.lastItem)
        //我的排名
        this.myItem=new ItemRank();
        this.myItem.x=this.itemX;
        this.myItem.y=1220;
        this.addChild(this.myItem)
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
        this.loadData()
        this.loadDataMe()
        this.loadDataLast()
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

    loadData():void{        
        LayaBlock.getRankTop10().then((d:IRankTop[])=>{
            console.log(d,typeof d)
            this.listData=[]
            for(let i in d){
                this.listData.push({sn:i,load:d[i].load,addressShort:d[i].addressShort})
            }
            this.list.array =this.listData
        })
    }
}