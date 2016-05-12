/**
 * 工单管理js
 */
var procedure_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		procedure_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "procedure_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		procedure_validate.validateConfig(flag, "1");
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
    			procedure_validate.procedureSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		procedure_validate.executeValidate(submitId, groupId);
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
		$("#type").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择工单类型"
    	});	
		$("#title").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入标题",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 50,
    		onError : "标题长度限制1-25个字"
    	});
		$("#content").formValidator({
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
	 * 保存工单信息
	 * @param submitId
	 */
	procedureSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/procedure");
				public_obj.prompt_show(data.code, data.result);
			}
		};		
		public_obj.button_repeat_submit("procedure_add");
		XUI.ajax.send("/procedure/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	},
	
};

$(function(){
	procedure_validate.init();
}); 