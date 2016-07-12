/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.service.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
//import com.wish.wishstack.domain.user.Company;
import com.wish.wishstack.dao.base.BaseDao;
import com.wish.wishstack.dao.CompanyDao;
import com.wish.wishstack.service.base.BaseServiceImpl;
import com.wish.wishstack.service.CompanyService;
import com.wish.wishstack.domain.CompanyDomain;

/**
 * CompanyService 实现类
 * @author lst
 * @since 2016-07-11
 */

@Service("CompanyService")
public class CompanyServiceImpl extends BaseServiceImpl<CompanyDomain, Integer> implements CompanyService {
	
	@Resource private CompanyDao CompanyDao;
	
	public BaseDao<CompanyDomain, Integer> getDao() {
		return CompanyDao;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public int insertEntryCreateId(CompanyDomain company) {
		return super.insertEntryCreateId(company);
	}
}