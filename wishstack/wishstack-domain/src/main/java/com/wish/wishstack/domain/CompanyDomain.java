/*
 * Copyright (c) 2015 wish.com All rights reserved.
 * 本软件源代码版权归----所有,未经许可不得任意复制与传播.
 */
package com.wish.wishstack.domain;

import java.util.Date;
import com.wish.wishstack.domain.base.BaseDomain;

/**
 * userDemo
 * @author ttx
 * @since 2015-06-16
 */
public class CompanyDomain extends BaseDomain {
	private static final long serialVersionUID = 1L;
	// 主键
	private String id;
	// uuid
	private String uuid;
	// 公司启用状态
	private Integer enabled = 0;
	// 公司名称
	private String name;
	// 公司地址
	private String address;
	// 公司联系电话
	private String tel;
	// 描述信息
	private String description;
	// 公司创建时间
	private Date createdTime = new Date();
	// 更新时间
	private Date updatedTime = new Date();
	// 删除时间
	private Date deletedTime = new Date();
	// 删除状态
	private Integer deleted = 0;

	public CompanyDomain(){
		//默认无参构造方法
	}
	

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public Integer getEnabled() {
		return enabled;
	}
	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	public Date getUpdatedTime() {
		return updatedTime;
	}


	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}


	public Date getDeletedTime() {
		return deletedTime;
	}


	public void setDeletedTime(Date deletedTime) {
		this.deletedTime = deletedTime;
	}


	public Integer getDeleted() {
		return deleted;
	}


	public void setDeleted(Integer deleted) {
		this.deleted = deleted;
	}


	@Override
    public String toString() {
		StringBuffer buf = new StringBuffer("Company=[");
		        buf.append("id=").append(getId()).append(", ");
				buf.append("Name=").append(getName()).append(", ");
				buf.append("Address=").append(getAddress()).append(", ");
				buf.append("Tel=").append(getTel()).append(", ");
				buf.append("updatedTime=").append(getUpdatedTime()).append(", ");
				buf.append("deletedTime=").append(getDeletedTime()).append(", ");
				buf.append("deleted=").append(getDeleted()).append(", ");
				buf.append("]");
		return buf.toString();
	}
}