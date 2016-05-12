/**
 * 告警策略管理js
 */
var alarm_policy_list = {
	/**
	 * 批量删除方法
	 */
	deleteBatch : function(){
		var config = {
				"callback" : function(data){
					XUI.gotoPage("/alarmPolicy");
				}
			};
		var alarmPolicyIds = new Array();		
		$("#alarmPolicyId input[class='id_flag']").each(function(){
			if($(this).attr("checked")){
				alarmPolicyIds.push($(this).attr("name"));
			}
		});
		
		alarm_rules = {
				"alarmPolicyIds" : alarmPolicyIds.toString()};
		XUI.ajax.send("/alarmPolicy/delBatch", alarm_rules, "post", "json",  config);
		return true;
	},
};
