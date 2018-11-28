package com.fc.common.entity;

import java.io.Serializable;
//用户表
public class UserInfo extends BaseEntity implements Serializable {
	
	private Integer roleId;

    private String loginCode;

    private String userName;

    private String sex;
    
    private byte[] password;
    
    private String passwordSrc;
    
    private String roleName;
    
    private String loginMessage;

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getLoginCode() {
		return loginCode;
	}

	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public byte[] getPassword() {
		return password;
	}

	public void setPassword(byte[] password) {
		this.password = password;
	}

	public String getPasswordSrc() {
		return passwordSrc;
	}

	public void setPasswordSrc(String passwordSrc) {
		this.passwordSrc = passwordSrc;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getLoginMessage() {
		return loginMessage;
	}

	public void setLoginMessage(String loginMessage) {
		this.loginMessage = loginMessage;
	}
}