package com.wish.wishstack.domain.user;

import com.wish.wishstack.domain.BaseQuery;

/**
 * 用户角色实体
 * @ClassName: UserRole
 * @Description: TODO
 * @author mcl
 * @date 2015年11月12日 下午7:47:11
 */
public class UserRole extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 用户ID
	private Integer userId;
	// 角色ID
	private Integer roleId;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

}
