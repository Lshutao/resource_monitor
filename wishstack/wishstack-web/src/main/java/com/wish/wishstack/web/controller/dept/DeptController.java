/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.web.controller.dept;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.wish.wishstack.domain.user.User;
import com.wish.wishstack.domain.UserDemo;
import com.wish.wishstack.domain.common.Message;
import com.wish.wishstack.domain.common.Page;
import com.wish.wishstack.service.UserDemoService;


import com.wish.wishstack.domain.user.Company;
import com.wish.wishstack.domain.CompanyDomain;
import com.wish.wishstack.service.CompanyService;




/**
 *dept controller层
 * @author lst
 * @since 2016-07-11
 */
@Controller
@RequestMapping(value = "/dept")
public class DeptController{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DeptController.class);
    
	@Resource 
	private UserDemoService userService;
	
	@Resource 
	private CompanyService companyService;
	
	

	/**
	 * 单位列表展示
	 * @author lst
	 * @param company 实体对象
	 * @param page 分页对象
	 * @return
	 */
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
	public String list(CompanyDomain company, Page<CompanyDomain> page, Model view, HttpServletRequest req) throws Exception{
		try {
			LOGGER.error("准备显示单位列表数据");
			LOGGER.error("company is "+ company);
		
			view.addAttribute("dept", company);
			LOGGER.error("data is "+companyService.selectPage(company, page));
			view.addAttribute("page", companyService.selectPage(company, page));
//			view.addAttribute("company", company);		
	//		view.addAttribute("page", userService.getByPage(user, page));	
			
		
		} catch (Exception e) {
			LOGGER.error("查询单位失败:" + e.getMessage(), e);
		}
		return "dept/list";
	}
	
	
	
	
	/**
	 * 列表展示
	 * @param user实体对象
	 * @param page 分页对象
	 * @return
	 */
	@RequestMapping(value="/layout", method = {RequestMethod.GET, RequestMethod.POST})
	public String listLayout(UserDemo userDemo, Page<UserDemo> page, Model view) throws Exception{
		try {
			view.addAttribute("userDemo", userDemo);
			view.addAttribute("page", userService.selectPage(userDemo, page));			
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
				UserDemo userDemo = userService.selectEntry(id);
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
			int res = userService.deleteByKey(id);
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
			UserDemo userDemo = userService.selectEntry(id);
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
			int res = userService.saveOrUpdate(userDemo);
			msg  = res > 0 ? Message.success() : Message.failure();
		} catch (Exception e) {
			LOGGER.error("失败:" + e.getMessage(), e);
			msg = Message.failure();
		}finally{
		}
		return msg;
	}
	
}