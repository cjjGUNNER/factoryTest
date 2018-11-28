package com.fc.maintain.bo;

import java.util.List;
import java.util.Map;

import com.fc.common.entity.RoleEnum;
import com.fc.common.entity.UserInfo;

public interface IUserInfoBo {
	/**
	 * 添加用户
	 * @param userInfo
	 */
	public void txAddUserInfo(UserInfo userInfo);
	
	/**
	 * 用户登录
	 * @param userInfo
	 */
	public UserInfo login(UserInfo userInfo);
	
	/**
	 * 显示用户信息
	 * @param userInfo
	 * @return
	 */
	public Map<String,Object> userInfoList(UserInfo userInfo);
	
	/**
	 * 账号验证
	 * @param loginCode
	 * @return
	 */
	public String loginCodeValidate(String loginCode);
	
	/**
	 * 根据ID查询用户
	 * @param id
	 * @return
	 */
	public UserInfo queryById(int id);
	
	/**
	 * 根据ID修改用户
	 * @param id
	 */
	public void txUpdateById(UserInfo userInfo);
	
	/**
	 * 根据ids删除用户
	 * @param ids
	 * @return
	 */
	public int txDeleteByIds(int[] ids);
	
	/**
	 * 根据ids禁用、起用用户
	 * @param ids
	 * @return
	 */
	public int updateDisabled(UserInfo userInfo);
	
	/**
	 * 查找所有员工
	 * @return
	 */
	public List<UserInfo> findAllWorker();
	
	/**
	 * 根据角色查找
	 * @param role
	 * @return
	 */
	public List<UserInfo> listByRoleId(RoleEnum role);
}
