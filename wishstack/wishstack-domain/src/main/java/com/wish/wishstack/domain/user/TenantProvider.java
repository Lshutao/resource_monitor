package com.wish.wishstack.domain.user;

import com.wish.wishstack.domain.BaseQuery;

/**
 * 租户云服务商实体
 * @ClassName: TenantProvider
 * @Description: TODO
 * @author zm
 * @date 2015年12月7日 上午10:46:12
 */
public class TenantProvider extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 租户id
	private Integer tenantId;
	// 租户uuid
	private String tenantUUID;
	// 云服务商id
	private Integer providerId;
	
	public Integer getTenantId() {
		return tenantId;
	}
	public void setTenantId(Integer tenantId) {
		this.tenantId = tenantId;
	}
	public String getTenantUUID() {
		return tenantUUID;
	}
	public void setTenantUUID(String tenantUUID) {
		this.tenantUUID = tenantUUID;
	}
	public Integer getProviderId() {
		return providerId;
	}
	public void setProviderId(Integer providerId) {
		this.providerId = providerId;
	}

}
