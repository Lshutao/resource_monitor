/**
 * 角色管理js
 */
var role_list = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//复选框操作
		public_obj.checkbox_all("/role/delete/","/role",true);
		
		//table下拉按钮事件
		content.table_action_list_btn();				
	}
};

$(function(){
	role_list.init();
}); 