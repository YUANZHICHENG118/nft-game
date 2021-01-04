import DataBus from "./DataBus";
import { ui } from "./ui/layaMaxUI";
import Langue from "./Langue";
import GameEvent from "./GameEvent";
import Handler = Laya.Handler;

import List = Laya.List;
import ItemPlayDetail from "./ItemPlayDetail";
export default class PlayDetaiPannel extends ui.PlayDetailPannelUI {
    private list:List = new List();    
    private listData:Array<any>
    private dataBus:DataBus = DataBus.getDataBus(); 
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        //创建列表
        this.list.itemRender =ItemPlayDetail;
        this.list.repeatX = 1;
        //this.list.repeatY = 4;
        this.list.x = 45;
        this.list.y = 140;
        this.list.height=1000;
        this.list.width=660;
        this.list.spaceX=20;
        this.list.spaceY=20;
        //使用但隐藏滚动条
        this.list.vScrollBarSkin = "";
        this.list.selectEnable = true;
        this.list.array =[]
        this.list.selectHandler = new Handler(this, this.onSelect);
        this.list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(this.list) 
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()
    }

    onLanguage=()=>{
        let arr=['nav8_0','nav8_1','nav8_2']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
    }

    private updateItem(cell:ItemPlayDetail, index: number): void {
        cell.setItem(index,this.listData[index]);
    }

    private onSelect(index: number): void {
        
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }

    loadData=(e)=>{
        LayaBlock.getPlayDetail(e.gameId,e.address).then((d:IPlayDetail[])=>{
            console.log('派出详情参数：:',d)
            this.list.array =this.listData=d
        })
    }
}