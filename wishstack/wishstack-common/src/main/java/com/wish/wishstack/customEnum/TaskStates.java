package com.wish.wishstack.customEnum;

/**
 * 虚拟机实例状态枚举类
 * @author ttx
 * @since 2016年1月21日 下午4:53:15
 */
public enum TaskStates {
	REBOOTING(1, "重启中"),
	REBOOT_PENDING(2, "重启中"),
	REBOOT_STARTED(3, "重启中"),
	REBOOTING_HARD(4, "硬重启"),
	REBOOT_PENDING_HARD(5, "硬重启"),
	REBOOT_STARTED_HARD(6, "硬重启"),
	UPDATING_PASSWORD(7, "更新密码中"),
	REBUILDING(8, "重建中"),
	REBUILD_BLOCK_DEVICE_MAPPING(9, "重建中"),
	REBUILD_SPAWNING(10, "重建中"),
	MIGRATING(11, "迁移中"),
	RESIZE_PREP(12, "变更中"),
	RESIZE_MIGRATING(13, "变更中"),
	RESIZE_MIGRATED(14, "变更中"),
	RESIZE_FINISH(15, "变更完成"),
	RESIZE_REVERTING(16, "变更回滚");
	
	// 成员变量  
	private int index; 
    private String name;  
    
    // 构造方法  
    private TaskStates(int index, String name) {  
    	this.index = index;  
        this.name = name;  
    }  
    
    //覆盖方法  
    @Override  
    public String toString() {  
        return this.index+":"+this.name;  
    }  
}
