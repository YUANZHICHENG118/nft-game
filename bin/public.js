var uid;
var userName;
var msgs;
var userList={};
var COMM={
	connectState:false,//链接状态

	//发送服务器数据	
	loadData:function(data){
		console.log(data);
		setTimeout(onGameData,1000,{msg:'hi',flag:data});
	}	
};

function onGameData(data){
	eval('Laya.stage.event("gameData",data);')
}
window.onload=function () {
	uid=getQueryVariable('uid');			
	userName=decodeURI(getQueryVariable('userName'));
}

function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
	   var pair = vars[i].split("=");
	   if(pair[0] == variable){return pair[1];}
   }
   return(false);
}