var validateSubmitOnce = true; //用于限制验证字段时只提交一次请求,当要验证的字段改变时该值设为true,避免只能验证一次

var fcUrl="/factoryTest/";
/**
 * 将请求地址加上时间戳，防止浏览器缓存
 */
function getTimeURL(url){	
	if(url.indexOf("?") == -1){
		url += "?timeStamp=" + new Date().getTime();
	}else{
		url += "&timeStamp=" + new Date().getTime();
	}
	return encodeURI(url);
}

/**
 * 通用combobox
 */
function combobox_1(id,url,editable){
	$("#" + id).combobox({   
	    url:url,
	    valueField:'id',
	    textField:'text',
	    editable:editable
	});
}

/**
 * 通用combobox
 */
function combobox_2(className,url,editable){
	$("." + className).each(function(){
		$(this).combobox({   
		    url:url,   
		    valueField:'id',
		    textField:'text',
		    editable:editable
		});	
	});
}

/**
 * easyui 数字combobox
 * @param elementId
 * @param selectValue
 * @param numArray
 */
function numCombobox(elementId,selectValue,prec,numArray){
	if(numArray == undefined){		
		numArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	}
	var data = "["; 
	var i=0;
	for(;i<numArray.length-1;i++){		
		data += '{"id": ' + numArray[i].toFixed(prec) + ', "text": "' + numArray[i].toFixed(prec) + '"},';		
	}
	data += '{"id": ' + numArray[i].toFixed(prec) + ', "text": "' + numArray[i].toFixed(prec) + '"}]';	
	$("#" + elementId + "Select").combobox({
		data: eval(data),
		valueField:'id',
		textField:'text',
		onSelect:function(data){
			$("#" + elementId).val(data.text);
			$("#" + elementId).focus();
			$("#" + elementId).blur();
		},
		onChange:function(data){			
			$("#" + elementId).val(data);
			$("#" + elementId).focus();
			$("#" + elementId).blur();
		}
	}).combobox("select",selectValue);
}

/**
 * easyui 数字combobox
 * @param elementId
 * @param selectValue
 * @param numArray
 */
function numCombobox_2(elementId,selectValue,prec,num){
	var numArray = null;
	if(num == undefined){		
		numArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	}else{
		numArray = new Array();
		for(var i=0;i<num;i++){
			numArray[i] = i+1;
		}
	}
	var data = "["; 
	var i=0;
	for(;i<numArray.length-1;i++){		
		data += '{"id": ' + numArray[i].toFixed(prec) + ', "text": "' + numArray[i].toFixed(prec) + '"},';		
	}
	data += '{"id": ' + numArray[i].toFixed(prec) + ', "text": "' + numArray[i].toFixed(prec) + '"}]';	
	$("#" + elementId + "Select").combobox({
		data: eval(data),
		valueField:'id',
		textField:'text',
		onSelect:function(data){
			$("#" + elementId).val(data.text);
			$("#" + elementId).focus();
			$("#" + elementId).blur();
		},
		onChange:function(data){			
			$("#" + elementId).val(data);
			$("#" + elementId).focus();
			$("#" + elementId).blur();
		}
	}).combobox("select",selectValue);
}


/**
 * 回车键按下时击发事件
 */
function enterKeyDown(id,fn){	
	$("#" + id).keydown(function(event){
		event = event || window.event;
		if(event.keyCode==13){
			fn();
		}			
	});
}

/**
 * 通过uploadify上传单个文件
 */
function uploadOneFile(id,url,fileSizeLimit,width,height,uploadMessage,fileSavePath,fileSaveName,imgId){	
	$("#" + id).uploadify({
		'swf':fcUrl+'common/uploadify/uploadify.swf',
		'uploader': url,		
		'progressData':'speed',
		'fileObjName':'uploadFile', //该属性必须与Controller中的File类型属性相对应
		'removeCompleted':true,
		'multi':false,
		'auto':true,
		'buttonImage':fcUrl+'common/uploadify/button_image_1.png',
		'width':width,
		'height':height,
		'fileSizeLimit':fileSizeLimit,		
        'formData':{'fileSavePath' : fileSavePath,'fileSaveName':$('#' + fileSaveName).val()},
        'onDialogOpen' : function() {        	
        	$("#" + uploadMessage).html("");
        },
        'onSelectError' : function(file,errorCode,errorMsg) {        	
        	if(errorCode == -110){        		
        		$("#" + uploadMessage).html("<img src="+fcUrl+"'common/images/error.gif' style='vertical-align: middle;'/><font color='red'>" + file.name + "超过上传上限（" + fileSizeLimit + "），上传失败!</font>");
        	}
        },        
        'onUploadSuccess': function (file, data, response){
        	var data = data.split("_");
         	if(data[0] == "ok"){  
         		$("#" + fileSaveName).val(data[1]);
         		$("#" + uploadMessage).html("<img src='"+fcUrl+"common/images/success.gif' style='vertical-align: middle;'/><font color='green'>文件上传成功！</font>");
         		$("#" + uploadMessage).fadeIn(1000).fadeOut(3000,function(){$("#" + uploadMessage).html('');});	
         		$('#' + id).uploadify('destroy');
         		$("#" + fileSaveName).click();
         		if(imgId==null || imgId == ""){
         		}else{
         			$("#" + imgId).attr("src",fcUrl+fileSavePath+"/"+data[1]+"?"+new Date().getTime());
         		}
         	}
         }
	});	
}

