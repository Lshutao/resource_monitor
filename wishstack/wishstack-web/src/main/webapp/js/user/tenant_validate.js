/**
 * 租户管理js
 */
var tenant_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		tenant_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "tenant_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		tenant_validate.validateConfig(flag, "1");
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
    			tenant_validate.tenantSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		tenant_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入租户名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 30,
    		onError : "租户名称长度限制1-30个字符"
    	}).functionValidator({
    		fun : validateTenantName
    	});
		$("#description").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入描述信息",
    		onCorrect : " "
    	}).inputValidator({
    		min : 0,
    		max : 10000,
    		onError : "描述信息限制在0-10000个字符"
    	});
	},
	
	/**
	 * 保存租户信息
	 * @param submitId
	 */
	tenantSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/tenant");
				public_obj.prompt_show(data.code, data.result);
			}
		};
		var value = $("input[name='orgId']").val();
		if(value=="" || value==null){
			public_obj.prompt_show('failure', '请选择组织机构');
			return false;
		}
		XUI.ajax.send("/tenant/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	}
	
};

$(function(){
	tenant_validate.init();
}); 