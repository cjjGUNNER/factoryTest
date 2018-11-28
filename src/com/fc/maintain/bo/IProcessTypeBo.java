package com.fc.maintain.bo;

import java.util.List;
import java.util.Map;

import com.fc.common.entity.ProcessType;

public interface IProcessTypeBo {
	/**
	 * 添加
	 * @param ProcessType
	 */
	public void insert(ProcessType processType);

	/**
	 * 显示
	 * @param ProcessType
	 * @return
	 */
	public Map<String,Object> ProcessTypeList(ProcessType processType);
	
	/**
	 * 根据ID查询
	 * @param id
	 * @return
	 */
	public ProcessType queryById(int id);
	
	/**
	 * 根据ID修改
	 * @param id
	 */
	public void updateById(ProcessType processType);
	
	/**
	 * 根据ids删除
	 * @param ids
	 * @return
	 */
	public int txDeleteByIds(int[] ids);
	
	/**
	 * 根据ids禁用、起用
	 * @param ids
	 * @return
	 */
	public int updateDisabled(ProcessType processType);
	
	/**
	 * 工序list
	 * @param ids
	 * @return
	 */
	public List<ProcessType> processList();
}
