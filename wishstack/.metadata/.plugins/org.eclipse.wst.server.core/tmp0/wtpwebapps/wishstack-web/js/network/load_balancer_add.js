/**
 * 添加负载均衡js文件
 */
var loadBalancer = {
	/**
	 * 初始化方法
	 */
	init : function(){
		loadBalancer.provider_click("#providerId li");
		loadBalancer.throughput_click("#throughput li");
		loadBalancer.get_loadBalancer_params(public_obj.get_provider_id());
		loadBalancer.initValidate();
	},
	
	/**
	 * 通过点击云服务商名称改变样式
	 * @param obj
	 */
	provider_click : function(obj){
		$(obj).unbind("click").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			loadBalancer.get_loadBalancer_params($(this).attr("value"));
		});
	},
	/**
	 * 点击连接数
	 * @param obj
	 */
	throughput_click : function(obj){
		$(obj).unbind("click").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		});
	},
	
	/**
	 * 初始化创建负载均衡所需参数
	 */
	get_loadBalancer_params : function(provider_id){
		$.ajax({
			type: "POST",
			url: contextPath + "/loadBalancer/getNetworkFirewall",
			dataType : "json",
			data : {"providerId" : provider_id},
			success: function(data){
				loadBalancer.set_loadBalancer_ips(data.networks);
				loadBalancer.set_loadBalancer_firewall(data.fireWalls);
			}
		});
	},
	
	/**
	 * 设置Ip值
	 */
	set_loadBalancer_ips : function(ips){
		var html = "";
		if(ips){
			$.each(ips, function(k, v){
					html += "<option value=" + v.uuid + ">" + v.externalNetwork + "</li>";
			});
		}
		$("#networks").html(html);
	},
	
	/**
	 * 设置防火墙
	 */
	set_loadBalancer_firewall : function(firewall){
		var html = "";
		html += "<option>缺省防火墙</li>";
		if(firewall){
			$.each(firewall, function(k, v){
					html += "<option value=" + v.uuid + ">" + v.name + "</li>";
			});
		}
		$("#firewalls").html(html);
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "load_balancer_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		loadBalancer.validateConfig(flag, "1");
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
    			loadBalancer.loadBalancerSave(submitId);
    		},
    		onError : function() {
    			
    		}
    	});
		loadBalancer.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#name").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "请输入负载均衡名称",
    		onCorrect : " "
    	}).inputValidator({
    		min : 1,
    		max : 20,
    		onError : "用户名长度限制1-20个字符"
    	});
		$("#networks").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : ""
    	}).inputValidator({
    		min : 1,
    		onError : "请选择IP"
    	});

	
	},
	
	/**
	 * 保持用户信息
	 * @param submitId
	 */
	loadBalancerSave : function(submitId){
		var config = {
			"callback" : function(data){
				XUI.gotoPage("/loadBalancer");
			}
		}
		var alarm_rules = null;
		alarm_rules = {
					"region" : $("#region").val(), 
					"name" : $("#name").val(),  
					"region" : $("#region").val(), 
					"providerId" : $("#providerId").find(".active").attr("value"),
					"throughput" : $("#throughput").find(".active").attr("value"),
					"port" : $("#networks").val(),
					"firewallUuid" : $("#firewalls").val()};		
		XUI.ajax.send("/loadBalancer/save", alarm_rules, "post", "json",  config);
		return true;
	}
	
}

$(function(){
	loadBalancer.init();
}); 