/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.web.controller;
import java.util.Date;
import javax.annotation.Resource;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import com.wish.wishstack.web.CustomDateEditor;
import org.springframework.web.context.request.WebRequest;
import org.springframework.stereotype.Controller;
import com.wish.wishstack.domain.UserDemo;
import com.wish.wishstack.domain.common.Message;
import com.wish.wishstack.domain.common.Page;
import com.wish.wishstack.service.UserDemoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *userDemo controller层
 * @author ttx
 * @since 2015-06-16
 */
@Controller
@RequestMapping(value = "/userDemo12")
public class UserDemoController{
	private static final Logger LOGGER = LoggerFactory.getLogger(UserDemoController.class);
	@Resource private UserDemoService userDemoService;
	
	@InitBinder
	public void initBinder(WebDataBinder binder, WebRequest request) {
		binder.registerCustomEditor(Date.class, new CustomDateEditor(true));
	}
	
	/**
	 * 列表展示
	 * @param userDemo 实体对象
	 * @param page 分页对象
	 * @return
	 */
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
	public String list(UserDemo userDemo, Page<UserDemo> page, Model view) throws Exception{
		try {
			view.addAttribute("userDemo", userDemo);
			view.addAttribute("page", userDemoService.selectPage(userDemo, page));			
		} catch (Exception e) {
			LOGGER.error("失败:" + e.getMessage(), e);
			throw e;
		}finally{
		}	
		return "userDemo/list";
	}
	
	
	/**
	 * 列表展示
	 * @param userDemo 实体对象
	 * @param page 分页对象
	 * @return
	 */
	@RequestMapping(value="/layout", method = {RequestMethod.GET, RequestMethod.POST})
	public String listLayout(UserDemo userDemo, Page<UserDemo> page, Model view) throws Exception{
		try {
			view.addAttribute("userDemo", userDemo);
			view.addAttribute("page", userDemoService.selectPage(userDemo, page));			
		} catch (Exception e) {
			LOGGER.error("失败:" + e.getMessage(), e);
			throw e;
		}finally{
		}	
		return "userDemo/list-layout";
	}
	
	/**
	 * 响应新增(修改)页面
	 * @param id 对象编号
	 * @return
	 */
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public String edit(@PathVariable Integer id, Model view) throws Exception{
		try {
			if(id != null && id > 0) {
				UserDemo userDemo = userDemoService.selectEntry(id);
				if(userDemo == null) {
//					return toJSON(Message.failure("您要修改的数据不存在或者已被删除!"));
					return null;
				}
				view.addAttribute("userDemo", userDemo);
			}			
		} catch (Exception e) {
			LOGGER.error("失败:" + e.getMessage(), e);
			throw e;
		}finally{
		}

		return "userDemo/edit";
	}
	
	/**
	 * 通过编号删除对象
	 * @param id 对象编号
	 * @return
	 */
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public @ResponseBody Message del(@PathVariable Integer id, Model view) throws Exception{
    	Message msg = null;
    	try {
			int res = userDemoService.deleteByKey(id);
			msg  = res > 0 ? Message.success() : Message.failure();
		} catch (Exception e) {
			LOGGER.error("失败:" + e.getMessage(),e);
			msg = Message.failure();
		}finally{
		}

		return msg;
	}
	
	/**
	 * 通过编号查看对象
	 * @param id 对象编号
	 * @return
	 */
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public String view(@PathVariable Integer id, Model view) throws Exception{
		try {
			UserDemo userDemo = userDemoService.selectEntry(id);
			if(userDemo == null) {
				return null;
			}
			view.addAttribute("userDemo", userDemo);
		} catch (Exception e) {
			LOGGER.error("失败:" + e.getMessage(), e);
			throw e;
		}finally{
		}

		return "userDemo/view";
	}
	
	/**
	 * 保存方法
	 * @param userDemo 实体对象
	 * @return
	 */
	@RequestMapping(value="/save", method = {RequestMethod.POST, RequestMethod.GET}, produces="application/json")
	public @ResponseBody Message save(UserDemo userDemo, Model view) throws Exception{
    	Message msg= null;
    	try {
			int res = userDemoService.saveOrUpdate(userDemo);
			msg  = res > 0 ? Message.success() : Message.failure();
		} catch (Exception e) {
			LOGGER.error("失败:" + e.getMessage(), e);
			msg = Message.failure();
		}finally{
		}
		return msg;
	}
	
}