package com.wish.wishstack.domain.user;

import java.util.Date;
import java.util.List;

import com.wish.wishstack.domain.BaseQuery;



public class Tenant extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 主键
	private Integer id;
	// uuid
	private String uuid;
	// 组织机构id
	private Integer orgId;
	// 组织机构名称
	private String orgName;
	// 租户名称
	private String name;
	// 租户启用状态
	private Integer enabled = 0;
	// 租户删除状态
	private Integer deleted = 0;
	// 租户创建时间
	private Date createdTime = new Date();
	// 描述信息
	private String description;
	// 租户的业务状态
	private String currentState;



	public void setId(Integer id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public Integer getOrgId() {
		return orgId;
	}

	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public Integer getDeleted() {
		return deleted;
	}

	public void setDeleted(Integer deleted) {
		this.deleted = deleted;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCurrentState() {
		return currentState;
	}

	public void setCurrentState(String currentState) {
		this.currentState = currentState;
	}

}
