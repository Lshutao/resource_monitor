package com.wish.wishstack.domain.user;

import com.wish.wishstack.domain.BaseQuery;

/**
 * 用户云服务商实体
 * @ClassName: UserProvider
 * @Description: TODO
 * @author zm
 * @date 2015年12月7日 上午11:08:52
 */
public class UserProvider extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 用户id
	private Integer userId;
	// 用户uuid
	private String userUUID;
	// 云服务商id
	private Integer providerId;
	
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUserUUID() {
		return userUUID;
	}
	public void setUserUUID(String userUUID) {
		this.userUUID = userUUID;
	}
	public Integer getProviderId() {
		return providerId;
	}
	public void setProviderId(Integer providerId) {
		this.providerId = providerId;
	}

}
