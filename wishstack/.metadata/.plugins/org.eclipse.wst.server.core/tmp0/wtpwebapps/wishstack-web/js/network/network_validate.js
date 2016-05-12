/**
 * 用户管理js
 */
var network_validate = {
	/**
	 * 初始化方法
	 */
	init : function(){
		network_validate.initValidate();
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "network_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		network_validate.validateConfig(flag, "1");
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
    			network_validate.networkSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		network_validate.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入网络名",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 50,
    		onError : "网络名长度限制1-50个字符"
    	});
		if(submitId == "network_update"){
			$("#description").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入描述信息",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		max : 100,
	    		onError : "描述信息长度限制1-100个字符"
	    	});
		}
		if(submitId == "network_add"){
			$("#region").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 1,
	    		onError : "请选择网络区域"
	    	});
			$("#externalNetwork").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "请输入网段",
	    		onCorrect : " "
	    	}).inputValidator({
	    		min : 1,
	    		onError : "请输入网段"
	    	}).regexValidator({
				regExp : regexEnum.ipv4cidr,
				onError : "网段格式不正确，请重新输入"
			});
			$("#subnetGatewayIp").formValidator({
		    	validatorGroup : groupId,
		    	onShow : "",
		    	onFocus : "请输入网关IP:*.*.*.*",
		    	onCorrect : " "
		    }).inputValidator({
	    		max : 50,
	    		onError : "网关IP长度限制50个字符"
	    	}).functionValidator({
				fun : validateGatewayIp
			});
			$("#locationPools").formValidator({
		    	validatorGroup : groupId,
		    	onShow : "",
		    	onFocus : "请输入地址池:*.*.*.1-*.*.*.10",
		    	onCorrect : " "
		    }).inputValidator({
	    		max : 100,
	    		onError : "地址池IP长度限制100个字符"
	    	}).functionValidator({
		    	fun : validateLocationPools
		    });
			$("#dnsAddress").formValidator({
		    	validatorGroup : groupId,
		    	onShow : "",
		    	onFocus : "请输入DNS:*.*.*.*",
		    	onCorrect : " "
		    }).inputValidator({
	    		max : 50,
	    		onError : "DNS长度限制50个字符"
	    	}).functionValidator({
				fun : validateDns
			});
		}
	},
	
	/**
	 * 保持用户信息
	 * @param submitId
	 */
	networkSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/network");
			}
		}
		XUI.ajax.send("/network/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	}
	
}

$(function(){
	network_validate.init();
}); 