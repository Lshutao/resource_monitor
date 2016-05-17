/*
  * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.web.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wish.wishstack.common.Constants;
import com.wish.wishstack.domain.Message;
import java.security.SecureRandom;


/**
 * 登录控制器
 * 
 * @ClassName: LoginController
 * @Description: TODO
 * @author zm
 * @date 2015年11月3日 下午1:50:38
 */
@Controller
public class LoginController {
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
	
	@RequestMapping(value = "/login_back", method = { RequestMethod.POST, RequestMethod.GET }, produces = "application/json")
	public @ResponseBody Message login(String username, String password,
			HttpServletRequest req, HttpServletResponse resp, HttpSession session) {
		LOGGER.error("进入登录界面");
		Message msg = Message.success();
		return msg;
	}
	
	@RequestMapping(value = "/admin_login", method = { RequestMethod.POST, RequestMethod.GET }, produces = "application/json")
	public @ResponseBody Message login(HttpServletRequest req, HttpServletResponse resp, HttpSession session) {
		LOGGER.error("进入admin界面");
		
		Message msg = Message.success();
		
		return msg;
	}
	
	
	
	
}