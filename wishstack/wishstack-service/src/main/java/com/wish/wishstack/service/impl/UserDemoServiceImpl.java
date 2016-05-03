/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.service.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.wish.wishstack.domain.UserDemo;
import com.wish.wishstack.dao.base.BaseDao;
import com.wish.wishstack.dao.UserDemoDao;
import com.wish.wishstack.service.base.BaseServiceImpl;
import com.wish.wishstack.service.UserDemoService;

/**
 * UserDemoService 实现类
 * @author ttx
 * @since 2015-06-16
 */
@Service("userDemoService")
public class UserDemoServiceImpl extends BaseServiceImpl<UserDemo, Integer> implements UserDemoService {
	
	@Resource private UserDemoDao userDemoDao;
	
	public BaseDao<UserDemo, Integer> getDao() {
		return userDemoDao;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public int insertEntryCreateId(UserDemo userDemo) {
		return super.insertEntryCreateId(userDemo);
	}
}