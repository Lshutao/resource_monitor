package com.wish.wishstack.domain.user;

/**
 * 角色类型实体类
 * @ClassName: RoleType
 * @Description: TODO
 * @author mcl
 * @date 2015年11月11日 下午3:27:58
 */
public class RoleType{
	//主键
	private Integer id;
	//角色类型名称
	private String name;
	//删除状态
	private String deleted;

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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

}
