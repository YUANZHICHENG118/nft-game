import DataBus from "./DataBus";
import GameConfig from "./GameConfig";
class Main {
	private progressBar:Laya.ProgressBar;  //进度条属性
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
            //{url:"res/loading/progress.png",type:Laya.Loader.IMAGE},   //进度条的图片资源位置和类型
            //{url:"res/atlas/progress$bar.png",type:Laya.Loader.IMAGE}      //进度条的图片资源位置和类型       
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
		 {url:"gameimg/videoImg.png",type:Laya.Loader.IMAGE}
         //{url:"res/atlas/bg.mp3",type:Laya.Loader.SOUND},
		 //{url:"res/atlas/hit.wav",type:Laya.Loader.SOUND}
		 //fileconfig.json
        ];
		//设置progress Handler的第4个参数为true，根据加载文件个数获取加载进度
        Laya.loader.load(res,null,Laya.Handler.create(this,this.onProgress,null,false));
	}

	//显示开始游戏加载进度条
    progressShow():void{
        //和text一样，需要先new一个进度条对象
        this.progressBar = new Laya.ProgressBar("loading/progress.png");
		this.progressBar.width = 400;
        this.progressBar.pos(175,600);
		this.progressBar.sizeGrid = "16,16,16,16";
		this.progressBar.bar.pos(4,4)
        //当进度条发生变化的时候，我们需要下面的方法来监听其变化
        //this.progressBar.changeHandler = new Laya.Handler(this,this.onChange);
        //添加进度条到舞台上
        Laya.stage.addChild(this.progressBar);
	}

	//主游戏界面加载完成后的回调函数
    onProgress(pro:number):void{
		console.log("加载了总文件的:"+pro*100+"%");
		this.progressBar.value=pro;
		if(this.progressBar.value==1)
		{
			//游戏主页面资源加载完成后执行这里的代码
			//console.log("游戏加载完成咯！！");
			//延迟1秒再显示游戏主页面
			this.progressBar.value=pro*392/400;
			Laya.timer.once(100,this,this.onLoad);
			//this.progressBar.visible = false;
			// laya.media.SoundManager.playMusic("res/atlas/bg.mp3",0);       
		}
	}

	//进度条发生变化的时候触发下面的方法
    onChange(value:number):void{
		console.log("进度: "+Math.floor(value*100)+"%");
	}

	//加载完成后的回调函数
    onLoad():void{
		console.log('onLoad')
		//laya.media.SoundManager.playMusic("res/atlas/bg.mp3",0);   
		//移除进度条
		Laya.stage.removeChild(this.progressBar);   
	   // 实例化游戏开始界面
		//GameMain.GameStart = new GamStart(); //注意哦，这里的GameStart是静态属性，所以访问的时候不能用this了，只能用GameMain类，
		//Laya.stage.addChild(GameMain.GameStart);
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
