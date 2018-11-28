package com.fc.maintain.dao;

import java.util.List;

import com.fc.common.entity.UserInfo;


public interface IUserInfoDao {
	//插入用户
	int insert(UserInfo userInfo);
	
	//根据账号查询用户
	UserInfo queryByLoginCode(String loginCode);
	
	//分页查询用户
	List<UserInfo> queryPageUserInfo(UserInfo userInfo);
	
	//统计用户
	int countUserInfo();
	
	//根据账号查询用户
	UserInfo queryById(int id);
	
	//根据ID修改用户
	int updateById(UserInfo userInfo);
	
	//根据ID删除用户
	int deleteByIds(int[] ids);
	
	//根据ID禁用、起用用户
	int updateDisabled(UserInfo userInfo);
	
	//根据角色查询用户
	List<UserInfo> listByRoleId(int roleId);
}
