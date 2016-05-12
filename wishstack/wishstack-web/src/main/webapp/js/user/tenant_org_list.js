/**
 * 组织机构列表js
 */
var tenant_org_list = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//复选框操作
		public_obj.checkbox_all("/power/delete/","/power",true);
		
		//table下拉按钮事件
		content.table_action_list_btn();				
	}
};

$(function(){
	tenant_org_list.init();
}); 