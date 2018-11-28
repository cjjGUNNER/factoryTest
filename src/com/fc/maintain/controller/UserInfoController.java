package com.fc.maintain.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fc.common.entity.RoleEnum;
import com.fc.common.entity.UserInfo;
import com.fc.common.util.CharSetUtil;
import com.fc.common.util.GlobalConstant;
import com.fc.maintain.bo.IUserInfoBo;

@Controller
@RequestMapping("/maintain/userInfo")
public class UserInfoController {
	@Resource
	private IUserInfoBo userInfoBo;
	
	/**
	 * 添加
	 * @param userInfo
	 * @return
	 */
	@RequestMapping("/addUserInfo")
	@ResponseBody
	public Object addUserInfo(UserInfo userInfo) {
		userInfo.setUserName(CharSetUtil.toUTF8(userInfo.getUserName()));
		userInfo.setSex(CharSetUtil.toUTF8(userInfo.getSex()));
		userInfo.setRoleId(2);
		userInfo.setDisabled(1);
		userInfoBo.txAddUserInfo(userInfo);
		return "ok";
	}
	/**
	 * 后台添加
	 * @param userInfo
	 * @return
	 */
	@RequestMapping("/insert")
	@ResponseBody
	public Object insert(UserInfo userInfo) {
		userInfoBo.txAddUserInfo(userInfo);
		return "ok";
	}
	/**
	 * 从session获取用户信息
	 * @param session
	 * @return
	 */
	@RequestMapping("/sessionUserInfo")
	@ResponseBody
	public Object sessionUserInfo(HttpSession session) {
		UserInfo userInfo = (UserInfo) session.getAttribute(GlobalConstant.USER_INFO);
		if (userInfo == null) {
			return "error";
		} else {
			return userInfo;
		}
	}
	
	/**
	 * 登录
	 * @param userInfo
	 * @return
	 */
	@RequestMapping("/login")
	@ResponseBody
	public Object login(UserInfo userInfo,HttpSession session,HttpServletRequest request) {
		session.removeAttribute(GlobalConstant.USER_INFO);
		userInfo = userInfoBo.login(userInfo);
		if("ok".equals(userInfo.getLoginMessage())){	
			session.setAttribute(GlobalConstant.USER_INFO, userInfo);
		}		
		return userInfo;
	}
	
	/**
	 * 退出系统
	 */
	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session, HttpServletRequest request){
		UserInfo userInfo = (UserInfo) session.getAttribute(GlobalConstant.USER_INFO);
		request.getServletContext().removeAttribute(userInfo.getLoginCode());
		session.invalidate();
		return "ok";
	}
	
	/**
	 * 显示用户信息
	 * @return
	 */
	@RequestMapping("/userInfoList")
	@ResponseBody
	public Object userInfoList(UserInfo userInfo) {
		return userInfoBo.userInfoList(userInfo);
	}
	
	/**
	 * 显示所有用户信息
	 * @return
	 */
	@RequestMapping("/findAllWorker")
	@ResponseBody
	public Object findAllWorker() {
		return userInfoBo.findAllWorker();
	}
	
	/**
	 * 账号验证
	 * @return
	 */
	@RequestMapping("/loginCodeValidate")
	@ResponseBody
	public Object loginCodeValidate(String loginCode) {
		return userInfoBo.loginCodeValidate(loginCode);
	}
	
	/**
	 * 根据ID查询用户
	 * @return
	 */
	@RequestMapping("/queryById")
	@ResponseBody
	public Object queryById(int id) {
		return userInfoBo.queryById(id);
	}
	
	/**
	 * 修改
	 * @param userInfo
	 * @return
	 */
	@RequestMapping("/updateById")
	@ResponseBody
	public Object updateById(UserInfo userInfo) {		
		userInfoBo.txUpdateById(userInfo);
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
		return userInfoBo.txDeleteByIds(ids);
	}
	
	/**
	 * 禁用、起用
	 * @param ids
	 * @return
	 */
	@RequestMapping("/updateDisabled")
	@ResponseBody
	public Object updateDisabled(UserInfo userInfo) {		
		return userInfoBo.updateDisabled(userInfo);
	}
	
	/**
	 * 当角色为管理员时，列举所有roleId=2的用户信息
	 * 当角色为主管时，返回自己的信息
	 * @return
	 */
	@RequestMapping("/listDirector")
	@ResponseBody
	public Object listDirector(HttpSession session) {
		Map<String, Object> result = new HashMap<String, Object>();
		UserInfo userInfo = (UserInfo) session.getAttribute(GlobalConstant.USER_INFO);
		if (userInfo.getRoleId() == RoleEnum.ADMIN.getRoleId()){
			result.put("code", "1");
			result.put("data", userInfoBo.listByRoleId(RoleEnum.DIRECTOR));
		} else {
			result.put("code", "2");
			result.put("data", userInfo);
		}			
		return result;
	}
	
}
