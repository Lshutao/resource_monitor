/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.dao.impl;

import org.springframework.stereotype.Repository;
import com.wish.wishstack.domain.UserDemo;
import com.wish.wishstack.dao.base.BaseDaoImpl;
import com.wish.wishstack.dao.UserDemoDao;

/**
 * UserDemoDao 实现类
 * @author ttx
 * @since 2015-06-16
 */
@Repository("userDemoDao")
public class UserDemoDaoImpl extends BaseDaoImpl<UserDemo,Integer> implements UserDemoDao {
	private final static String NAMESPACE = "com.wish.wishstack.dao.UserDemoDao.";
	
	//返回本DAO命名空间,并添加statement
	public String getNameSpace(String statement) {
		return NAMESPACE + statement;
	}
		
}