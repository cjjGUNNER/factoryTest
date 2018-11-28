package com.fc.maintain.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fc.common.entity.UserInfo;
import com.fc.maintain.bo.IRoleInfoBo;

@Controller
@RequestMapping("/maintain/roleInfo")
public class RoleInfoController {
	@Resource
	private IRoleInfoBo roleInfoBo;
	
	/**
	 * 角色list
	 * @param 
	 * @return
	 */
	@RequestMapping("/rList")
	@ResponseBody
	public Object rList(UserInfo userInfo) {		
		return roleInfoBo.rList();
	}
}
