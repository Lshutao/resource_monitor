/**
 * 租户管理js
 */
var user_list = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//复选框操作
		public_obj.checkbox_all("/user/","/user",true);
		
		//table下拉按钮事件
		content.table_action_list_btn();
		
	}
}

$(function(){
	user_list.init();
}); 