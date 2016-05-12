/**
 * 租户管理js
 */
var tenant = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//复选框操作
		public_obj.checkbox_all("/tenant/","/tenant",true);
		
		//table下拉按钮事件
		content.table_action_list_btn();
	},
	
	
}

$(function(){
	tenant.init();
}); 