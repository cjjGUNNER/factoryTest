package com.fc.common.util;

import java.io.UnsupportedEncodingException;

/**
 * 字符集转换工具类
 */
public class CharSetUtil {
	/**
	 * iso转utf-8
	 * 注意：tomcat8默认已解决get方式乱码现象，在tomcat7下运行时，get方式的请求需要转码
	 * @param str
	 * @return
	 */
	public static String toUTF8(String str){
		try {
			return new String(str.getBytes("iso-8859-1"),"utf-8");
		} catch (UnsupportedEncodingException e) {			
			e.printStackTrace();
		}
		return str;
	}
}
