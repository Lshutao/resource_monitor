/**
 * 添加虚拟机js文件
 */
var instance = {
	/**
	 * 初始化方法
	 */
	init : function(){
		/*instance.provider_click("#provider li");
		instance.get_instance_params(public_obj.get_provider_id());*/
		instance.initValidate();
	},
	
	/**
	 * 通过点击云服务商名称改变样式
	 * @param obj
	 */
	provider_click : function(obj){
		$(obj).unbind("click").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			instance.get_instance_params($(this).attr("value"));
		});
	},
	
	/**
	 * 点击资源（cpu、内存、磁盘）获取对应值
	 * @param obj
	 */
	resource_click : function(obj, resource_type){
		$(obj).unbind("click").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			var value = public_obj.get_num($(this).text());
			instance.get_flavors(resource_type, value);
		});
	},
	
	/**
	 * 获取规格信息
	 */
	get_flavors : function(resource_type, value){
		$.ajax({
			type: "POST",
			url: contextPath + "/instance/getFlavors",
			dataType : "json",
			data : {
					"resourceType" : resource_type,
					"value"        : value,
					"providerId"   : public_obj.get_provider_id()
					},
			success: function(data){
				instance.set_instance_cpu(data.cpus)
				instance.set_instance_memory(data.memorys)
				instance.set_instance_disk(data.disks)
			}
		});
	},
	
	/**
	 * 初始化创建虚拟机所需参数
	 */
	get_instance_params : function(provider_id){
		$.ajax({
			type: "POST",
			url: contextPath + "/instance/getFlavorImageNetwork",
			dataType : "json",
			data : {"providerId" : provider_id},
			success: function(data){
				instance.set_instance_cpu(data.cpus)
				instance.set_instance_memory(data.memorys)
				instance.set_instance_disk(data.disks)
			}
		});
	},
	
	/**
	 * 设置规格cpu值
	 */
	set_instance_cpu : function(cpus){
		var html = "";
		if(cpus){
			$.each(cpus, function(k, v){
				if(k == 0){
					html += "<li class='active'>" + v + "核</li>";
				}else{
					html += "<li>" + v + "核</li>";
				}
			});
		}
		$("#instance_cpus").html(html);
		instance.resource_click("#instance_cpus li", "cpu");
	},
	
	/**
	 * 设置规格内存值
	 */
	set_instance_memory : function(memorys){
		var html = "";
		if(memorys){
			$.each(memorys, function(k, v){
				if(k == 0){
					html += "<li class='active'>" + v + "GB</li>";
				}else{
					html += "<li>" + v + "GB</li>";
				}
			});
		}
		$("#instance_memorys").html(html);
		instance.resource_click("#instance_memorys li", "memory");
	},
	
	/**
	 * 设置规格磁盘值
	 */
	set_instance_disk : function(disks){
		var html = "";
		if(disks){
			$.each(disks, function(k, v){
				if(k == 0){
					html += "<li class='active'>" + v + "GB</li>";
				}else{
					html += "<li>" + v + "GB</li>";
				}
			});
		}
		$("#instance_disks").html(html);
		instance.resource_click("#instance_disks li", "disk");
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "instance_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		instance.validateConfig(flag, "1");
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
    			instance.instanceSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		instance.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#instanceName").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入用户名",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 20,
    		onError : "用户名长度限制1-20个字符"
    	});
	
	},
	
	/**
	 * 保持用户信息
	 * @param submitId
	 */
	instanceSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/instance");
			}
		}
		XUI.ajax.send("/instance/save", $("#" + submitId + "_form").serialize(), "post", "json",  config);
		return true;
	}
	
}

$(function(){
	instance.init();
}); 