/**
 * 表单元素格式验证 
 */
function baseFormValidator(elementId,elementName,minLength,maxLength,regexFlag){	
	var onshowStr = "请输入" + elementName;
	var onfocusStr;
	if(regexFlag == "chinese"){
		onfocusStr = elementName + "由" + parseInt(minLength/2) + "~" + parseInt(maxLength/2) + "个";
	}else{
		onfocusStr = elementName + "由" + minLength + "~" + maxLength + "个";
	}
	
	var oncorrectStr = elementName + "输入正确！";
	var emptyStr = {leftEmpty:false,rightEmpty:false,emptyError: elementName + "两边不能输入空格"};
	var onerrorStr =  elementName + "由";
	var regexStr = "";
	if(regexFlag == "ascii"){
		regexStr = "英文符号";
	}else if(regexFlag == "username"){
		regexStr = "字母、数字";					
	}else if(regexFlag == "chinese"){
		regexStr = "汉字";					
	}else if(regexFlag == "letter"){
		regexStr = "英文字母";				
	}else if(regexFlag == "decmal6"){
		regexStr = "正浮点数";				
	}else if(regexFlag == "intege1"){
		regexStr = "正整数";				
	}else if(regexFlag == "intege3"){
		regexStr = "正整数";				
	}else if(regexFlag == "intege"){
		regexStr = "整数";				
	}else if(regexFlag == "mobileOrNull"){
		regexStr = "整数";				
	}else if(regexFlag == "num"){
		regexStr = "整数";				
	}else if(regexFlag == "date"){
		onfocusStr = "日期由年-月-日格式";	
		onerrorStr = onfocusStr;				
	}else if(regexFlag == "time"){
		onfocusStr = elementName + "由00:00:00格式";	
		onerrorStr = onfocusStr;
	}else{	
		regexStr = "中英文字符";		
	}	
	regexStr += "组成";
	if(regexFlag == undefined){
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onfocusStr + regexStr, onCorrect: oncorrectStr})
		.inputValidator({min: minLength,max: maxLength,empty: emptyStr,	onError: onfocusStr + regexStr});
	}else if(regexFlag == "mobileOrNull") {
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: elementName + "由11位数字组成", onCorrect: oncorrectStr})
		.inputValidator({min: minLength,max: maxLength,empty: emptyStr,	onError: elementName + "由11位数字组成"})
		.regexValidator({regExp: "^(|1[3|4|5|8]\\d{9})$",dataType:"string",onError: elementName + "由11位数字组成"});
	}else{
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onfocusStr + regexStr, onCorrect: oncorrectStr})
		.inputValidator({min: minLength,max: maxLength,empty: emptyStr,	onError: onfocusStr + regexStr})
		.regexValidator({regExp: regexFlag,dataType:"enum",onError: onerrorStr + regexStr});
	}	
}


/**
 * 表单元素AJAX逻辑验证
 */
