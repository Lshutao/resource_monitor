/**
 * 信息系统迁移js
 * */
var file_name = "";
var info_system_transfer_resource_validate = {
		/**
		 * 初始化方法
		 */
		init : function(){
			info_system_transfer_resource_validate.initValidate();
			info_system_transfer_resource_validate.date_function();/**设置输入时间格式*/
		},
		
		/**
		 * 初始化验证方法
		 */
		initValidate : function(){
			var flag = "info_system_transfer_resource_admin_update";
			info_system_transfer_resource_validate.validateConfig(flag, "1");
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
	    			info_system_transfer_resource_validate.infoSystemTransferResourceSave(submitId);
	    		},
	    		onError : function() {
	    			
	    		}
	    	});
			info_system_transfer_resource_validate.executeValidate(submitId, groupId);
		},
		
		/**
		 * 执行具体的验证方法
		 * @param submitId
		 * @param groupId
		 */
		executeValidate : function(submitId, groupId){
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
			$("#orgName").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 1,
	    		max : 50,
	    		onError : "单位名称长度限制在1-50个字符"
	    	});	
			$("#resource").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 1,
	    		max : 50,
	    		onError : "厂商名称长度限制在1-50个字符"
	    	});
		},
		
		/**
		 * 设置输入时间格式
		 * */
		date_function:function(){
			var start = {
			    elem: '#createdAt',
			    format: 'YYYY/MM/DD',
			    max: laydate.now(), 
			    istime: true,
			    istoday: false
			};
			laydate(start);
		},
		
		/**
		 * 保持信息系统信息
		 * @param submitId
		 */
		infoSystemTransferResourceSave : function(submitId){
			var config = {
					"callback" : function(data){
						XUI.gotoPage("/resource/adminList");
					}
				}
			XUI.ajax.send("/resource/update", $("#" + submitId + "_form").serialize(), "post", "json",  config);
			return true;     
		}
}

$(function(){
	info_system_transfer_resource_validate.init();
}); 