package com.wish.wishstack.domain.user;

import java.util.Date;
import java.util.List;
import com.wish.wishstack.domain.BaseQuery;

/**
 * 用户权限实体类
 * 
 * @ClassName: Power
 * @Description: TODO
 * @author mcl
 * @date 2015年11月4日 下午1:42:54
 */
public class Power extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 权限ID
	private Integer id;
	// 权限名称
	private String name;
	// 权限URL地址
	private String url;
	// 权限标识
	private String pageId;
	// 父权限ID
	private Integer parentId;
	// 父权限名称
	private String parentName;
	// 权限级别
	private Integer level;
	// 权限排序
	private Integer menuSort;
	// 权限创建时间
	private Date createdTime = new Date();
	// 权限描述
	private String description;
	// 下级子权限
	private List<Power> children;
	// 图标
	private String icon;
	// shiro权限定义
	private String permission;
	//是否删除： 0 未删除，  1 已删除
	private int deleted = 0;

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

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPageId() {
		return pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getMenuSort() {
		return menuSort;
	}

	public void setMenuSort(Integer menuSort) {
		this.menuSort = menuSort;
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

	public List<Power> getChildren() {
		return children;
	}

	public void setChildren(List<Power> children) {
		this.children = children;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public int getDeleted() {
		return deleted;
	}

	public void setDeleted(int deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "Power [id=" + id + ", name=" + name + ", url=" + url + ", pageId=" + pageId + ", parentId=" + parentId
				+ ", parentName=" + parentName + ", level=" + level + ", menuSort=" + menuSort + ", createdTime="
				+ createdTime + ", description=" + description + ", children=" + children + ", icon=" + icon + "]";
	}

}
