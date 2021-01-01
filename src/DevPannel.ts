import GameEvent from "./GameEvent";
import { ui } from "./ui/layaMaxUI";
import List = Laya.List;
import Handler = Laya.Handler;
export default class DevPannel extends ui.DevPannelUI {
    /** @prop {name:devType, tips:"整数类型示例", type:Int, default:1}*/
    private devTypeArr: Array<number> = [1,2,3];
    private selectColorArr:Array<number>=[1,2,3,4,5,6];
    private sort:'ASC'|'DESC'='DESC';
    private devArr:Array<Image>=[];
    private btnColorArr:Array <Laya.Sprite>=[];    
    private list: List = new List();    
    private hasInitList:boolean=false;
    private listData:Array<any>
    constructor() { super(); }
    
    onEnable(): void {
        this.btnColorArr=[this.color1,this.color2,this.color3,this.color4,this.color5,this.color6];
        this.devArr=[this.btnDev1,this.btnDev2,this.btnDev3]

        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnDev1.on(Laya.Event.CLICK,this,this.btnDevClick)
        this.btnDev2.on(Laya.Event.CLICK,this,this.btnDevClick)
        this.btnDev3.on(Laya.Event.CLICK,this,this.btnDevClick)
        this.sort_btn.on(Laya.Event.CLICK,this,this.sortClick)
        
        
        for(let i in this.btnColorArr){
            this.btnColorArr[i].on(Laya.Event.CLICK,this,this.btnColorClick)
        }
        this.selectAll_btn.on(Laya.Event.CHANGE,this,this.selectAllClick)
        this.stakeTokenNft_btn.on(Laya.Event.CLICK,this,this.stakeTokenNft)


        //创建列表
        this.list.itemRender = Item;
        this.list.repeatX = 4;
        //this.list.repeatY = 4;
        this.list.x = 50;
        this.list.y = 423;
        this.list.height=600;
        this.list.spaceX=20;
        this.list.spaceY=20;
        //使用但隐藏滚动条
        this.list.vScrollBarSkin = "";
        this.list.selectEnable = true;
        this.list.selectHandler = new Handler(this, this.onSelect);
        this.list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(this.list) 
    }
    stakeTokenNft(){
        var machineNum=0;
        var obj:object={}
        for(var i in this.listData){
            if(this.listData[i].selected==true){
                machineNum++
                let id=this.listData[i].id
                if(obj[id]){
                    obj[id]+=1;
                }else{
                    obj[id]=1;
                }
            }
        }
        if(machineNum==0){
            alert('您还没有选择设备呢')
            return;
        }
        console.log('obj',obj);//{17: 2, 18: 2}
        LayaBlock.stakeTokenNft(obj)
        this.closeClick()
        this.event(GameEvent.closePannel)
    }
    selectAllClick(e:Laya.Event){
        for(let i in this.listData){
            this.listData[i].selected=this.selectAll_btn.selected
        }
        this.list.array =this.listData
    }
    public sortClick(){
        if(this.sort=='DESC'){
            this.sort='ASC'
            this.sort_txt.text='低 → 高'
        }else{
            this.sort='DESC'
            this.sort_txt.text='高 → 低'
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
        this.sort_txt.text='低 → 高'
        this.selectAll_btn.selected=false
        this.auto_btn.selected=false
        this.updateList()
    }

    loadData(params:IMachineSearch):void{   
        LayaBlock.getUserMachine(params).then((d:IMachine[])=>{
            console.log(d,typeof d)
            this.listData=[]
            for(let i in d){
                this.listData.push({id:d[i].id,type:d[i].type,color:d[i].color,selected:false})
            }
            this.list.array =this.listData
        })
    }

    private updateItem(cell:Item, index: number): void {
        cell.setItem(cell.dataSource);
    }

    private onSelect(index: number): void {
        //laya.ui.js 3155行修改  if (true || this._selectedIndex != value) 
        this.listData[index].selected=!this.listData[index].selected
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
        this.visible=false;
    }

    onDisable(): void {
    }
}


import Box = Laya.Box;
import Image = Laya.Image;
class Item extends Box {
    public static WID: number = 147;
    public static HEI: number = 134;

    private img: Image;
    private bg:Image;
    
    private static machinaWid:Array<Array<number>>=[[230,123],[293,209],[312,133]]

    constructor(){
        super();
        this.size(Item.WID, Item.HEI);
        this.bg=new Image('gameimg/bg1.png');
        this.bg.size(Item.WID,Item.HEI)
        this.addChild(this.bg);        
        this.img = new Image();
        this.img.x=10;
        this.img.y=90;
        this.addChild(this.img);
    }

    public setItem(itemData:any): void {
        var __scale=(Item.WID-20)/Item.machinaWid[itemData.type-1][0]
        var __y=0.5*(Item.HEI- Item.machinaWid[itemData.type-1][1]*__scale)
        
        this.img.scaleX=this.img.scaleY=__scale
        this.img.y=__y;
        this.img.skin ='machine/m'+itemData.type +'_'+itemData.color+'.png'; //"machine/m1_1.png"
        this.bg.skin='gameimg/bg'+(itemData.selected? 2:1)+'.png'
    }
}