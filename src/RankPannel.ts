import ItemRank from "./ItemRank";
import { ui } from "./ui/layaMaxUI";
import List = Laya.List;
import Handler = Laya.Handler;
export default class RankPannel extends ui.RankPannelUI {
    private sort:'ASC'|'DESC'='DESC'; 
    private list: List = new List();    
    private hasInitList:boolean=false;
    private listData:Array<any>
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        //创建列表
        this.list.itemRender = ItemRank;
        this.list.repeatX = 1;
        //this.list.repeatY = 4;
        this.list.x = 30;
        this.list.y = 290;
        this.list.height=800;
        this.list.spaceX=20;
        this.list.spaceY=20;
        //使用但隐藏滚动条
        this.list.vScrollBarSkin = "";
        this.list.selectEnable = true;
        this.list.selectHandler = new Handler(this, this.onSelect);
        this.list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(this.list) 
    }

    private updateItem(cell:ItemRank, index: number): void {
        console.log('=====',this.listData[index])
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
    }

    loadData():void{        
        LayaBlock.getRankTop10().then((d:IRankTop[])=>{
            console.log(d,typeof d)
            this.listData=[]
            for(let i in d){
                this.listData.push({sn:i,load:d[i].load,address:d[i].address})
            }
            this.list.array =this.listData
        })
    }
}