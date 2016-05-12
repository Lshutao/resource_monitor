/**
 * 云服务商js
 */
var provider_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		provider_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "provider_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		provider_validate.validateConfig(flag, "1");
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
    			provider_validate.providerSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		provider_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#username").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入用户名",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 20,
    		onError : "用户名长度限制1-20个字符"
    	});
		$("#port").formValidator({
	    	validatorGroup : groupId,
	    	onShow : "",
	    	onFocus : "请输入端口号",
	    	onCorrect : " "
	    }).functionValidator({
			fun : validateport
		});
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入云服务商",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 20,
    		onError : "云服务商长度限制1-20个字符"
    	});
		if(submitId == "provider_add"){
			$("#password").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入密码",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 4,
	    		max : 20,
	    		onError : "密码长度限制4-20个字符"
	    	});
			$("#userId").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入用户ID",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		max : 36,
	    		onError : "用户ID长度限制1-36个字符"
	    	});
			$("#urlJump").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入IP",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		onError : "IP为空，请输入IP"
	    	}).regexValidator({
	    		regExp : regexEnum.ip4,
	    		onError : "IP格式不正确，请重新输入"
	    	});
			$("#confirmPassword").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入确认密码",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 4,
	    		max : 20,
	    		onError : "确认密码长度限制4-20个字符"
	    	}).functionValidator({
	    		fun : validatePasswordDiff
	    	});
			$("#address").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入地址",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		max : 200,
	    		onError : "地址的长度限制1-200个字符"
	    	});
		}
		$("#ip").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入IP",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		onError : "IP为空，请输入IP"
    	}).regexValidator({
    		regExp : regexEnum.ip4,
    		onError : "IP格式不正确，请重新输入"
    	});
		$("#personInCharge").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入负责人",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 20,
    		onError : "负责人长度限制1-20个字符"
    	});
		$("#tel").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入手机号",
    		onCorrect : " "
    	}).inputValidator({
    		min : 11,
    		max : 11,
    		onError : "请输入11位手机号"
    	}).regexValidator({
			regExp : regexEnum.mobile,
			onError : "手机号格式不正确，请重新输入"
		});
		$("#mail").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入邮箱地址",
    		onCorrect : " "
    	}).inputValidator({
    		min : 4,
    		max : 50,
    		onError : "邮箱格式不正确，请重新输入"
    	}).regexValidator({
			regExp : regexEnum.email,
			onError : "邮箱格式不正确，请重新输入"
		});
	},
	
	/**
	 * 保持用户信息
	 * @param submitId
	 */
	providerSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/provider");
			}
		}
		XUI.ajax.send("/provider/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	}
	
}

$(function(){
	provider_validate.init();
}); 