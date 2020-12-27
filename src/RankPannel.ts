import { ui } from "./ui/layaMaxUI";
import List = Laya.List;
export default class RankPannel extends ui.RankPannelUI {
    private sort:'ASC'|'DESC'='DESC'; 
    private list: List = new List();    
    private hasInitList:boolean=false;
    private listData:Array<any>
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
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
            // for(let i in d){
            //     this.listData.push({id:d[i].id,type:d[i].type,color:d[i].color,selected:false})
            // }
            this.list.array =this.listData
        })
    }
}