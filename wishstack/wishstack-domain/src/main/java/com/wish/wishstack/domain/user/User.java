/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */


package com.wish.wishstack.domain.user;
import java.util.Date;
import com.wish.wishstack.domain.BaseQuery;


public class User extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 用户主键
	private Integer id;
	// 账号名
	private String username;
	// 用户密码
	private String password;
	// 创建时间
	private Date createdTime = new Date();
	// 用户删除状态 0：未删除，1：删除
	private Integer deleted = 0;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	public Integer getDeleted() {
		return deleted;
	}
	public void setDeleted(Integer deleted) {
		this.deleted = deleted;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
}