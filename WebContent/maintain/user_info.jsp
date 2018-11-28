<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户管理</title>
<%@ include file="../common/importLib.jsp" %>
<script type="text/javascript">
	/**
	 * 增删改查参数设置
	 */
	tableTitle = "用户表";
	tableURL = getTimeURL("userInfo/userInfoList.do");
	toolbarView = 4;
	tableWidth = "100%";
	tableHeight = $(window).height();
	tableColumns = [[{field:'ck',checkbox:true},
	                {field:'id',title:'id',width:0,rowspan:1},
	                {field:'roleName',title:'角色',width:100,rowspan:1},
					{field:'loginCode',title:'账号',width:120,rowspan:1},	
					{field:'userName',title:'姓名',width:100,rowspan:1},
					{field:'sex',title:'性别',width:70,rowspan:1},	
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
							var queryUrl = 'userInfo/queryById.do?id=' + rowData.id;						
							return "<a title='修改' class='fc_linkbutton' iconCls='icon-edit' href='javascript:datagridUpdate(\"" + queryUrl + "\")'>修改</a>";
						}
					}]];
	
	var addWidth =800; //添加窗口宽度
	var addHeight = 400; //添加窗口高度
	var addTitle = "添加用户"; //添加标题
	var updateWidth = 800; //修改窗口宽度
	var updateHeight = 400; //修改窗口高度
	var updateTitle = "修改用户信息"; //修改标题
	var updateDisableFlagUri = "userInfo/updateDisabled.do"; //禁用、起用记录
	var deleteUri = "userInfo/deleteByIds.do"; //删除记录
	
	
	/**
	 * 初始化添加表单
	 */	
	function initAddForm(){	
		addFormProcess("loginCode","用户",true);	
		viewRoleList("roleId");
		ajaxFormValidator("loginCode","账号",1,10,"userInfo/loginCodeValidate.do","username");
		baseFormValidator("userName","姓名",2,8,"chinese");
		baseFormValidator("password","密码",6,16);
		$("#passwordSrc").formValidator({onShow:"请输入确认密码",onFocus:"密码由6~16个字符组成",onCorrect:"两次密码一致！"})
		.inputValidator({min:6,max:16,empty:{leftEmpty:false,rightEmpty:false,emptyError:"密码两边不能输入空格"},	onError:"密码由6~16个字符组成"})
		.compareValidator({desID:"password",operateor:"=",onError:"两次密码不一致,请重输"});
	}
	
	/**
	 * 初始化修改表单
	 */
	function initUpdateForm(jsonObject){
		$("#loginCodeU").html(jsonObject.loginCode);
		$("#userNameU").val(jsonObject.userName);
		$("#idUpdate").val(jsonObject.id);
		viewRoleList("roleIdU",jsonObject.roleId);
		$("#sexU").val(jsonObject.sex);
		$("#passwordU").val(jsonObject.passwordSrc);
		$("#passwordSrcU").val(jsonObject.passwordSrc);
		updateFormProcess("userNameU","用户");	
		baseFormValidator("userNameU","姓名",2,8,"chinese");
		baseFormValidator("passwordU","密码",6,16);
		$("#passwordSrcU").formValidator({onShow:"请输入确认密码",onFocus:"密码由6~16个字符组成",onCorrect:"两次密码一致！"})
		.inputValidator({min:6,max:16,empty:{leftEmpty:false,rightEmpty:false,emptyError:"密码两边不能输入空格"},	onError:"密码由6~16个字符组成"})
		.compareValidator({desID:"passwordU",operateor:"=",onError:"两次密码不一致,请重输"});
	}
	
</script>
</head>
<body>
	<!-- datagrid信息表 -->
	<table id="datagrid_table"></table>
	<!-- 添加记录 -->
	<div id="datagrid_add">
		<form id="add_form" action="userInfo/insert.do" method="post">
			<table class="fc_table_1">
				<tbody>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">角色：</th>
						<td colspan="2">
							<select id="roleId" name="roleId" style="width:150px;height: 21px;">
							</select>
						</td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">账号：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="loginCode" name="loginCode" onchange="validateSubmitOnce=true"/></td>
						<td style="width: 35%;"><div id="loginCodeTip"></div></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">姓名：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="userName" name="userName" onchange="validateSubmitOnce=true"/></td>
						<td style="width: 35%;"><div id="userNameTip"></div></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">性别：</th>
						<td colspan="2">
							<select id="sex" name="sex" style="width:50px;height: 21px;">
								<option value="男">男</option>
								<option value="女">女</option>
							</select>
						</td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">登录密码：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="password" name="password" /></td>
						<td style="width: 35%;"><div id="passwordTip"></div></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">确认密码：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="passwordSrc" name="passwordSrc"/></td>
						<td style="width: 35%;"><div id="passwordSrcTip"></div></td>
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
		<form id="update_form" action="userInfo/updateById.do" method="post">
			<input type="hidden" id="idUpdate" name="id"/>
			<table class="fc_table_1">
				<tbody>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">角色：</th>
						<td colspan="2">
							<select id="roleIdU" name="roleId" style="width:150px;height: 21px;">
							</select>
						</td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">账号：</th>
						<td colspan="2" id="loginCodeU"></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">姓名：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="userNameU" name="userName"/></td>
						<td style="width: 35%;"><div id="userNameUTip"></div></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">性别：</th>
						<td colspan="2">
							<select id="sexU" name="sex" style="width:50px;height: 21px;">
								<option value="男">男</option>
								<option value="女">女</option>
							</select>
						</td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">登录密码：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="passwordU" name="password" /></td>
						<td style="width: 35%;"><div id="passwordUTip"></div></td>
					</tr>
					<tr class="row">
						<th scope="row" class="column1" style="width: 15%;">确认密码：</th>
						<td style="width: 45%;"><input class="form-control" type="text" id="passwordSrcU" name="passwordSrc"/></td>
						<td style="width: 35%;"><div id="passwordSrcUTip"></div></td>
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