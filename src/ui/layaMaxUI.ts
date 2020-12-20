/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui {
    export class AniMachineUI extends Scene {
		public ani1:Laya.FrameAnimation;
		public img:Laya.Image;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("AniMachine");
        }
    }
    REG("ui.AniMachineUI",AniMachineUI);
    export class BlackBgUI extends Scene {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("BlackBg");
        }
    }
    REG("ui.BlackBgUI",BlackBgUI);
    export class DevPannelUI extends Scene {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public btnDev1:Laya.Image;
		public btnDev2:Laya.Image;
		public btnDev3:Laya.Image;
		public stakeTokenNft_btn:Laya.Image;
		public sort_btn:Laya.Sprite;
		public sort_txt:Laya.Label;
		public color1:Laya.Sprite;
		public color2:Laya.Sprite;
		public color3:Laya.Sprite;
		public color4:Laya.Sprite;
		public color5:Laya.Sprite;
		public color6:Laya.Sprite;
		public auto_btn:Laya.CheckBox;
		public selectAll_btn:Laya.CheckBox;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("DevPannel");
        }
    }
    REG("ui.DevPannelUI",DevPannelUI);
    export class EmailUI extends Dialog {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public btnOk1:Laya.Image;
		public title_txt:Laya.Label;
		public notie_txt:Laya.TextArea;
		public btnOk2:Laya.Image;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Email");
        }
    }
    REG("ui.EmailUI",EmailUI);
    export class HomeUI extends Scene {
		public selectBg:Laya.Sprite;
		public btnDevice:Laya.Sprite;
		public btnExchange:Laya.Sprite;
		public btnRank:Laya.Sprite;
		public btnMe:Laya.Sprite;
		public btnSet:Laya.Sprite;
		public btnHelp:Laya.Sprite;
		public btnNotice:Laya.Sprite;
		public gongGao_txt:Laya.Label;
		public test_btn:Laya.Sprite;
		public mine_txt:Laya.Label;
		public ethAmount_txt:Laya.Label;
		public rank_txt:Laya.Label;
		public rate_txt:Laya.Label;
		public reward_txt:Laya.Label;
		public machines:Laya.Sprite;
		public mount_mask:Laya.Sprite;
		public shan:Laya.Sprite;
		public btnEmail:Laya.Sprite;
		public btnChat:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Home");
        }
    }
    REG("ui.HomeUI",HomeUI);
    export class NoticeUI extends Scene {
		public devPanel:Laya.Sprite;
		public btnClose:Laya.Sprite;
		public btnOk:Laya.Image;
		public title_txt:Laya.Label;
		public notie_txt:Laya.TextArea;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Notice");
        }
    }
    REG("ui.NoticeUI",NoticeUI);
}