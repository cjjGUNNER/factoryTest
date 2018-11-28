<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>工序类别管理</title>
<%@ include file="../common/importLib.jsp" %>
<script type="text/javascript">
	/**
	 * 增删改查参数设置
	 */
	tableTitle = "工序类别表";
	tableURL = getTimeURL("processType/processTypeList.do");
	toolbarView = 4;
	tableWidth = "100%";
	tableHeight = $(window).height();
	tableColumns = [[{field:'ck',checkbox:true},
	                {field:'id',title:'id',width:0,rowspan:1},
	                {field:'processCode',title:'序号',width:100,rowspan:1},	
	                {field:'processName',title:'工序类别名',width:100,rowspan:1},	
					{field:'disabled',title:'禁用状态',width:80,align:'center', rowspan:1,
						formatter:function(value,rowData,rowIndex){
							if(rowData.disabled == 0){
								return "<font color='green'>起用</font>";
							}else{
								return "<font color='red'>禁用</font>";
							}
						}
					},
					{field:'opt',title:'操作',width:130,align:'center', rowspan:1,
						formatter:function(value,rowData,rowIndex){	
							var queryUrl = 'processType/queryById.do?id=' + rowData.id;						
							return "<a title='修改' class='fc_linkbutton' iconCls='icon-edit' href='javascript:datagridUpdate(\"" + queryUrl + "\")'>修改</a>";
						}
					}]];
	
	var addWidth =800; //添加窗口宽度
	var addHeight = 200; //添加窗口高度
	var addTitle = "添加工序类别"; //添加标题
	var updateWidth = 800; //修改窗口宽度
	var updateHeight = 200; //修改窗口高度
	var updateTitle = "修改工序类别"; //修改标题
	var updateDisableFlagUri = "processType/updateDisabled.do"; //禁用、起用记录
	var deleteUri = "processType/deleteByIds.do"; //删除记录
	
	
	/**
	 * 初始化添加表单
	 */	
	function initAddForm(){	
		addFormProcess("processCode","工序类别名",true);	
		baseFormValidator("processName","工序类别名",2,20);
		baseFormValidator("processCode","序号",1,10,"decmal6");
	}
	
	/**
	 * 初始化修改表单
	 */
	function initUpdateForm(jsonObject){
		$("#processNameU").val(jsonObject.processName);
		$("#idUpdate").val(jsonObject.id);
		$("#processCodeU").val(jsonObject.processCode);
		updateFormProcess("processCodeU","工序类别名");	
		baseFormValidator("processNameU","工序类别名",2,20);
		baseFormValidator("processCodeU","序号",1,10,"decmal6");
	}
	
</script>
</head>
<body>
	<!-- datagrid信息表 -->
	<table id="datagrid_table"></table>
	<!-- 添加记录 -->
	<div id="datagrid_add">
		<form id="add_form" action="processType/insert.do" method="post">
			<table class="fc_table_1">
				<tbody>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">序号：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="processCode" name="processCode" onchange="validateSubmitOnce=true"/></td>
						<td style="width: 35%;"><div id="processCodeTip"></div></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">工序类别名：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="processName" name="processName" onchange="validateSubmitOnce=true"/></td>
						<td style="width: 35%;"><div id="processNameTip"></div></td>
					</tr>
					<tr>
						<td colspan="3" style="text-align: center">					
							<a class="easyui-linkbutton" iconCls="icon-ok" onclick="$('#add_form').submit();">添加</a>
							<a class="easyui-linkbutton" iconCls="icon-undo" onclick="document.getElementById('add_form').reset()">重置</a>
							<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#datagrid_add').window('close');">取消</a>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
	
	<!-- 修改记录 -->
	<div id="datagrid_update">
		<form id="update_form" action="processType/updateById.do" method="post">
			<input type="hidden" id="idUpdate" name="id"/>
			<table class="fc_table_1">
				<tbody>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">序号：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="processCodeU" name="processCode" onchange="validateSubmitOnce=true"/></td>
						<td style="width: 35%;"><div id="processCodeUTip"></div></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">工序类别名：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="processNameU" name="processName"/></td>
						<td style="width: 35%;"><div id="processNameUTip"></div></td>
					</tr>
					<tr>
						<td colspan="3" style="text-align: center">
							<a class="easyui-linkbutton" iconCls="icon-ok" onclick="$('#update_form').submit();">修改</a>		
							<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#datagrid_update').window('close');">取消</a>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</body>
</html>