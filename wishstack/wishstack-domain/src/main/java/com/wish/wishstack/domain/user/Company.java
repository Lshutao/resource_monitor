package com.wish.wishstack.domain.user;

import java.util.Date;
import java.util.List;
import com.wish.wishstack.domain.BaseQuery;

public class Company extends BaseQuery {
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
	
	



	

}
