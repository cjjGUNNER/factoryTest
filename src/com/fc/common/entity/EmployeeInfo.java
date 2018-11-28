package com.fc.common.entity;

import java.io.Serializable;
//员工表
public class EmployeeInfo extends BaseEntity implements Serializable {

	private Integer superiorId;
	
	private String superiorName;
	
	private String employeeCode;
	
	private String employeeName;
	
	private Long registerTime;
	
	private Integer platform;
	
	private Integer processTypeId;
	
	private String processName;

	public Integer getPlatform() {
		return platform;
	}

	public void setPlatform(Integer platform) {
		this.platform = platform;
	}

	public Integer getSuperiorId() {
		return superiorId;
	}

	public void setSuperiorId(Integer superiorId) {
		this.superiorId = superiorId;
	}

	public String getSuperiorName() {
		return superiorName;
	}

	public void setSuperiorName(String superiorName) {
		this.superiorName = superiorName;
	}

	public String getEmployeeCode() {
		return employeeCode;
	}

	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}

	public Long getRegisterTime() {
		return registerTime;
	}

	public void setRegisterTime(Long registerTime) {
		this.registerTime = registerTime;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public Integer getProcessTypeId() {
		return processTypeId;
	}

	public void setProcessTypeId(Integer processTypeId) {
		this.processTypeId = processTypeId;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	@Override
	public String toString() {
		return "EmployeeInfo [superiorId=" + superiorId + ", superiorName="
				+ superiorName + ", employeeCode=" + employeeCode
				+ ", employeeName=" + employeeName + ", registerTime="
				+ registerTime + ", platform=" + platform + ", processTypeId="
				+ processTypeId + ", processName=" + processName + "]";
	}

}