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
        class BlackBgUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("BlackBg");
            }
        }
        ui.BlackBgUI = BlackBgUI;
        REG("ui.BlackBgUI", BlackBgUI);
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

    var List = Laya.List;
    var Handler = Laya.Handler;
    class DevPannel extends ui.DevPannelUI {
        constructor() {
            super();
            this.devType = 1;
            this.selectColorArr = [1, 2, 3, 4, 5, 6];
            this.sort = 'DESC';
            this.btnColorArr = [];
            this.list = new List();
            this.hasInitList = false;
        }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
            this.btnDev1.on(Laya.Event.CLICK, this, this.btnDevClick);
            this.btnDev2.on(Laya.Event.CLICK, this, this.btnDevClick);
            this.btnDev3.on(Laya.Event.CLICK, this, this.btnDevClick);
            this.sort_btn.on(Laya.Event.CLICK, this, this.sortClick);
            this.btnColorArr = [this.color1, this.color2, this.color3, this.color4, this.color5, this.color6];
            for (let i in this.btnColorArr) {
                this.btnColorArr[i].on(Laya.Event.CLICK, this, this.btnColorClick);
            }
        }
        sortClick() {
            if (this.sort == 'DESC') {
                this.sort = 'ASC';
                this.sort_txt.text = '低 → 高';
            }
            else {
                this.sort = 'DESC';
                this.sort_txt.text = '高 → 低';
            }
            this.updateList();
        }
        initList() {
            if (this.hasInitList) {
                return;
            }
            this.hasInitList = true;
            this.list.itemRender = Item;
            this.list.repeatX = 4;
            this.list.x = 50;
            this.list.y = 423;
            this.list.height = 600;
            this.list.spaceX = 20;
            this.list.spaceY = 20;
            this.list.vScrollBarSkin = "";
            this.list.selectEnable = true;
            this.list.selectHandler = new Handler(this, this.onSelect);
            this.list.renderHandler = new Handler(this, this.updateItem);
            this.addChild(this.list);
            this.updateList();
        }
        loadData(params) {
            LayaBlock.getUserMachine(params).then((d) => {
                console.log(d, typeof d);
                let arr = [];
                for (let i in d) {
                    arr.push({ type: d[i].type, color: d[i].color });
                }
                this.list.array = arr;
            });
        }
        updateItem(cell, index) {
            cell.setItem(cell.dataSource);
        }
        onSelect(index) {
            console.log("当前选择的索引：" + index);
        }
        btnColorClick(e) {
            let colorX = e.currentTarget;
            colorX.alpha = colorX.alpha > 0.5 ? 0 : 1;
            this.selectColorArr = [];
            for (let i in this.btnColorArr) {
                if (this.btnColorArr[i].alpha > 0.5) {
                    this.selectColorArr.push(1 + Number(i));
                }
            }
            this.updateList();
        }
        btnDevClick(e) {
            this.btnDev1.skin = 'gameimg/dev1_1.png';
            this.btnDev2.skin = 'gameimg/dev2_1.png';
            this.btnDev3.skin = 'gameimg/dev3_1.png';
            let curBtn = e.currentTarget;
            switch (curBtn) {
                case this.btnDev1:
                    this.devType = 1;
                    break;
                case this.btnDev2:
                    this.devType = 2;
                    break;
                case this.btnDev3:
                    this.devType = 3;
                    break;
            }
            curBtn.skin = 'gameimg/dev' + this.devType + '_2.png';
            this.updateList();
        }
        updateList() {
            const params = {
                type: this.devType,
                color: this.selectColorArr,
                sort: this.sort
            };
            console.log('params', params);
            this.loadData(params);
        }
        closeClick() {
            this.visible = false;
        }
        onDisable() {
        }
    }
    var Box = Laya.Box;
    var Image = Laya.Image;
    class Item extends Box {
        constructor() {
            super();
            this.size(Item.WID, Item.HEI);
            this.bg = new Image('gameimg/bg1.png');
            this.bg.size(Item.WID, Item.HEI);
            this.addChild(this.bg);
            this.img = new Image();
            this.img.x = 10;
            this.img.y = 90;
            this.addChild(this.img);
        }
        setItem(itemData) {
            var __scale = (Item.WID - 20) / Item.machinaWid[itemData.type - 1][0];
            var __y = 0.5 * (Item.HEI - Item.machinaWid[itemData.type - 1][1] * __scale);
            this.img.scaleX = this.img.scaleY = __scale;
            this.img.y = __y;
            this.img.skin = 'machine/m' + itemData.type + '_' + itemData.color + '.png';
        }
    }
    Item.WID = 147;
    Item.HEI = 134;
    Item.machinaWid = [[230, 123], [293, 209], [312, 133]];

    class Home extends ui.HomeUI {
        constructor() {
            super();
            this.dataBus = DataBus.getDataBus();
            this.initUI = () => {
                this.devPannel.visible = false;
            };
            this.homeInit = () => {
                LayaBlock.getMineData().then((d) => {
                    console.log(d, '矿山数据' + d.surplus + '/' + d.total);
                    this.mine_txt.text = d.surplus + '/' + d.total;
                });
                LayaBlock.getUserBase().then((d) => {
                    console.log('用户基础数据：address' + JSON.stringify(d));
                    this.ethAmount_txt.text = d.ethAmount + '';
                    this.reward_txt.text = d.reward + '';
                    this.rate_txt.text = d.rate * 100 + '%';
                    this.rank_txt.text = d.rank + '';
                });
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
                LayaBlock.getAccount().then(d => {
                    console.log(d);
                });
            };
        }
        onEnable() {
            LayaBlock.initWeb3();
            this.homeInit();
            this.btnDevice.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnExchange.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnRank.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.btnMe.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
            this.initUI();
        }
        menuClick(e) {
            let curBtn = e.currentTarget;
            this.selectBg.x = curBtn.x;
            switch (curBtn) {
                case this.btnDevice:
                    this.devPannel.visible = true;
                    this.devPannel.initList();
                    break;
                case this.btnExchange:
                    break;
                case this.btnRank:
                    LayaBlock.getRankTop().then((d) => {
                        console.log(d);
                    });
                    break;
                case this.btnMe:
                    LayaBlock.getUserBase().then((d) => {
                        console.log(d);
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
