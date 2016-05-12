/**
 * 告警策略管理js
 */
var alarm_policy_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		alarm_policy_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "alarm_policy_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		alarm_policy_validate.validateConfig(flag, "1");
	},
	
	/**
	 * 验证配置方法
	 */
	validateConfig : function(submitId,groupId){
		$.formValidator.initConfig({
    		validatorGroup : groupId,
    		submitButtonID : submitId,
    		debug : true,
    		errorFocus : false,
    		onSuccess : function() {
    			alarm_policy_validate.alarmPolicySave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		alarm_policy_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#region").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择区域"
    	});
	
		$("#object").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择告警对象"
    	});	
		$("#alarmLevel").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择告警级别"
    	});	
		$("#alarmName").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		max : 20,
    		onError : "策略名称长度限制在1-20个字符"
    	});			
		$("#description").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请输入告警策略描述"
    	});			
	},
	
	/**
	 * 保存告警策略信息
	 * @param submitId
	 */
	alarmPolicySave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/alarmPolicy");
			}
		};
		var alarmObjects = new Array();
		var alarmConditions = new Array();
		var alarmValues = new Array();
		var alarmInstances = new Array();
		$(".tactics_rule > li").each(function(){
			alarmObjects.push($(this).find(".alarm_item").val());
			alarmConditions.push($(this).find(".alarm_condition").val());
			alarmValues.push($(this).find(".alarm_value").val());
		});
		var alarm_rules = null;
		$("#instance input[class='instance_flag']").each(function(){
			if($(this).attr("checked")){
				alarmInstances.push($(this).attr("name"));
			}
		});
		alarm_rules = {
					"alarmObjects" : alarmObjects.toString(), 
					"alarmConditions" : alarmConditions.toString(), 
					"alarmValues" : alarmValues.toString(),
					"providerId" : $("#provider").find(".active").attr("value"),
					"object" : $("#object").val(),
					"region" : $("#region").val(),
					"id" : $("#id").val(),
					"alarmName" : $("#alarmName").val(),
					"description" : $("#description").val(),
					"alarmLevel" : $("#alarmLevel").val(),
					"alarmInstances" : alarmInstances.toString()};
		
		XUI.ajax.send("/alarmPolicy/save", alarm_rules, "post", "json",  config);
		return true;
	},
	
};

$(function(){
	alarm_policy_validate.init();
}); 