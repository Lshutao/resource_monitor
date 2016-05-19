package com.wish.wishstack.domain.user;

import com.wish.wishstack.domain.BaseQuery;

/**
 * 租户组织机构
 * @ClassName: TenantOrg
 * @Description: TODO
 * @author zm
 * @date 2016年1月19日 下午5:29:38
 */
public class TenantOrg extends BaseQuery {
	private static final long serialVersionUID = 1L;
	// 主键
	private Integer id;
	// 单位名称
	private String name;
	// 租户id
	private Integer tenantId;
	//组织级别
	private Integer level;
	//是否可用
	private Integer enabled = 0;
	//父组织id
	private Integer parentId;
	//是否删除
	private Integer delete = 0;
	
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

    public Integer getTenantId()
    {
        return tenantId;
    }

    public void setTenantId(Integer tenantId)
    {
        this.tenantId = tenantId;
    }

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getDelete() {
		return delete;
	}

	public void setDelete(Integer delete) {
		this.delete = delete;
	}
        
}
