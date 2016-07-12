/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.dao.impl;

import org.springframework.stereotype.Repository;
import com.wish.wishstack.domain.CompanyDomain;
import com.wish.wishstack.dao.base.BaseDaoImpl;
import com.wish.wishstack.dao.CompanyDao;

/**
 * CompanyDao 实现类
 * @author lst
 * @since 2016-07-11
 */
@Repository("companyDao")
public class CompanyDaoImpl extends BaseDaoImpl<CompanyDomain,Integer> implements CompanyDao {
	private final static String NAMESPACE = "com.wish.wishstack.dao.CompanyDao.";
	
	//返回本DAO命名空间,并添加statement
	public String getNameSpace(String statement) {
		return NAMESPACE + statement;
	}
		
}