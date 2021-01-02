import DataBus from "./DataBus";
import ItemEmail from "./ItemEmail";
import { ui } from "./ui/layaMaxUI";
import Langue from "./Langue";
import GameEvent from "./GameEvent";
import List = Laya.List;
export default class EmailPannel extends ui.EmailPannelUI {
    private list:List = new List();    
    private listData:Array<any>
    private dataBus:DataBus = DataBus.getDataBus(); 
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        
        //创建列表
        this.list.itemRender =ItemEmail;
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
        //this.list.selectHandler = new Handler(this, this.onSelect);
        //this.list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(this.list) 
        this.dataBus.on(GameEvent.LANGUAGE_CHANGE,this,this.onLanguage)
        this.onLanguage()
    }

    onLanguage=()=>{
        let arr=['email']
        for(let i in arr){
            let txtName:string=arr[i]
            console.log(txtName+'_txt')
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }        
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
        console.log('加载邮件参数：',DataBus.account);
        LayaBlock.getEmail(DataBus.account).then((d:IEmail[])=>{
            console.log('邮件d:',d)
            this.listData=[]
            for(let i in d){
                this.listData.push({id:d[i].id,title:d[i].title,time:d[i].time,content:d[i].content})
            }
            this.list.array =this.listData
        })
    }
}