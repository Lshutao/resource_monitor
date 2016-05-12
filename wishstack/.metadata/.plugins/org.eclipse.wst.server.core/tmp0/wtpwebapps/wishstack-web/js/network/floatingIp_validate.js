/**
 * 外网IP管理js
 */
var floatingIp_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		floatingIp_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "floatingIp_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		floatingIp_validate.validateConfig(flag, "1");
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
    			floatingIp_validate.floatingIpSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		floatingIp_validate.executeValidate(submitId, groupId);
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
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 25,
    		onError : "名称长度限制1-25个字符"
    	});
	},
	
	/**
	 * 保存外网IP信息
	 * @param submitId
	 */
	floatingIpSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/floatingIp");
			}
		};
		XUI.ajax.send("/floatingIp/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	},
	
};

$(function(){
	floatingIp_validate.init();
}); 