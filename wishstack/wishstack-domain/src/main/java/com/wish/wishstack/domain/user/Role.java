package com.wish.wishstack.domain.user;

import java.util.Date;
import java.util.List;

import com.wish.wishstack.domain.BaseQuery;

/**
 * 角色实体类
 * @ClassName: Role
 * @Description: TODO
 * @author mcl
 * @date 2015年11月11日 下午2:32:33
 */
public class Role extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 主键
	private Integer id;
	// 角色名称
	private String name;
	// 角色类型名称
	private String roleTypeName;
	// 角色类型
	private Integer roleType;
	// 角色启用状态
	private Integer enabled = 0;
	// 角色创建时间
	private Date createdTime = new Date();
	// 描述信息
	private String description;
	// 是否显示
	private Integer display = 0;
	// 删除状态
	private Integer deleted = 0;
	// 角色拥有的权限id
	private List<Integer> powerIds;
	// 是否为系统内置角色：0 内置 1 非内置
	private Integer systemRole;
	// 基本角色
	private Integer basicRole = 0;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRoleTypeName() {
		return roleTypeName;
	}

	public void setRoleTypeName(String roleTypeName) {
		this.roleTypeName = roleTypeName;
	}

	public Integer getRoleType() {
		return roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
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

	public Integer getDisplay() {
		return display;
	}

	public void setDisplay(Integer display) {
		this.display = display;
	}

	public Integer getDeleted() {
		return deleted;
	}

	public void setDeleted(Integer deleted) {
		this.deleted = deleted;
	}

	public List<Integer> getPowerIds() {
		return powerIds;
	}

	public void setPowerIds(List<Integer> powerIds) {
		this.powerIds = powerIds;
	}

	public Integer getSystemRole() {
		return systemRole;
	}

	public void setSystemRole(Integer systemRole) {
		this.systemRole = systemRole;
	}

	public Integer getBasicRole() {
		return basicRole;
	}

	public void setBasicRole(Integer basicRole) {
		this.basicRole = basicRole;
	}

}
