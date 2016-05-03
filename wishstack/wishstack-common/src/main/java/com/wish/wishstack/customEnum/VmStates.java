package com.wish.wishstack.customEnum;

/**
 * 虚拟机实例状态枚举类
 * @author ttx
 * @since 2016年1月21日 下午4:53:15
 */
public enum VmStates {
	ACTIVE(1, "运行"),
	BUILD(2, "创建中"),
	SHUTOFF(3, "停止"),
	VERIFY_RESIZE(4, "变更"),
	PAUSED(5, "暂停"),
	SUSPENDED(6, "挂起"),
	RESCUE(7, "恢复"),
	ERROR(8, "错误"),
	DELETED(9, "删除"),
	SOFT_DELETED(10, "软删除"),
	SHELVED(11, "搁置"),
	SHELVED_OFFLOADED(12, "搁置清理？？？");
	
	// 成员变量  
	private int index;
    private String name;  
    
    // 构造方法  
    private VmStates(int index, String name) {  
    	this.index = index;  
        this.name = name;  
    }  
    
    //覆盖方法  
    @Override  
    public String toString() {  
        return this.index+":"+this.name;  
    }  
}
