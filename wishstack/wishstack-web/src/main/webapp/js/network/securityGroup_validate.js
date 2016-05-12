/**
 * 安全组管理js
 */
var securityGroup_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		securityGroup_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "securityGroup_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		securityGroup_validate.validateConfig(flag, "1");
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
    			securityGroup_validate.securityGroupSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		securityGroup_validate.executeValidate(submitId, groupId);
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
		$("#provider").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择云服务商"
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
		$("#description").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入描述",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		onError : "请输入描述"
    	});
	},
	
	/**
	 * 保存安全组信息
	 * @param submitId
	 */
	securityGroupSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/securityGroup");
			}
		};
		XUI.ajax.send("/securityGroup/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	},
	
};

$(function(){
	securityGroup_validate.init();
}); 