package com.fc.maintain.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fc.common.entity.ProcessType;
import com.fc.maintain.bo.IProcessTypeBo;

@Controller
@RequestMapping("maintain/processType")
public class ProcessTypeController {
	@Resource
	private IProcessTypeBo processTypeBo;
	/**
	 * 添加
	 * @param ProcessType
	 * @return
	 */
	@RequestMapping("/insert")
	@ResponseBody
	public Object addProcessType(ProcessType processType) {		
		processTypeBo.insert(processType);
		return "ok";
	}
	/**
	 * 显示
	 * @return
	 */
	@RequestMapping("/processTypeList")
	@ResponseBody
	public Object ProcessTypeList(ProcessType processType) {
		return processTypeBo.ProcessTypeList(processType);
	}
	
	/**
	 * 根据ID查询
	 * @return
	 */
	@RequestMapping("/queryById")
	@ResponseBody
	public Object queryById(int id) {
		return processTypeBo.queryById(id);
	}
	
	/**
	 * 修改
	 * @param ProcessType
	 * @return
	 */
	@RequestMapping("/updateById")
	@ResponseBody
	public Object updateById(ProcessType processType) {		
		processTypeBo.updateById(processType);
		return "ok";
	}
	
	/**
	 * 删除
	 * @param ids
	 * @return
	 */
	@RequestMapping("/deleteByIds")
	@ResponseBody
	public Object deleteByIds(int[] ids) {		
		return processTypeBo.txDeleteByIds(ids);
	}
	
	/**
	 * 禁用、起用
	 * @param ids
	 * @return
	 */
	@RequestMapping("/updateDisabled")
	@ResponseBody
	public Object updateDisabled(ProcessType processType) {		
		return processTypeBo.updateDisabled(processType);
	}
	
	/**
	 * 工序类别list
	 * @param 
	 * @return
	 */
	@RequestMapping("/processList")
	@ResponseBody
	public Object processList() {		
		return processTypeBo.processList();
	}	
}