function ajaxFormValidator(elementId,elementName,minLength,maxLength,ajaxUrl,regexFlag){
	var onshowStr = "请输入" + elementName;
	var onfocusStr = elementName + "由" + minLength + "~" + maxLength + "个";
	var oncorrectStr = "恭喜，该" + elementName + "可用！";
	var emptyStr = {leftEmpty:false,rightEmpty:false,emptyError: elementName + "两边不能输入空格"};
	var onerrorStr =  elementName + "由";
	var regexStr = "";
	if(regexFlag == "ascii"){
		regexStr = "英文符号";
	}else if(regexFlag == "username"){
		regexStr = "字母、数字";					
	}else if(regexFlag == "chinese"){
		regexStr = "汉字";					
	}else if(regexFlag == "letter"){
		regexStr = "英文字母";				
	}else if(regexFlag == "time"){
		onfocusStr = elementName + "由00:00:00格式";	
		onerrorStr = onfocusStr;
	}else{	
		regexStr = "中英文字符";		
	}	
	regexStr += "组成";
	if(regexFlag == undefined){
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onfocusStr + regexStr, onCorrect: oncorrectStr})
		.inputValidator({min: minLength,max: maxLength,empty: emptyStr,	onError: onfocusStr + regexStr})
		.ajaxValidator({type:"get",url:ajaxUrl,dataType:"json",beforeSend:function(){if(validateSubmitOnce==true){validateSubmitOnce=false;return true;}else{return false;}},success:function(data){if(data=="ok"){return true;}else{return false;}},error:function(){alert("服务器连接错误，请重试...");},onError:"该" + elementName + "已被使用，请重输！",onWait:"正在校验，请稍候..."});
	}else{
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onfocusStr + regexStr, onCorrect: oncorrectStr})
		.inputValidator({min: minLength,max: maxLength,empty: emptyStr,	onError: onfocusStr + regexStr})
		.regexValidator({regExp: regexFlag,dataType:"enum",onError: onerrorStr + regexStr})
		.ajaxValidator({type:"get",url:ajaxUrl,dataType:"json",beforeSend:function(){if(validateSubmitOnce==true){validateSubmitOnce=false;return true;}else{return false;}},success:function(data){if(data=="ok"){return true;}else{return false;}},error:function(){alert("服务器连接错误，请重试...");},onError:"该" + elementName + "已被使用，请重输！",onWait:"正在校验，请稍候..."});
	}
}
/**
 * 数字验证
 */
function numFormValidator(elementId,elementName,minLength,maxLength,regexFlag,ajaxUrl){	
	var onshowStr = "请输入" + elementName;
	var onfocusStr = elementName + "由" + minLength + "~" + maxLength + "之间的";
	var oncorrectStr = elementName + "输入正确！";
	var emptyStr = {leftEmpty:false,rightEmpty:false,emptyError: elementName + "两边不能输入空格"};
	var onerrorStr =  elementName + "由";
	var regexStr = "";
	if(regexFlag == "intege1"){
		regexStr = "正整数";	
	}else if(regexFlag == "decmal1"){
		regexStr = "正浮点数";	
	}else if(regexFlag == "decmal6"){
		regexStr = "1位小数";	
	}	
	regexStr += "组成";	
	if(ajaxUrl == undefined){
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onfocusStr + regexStr, onCorrect: oncorrectStr})
			.inputValidator({min: minLength,max: maxLength,type:"number",empty: emptyStr,	onError: onfocusStr + regexStr})
			.regexValidator({regExp: regexFlag,dataType:"enum",onError: onerrorStr + regexStr});
	}else{
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onfocusStr + regexStr, onCorrect: oncorrectStr})
			.inputValidator({min: minLength,max: maxLength,type:"number",empty: emptyStr,	onError: onfocusStr + regexStr})
			.regexValidator({regExp: regexFlag,dataType:"enum",onError: onerrorStr + regexStr})
			.ajaxValidator({type:"get",url:ajaxUrl,dataType:"json",beforeSend:function(){if(validateSubmitOnce==true){validateSubmitOnce=false;return true;}else{return false;}},success:function(data){if(data=="ok"){return true;}else{return false;}},error:function(){alert("服务器连接错误，请重试...");},onError:"该" + elementName + "已被使用，请重输！",onWait:"正在校验，请稍候..."});
	}
}

/**
 * Select元素AJAX逻辑验证
 */
function selectFormValidator(elementId,elementName,ajaxUrl){
	var onshowStr = "请选择" + elementName;	
	var oncorrectStr = "恭喜，该" + elementName + "可用！";	
	if(ajaxUrl == undefined){
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onshowStr, onCorrect: oncorrectStr});
	}else{
		$("#" + elementId).formValidator({onShow: onshowStr,onFocus: onshowStr, onCorrect: oncorrectStr})
		.ajaxValidator({type:"get",url:ajaxUrl,dataType:"json",beforeSend:function(){if(validateSubmitOnce==true){validateSubmitOnce=false;return true;}else{return false;}},success:function(data){if(data=="ok"){return true;}else{return false;}},error:function(){alert("服务器连接错误，请重试...");},onError:"该" + elementName + "已被使用，请重新选择！",onWait:"正在校验，请稍候..."});
	}
}
/**
 * 角色list
 */
