/**
 * 信息系统迁移js
 * */
var info_system_transfer_validate = {
		/**
		 * 初始化方法
		 */
		init : function(){
			info_system_transfer_validate.initValidate();
			info_system_transfer_validate.date_function();
		},
		
		/**
		 * 初始化验证方法
		 */
		initValidate : function(){
			var flag = "info_system_transfer_";
			if($("form").attr("id").indexOf("add") > 0){
				flag += "add";
			}else{
				flag += "update";
			}
			info_system_transfer_validate.validateConfig(flag, "1");
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
	    			info_system_transfer_validate.infoSystemTransferSave(submitId);
	    		},
	    		onError : function() {
	    			
	    		}
	    	});
			info_system_transfer_validate.executeValidate(submitId, groupId);
		},
		
		/***
		 *时间格式控制 
		 */
		date_function:function(){
			var start = {
			    elem: '#createdAt',
			    format: 'YYYY',
			    max: laydate.now(), 
			    istime: true,
			    istoday: false
			};
			var transferAt = {
			    elem: '#transferAt',
			    format: 'YYYY/MM',
			    max:'2018/01',
			    istime: true,
			    istoday: false
			};
			laydate(transferAt);
			laydate(start);
		},
		
		/**
		 * 执行具体的验证方法
		 * @param submitId
		 * @param groupId
		 */
		executeValidate : function(submitId, groupId){
			$("#network").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 1,
	    		onError : "请选择网络"
	    	});
		
			$("#systemType").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 1,
	    		onError : "请选择应用属性"
	    	});	
			
			$("#name").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 1,
	    		max : 50,
	    		onError : "系统名称长度限制在1-50个字符"
	    	});				
		},
		
		/**
		 * 保持信息系统信息
		 * @param submitId
		 */
		infoSystemTransferSave : function(submitId){
			var config = {
				"callback" : function(data){
					XUI.gotoPage("/infoSystemTransfer");
				}
			}
			XUI.ajax.send("/infoSystemTransfer/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
			return true;
		}
}

$(function(){
	info_system_transfer_validate.init();
}); 