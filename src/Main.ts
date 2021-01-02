import DataBus from "./DataBus";
import GameConfig from "./GameConfig";
class Main {
	private loadingPage:Laya.Sprite;
	private loadingBar:Laya.Image;  //进度条
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		Laya.stage.bgColor = "#e4d6c3";
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(true);
		
		//进度条资源加载
        var pro_res:Array<any> = [
            {url:"loading/loadingBg.png",type:Laya.Loader.IMAGE},      //进度条的图片资源位置和类型       
            {url:"res/atlas/loading.atlas",type:Laya.Loader.ATLAS}       
        ];
        //加载完进度条后执行onProLoaded方法
        Laya.loader.load(pro_res,Laya.Handler.create(this,this.onProLoaded));		
	}

	onProLoaded():void{
		this.progressShow();
        //预加载主游戏页面图片资源数组
        var res:Array<any> = [ 
         {url:"res/atlas/comp.atlas",type:Laya.Loader.ATLAS},
		 {url:"res/atlas/gameimg.atlas",type:Laya.Loader.ATLAS},
		 {url:"res/atlas/machine.atlas",type:Laya.Loader.ATLAS},
		 {url:"gameimg/bg.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/bg0.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/color.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/menuBarIcon.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/rankbg0.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/rankbg1.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/shanX.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/tu.png",type:Laya.Loader.IMAGE},
		 {url:"gameimg/videoImg.png",type:Laya.Loader.IMAGE},
         {url:"sound/bg.mp3",type:Laya.Loader.SOUND},
		 //{url:"res/atlas/hit.wav",type:Laya.Loader.SOUND}
		 //fileconfig.json
        ];
		//设置progress Handler的第4个参数为true，根据加载文件个数获取加载进度
        Laya.loader.load(res,null,Laya.Handler.create(this,this.onProgress,null,false));
	}

	//显示开始游戏加载进度条
    progressShow():void{
		this.loadingPage=new Laya.Sprite()
		let loadingBg:Laya.Image=new Laya.Image("loading/loadingBg.png")
		this.loadingBar=new Laya.Image('loading/loadingBar.png')
		this.loadingBar.pos(359+18,544+141)
		this.loadingBar.rotation=180

		this.loadingPage.addChild(loadingBg)
		this.loadingPage.addChild(this.loadingBar)
        Laya.stage.addChild(this.loadingPage);
	}

	//主游戏界面加载完成后的回调函数
    onProgress(pro:number):void{
		//console.log("加载了总文件的:"+pro*100+"%");
		this.loadingBar.scaleY=pro;
		if(pro==1)
		{
			Laya.timer.once(10,this,this.onLoad);
		}
	}

	//加载完成后的回调函数
    onLoad():void{
		//移除进度条
		Laya.stage.removeChild(this.loadingPage);   
		Laya.SoundManager.playMusic("sound/bg.mp3",0);
		let musicFlag=Number(Laya.LocalStorage.getItem('musicFlag'))
		if(musicFlag==1){
			Laya.SoundManager.setMusicVolume(0)		
		}
		
		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	
	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		Laya.AtlasInfoManager.enable("fileconfig.json")
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		//GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		DataBus.getDataBus().addEvt();
	}
}
//激活启动类
new Main();
