(function () {
    'use strict';

    class GameEvent extends Laya.Script {
        constructor() {
            super();
        }
    }
    GameEvent.flag1 = "flag1";

    class DataBus extends Laya.EventDispatcher {
        constructor() {
            super();
        }
        static getDataBus() {
            if (!this.instance) {
                this.instance = new DataBus();
            }
            return this.instance;
        }
        addEvt() {
            Laya.stage.on('gameData', this, this.onGameData);
        }
        onEnable() {
        }
        onGameData(data) {
            console.log('DataBus收到数据：', data);
            this.event(GameEvent.flag1, data);
        }
        onDisable() {
        }
    }
    DataBus.instance = null;

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class HomeUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Home");
            }
        }
        ui.HomeUI = HomeUI;
        REG("ui.HomeUI", HomeUI);
    })(ui || (ui = {}));

    class Home extends ui.HomeUI {
        constructor() {
            super();
            this.dataBus = DataBus.getDataBus();
            this.testBlock = () => {
                LayaBlock.getGameServer().then((d) => {
                    d.map(item => {
                        console.log("token=====", item.token);
                    });
                });
                NftApi.getGameLoadDec().then((d) => {
                    console.log("load dec zh=====", d.zh);
                });
            };
        }
        onEnable() {
            LayaBlock.initWeb3();
            this.testBlock();
            this.btnDevice.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnExchange.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnRank.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnMe.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.dataBus.on(GameEvent.flag1, this, this.onFlag1);
        }
        onFlag1(e) {
            LayaBlock.getGameInfo().then(data => {
                console.log("game info===", data);
            });
            LayaBlock.getAccount().then(data => {
                this.out_txt.text = data;
            });
        }
        menuClick(e) {
            let curBtn = e.currentTarget;
            switch (curBtn) {
                case this.btnDevice:
                    this.selectBg.x = curBtn.x;
                    this.num_txt.value = '01';
                    eval('COMM.loadData(1)');
                    break;
                case this.btnExchange:
                    this.selectBg.x = curBtn.x;
                    this.num_txt.value = '02';
                    eval('COMM.loadData(2)');
                    break;
                case this.btnRank:
                    this.selectBg.x = curBtn.x;
                    this.num_txt.value = '03';
                    eval('COMM.loadData(3)');
                    break;
                case this.btnMe:
                    this.selectBg.x = curBtn.x;
                    this.num_txt.value = '04';
                    eval('COMM.loadData(4)');
                    break;
            }
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Home.ts", Home);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1333;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Home.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
            DataBus.getDataBus().addEvt();
        }
    }
    new Main();

}());
