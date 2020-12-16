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
        class DevPannelUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("DevPannel");
            }
        }
        ui.DevPannelUI = DevPannelUI;
        REG("ui.DevPannelUI", DevPannelUI);
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

    class DevPannel extends ui.DevPannelUI {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
        }
        closeClick() {
            this.visible = false;
        }
        onDisable() {
        }
    }

    class Home extends ui.HomeUI {
        constructor() {
            super();
            this.dataBus = DataBus.getDataBus();
            this.initUI = () => {
                this.devPannel.visible = false;
            };
            this.homeInit = () => {
                this.out_txt.text = '';
                LayaBlock.getMineData().then((d) => {
                    console.log(d);
                    this.out_txt.text += '矿山数据' + d.surplus + '/' + d.total;
                });
                LayaBlock.getUserBase().then((d) => {
                    this.out_txt.text += '\n用户基础数据：address' + JSON.stringify(d);
                });
            };
            this.clearOutTxt = () => {
                console.clear();
                this.out_txt.text = '';
            };
            this.testBlock = () => {
                console.log('♥♥');
                LayaBlock.getTokenBalance().then((d) => {
                    console.log("token balance=====", d);
                });
                LayaBlock.getEthBalance().then((d) => {
                    console.log("eth balance=====", d);
                });
                LayaBlock.getUserMachine().then((d) => {
                    d.map((item) => {
                        console.log("getUserMachine====", item);
                    });
                });
                LayaBlock.getTokenAllowance().then((d) => {
                    console.log("getTokenAllowance=====", d);
                    if (!d) {
                        LayaBlock.tokenApprove().then((d) => {
                            console.log("tokenApprove=====", d.transactionHash);
                        }).catch((e) => {
                            console.log("tokenApprove error=====", e);
                        });
                    }
                });
                LayaBlock.getRankTop().then((d) => {
                    console.log("getRankTop=====", d);
                });
                LayaBlock.getMineData().then((d) => {
                    console.log("getMineData=====", d);
                });
                LayaBlock.getUserBase().then((d) => {
                    console.log("getUserBase=====", d);
                });
                LayaBlock.getUserStake().then((d) => {
                    console.log("getUserStake=====", d);
                });
                LayaBlock.getGameServer().then((d) => {
                    d.map(item => {
                        console.log("token=====", item.token);
                    });
                });
                NftApi.getGameLoadDec().then((d) => {
                    console.log("load dec zh=====", d.zh);
                });
                LayaBlock.getAccount().then(data => {
                    this.out_txt.text = data;
                });
            };
        }
        onEnable() {
            LayaBlock.initWeb3();
            this.homeInit();
            this.testBlock();
            this.btnDevice.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnExchange.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnRank.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnMe.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.out_txt.on(Laya.Event.RIGHT_CLICK, this, this.clearOutTxt);
            this.initUI();
        }
        menuClick(e) {
            let curBtn = e.currentTarget;
            this.selectBg.x = curBtn.x;
            switch (curBtn) {
                case this.btnDevice:
                    LayaBlock.getUserMachine().then((d) => {
                        this.out_txt.text = JSON.stringify(d);
                    });
                    this.devPannel.visible = true;
                    break;
                case this.btnExchange:
                    break;
                case this.btnRank:
                    LayaBlock.getRankTop().then((d) => {
                        console.log("getRankTop=====", d);
                        this.out_txt.text = JSON.stringify(d);
                    });
                    break;
                case this.btnMe:
                    LayaBlock.getUserBase().then((d) => {
                        this.out_txt.text = '\n用户基础数据：address' + JSON.stringify(d);
                    });
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
            reg("DevPannel.ts", DevPannel);
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
