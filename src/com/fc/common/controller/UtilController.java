package com.fc.common.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/common/util")
public class UtilController {
	/**
	 * 文件上传
	 */
	@RequestMapping("/upload")
	@ResponseBody
	public Object upload(MultipartFile uploadFile,HttpSession session,String fileSavePath,String fileSaveName) {		
		String path = session.getServletContext().getRealPath(fileSavePath);
		File folder = new File(path);
		if (!folder.exists()) {
			folder.mkdirs();
		}
		String originalFilename = uploadFile.getOriginalFilename();
		if(fileSaveName==null || "".equals(fileSaveName)){
			  fileSaveName = System.currentTimeMillis() + originalFilename.substring(originalFilename.lastIndexOf("."));
		}      
        File file = new File(path, fileSaveName);
        try {
        	uploadFile.transferTo(file);
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		return "ok_" + fileSaveName;
	}
		
	/**
	 * 获得服务器时间
	 */
	@RequestMapping("/serverTime")
	@ResponseBody
	public Object serverTime(){
		return new Date().getTime();
	}
	
	/**
	 * 退出系统
	 */
	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session){
		session.invalidate();
		return "ok";
	}
}
