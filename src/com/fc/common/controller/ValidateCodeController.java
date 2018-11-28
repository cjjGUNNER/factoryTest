package com.fc.common.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/common/validateCode")
public class ValidateCodeController {
	public static final String RANDOM_CODE_KEY = "randomCodeKey";// 放到session中的验证码key
	private Random random = new Random();
	private String randomString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";// 随机产生的字符串
	private int width = 80;// 图片宽
	private int height = 26;// 图片高
	private int lineNum = 40;// 干扰线数量
	private int stringNum = 4;// 随机产生字符数量
	
	/*
	 * 获得颜色
	 */
	private Color getRandColor(int fc, int bc) {
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	/*
	 * 绘制干扰线
	 */
	private void drowLine(Graphics g) {
		int x = random.nextInt(width);
		int y = random.nextInt(height);
		int xl = random.nextInt(13);
		int yl = random.nextInt(15);
		g.setColor(new Color(random.nextInt(180), random.nextInt(200), random.nextInt(240)));
		g.drawLine(x, y, x + xl, y + yl);
	}

	/*
	 * 获取随机的字符
	 */
	public String getRandomChar(int num) {
		return String.valueOf(randomString.charAt(num));
	}

	/*
	 * 绘制字符串
	 */
	private String drowString(Graphics g, String validateString, int i) {
		g.setFont(new Font("Fixedsys", Font.CENTER_BASELINE, 18));		
		g.setColor(new Color(random.nextInt(101), random.nextInt(111), random
				.nextInt(121)));
		String rand = String.valueOf(getRandomChar(random.nextInt(randomString
				.length())));
		validateString += rand;
		g.translate(random.nextInt(1), random.nextInt(2));
		g.drawString(rand, 14 * i + 2, 15);
		return validateString;
	}

	/**
	 * 获得验证码
	 */
	@RequestMapping("/createValidateCode")
	public void createValidateCode(HttpServletResponse response,HttpSession session) throws Exception {
		// 设置页面不缓存
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);		
		response.setContentType("image/jpeg");		
		BufferedImage image = new BufferedImage(60, 20,BufferedImage.TYPE_INT_BGR);
		// 产生Image对象的Graphics对象,该对象可以在图像上进行各种绘制操作
		Graphics g = image.getGraphics();		
		g.setColor(getRandColor(180, 230));
		g.fillRect(0, 0, width, height);
		// 随机产生干扰线，使图象中的认证码不易被其它程序探测到
		for (int i = 0; i <= lineNum; i++) {
			drowLine(g);
		}
		// 绘制验证码字符串
		String validateString = "";
		for (int i = 0; i < stringNum; i++) {
			validateString = drowString(g, validateString, i);
		}
		session.setAttribute(RANDOM_CODE_KEY, validateString);		
		g.dispose();
		OutputStream os = null;
		try {
			// 将内存中的图片输出到客户端
			os = response.getOutputStream();
			ImageIO.write(image, "JPEG", os);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 验证用户所输入的验证码是否正确
	 */
	@RequestMapping("/checkValidateCode")
	@ResponseBody
	public Object checkValidateCode(String validateCode,HttpSession session) throws Exception {
		if(validateCode.equalsIgnoreCase((String)session.getAttribute(RANDOM_CODE_KEY))){	
			return "ok";
		}else{
			return "error";
		}
	}
}
