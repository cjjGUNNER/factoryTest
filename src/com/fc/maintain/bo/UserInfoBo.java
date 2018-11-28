package com.fc.maintain.bo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.fc.common.entity.RoleEnum;
import com.fc.common.entity.UserInfo;
import com.fc.common.util.MD5Encrypt;
import com.fc.maintain.dao.IUserInfoDao;

@Service("userInfoBo")
public class UserInfoBo implements IUserInfoBo {
	@Resource
	private IUserInfoDao userInfoDao;

	@Override
	public void txAddUserInfo(UserInfo userInfo) {
		if(userInfo.getPasswordSrc() == null) userInfo.setPasswordSrc("123456");
		userInfo.setPassword(MD5Encrypt.encryptByMD5(userInfo.getPasswordSrc()));
		userInfoDao.insert(userInfo);
	}

	@Override
	public UserInfo login(UserInfo userInfo) {
		UserInfo userInfoInDB = userInfoDao.queryByLoginCode(userInfo.getLoginCode());	
		if(userInfoInDB == null){
			userInfoInDB = new UserInfo();
			userInfoInDB.setLoginMessage("loginCodeError");
		}else if(!MD5Encrypt.validatePassword(userInfo.getPasswordSrc(), userInfoInDB.getPassword())){			
			userInfoInDB.setLoginMessage("passwordError");
		}else if(userInfoInDB.getDisabled()==1){	
			userInfoInDB.setLoginMessage("userDisable");
		}else{	
			userInfoInDB.setLoginMessage("ok");
		}	
		return userInfoInDB;
	}

	@Override
	public Map<String, Object> userInfoList(UserInfo userInfo) {		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", userInfoDao.countUserInfo());
		map.put("rows", userInfoDao.queryPageUserInfo(userInfo));
		return map;
	}

	@Override
	public UserInfo queryById(int id) {
		return userInfoDao.queryById(id);
	}

	@Override
	public String loginCodeValidate(String loginCode) {
		if(userInfoDao.queryByLoginCode(loginCode)==null){
			return "ok";
		}else{
			return "error";
		}
	}

	@Override
	public void txUpdateById(UserInfo userInfo) {
		if(userInfo.getPasswordSrc() == null) userInfo.setPasswordSrc("123456");
		userInfo.setPassword(MD5Encrypt.encryptByMD5(userInfo.getPasswordSrc()));
		userInfoDao.updateById(userInfo);		
	}

	@Override
	public int txDeleteByIds(int[] ids){
		try{
			return userInfoDao.deleteByIds(ids);
		}catch(DataAccessException  e){
			return 0;
		}
	}
	
	@Override
	public int updateDisabled(UserInfo userInfo){
		return userInfoDao.updateDisabled(userInfo);		
	}

	@Override
	public List<UserInfo> findAllWorker() {
		return userInfoDao.listByRoleId(3);
	}

	@Override
	public List<UserInfo> listByRoleId(RoleEnum role) {
		return userInfoDao.listByRoleId(role.getRoleId());
	}
}
