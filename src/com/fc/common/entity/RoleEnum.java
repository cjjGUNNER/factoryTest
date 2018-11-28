package com.fc.common.entity;

public enum RoleEnum {

	ADMIN              (1, "管理员"),
	DIRECTOR           (2, "主管");
	
	int roleId;   
	String roleName;
	
	private RoleEnum(int roleId, String roleName) {
		this.roleId = roleId;
		this.roleName = roleName;
	}

	public int getRoleId() {
		return roleId;
	}

	public String getRoleName() {
		return roleName;
	}
	
}
