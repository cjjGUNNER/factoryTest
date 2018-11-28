package com.fc.maintain.dao;

import java.util.List;

import com.fc.common.entity.ProcessType;

public interface IProcessTypeDao {
	//添加
	int insert(ProcessType processType);
		
	//分页查询
	List<ProcessType> queryPageProcessType(ProcessType processType);
		
	//统计
	int countProcessType();
	
	//根据id查询
	ProcessType queryById(int id);
	
	//根据ID修改
	int updateById(ProcessType processType);
		
	//根据ID删除
	int deleteByIds(int[] ids);
		
	//根据ID禁用、起用
	int updateDisabled(ProcessType processType);
	
	//工序类别列表
	List<ProcessType> processList();
}
