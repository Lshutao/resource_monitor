/**
 * 添加组织机构js
 */
var ten_org_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){	
		ten_org_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "ten_org_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		ten_org_validate.validateConfig(flag, "1");
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
    			ten_org_validate.tenOrgSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		ten_org_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){	
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入组织机构名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 4,
    		max : 50,
    		onError : "组织机构名称长度限制在4-50个字"
    	});		
	},
	
	/**
	 * 保存组织机构信息
	 * @param submitId
	 */
	tenOrgSave : function(submitId){
		var config = {
				"callback" : function(data){
					XUI.gotoPage("/tenantOrg");
					public_obj.prompt_show(data.code, data.result);
				}
			};
		
		var value = $("input[name='parentId']").val();
		if(value=="" || value==null){
			public_obj.prompt_show('failure', '请选择上级组织机构');
			return false;
		}
			
		XUI.ajax.send("/tenantOrg/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	},
	
};

$(function(){
	ten_org_validate.init();
}); 