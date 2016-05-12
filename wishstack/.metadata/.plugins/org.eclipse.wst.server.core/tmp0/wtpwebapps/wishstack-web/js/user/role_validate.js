/**
 * 角色管理js
 */
var role_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){			
       role_validate.initValidate();		
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "role_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		role_validate.validateConfig(flag, "1");
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
    			role_validate.roleSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		role_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){	
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入角色定义",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 50,
    		onError : "请输入角色定义，如 system_admin"
    	});
		$("#description").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入角色名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		onError : "请输入角色名称"
    	});
		$("#systemRole").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择是否创建基本角色"
    	});
	},
	
	/**
	 * 保存角色信息
	 * @param submitId
	 */
	roleSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/role");
				public_obj.prompt_show(data.code, data.result);
			}
		};	
		public_obj.button_repeat_submit("submitId");
		var nodes = $('#powerIds').tree('getChecked');
		var powerIds = '';
		for(var i=0; i<nodes.length; i++){
			powerIds +='&powerIds='+ nodes[i].id;
		}
		XUI.ajax.send("/role/save", $("#" + submitId + "_form").serialize()+powerIds, "post", "json",  config);
		return true;
	},
	
};

$(function(){
	role_validate.init();
});

