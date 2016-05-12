/**
 * 业务资源管理js
 */
var business_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		business_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "business_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		business_validate.validateConfig(flag, "1");
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
    			business_validate.businessSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		business_validate.executeValidate(submitId, groupId);
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
		$("#businessType").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择业务类型"
    	});
    	
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 35,
    		onError : "名称长度限制1-35个字符"
    	}).functionValidator({
    		fun : validateBusinessName
    	});
		
		$("#urls").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入URL",
    		onCorrect : " "
    	}).regexValidator({
			regExp : regexEnum.urls,
			onError : "URL格式不正确，请重新输入"
		});
	},
	
	/**
	 * 保存业务资源信息
	 * @param submitId
	 */
	businessSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/business");
				//console.log(data.code);
				//console.log(data.result);
				public_obj.prompt_show(data.code, data.result);
			}
		};
        var formData = new FormData($("#" + submitId + "_form")[0]);  

		$.confirm({
			'title'		: "创建",
			'message'	: "确定创建吗？",
			'buttons'	: {
				'确定'	: {
					'class'	: 'sure',
					'action': function(){
						debugger;
						//XUI.ajax.send("/business/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
				        $.ajax({  
				             url: contextPath +'/business/save' ,  
				             type: 'POST',  
				             data: formData,  
				             async: false,  
				             cache: false,  
				             contentType: false,  
				             processData: false,  
				             success: function (returndata) {  
				            	XUI.gotoPage("/business");
				             },  
				             error: function (returndata) {  
				            	 alert(returndata); 
				                 alert("提交失败");  
				             }  
				        });         

					}
				},
				'取消'	: {
					'class'	: 'cancel',
					'action': function(){}	
				}
			}
		});
		
		return true;
	},
	
};

$(function(){
	business_validate.init();
}); 