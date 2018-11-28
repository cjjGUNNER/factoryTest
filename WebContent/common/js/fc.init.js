/**
 * 禁用鼠标右键
 */
document.oncontextmenu = function(e){return false;}

//创建String对象的replaceAll方法
String.prototype.replaceAll = function(s1,s2) {	
	return this.replace(new RegExp(s1,"gm"),s2); 
};

//删除Array数组中的元素
Array.prototype.delElement=function(index) {	
	if(index<0){
		//如果index<0，则不进行任何操作
		return this;
	}else{
		return this.slice(0,index).concat(this.slice(index+1,this.length));
	}
}

/**
 * 禁止复制、粘贴、剪切操作(0=不禁止；1=禁止复制、剪切；2=禁止复制、粘贴、剪切)
 */
var forbidCopeFlag = 0;
var preKeyCode = 0;
$(function(){
	if(forbidCopeFlag==1){	
		//注意，不能使用jquery来设置，若采用则某些浏览器禁止不了
		var body = document.getElementsByTagName("body")[0];		
		body.setAttribute("oncopy","return false");
		body.setAttribute("oncut","return false");	
		
		document.onkeydown = function(e){
			var copeFlag = false;
			if(preKeyCode==17) {	
				if( window.event.keyCode==67 || window.event.keyCode==88){
					window.event.returnValue=false; //适用于IE:禁用复制、剪切
					copeFlag = true;  //解决ctrl一直按住情况
				}
			}
			if(copeFlag==false){
				preKeyCode = window.event.keyCode;
			}
		};
	}else if(forbidCopeFlag == 2){
		//注意，不能使用jquery来设置，若采用则某些浏览器禁止不了
		var body = document.getElementsByTagName("body")[0];
		body.setAttribute("onpaste","return false"); 
		body.setAttribute("oncopy","return false");
		body.setAttribute("oncut","return false");
		
		document.onkeydown = function(e){
			var copeFlag = false;
			if(preKeyCode==17) {	
				if( window.event.keyCode==67 || window.event.keyCode==88 || window.event.keyCode==86){	
					window.event.returnValue=false; //适用于IE:禁用复制、剪切、粘贴
					copeFlag = true;  //解决ctrl一直按住情况
				}
			}
			if(copeFlag==false){
				preKeyCode = window.event.keyCode;
			}
		};
	}	
});