var viewRoleList = function(elem,id,name){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"maintain/roleInfo/rList.do"),
		async : false,
		success : function(data){
			$elem.html("");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.roleName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.roleName+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].roleName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}

/**
 * 产品类别list
 */
var viewProductList = function(elem,id,name){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"order/productType/productList.do"),
		async : false,
		success : function(data){
			$elem.html("");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.productName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.productName+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].productName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
function combobox(id,url,textField){		
	$("#"+id).combobox({   
	    url:url,   
	    valueField:'id',
	    textField:textField,
	    editable:true
	});	
}
/**
 * 部件类别list
 */
var viewPartList = function(elem,id,name){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"order/partType/partList.do"),
		async : false,
		success : function(data){
			$elem.html("");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.partName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.partName+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].partName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
/**
 * 工序类别list
 */
var viewProcessList = function(elem,id,name){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"order/processType/processList.do"),
		async : false,
		success : function(data){
			$elem.html("");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.processName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.processName+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].processName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
/**
 * 订单list
 */
var viewScOrderList = function(elem,id,name){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"order/scOrder/orderList.do"),
		async : false,
		success : function(data){
			$elem.html("");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.scOrderName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.scOrderName+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].scOrderName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
//业务订单list
var ywOrder;
var viewYwOrderList = function(elem,id,name){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"order/ywOrder/orderList.do"),
		async : false,
		success : function(data){
			$elem.html("");
			ywOrder =data
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.ywOrderName+"--"+v.ywOrderCode+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.ywOrderName+"--"+v.ywOrderCode+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].ywOrderName+"--"+ data[0].ywOrderCode;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
/**
 * 订单产品list
 */
var viewScProductList = function(elem,id,name,scOrderId){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"order/scProduct/productList.do?scOrderId="+scOrderId),
		async : false,
		success : function(data){
			$elem.html("");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.scProductName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.scProductName+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].scProductName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
/**
 * 部件类别list
 */
var viewScPartList = function(elem,id,name,scProductId){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"order/scPart/partList.do?scProductId="+scProductId),
		async : false,
		success : function(data){
			$elem.html("");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.scPartName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.scPartName+"</option>"); 
				}
			});
			if(id==""||id==null){
				_data.id = data[0].id;
				_data.name = data[0].scPartName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
/**
 * 订单产品list
 */
var viewContactList = function(elem,id,name){
	this.$elem = $("#" + elem);
	var _data = {};
	$.ajax({
		type : "GET",
		url : getTimeURL(fcUrl+"maintain/customerInfo/customerList.do"),
		async : false,
		success : function(data){
			$elem.html("");
			$elem.append("<option value=''></option>");
			$.each(data, function(k,v){
				if(id==v.id){
					$elem.append("<option selected value='"+v.id+"'>"+v.customerName+"</option>"); 
				}else{
					$elem.append("<option value='"+v.id+"'>"+v.customerName+"</option>"); 
				}
			});
			if(id==""||id==null){
				//_data.id = data[0].id;
				//_data.name = data[0].scProductName;
			}else{
				_data.id = id;
				_data.name = name;
			}
		}
	});
	return _data;
}
//日期格式转换
var getFormatDate = function(l, flag) {
	var date = new Date(parseInt(l));
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if (minute >= 0 && minute <= 9) {
		minute = "0" + minute;
	}
	if (second >= 0 && second <= 9) {
		second = "0" + second;
	}
	var currentdate;
	if (flag) {
		currentdate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	} else {
		currentdate = year + "-" + month + "-" + day;
	}
	return currentdate;
}
/**
 * 点击按钮弹出图片
 */
function viewPic(url){
	if($("#msw_pic_window").length==0){	
		$("body").append("<div id='msw_pic_window'></div>");
	}	
	$("#msw_pic_window").html("<img src='" + url + "' width='400' height='300'/>");
	$('#msw_pic_window').window({
		title : "查看图片",
		modal : true,
		width : 414,
		height : 336,
		shadow : false,
		closed : false,
		minimizable : false,
		maximizable : false,
		collapsible : false,
		iconCls : 'icon-search',
		resizable : false,
		top:($(window).height() - 350) * 0.5,
		left:($(window).width() - 450) * 0.5
	});	
}