/**
 * 定时任务js
 */
var timeTask_list = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//复选框操作
		public_obj.checkbox_all("","",true);
		
		//table下拉按钮事件
		content.table_action_list_btn();
		
	}
}

$(function(){
	timeTask_list.init();
}); 