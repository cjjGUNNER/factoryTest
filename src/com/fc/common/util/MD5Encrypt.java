package com.fc.common.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

/**
 * 该类将通过MD5对用户所输入的密码进行加密
 * @version 1.0
 */
public class MD5Encrypt {
	/**
	 * 该方法实现MD5加密
	 * @param password
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	public static byte[] encryptByMD5(String password){
		SecureRandom random = new SecureRandom();
		byte[] salt = new byte[12];
		byte[] encryptPassword = null;
		//生成12位的随机值
		random.nextBytes(salt);
		MessageDigest messageDigest = null;
		try {
			messageDigest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//通过update()方法依次对salt盐及用户输入的密码password进行加密
		messageDigest.update(salt);
		messageDigest.update(password.getBytes());
		byte[] digest = messageDigest.digest();
		encryptPassword = new byte[digest.length + 12];
		//数据库中所保存的密码由salt及digest组成
		System.arraycopy(salt, 0, encryptPassword, 0, 12);
		System.arraycopy(digest, 0, encryptPassword, 12, digest.length);
		return encryptPassword;
	}

	/**
	 * 该方法完成登录时密码的验证
	 * @param password
	 * @param encryptPassword
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	public static boolean validatePassword(String password, byte[] encryptPassword){
		byte[] salt = new byte[12];
		//从encryptPassword这一数据库中保存的密码中取得12位的随机值
		System.arraycopy(encryptPassword, 0, salt, 0, 12);
		MessageDigest messageDigest = null;
		try {
			messageDigest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		messageDigest.update(salt);
		messageDigest.update(password.getBytes());
		byte[] digest = messageDigest.digest();
		byte[] digestInDB = new byte[encryptPassword.length - 12];
		System.arraycopy(encryptPassword, 12, digestInDB, 0,
				encryptPassword.length - 12);
		//比较重新加密后的值与数据库中保存的密码（去掉salt之后的值）是否相等
		if (Arrays.equals(digest, digestInDB)) {
			return true;
		} else {
			return false;
		}
	}
}
