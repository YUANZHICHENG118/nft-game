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
    DataBus.account = '';

    var View = Laya.View;
    var Dialog = Laya.Dialog;
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
        class EmailUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Email");
            }
        }
        ui.EmailUI = EmailUI;
        REG("ui.EmailUI", EmailUI);
        class HelpPannelUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("HelpPannel");
            }
        }
        ui.HelpPannelUI = HelpPannelUI;
        REG("ui.HelpPannelUI", HelpPannelUI);
        class HomeUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Home");
            }
        }
        ui.HomeUI = HomeUI;
        REG("ui.HomeUI", HomeUI);
        class ItemEmailUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("ItemEmail");
            }
        }
        ui.ItemEmailUI = ItemEmailUI;
        REG("ui.ItemEmailUI", ItemEmailUI);
        class ItemRankUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("ItemRank");
            }
        }
        ui.ItemRankUI = ItemRankUI;
        REG("ui.ItemRankUI", ItemRankUI);
        class MePannelUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("MePannel");
            }
        }
        ui.MePannelUI = MePannelUI;
        REG("ui.MePannelUI", MePannelUI);
        class NoticeUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Notice");
            }
        }
        ui.NoticeUI = NoticeUI;
        REG("ui.NoticeUI", NoticeUI);
        class RankPannelUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("RankPannel");
            }
        }
        ui.RankPannelUI = RankPannelUI;
        REG("ui.RankPannelUI", RankPannelUI);
        class SetPannelUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("SetPannel");
            }
        }
        ui.SetPannelUI = SetPannelUI;
        REG("ui.SetPannelUI", SetPannelUI);
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
            if (this.hasInitList == true) {
                return;
            }
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

    class ItemEmail extends ui.ItemEmailUI {
        constructor() { super(); this.width = 660; this.height = 200; }
        onEnable() {
        }
        onDisable() {
        }
    }

    var List$1 = Laya.List;
    class EmailPannel extends ui.EmailUI {
        constructor() {
            super();
            this.list = new List$1();
            this.hasInitList = false;
            this.loadData = () => {
                console.log('加载邮件', DataBus.account);
                LayaBlock.getEmail(DataBus.account).then((d) => {
                    console.log('d:', d);
                    this.listData = [];
                    for (let i in d) {
                        this.listData.push({ id: d[i].id, title: d[i].title, time: d[i].time, content: d[i].content });
                    }
                    console.log(this.listData);
                    this.list.array = this.listData;
                });
            };
        }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
            this.btnOk1.on(Laya.Event.CLICK, this, this.closeClick);
            this.btnOk2.on(Laya.Event.CLICK, this, this.closeClick);
            this.list.itemRender = ItemEmail;
            ;
            this.list.repeatX = 1;
            this.list.x = 45;
            this.list.y = 140;
            this.list.height = 1000;
            this.list.width = 660;
            this.list.spaceX = 20;
            this.list.spaceY = 20;
            this.list.vScrollBarSkin = "";
            this.list.selectEnable = true;
            this.addChild(this.list);
        }
        updateItem(cell, index) {
        }
        onSelect(index) {
        }
        onDisable() {
        }
        closeClick() {
            this.visible = false;
        }
    }

    class HelpPannel extends ui.HelpPannelUI {
        constructor() { super(); }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
        }
        onDisable() {
        }
        closeClick() {
            this.visible = false;
        }
    }

    class MePannel extends ui.MePannelUI {
        constructor() { super(); }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
        }
        onDisable() {
        }
        closeClick() {
            this.visible = false;
        }
    }

    class Util {
        constructor() {
        }
    }
    Util.getDateStrFormat = (date, format = 'Y-M-D h:m:s') => {
        format = format.replace('Y', date.getFullYear() + '');
        format = format.replace('M', Util.format_0n(date.getMonth() + 1));
        format = format.replace('D', Util.format_0n(date.getDate()));
        format = format.replace('h', Util.format_0n(date.getHours()));
        format = format.replace('m', Util.format_0n(date.getMinutes()));
        format = format.replace('s', Util.format_0n(date.getSeconds()));
        return format;
    };
    Util.getDateStrFormatByMs = (ms, format = 'Y-M-D h:m:s') => {
        let date = new Date(ms);
        return Util.getDateStrFormat(date, format);
    };
    Util.format_0n = (n) => {
        let str = n + '';
        if (n < 10) {
            str = '0' + n;
        }
        return str;
    };

    class NoticePannel extends ui.NoticeUI {
        constructor() {
            super();
            this.loadData = () => {
                LayaBlock.getNotice().then((d) => {
                    console.log(d);
                    this.title_txt.text = d.title;
                    this.content_txt.text = d.content;
                    this.time_txt.text = Util.getDateStrFormatByMs(d.time * 1000, 'Y-M-D h:m:s');
                });
            };
        }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
            this.btnOk.on(Laya.Event.CLICK, this, this.closeClick);
        }
        onDisable() {
        }
        closeClick() {
            this.visible = false;
        }
    }

    class ItemRank extends ui.ItemRankUI {
        constructor() { super(); this.width = 750; this.height = 80; }
        onEnable() {
        }
        onDisable() {
        }
        setItem(sn, itemData) {
            this.load_txt.text = itemData.load;
            this.address_txt.text = itemData.addressShort;
            if (sn == -1) {
                this.snImg.visible = false;
                this.sn_txt.visible = true;
                this.bg.skin = 'gameimg/rankbg1.png';
            }
            else if (sn <= 2) {
                this.snImg.visible = true;
                this.sn_txt.visible = false;
                this.snImg.skin = 'gameimg/sn' + (sn + 1) + '.png';
                this.bg.skin = 'gameimg/rankbg1.png';
            }
            else {
                this.snImg.visible = false;
                this.sn_txt.visible = true;
                this.sn_txt.text = sn + 1 + '';
                this.bg.skin = 'gameimg/rankbg0.png';
            }
        }
    }

    var List$2 = Laya.List;
    var Handler$1 = Laya.Handler;
    class RankPannel extends ui.RankPannelUI {
        constructor() {
            super();
            this.sort = 'DESC';
            this.list = new List$2();
            this.hasInitList = false;
            this.listData = [];
            this.itemX = 30;
            this.itemY0 = 189;
            this.itemY1 = 290;
            this.loading = false;
            this.rankType = 0;
        }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
            this.list.itemRender = ItemRank;
            this.list.repeatX = 1;
            this.list.x = this.itemX;
            this.list.y = this.itemY1;
            this.list.height = 1000;
            this.list.spaceX = 20;
            this.list.spaceY = 10;
            this.list.vScrollBarSkin = "";
            this.list.selectEnable = true;
            this.list.selectHandler = new Handler$1(this, this.onSelect);
            this.list.renderHandler = new Handler$1(this, this.updateItem);
            this.list.array = this.listData;
            this.addChild(this.list);
            this.lastItem = new ItemRank();
            this.lastItem.x = this.itemX;
            this.lastItem.y = this.itemY0;
            this.addChild(this.lastItem);
            this.myItem = new ItemRank();
            this.myItem.x = this.itemX;
            this.myItem.y = 1220;
            this.addChild(this.myItem);
            this.rankType0.on(Laya.Event.CLICK, this, this.rankTypeClick);
            this.rankType1.on(Laya.Event.CLICK, this, this.rankTypeClick);
            this.rankType2.on(Laya.Event.CLICK, this, this.rankTypeClick);
        }
        rankTypeClick(e) {
            if (this.loading == true) {
                return;
            }
            let curBtn = e.currentTarget;
            let selectRankType = Number(curBtn.name.charAt(8));
            if (this.rankType == selectRankType) {
                return;
            }
            else {
                this.rankType = selectRankType;
            }
            this.rankType0.skin = this.rankType1.skin = this.rankType2.skin = 'gameimg/labBg0.png';
            curBtn.skin = 'gameimg/labBg1.png';
            this.updateList();
        }
        updateItem(cell, index) {
            cell.setItem(index, this.listData[index]);
        }
        onSelect(index) {
            this.listData[index].selected = !this.listData[index].selected;
        }
        onDisable() {
        }
        closeClick() {
            this.visible = false;
        }
        initList() {
            if (this.hasInitList == true) {
                return;
            }
            this.hasInitList = true;
            this.sort = 'DESC';
            this.rankType0.skin = 'gameimg/labBg1.png';
            this.rankType1.skin = 'gameimg/labBg0.png';
            this.rankType2.skin = 'gameimg/labBg0.png';
            this.sort = 'ASC';
            this.updateList();
        }
        updateList() {
            console.log('rankType:', this.rankType);
            this.loading = true;
            if (this.rankType == 0) {
                this.loadData10();
                this.loadDataMe();
                this.loadDataLast();
                this.myItem.visible = this.lastItem.visible = true;
                this.list.y = this.itemY1;
            }
            else if (this.rankType == 1) {
                this.loadData50();
                this.loadDataMe();
                this.loadDataLast();
                this.myItem.visible = this.lastItem.visible = true;
                this.list.y = this.itemY1;
            }
            else if (this.rankType == 2) {
                this.loadData100();
                this.myItem.visible = this.lastItem.visible = false;
                this.list.y = this.itemY0;
            }
        }
        loadDataMe() {
            LayaBlock.getUserRank().then((d) => {
                console.log('me:::::', d, typeof d);
                this.myItem.setItem(-1, d);
                this.myItem.sn_txt.text = 'ME';
            });
        }
        loadDataLast() {
            LayaBlock.getLastStraw().then((d) => {
                console.log('last:::::', d, typeof d);
                this.lastItem.setItem(-1, d);
                this.lastItem.sn_txt.text = 'LAST';
            });
        }
        loadData10() {
            LayaBlock.getRankTop10().then((d) => {
                console.log(d, typeof d);
                this.listData = [];
                for (let i in d) {
                    this.listData.push({ sn: i, load: d[i].load, addressShort: d[i].addressShort });
                }
                this.list.array = this.listData;
                this.loading = false;
            });
        }
        loadData50() {
            LayaBlock.getRankTop50().then((d) => {
                console.log(d, typeof d);
                this.listData = [];
                for (let i in d) {
                    this.listData.push({ sn: i, load: d[i].load, addressShort: d[i].addressShort });
                }
                this.list.array = this.listData;
                this.loading = false;
            });
        }
        loadData100() {
            LayaBlock.getGameRankTop50().then((d) => {
                console.log(d, typeof d);
                this.listData = [];
                for (let i in d) {
                    this.listData.push({ sn: i, load: d[i].load, addressShort: d[i].addressShort });
                }
                this.list.array = this.listData;
                this.loading = false;
            });
        }
    }

    class SetPannel extends ui.SetPannelUI {
        constructor() { super(); }
        onEnable() {
            this.btnClose.on(Laya.Event.CLICK, this, this.closeClick);
        }
        onDisable() {
        }
        closeClick() {
            this.visible = false;
        }
    }

    var TimeLine = Laya.TimeLine;
    class Home extends ui.HomeUI {
        constructor() {
            super();
            this.dataBus = DataBus.getDataBus();
            this.initUI = () => {
                this.devPannel = new DevPannel();
                this.addChild(this.devPannel);
                this.devPannel.visible = false;
                this.notiecPannel = new NoticePannel();
                this.addChild(this.notiecPannel);
                this.notiecPannel.visible = false;
                this.emailPannel = new EmailPannel();
                this.addChild(this.emailPannel);
                this.emailPannel.visible = false;
                this.mePannel = new MePannel();
                this.addChild(this.mePannel);
                this.mePannel.visible = false;
                this.rankPannel = new RankPannel();
                this.addChild(this.rankPannel);
                this.rankPannel.visible = false;
                this.setPannel = new SetPannel();
                this.addChild(this.setPannel);
                this.setPannel.visible = false;
                this.helpPannel = new HelpPannel();
                this.addChild(this.helpPannel);
                this.helpPannel.visible = false;
            };
            this.DataInit = () => {
                LayaBlock.getMineData().then((d) => {
                    console.log(d, '矿山数据' + d.surplus + '/' + d.total);
                    this.mine_txt.text = d.surplus + '/' + d.total;
                    this.shan.scaleY = (d.surplus / d.total) * 0.9 + 0.1;
                });
                LayaBlock.getUserMine().then((d) => {
                    console.log('用户基础数据：address' + JSON.stringify(d));
                    this.ethAmount_txt.text = d.ethAmount + '';
                    this.reward_txt.text = d.reward + '';
                    this.rate_txt.text = d.rate * 100 + '%';
                    this.rank_txt.text = d.rank + '';
                });
                LayaBlock.getAccount().then((d) => {
                    DataBus.account = d;
                });
            };
            this.addEvt = () => {
                this.btnDevice.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
                this.btnExchange.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
                this.btnRank.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
                this.btnMe.on(Laya.Event.MOUSE_DOWN, this, this.menuClick);
                this.devPannel.on(GameEvent.closePannel, this, this.closePannel);
                this.btnNotice.on(Laya.Event.CLICK, this, this.showNoticePannel);
                this.btnEmail.on(Laya.Event.CLICK, this, this.showEmailPannel);
                this.btnHelp.on(Laya.Event.CLICK, this, this.showHelpPannel);
                this.btnSet.on(Laya.Event.CLICK, this, this.showSetPannel);
                this.test_btn.on(Laya.Event.CLICK, this, this.test);
            };
            this.test = () => {
                this.machineGo({});
            };
            this.closePannel = () => {
                this.selectBg.x = -300;
            };
            this.showHelpPannel = () => {
                this.helpPannel.visible = true;
            };
            this.showSetPannel = () => {
                this.setPannel.visible = true;
            };
            this.showNoticePannel = () => {
                this.notiecPannel.visible = true;
                this.notiecPannel.loadData();
            };
            this.showEmailPannel = () => {
                this.emailPannel.visible = true;
                this.emailPannel.loadData();
            };
            this.machineGo = (obj) => {
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
                LayaBlock.getRankTop10().then((d) => {
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
                        console.log("token=====", item.symbol);
                    });
                });
                LayaBlock.getAccount().then(d => {
                    console.log(d);
                });
            };
        }
        onEnable() {
            LayaBlock.initWeb3();
            LayaBlock.getGameServer().then((d) => {
                LayaBlock.activeGame(d[0], this.machineGo);
                LayaBlock.getUserBase().then((d) => {
                    console.log("userBase==", d);
                });
                this.initUI();
                this.DataInit();
                this.addEvt();
            });
        }
        onComplete() {
        }
        onLabel(label) {
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
                    Laya.Browser.window.location.href = LayaBlock.exchangeUrl;
                    break;
                case this.btnRank:
                    this.rankPannel.visible = true;
                    this.rankPannel.initList();
                    break;
                case this.btnMe:
                    this.mePannel.visible = true;
                    LayaBlock.getUserMine().then((d) => {
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
