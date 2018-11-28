package com.fc.maintain.bo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fc.common.entity.RoleInfo;
import com.fc.maintain.dao.IRoleInfoDao;
@Service("roleInfoBo")
public class RoleInfoBo implements IRoleInfoBo{
	@Resource
	private IRoleInfoDao roleInfoDao;
	
	@Override
	public List<RoleInfo> rList() {
		// TODO Auto-generated method stub
		return roleInfoDao.rList();
	}

}
