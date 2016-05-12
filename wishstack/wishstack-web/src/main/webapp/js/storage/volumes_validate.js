/**
 * 云硬盘管理js
 */
var volumes_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		volumes_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "volumes_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		volumes_validate.validateConfig(flag, "1");
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
    			volumes_validate.volumesSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		volumes_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		if(submitId == "volumes_add"){
			$("#name").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入云硬盘名称",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		max : 100,
	    		onError : "云硬盘名称长度限制1-100个字符"
	    	}).functionValidator({
	    		fun : validateVolumesName
	    	});
			$("#size").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入云硬盘容量",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		onError : "云硬盘容量至少为1"
	    	});
			$("#volumesNumber").formValidator({
				validatorGroup : groupId,
				onShow : "",
				onFocus : "请输入云硬盘个数",
				onCorrect : " "
			}).inputValidator({
				min : 1,
				onError : "云硬盘个数至少为1"
			});
			$("#userId").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		onError : "请指定云硬盘用户"
	    	});
		}
	},
	
	/**
	 * 保持用户信息
	 * @param submitId
	 */
	volumesSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/volumes");
			}
		}
		XUI.ajax.send("/volumes/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	}
	
}

$(function(){
	volumes_validate.init();
}); 