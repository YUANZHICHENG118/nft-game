(function () {
    'use strict';

    class GameEvent extends Laya.Script {
        constructor() {
            super();
        }
    }
    GameEvent.flag1 = "flag1";
    GameEvent.closePannel = 'closePannel';

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
        class AniMachineUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("AniMachine");
            }
        }
        ui.AniMachineUI = AniMachineUI;
        REG("ui.AniMachineUI", AniMachineUI);
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
            this.devTypeArr = [1, 2, 3];
            this.selectColorArr = [1, 2, 3, 4, 5, 6];
            this.sort = 'DESC';
            this.devArr = [];
            this.btnColorArr = [];
            this.list = new List();
            this.hasInitList = false;
        }
        onEnable() {
            this.btnColorArr = [this.color1, this.color2, this.color3, this.color4, this.color5, this.color6];
            this.devArr = [this.btnDev1, this.btnDev2, this.btnDev3];
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
            this.btnDev1.on(Laya.Event.CLICK, this, this.btnDevClick);
            this.btnDev2.on(Laya.Event.CLICK, this, this.btnDevClick);
            this.btnDev3.on(Laya.Event.CLICK, this, this.btnDevClick);
            this.sort_btn.on(Laya.Event.CLICK, this, this.sortClick);
            for (let i in this.btnColorArr) {
                this.btnColorArr[i].on(Laya.Event.CLICK, this, this.btnColorClick);
            }
            this.selectAll_btn.on(Laya.Event.CHANGE, this, this.selectAllClick);
            this.stakeTokenNft_btn.on(Laya.Event.CLICK, this, this.stakeTokenNft);
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
        }
        stakeTokenNft() {
            var machineNum = 0;
            var obj = {};
            for (var i in this.listData) {
                if (this.listData[i].selected == true) {
                    machineNum++;
                    let id = this.listData[i].id;
                    if (obj[id]) {
                        obj[id] += 1;
                    }
                    else {
                        obj[id] = 1;
                    }
                }
            }
            if (machineNum == 0) {
                alert('您还没有选择设备呢');
                return;
            }
            console.log('obj', obj);
            LayaBlock.stakeTokenNft(obj);
            this.closeClick();
            this.event(GameEvent.closePannel);
        }
        selectAllClick(e) {
            for (let i in this.listData) {
                this.listData[i].selected = this.selectAll_btn.selected;
            }
            this.list.array = this.listData;
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
            this.devTypeArr = [1, 2, 3];
            this.selectColorArr = [1, 2, 3, 4, 5, 6];
            this.sort = 'DESC';
            this.btnDev1.skin = 'gameimg/dev1_2.png';
            this.btnDev2.skin = 'gameimg/dev2_2.png';
            this.btnDev3.skin = 'gameimg/dev3_2.png';
            this.btnColorArr = [this.color1, this.color2, this.color3, this.color4, this.color5, this.color6];
            for (let i in this.btnColorArr) {
                this.btnColorArr[i].alpha = 1;
            }
            this.sort = 'ASC';
            this.sort_txt.text = '低 → 高';
            this.selectAll_btn.selected = false;
            this.auto_btn.selected = false;
            this.updateList();
        }
        loadData(params) {
            LayaBlock.getUserMachine(params).then((d) => {
                console.log(d, typeof d);
                this.listData = [];
                for (let i in d) {
                    this.listData.push({ id: d[i].id, type: d[i].type, color: d[i].color, selected: false });
                }
                this.list.array = this.listData;
            });
        }
        updateItem(cell, index) {
            cell.setItem(cell.dataSource);
        }
        onSelect(index) {
            this.listData[index].selected = !this.listData[index].selected;
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
            let curBtn = e.currentTarget;
            let type = Number(curBtn.skin.charAt(11));
            console.log('===', curBtn.skin.charAt(13));
            let color = Number(curBtn.skin.charAt(13));
            color = color == 1 ? 2 : 1;
            curBtn.skin = 'gameimg/dev' + type + '_' + color + '.png';
            console.log('curBtn.skin=', curBtn.skin);
            this.devTypeArr = [];
            for (var i in this.devArr) {
                if (this.devArr[i].skin.indexOf('_2.png') > 0) {
                    this.devTypeArr.push(Number(i) + 1);
                }
            }
            console.log(this.devTypeArr);
            this.updateList();
        }
        updateList() {
            const params = {
                type: this.devTypeArr,
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
            this.bg.skin = 'gameimg/bg' + (itemData.selected ? 2 : 1) + '.png';
        }
    }
    Item.WID = 147;
    Item.HEI = 134;
    Item.machinaWid = [[230, 123], [293, 209], [312, 133]];

    class AniMachine extends ui.AniMachineUI {
        constructor() {
            super();
            this.machineConfig = { 1: { x: 21, y: 66, w: 267, h: 162 }, 2: { x: 13, y: 0, w: 241, h: 225 }, 3: { x: 0, y: 102, w: 267, h: 123 } };
        }
        onEnable() {
            this.img.x = this.machineConfig[this.obj.type].x;
            this.img.y = this.machineConfig[this.obj.type].y;
            let skin = 'machine/m' + this.obj.type + '_c' + this.obj.color + '.png';
            this.img.skin = skin;
            this.ani1.play(0, true);
        }
        onDisable() {
        }
    }

    var TimeLine = Laya.TimeLine;
    class Home extends ui.HomeUI {
        constructor() {
            super();
            this.dataBus = DataBus.getDataBus();
            this.test = () => {
                this.machineGo({});
            };
            this.closePannel = () => {
                this.selectBg.x = -300;
            };
            this.initUI = () => {
                this.devPannel.visible = false;
                this.machines.removeChildAt(0);
            };
            this.machineGo = (obj) => {
                obj = { id: 1, type: (Math.random() * 3 + 1) | 0, color: (Math.random() * 6 + 1) | 0 };
                let aniMachine = new AniMachine();
                aniMachine.obj = obj;
                aniMachine.scale(-0.5, 0.5);
                aniMachine.pos(-100, 1200);
                this.machines.addChild(aniMachine);
                let timeLine = new TimeLine();
                let dy = 30;
                timeLine.addLabel("road1", 0).to(aniMachine, { x: 900, y: 814 + dy }, 4000, null, 0)
                    .addLabel("road2", 0).to(aniMachine, { x: 800, y: 490 + dy, scaleX: 0.3, scaleY: 0.3, alpha: 1 }, 1000, null, 0)
                    .addLabel("road3", 0).to(aniMachine, { x: 520, y: 440 + dy, scaleX: 0.2, scaleY: 0.2, alpha: 1 }, 4000, null, 0)
                    .addLabel("road4", 0).to(aniMachine, { x: 400, y: 430 + dy, scaleX: 0.1, scaleY: 0.1, alpha: 1 }, 3000, null, 0)
                    .addLabel("road5", 0).to(aniMachine, { x: 270, y: 380 + dy, scaleX: 0.06, scaleY: 0.06, alpha: 1 }, 6000, null, 0);
                timeLine.play(0, false);
                timeLine.on(Laya.Event.COMPLETE, this, this.onComplete);
                timeLine.on(Laya.Event.LABEL, this, this.onLabel);
            };
            this.homeInit = () => {
                LayaBlock.getMineData().then((d) => {
                    console.log(d, '矿山数据' + d.surplus + '/' + d.total);
                    this.mine_txt.text = d.surplus + '/' + d.total;
                    this.shan.scaleY = (d.surplus / d.total) * 0.9 + 0.1;
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
            this.devPannel.on(GameEvent.closePannel, this, this.closePannel);
            this.test_btn.on(Laya.Event.CLICK, this, this.test);
            this.initUI();
        }
        onComplete() {
            console.log("timeLine complete!!!!");
        }
        onLabel(label) {
            console.log("LabelName:" + label);
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
