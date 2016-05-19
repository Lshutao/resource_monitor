package com.wish.wishstack.domain.user;

import com.wish.wishstack.domain.BaseQuery;

/**
 * 角色权限实体类
 * @ClassName: RolePower
 * @Description: TODO
 * @author hy
 * @date 2016年4月11日 下午2:09:45
 */
public class RolePower extends BaseQuery {
	private static final long serialVersionUID = 1L;	
	//角色id
	private Integer roleId;
	//权限id
	private Integer powerId;
	
	public Integer getRoleId() {
		return roleId;
	}
	
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getPowerId() {
		return powerId;
	}

	public void setPowerId(Integer powerId) {
		this.powerId = powerId;
	}
	
}
