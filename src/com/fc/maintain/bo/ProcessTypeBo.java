package com.fc.maintain.bo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.fc.common.entity.ProcessType;
import com.fc.maintain.dao.IProcessTypeDao;

@Service("processTypeBo")
public class ProcessTypeBo implements IProcessTypeBo{
	@Resource
	private IProcessTypeDao processTypeDao;

	@Override
	public void insert(ProcessType processType) {
		processTypeDao.insert(processType);
	}

	@Override
	public Map<String, Object> ProcessTypeList(ProcessType processType) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total",processTypeDao.countProcessType());
		map.put("rows",processTypeDao.queryPageProcessType(processType));
		return map;
	}

	@Override
	public ProcessType queryById(int id) {
		return processTypeDao.queryById(id);
	}

	@Override
	public void updateById(ProcessType processType) {
		processTypeDao.updateById(processType);
	}

	@Override
	public int txDeleteByIds(int[] ids) {
		try{
			return processTypeDao.deleteByIds(ids);
		}catch(DataAccessException  e){
			return 0;
		}
	}

	@Override
	public int updateDisabled(ProcessType processType) {
		return processTypeDao.updateDisabled(processType);
	}

	@Override
	public List<ProcessType> processList() {
		return processTypeDao.processList();
	}
}
