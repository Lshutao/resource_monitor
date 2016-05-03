/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.web.utils;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.wish.wishstack.common.Constants;

/**
 * web工具类
 * @author ttx
 * @since 2015-06-16
 */
public class WebUtils {
	public String getStaticFilePath(String file){
	    HttpServletRequest req = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
	    //HttpServletResponse resp = ((ServletWebRequest)RequestContextHolder.getRequestAttributes()).getResponse();
	    return req.getContextPath() + file + "?v="+Constants.SYSTEM_START_TIME.getTime();
	}
}
