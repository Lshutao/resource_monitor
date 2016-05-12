/**
 * 权限管理js
 */
var power_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){	
		power_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "power_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		power_validate.validateConfig(flag, "1");
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
    			power_validate.powerSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		power_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){	
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入权限名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 4,
    		max : 50,
    		onError : "权限名称长度限制在4-50个字"
    	});
		$("#permission").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入权限定义",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		onError : "请输入权限定义，如 user:list"
    	});
	},
	
	/**
	 * 保存角色信息
	 * @param submitId
	 */
	powerSave : function(submitId){
		var config = {
				"callback" : function(data){
					XUI.gotoPage("/power");
					public_obj.prompt_show(data.code, data.result);
				}
			}
		
			var value = $("input[name='parentId']").val();
			if(value=="" || value==null){
				public_obj.prompt_show('failure', '请选择上级菜单');
				return false;
			}
			
			XUI.ajax.send("/power/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
			return true;
	},
	
};

$(function(){
	power_validate.init();
}); 