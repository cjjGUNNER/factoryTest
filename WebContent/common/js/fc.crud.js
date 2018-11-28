var tableWidth = 1150; //表格宽度
var tableHeight = 800; //表格高度
var tablePageSize = 15; //表格默认记录条数
var tablePageList = [5,10,15,20,25,30,35,40]; //表格页面记录列表
var toolbarView; //表格显示添加、删除按钮的方式：1=显示添加；2=显示添加删除
var tableTitle; //表格标题
var tableURL; //表格请求地址
var tableColumns; //表格字段信息
var tableQueryParams; //表格请求参数
var formSubmitOnce = true;	//用于限制添加和修改表单只提交一次

/**
 * 装载表格第1页数据
 */
function loadFirstPageData() {
	var toolbarVar;
	var addBar = {
			id : 'btnadd',
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				$('#datagrid_add').css("display","block");
				// 打开添加窗口
				$('#datagrid_add').window({
					title : addTitle,
					modal : true,
					width : addWidth,
					height : addHeight,
					shadow : false,
					closed : false,
					minimizable : false,
					maximizable : false,
					collapsible : false,
					iconCls : 'icon-add',
					resizable : false,
					//top:($(window).height() - addHeight) * 0.5,
					top : 50,
					left : ($(window).width() - addWidth) * 0.5,
					onBeforeClose: function () {
						$('#datagrid_table').datagrid('reload')
					}
				});
				clearFormData($("#add_form")); //清空表单历史数据
				initAddForm(); //初始化添加表单数据
			}
		};
	var disableBar =  {
			id : 'btncut',
			text : '禁用',
			iconCls : 'icon-remove',
			handler : function() {
				updateDisabled('禁用',1); 
			}
		};
	var enableBar =  {
			id : 'btncut',
			text : '起用',
			iconCls : 'icon-ok',
			handler : function() {
				updateDisabled('起用',0); 
			}
		};
	var deleteBar = {
			id : 'btncut',
			text : '删除',
			iconCls : 'icon-cancel',
			handler : function() {
				deleteRecords(); 
			}
		};	
	if(toolbarView==1){	
		toolbarVar = [addBar];		
	}else if(toolbarView==2){	
		toolbarVar = [addBar,'-',disableBar,'-',enableBar];
	}else if(toolbarView==3){		
		toolbarVar = [addBar,'-',deleteBar];
	}else if(toolbarView==4){
		toolbarVar = [addBar,'-',disableBar,'-',enableBar,'-',deleteBar];
	}else if(toolbarView==5){
		toolbarVar = [disableBar,'-',enableBar,'-',deleteBar];
	}
	
	// datagrid表格
	$('#datagrid_table').datagrid({
		title : tableTitle,
		iconCls : 'icon-save',
		width : tableWidth,
		height : tableHeight,
		nowrap : false,
		striped : true,	
		url : tableURL,
		pageNumber : 1, // 指定当前页码为第1页
		remoteSort : true,
		idField : 'id',
		pagination : true, // 支持分页		
		pageSize: tablePageSize,
		pageList: tablePageList,
		queryParams: tableQueryParams,
		pagePosition:'top',
		rownumbers : true, // 显示记录编号
		toolbar : toolbarVar,		
		checkOnSelect:true,
		onLoadSuccess : function(data) {			
			setTimeout(function() {			
				$(".fc_linkbutton").linkbutton({plain:true});
			}, 10);
		},
		columns : tableColumns
	});
	$('#datagrid_table').datagrid('hideColumn','id'); //隐藏id字段	
}

/**
 * 打开修改窗口
 */
function datagridUpdate(viewURI) {	
	$.post(viewURI,function(jsonObject){		
		$('#datagrid_update').css("display","block");
		$('#datagrid_update').window({
			title : updateTitle,
			modal : true,
			width : updateWidth,
			height : updateHeight,
			shadow : false,
			closed : false,
			minimizable : false,
			maximizable : false,
			collapsible : false,
			iconCls : 'icon-edit',
			resizable : false,
			//top:($(window).height() - updateHeight) * 0.5,
			top:50,
			left:($(window).width() - updateWidth) * 0.5
		});
		clearFormData($("#update_form")); //清空表单历史数据
		initUpdateForm(jsonObject);  //初始化修改表单		
	},"json");
}

/**
 * 添加表单处理过程
 */
