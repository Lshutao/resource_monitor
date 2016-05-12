/**
 * 用户管理js
 */
var user_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		user_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "user_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else if($("form").attr("id").indexOf("update") > 0){
			flag += "update";
		}else{
			flag += "reset_password";
		}
		user_validate.validateConfig(flag, "1");
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
    			user_validate.userSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		user_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#username").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入您的用户名",
    		onCorrect : " "
    	}).inputValidator({
    		min : 3,
    		max : 30,
    		onError : "用户名长度限制3-30个字符"
    	}).functionValidator({
    		fun : validateUserName
    	});
		if(submitId == "user_add"){
			$("#password").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入密码",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 4,
	    		max : 16,
	    		onError : "密码长度限制4-16个字符"
	    	}).functionValidator({
	    		fun : validatePassword
	    	});
			$("#confirmPassword").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入确认密码",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 4,
	    		max : 16,
	    		onError : "确认密码长度限制4-16个字符"
	    	}).functionValidator({
	    		fun : validatePasswordDiff
	    	});
			$("#userRole").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 1,
	    		onError : "请选择角色类型"
	    	});
			$("#name").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入您的姓名",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 2,
	    		max : 30,
	    		onError : "姓名长度限制2-30个字符"
	    	});
			$("#description").formValidator({
				validatorGroup : groupId,
				onShow : "",
				onFocus : "请输入描述信息",
				onCorrect : " "
			}).inputValidator({
				max : 1000,
				onError : "描述信息长度只能在1000个字符内"
			});
		}
		if(submitId == "user_reset_password"){
			$("#oldPassword").formValidator({
				validatorGroup : groupId,
				onShow : "",
				onFocus : "请输入当前密码",
				onCorrect : " "
			}).inputValidator({
				min : 4,
				max : 16,
				onError : "当前密码长度限制4-16个字符"
			});
			$("#password").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入密码",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 4,
	    		max : 16,
	    		onError : "密码长度限制4-16个字符"
	    	}).functionValidator({
	    		fun : validatePassword
	    	});
			$("#confirmPassword").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入确认密码",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 4,
	    		max : 16,
	    		onError : "确认密码长度限制4-16个字符"
	    	}).functionValidator({
	    		fun : validatePasswordDiff
	    	});
		}
		$("#telephone").formValidator({
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
		}).functionValidator({
    		fun : validateUserTelephone
    	});
		$("#email").formValidator({
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
		}).functionValidator({
    		fun : validateUserEmail
    	});
		$("#address").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		max : 100,
    		onError : "地址的长度限制200个字符"
    	});
	},
	
	/**
	 * 保持用户信息
	 * @param submitId
	 */
	userSave : function(submitId){
		var config = {
			"callback" : function(data){
				if(data.data == "edit" && data.code == "success"){  //修改自身密码成功后跳转到登录界面
					window.top.location = contextPath+"/logout";
				}else {
					XUI.gotoPage("/user");
					public_obj.prompt_show(data.code, data.result);
				}
			}
		}
		if(submitId == "user_reset_password"){
			XUI.ajax.send("/user/savePassword", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		}else{
			XUI.ajax.send("/user/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		}
		return true;
	}
}

$(function(){
	user_validate.init();

	//密码复杂度提示
	content.pwStrength_event();
}); 