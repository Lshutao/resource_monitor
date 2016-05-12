/**
 * 云服务商js
 */
var router_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		router_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "router_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		router_validate.validateConfig(flag, "1");
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
    			router_validate.routerSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		router_validate.executeValidate(submitId, groupId);
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
    		onError : "请选择网络区域"
    	});
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入路由名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 20,
    		onError : "路由名称长度限制1-20个字符"
    	});
	},
	
	/**
	 * 保持用户信息
	 * @param submitId
	 */
	routerSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/router");
			}
		}
		XUI.ajax.send("/router/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	}
	
}

$(function(){
	router_validate.init();
}); 