function addFormProcess(focusId,messagerFlag,loadFirstPageFlag){
	formSubmitOnce = true; //每次打开窗口formSubmitOnce都重新设为true
	$("#" + focusId).focus();  //光标定位			
	var addForm = $('#add_form');	
	$.formValidator.initConfig({
		formID : addForm.attr("id"),
		submitOnce:true,		
		onSuccess : function() {		
			if(formSubmitOnce==true){
				//第一次提交表单前formSubmitOnnce设为false，避免重复提交表单
				formSubmitOnce = false;
				//验证成功后以异步方式提交表单
				$.post(addForm.attr("action"),addForm.serialize(),
					function(data){
						if(data=="ok"){						
							$('#datagrid_add').window('close');  //关闭添加窗口
							$.messager.alert("添加成功",messagerFlag + "添加成功！",'info');  //提示添加信息成功							
							if(loadFirstPageFlag){								
								loadFirstPageData(); //重新装载第1页数据
							}else{								
								$('#datagrid_table').datagrid('reload',{fc_param_1:$("#fc_param_1").val()});
							}				    		
						}
					},"json");				
				return false;
			}
		}
	});	
}

/**
 * 修改表单处理过程
 */
function updateFormProcess(focusId,messagerFlag){
	formSubmitOnce = true; //每次打开窗口formSubmitOnce都重新设为true
	$("#" + focusId).focus();  //光标定位
	var updateForm = $('#update_form');
	$.formValidator.initConfig({
		formID : updateForm.attr("id"),	
		submitOnce:true,	
		onSuccess : function() {
			if(formSubmitOnce==true){
				//第一次提交表单前formSubmitOnnce设为false，避免重复提交表单
				formSubmitOnce = false;
				//验证成功后以异步方式提交表单
				$.post(updateForm.attr("action"),updateForm.serialize(),
					function(data){
						if(data=="ok"){							
							$('#datagrid_update').window('close');  //关闭修改窗口
							$.messager.alert("修改成功",messagerFlag + "修改成功！",'info');  //提示修改信息成功							
							$('#datagrid_table').datagrid('reload');
						}
					},"json");
				return false;
			}
		}
	});
}

//删除记录
function deleteRecords(){	
	var rows = $('#datagrid_table').datagrid('getSelections');	
	if(isSelected(rows,'删除')){
		$.messager.confirm('删除记录', '您确定要删除已选中的记录?', function(r){ 	
			if(r){				
				var ids = "?";
				for(var i=0;i<rows.length-1;i++){									
					ids += "ids=" + rows[i].id + "&";					
				}
				ids += "ids=" + rows[i].id;
				$('#datagrid_table').datagrid('clearSelections'); //清除所有已选择的记录，避免重复提交id值
				$.get(deleteUri + ids,function(data){					
					if(data==0){
						$.messager.alert('删除失败','所选择的记录正被其他表格使用，删除记录失败！','error');
						$("#datagrid_table").datagrid("unselectAll");
					}else{
						$.messager.alert('删除成功','成功删除' + data + "条记录！",'info');
						$("#datagrid_table").datagrid("reload");
					}
				},"json");
			}	
		});		
	}	
}

//禁用、起用记录
function updateDisabled(title,disabled){	
	var rows = $('#datagrid_table').datagrid('getSelections');	
	if(isSelected(rows,title)){
		$.messager.confirm(title + '记录', '您确定要' + title + '已选中的记录?', function(r){ 	
			if(r){					
				var ids = "?disabled=" + disabled + "&";
				for(var i=0;i<rows.length-1;i++){									
					ids += "ids=" + rows[i].id + "&";					
				}
				ids += "ids=" + rows[i].id;
				$.get(updateDisableFlagUri + ids,function(data){					
					$.messager.alert(title + '成功','成功' + title + data + "条记录！",'info');
					$("#datagrid_table").datagrid("unselectAll");
					$("#datagrid_table").datagrid("reload");					
				},"json");
			}	
		});	
	}	
}

/**
 * 判断是否选中记录
 * @param rows
 * @returns {Boolean}
 */
function isSelected(rows,title) {
	if(rows.length > 0){
		return true;
	}else{
		$.messager.alert(title + '失败','请先选择记录，再执行' + title + '操作!','error');
		return false;
	}
}

/**
 * 清空表单数据
 * @param form
 */
function clearFormData(form) {
	$(form).find(':input').each(function() {
		if(!($(this).attr('notClear')=="notClear")){
			switch (this.type) {
				case 'password':
				case 'select-multiple':
				case 'select-one':
				case 'text':
				case 'hidden':
				case 'textarea':
					$(this).val('');
					break;
				case 'checkbox':
				case 'radio':
					this.checked = false;
			}
		}
	});
}


/**
 * 初始化操作
 */
$(function(){	
	//若页面存在表格则装载第1页数据
	if($('#datagrid_table').length>0){
		loadFirstPageData(); 	
	}	
});
/**
 * 条件查询操作
 */
function searchTable() {
	var form = $('#searchForm');
	$("#datagrid_table").datagrid("load", serializeForm(form));
}
var reload = function() {
	$('#datagrid_table').datagrid('load', {});
};
function serializeForm(form){
	var o = {};
	$.each(form.serializeArray(),function(index,data){
		if(o[this['name']]){
			o[this['name']] = o[this['name']]+','+this['value'];
		}else{
			o[this['name']] = this['value'];
		}
	});
	return o;
}
