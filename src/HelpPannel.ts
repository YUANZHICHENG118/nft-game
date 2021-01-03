import DataBus from "./DataBus";
import { ui } from "./ui/layaMaxUI";
import Langue from "./Langue";
import GameEvent from "./GameEvent";
import Handler = Laya.Handler;

import List = Laya.List;
import ItemHelp from "./ItemHelp";
export default class HelpPannel extends ui.HelpPannelUI {
    private list:List = new List();    
    private listData:Array<IHelp>
    private dataBus:DataBus = DataBus.getDataBus(); 
    public hasInit:boolean=false
    private divElement:any
    private videoElement:any
    constructor() { super(); }
    
    onEnable(): void {
        this.btnClose.on(Laya.Event.CLICK,this,this.closeClick)
        this.btnVideo.on(Laya.Event.CLICK,this,this.btnVideoClick)
        //创建列表
        this.list.itemRender =ItemHelp;
        this.list.repeatX = 1;
        //this.list.repeatY = 4;
        this.list.x = 45;
        this.list.y = 428;
        this.list.height=848;
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
        let arr=['help']
        for(let i in arr){
            let txtName:string=arr[i]
            this[txtName+'_txt'].text=Langue.defaultLangue[txtName]
        }
    }

    private updateItem(cell:ItemHelp, index: number): void {
        cell.setItem(index,this.listData[index]);
    }

    private onSelect(index: number): void {
        
    }

    onDisable(): void {
    }

    closeClick():void{
        this.visible=false;
    }

    initData=()=>{
        if(this.hasInit==true){
            return
        }
        this.hasInit=true
        LayaBlock.getHelp().then((d:IHelp[])=>{
            console.log('帮助接口返回==',d)
            this.listData=d
            this.list.array =this.listData
        })
    }

    btnVideoClick(){
        Laya.Browser.window.location.href = 'video/1.mp4'
    }
    creatVideo(){
        let divElement = Laya.Browser.createElement("div");
        divElement.className = "div";
        Laya.Browser.document.body.appendChild(divElement);         
        Laya.Utils.fitDOMElementInArea(divElement,this , 0, 0, Laya.stage.width, Laya.stage.height); 
        

        
        // 创建Video元素
        let videoElement = Laya.Browser.createElement("video");
        videoElement.setAttribute("id", "myvideo");
        this.videoElement = videoElement;      
        videoElement.controls = true;
        videoElement.autoPlay = false;
        // 阻止IOS视频全屏
        videoElement.setAttribute("webkit-playsinline", true);
        videoElement.setAttribute("playsinline", true);
        videoElement.setAttribute("x5-video-player-type",'h5');
        videoElement.setAttribute("x-webkit-airplay",true);
        videoElement.setAttribute("x5-video-orientation","portrait");
        
        videoElement.setAttribute('preload', 'auto');
        videoElement.setAttribute('width', '100%');
        videoElement.setAttribute('height', '40%');
         
        videoElement.style.zInddex = Laya.Render.canvas.style.zIndex + 1;      
        videoElement.type = "vedio/mp4";     
        videoElement.src = "video/1.mp4"
        videoElement.play();
        divElement.appendChild(videoElement);  
        this.divElement = divElement;
        //this.divElement.style.display = "none";
       /* */
    }

    videoEvent(){ 
        /*
        this.videoElement.addEventListener("loadstart",()=>{
            //加载事件
        });   
         this.videoElement.addEventListener("progress",()=>{
            //下载监听事件
        });
         this.videoElement.addEventListener("play",()=>{
            //播放事件
        });
         this.videoElement.addEventListener("pause",()=>{
            //暂停事件
        });
         this.videoElement.addEventListener("seeking",()=>{
            //移动进度条事件
        });
         this.vidjingeoElement.addEventListener("seeked",()=>{
            //进度条移动完成事件
        });
         this.videoElement.addEventListener("waiting",()=>{
            //视频加载等待事件
        });
         this.videoElement.addEventListener("timeupdate",()=>{
            //视频实时更新进度事件
        });
        this.videoElement.addEventListener("ended",()=>{
            //播放完成事件
        });
        this.videoElement.addEventListener("error",()=>{
            //播放出错
        });
        */
        
    }
}