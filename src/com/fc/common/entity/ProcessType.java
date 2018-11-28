package com.fc.common.entity;

import java.io.Serializable;
//生产工序表
public class ProcessType extends BaseEntity implements Serializable{
	private String processName;
	
	private Float processCode;

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public Float getProcessCode() {
		return processCode;
	}

	public void setProcessCode(Float processCode) {
		this.processCode = processCode;
	}
}
