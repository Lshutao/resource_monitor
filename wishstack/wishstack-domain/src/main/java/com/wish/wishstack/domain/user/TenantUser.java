package com.wish.wishstack.domain.user;

import com.wish.wishstack.domain.BaseQuery;

/**
 * 租户用户实体表
 * @ClassName: TenantUser
 * @Description: TODO
 * @author mcl
 * @date 2015年11月12日 下午5:12:41
 */
public class TenantUser extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 用户ID
	private Integer userId;
	// 租户ID
	private Integer tenantId;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getTenantId() {
		return tenantId;
	}

	public void setTenantId(Integer tenantId) {
		this.tenantId = tenantId;
	}

}
