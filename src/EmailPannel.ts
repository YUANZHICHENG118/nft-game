import DataBus from "./DataBus";
import ItemEmail from "./ItemEmail";
import { ui } from "./ui/layaMaxUI";
import List = Laya.List;
export default class EmailPannel extends ui.EmailUI {
    private list:List = new List();    
    private hasInitList:boolean=false;
    private listData:Array<any>
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk1.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnOk2.on(Laya.Event.CLICK,this,this.closeClick)

        //创建列表
        this.list.itemRender =ItemEmail;;
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
        //this.list.selectHandler = new Handler(this, this.onSelect);
        //this.list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(this.list) 
    }

    private updateItem(cell:ItemEmail, index: number): void {
        //cell.setItem(cell.dataSource);
    }

    private onSelect(index: number): void {
        //laya.ui.js 3155行修改  if (true || this._selectedIndex != value) 
        //this.listData[index].selected=!this.listData[index].selected
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }

    loadData=()=>{
        console.log('加载邮件',DataBus.account);
        LayaBlock.getEmail(DataBus.account).then((d:IEmail[])=>{
            console.log('d:',d)
            this.listData=[]
            for(let i in d){
                this.listData.push({id:d[i].id,title:d[i].title,time:d[i].time,content:d[i].content})
            }
            console.log(this.listData)
            this.list.array =this.listData
        })
    }
}