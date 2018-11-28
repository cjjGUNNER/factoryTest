package com.fc.common.entity;

import java.io.Serializable;
//角色表
public class RoleInfo extends BaseEntity implements Serializable{

	private String roleName;

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
}
