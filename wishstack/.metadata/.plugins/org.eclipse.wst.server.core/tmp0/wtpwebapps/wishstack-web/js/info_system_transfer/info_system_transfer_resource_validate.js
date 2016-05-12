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
			//info_system_transfer_resource_validate.choose_file();
			info_system_transfer_resource_validate.date_function();/**设置输入时间格式*/
		},
		
		/**
		 * 初始化验证方法
		 */
		initValidate : function(){
			var flag = "info_system_transfer_resource_";
			if($("form").attr("id").indexOf("add") > 0){
				flag += "add";
				info_system_transfer_resource_validate.choose_file();
			}else{
				flag += "update";
			}
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
			/*$("#createdAt").formValidator({
	    		validatorGroup : groupId,
	    		onShow : "",
	    		onFocus : "",
	    		onCorrect : ""
	    	}).inputValidator({
	    		min : 10,
	    		onError : "请选择日期"
	    	});*/
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
		* 选择文件后，恢复按钮可用
		*/
		choose_file:function(){
		  $("input.choose_file_btn").change(function(){
			  $("#info_system_transfer_resource_add").attr("disabled",false);
			  var text = $(this).val();
			  if(text == ""){
				  if(file_name != ""){
					  $(".upload_resource span").text(file_name);
				  }else{
					  $(".upload_resource span").text("上传资源表格");
				  }
			  }else{
				  var name_o = text.split("\\");
				  $(".upload_resource span").text(name_o[name_o.length-1]);
				  file_name=name_o[name_o.length-1];
			  }
		  });
		},
		/**
		 * 保持信息系统信息
		 * @param submitId
		 */
		infoSystemTransferResourceSave : function(submitId){
			var formData = new FormData($("#" + submitId + "_form")[0]); 
			if(submitId == "info_system_transfer_resource_add"){
				 $.ajax({  
		             url: '/wishstack-web/resource/save' ,  
		             type: 'POST',  
		             data: formData,  
		             async: false,  
		             cache: false,  
		             contentType: false,  
		             processData: false,  
		             success: function (returndata) {  
		            	XUI.gotoPage("/resource");
		             },  
		             error: function (returndata) {  
		                 //console.log("提交失败");  
		             }  
		        });         
				return true;
			}else{
				var config = {
						"callback" : function(data){
							XUI.gotoPage("/resource");
						}
					}
				XUI.ajax.send("/resource/update", $("#" + submitId + "_form").serialize(), "post", "json",  config);
				return true;
				
			}
	       
		}
}

$(function(){
	info_system_transfer_resource_validate.init();
}); 