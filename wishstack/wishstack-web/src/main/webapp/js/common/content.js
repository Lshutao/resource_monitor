var content = {
	init : function() { 
		content.reset_click();
	},
	
	/**
	 * table下拉按钮事件
	 */
	table_action_list_btn:function(){
		$(".action_list .drop_down_btn").unbind("click").click(function(){
			content.table_action_list_btn_click($(this));
		});
		$(".action_list .drop_down_btn i").unbind("click").click(function(){
			content.table_action_list_btn_click($(this));
		});
		//给所有元素加上点击事件,如果当前元素不是table中的下拉按钮，则隐藏table中的所有下拉框
		$("*").click(function(){
			if( $(this).hasClass("drop_down_btn") || $(this).parent().hasClass("drop_down_btn")){
				return false;
			}else{
				$(".action_list").removeClass("active");
			}
		});
	},
	
	/**
	 * table下拉按钮事件(click)
	 */
	table_action_list_btn_click:function(obj){
		var par_div = obj.parents(".action_list");
		if(par_div.hasClass("active")){
			par_div.removeClass("active");
		}else{
			obj.parents("tbody").find(".action_list").removeClass("active");
			par_div.addClass("active");
		}
	},
	
	/**
	 * 添加策略规则
	 */
//	add_tactics_rule:function(){
//		$(".alarm_tactics_list.alarm_tactics_rule a.add_rule").unbind("click").click(function(){
//			var parent_ul = $(".alarm_tactics_list.alarm_tactics_rule .tactics_rule");
//			var add_a_null_rule = "<li>"+
//				"<i class='wish_alarm'></i>"+
//				"<select class='alarm_item' placeholder='监控项'>"+
//					"<option value = 'CPU'>CPU使用率</option>"+
//					"<option value = 'RAM'>内存使用率</option>"+
//					"<option value = 'DISK'>磁盘使用率</option>"+
//					"<option value = 'IN_THROUGHPUT'>网络进吞吐量</option>"+
//					"<option value = 'OUT_THROUGHPUT'>网络出吞吐量</option>"+
//				"</select>"+
//				"<select class='alarm_condition' placeholder='条件'>"+
//					"<option value='>='> >= </option>"+
//					"<option value='<='> <= </option>"+
//					"<option value='=='> == </option>"+
//				"</select>"+
//				"<input type='number' placeholder='阈值' class='alarm_value' value='70' min='0' max='100'/><span>%</span>"+
//				"<a class='remove wish_clear'>  </a>"+
//			"</li>";
//			parent_ul.append(add_a_null_rule);
//			
//			var remove_rule = $(".alarm_tactics_list.alarm_tactics_rule .tactics_rule li a.remove");
//			remove_rule.unbind("click").click(function(){
//				$(this).parent().remove();
//			});
//		});
//	},
	/**
	 * 计算配置费用
	 */
	quota_task:function(){
		
		var order_t_hour = $("#order_time_hour_num").text();
        if(order_t_hour != ''){
	        var task = 0;
	        var cores_num = $("#cores_num").text();
	        var ram_num = $("#ram_num").text();
	        var volumeTotalSize_num = $("#volumeTotalSize_num").text();
	        var floatingIps_num = $("#floatingIps_num").text();
	        var routers_num = $("#routers_num").text();
	        var loadbalancers_num = $("#loadbalancers_num").text();
	        var vpn_num = $("#vpn_num").text();
	        var wafs_num = $("#wafs_num").text();
	        var safeChannel_num = $("#safeChannel_num").text();
	        var ips_num = $("#ips_num").text();
	        var firewall_num = $("#firewall_num").text();
	        task = (cores_num*0.06+ram_num/1024*0.09+routers_num*0.0625+loadbalancers_num*0.0625+
	        			floatingIps_num*0.1625+volumeTotalSize_num/10*0.0141+vpn_num*0.0141+
	        			wafs_num*0.0141+safeChannel_num*0.0141+ips_num*0.0141+firewall_num*0.0141)
	        			*order_t_hour;
	        $("#total_task").text(task.toFixed(2)+"元");
	     }
	},
	
	/**
	 * 删除策略规则
	 */
//	remove_tactics_rule:function(){
//		var remove_rule = $(".alarm_tactics_list.alarm_tactics_rule .tactics_rule li a.remove");
//		remove_rule.unbind("click").click(function(){
//			$(this).parent().remove();
//		});
//	},
	
	
	/*
	 * 订单审批  下拉框的显示与隐藏
	 */
	order_result:function(){
		$(".approve_result").change(function(){
			var this_val = $(this).val();
			var hide_obj = $(".service_pro");
			if(this_val == "pass"){
				hide_obj.css("display","inline-block");
			}else if(this_val == "refuse"){
				hide_obj.css("display","none");
			}
		});
	},
	
	/*
	 * 配额查询当前使用bar的width
	 */
	quota_select_bar:function(){
		$(".quota_select_list tbody tr").each(function(){
			var use = parseInt( $(this).find(".num .use").text() );
			var total = parseInt( $(this).find(".num .total").text() );
			var num_value = use/total * 100;
			$(this).find(".quota_user").css("width",num_value+"%");
		});
	},
	
	/**
	 * 表单重置按钮事件
	 */
	reset_click:function(){
		$("form button[type=reset]").click(function(){
			$(this).parents("form").find("input + div").css("display","none");
			$(this).parents("form").find("select + div").css("display","none");
			$(this).parents("form").find("textarea + div").css("display","none");
		});
	},
	 
	 /* ------------密码复杂度 start ------------- */
	 charMode:function(char) {
		if (char >= 48 && char <= 57) //数字
		    return 1;
		if (char >= 65 && char <= 90) //大写字母
		    return 2;
		if (char >= 97 && char <= 122) //小写
		    return 4;
		else
		    return 8; //特殊字符
	},

	bitTotal:function(num) {
		var modes = 0;
		for (i = 0; i < 4; i++) {
		    if (num & 1) modes++;
		    num >>>= 1;
		}
		return modes;
	},

	checkStrong:function(password) {
		if (password.length <= 9)
		    return 0;
		var modes = 0;
		for (i = 0; i < password.length; i++) {
		    modes |= content.charMode(password.charCodeAt(i));
		}
		return content.bitTotal(modes);
	},

	pwStrength:function(pwd, pwdDiv) {
		var color = "#D9D9D9", lowColor = "#058fcd", middleColor = "#058fcd", highColor = "#058fcd", lColor, mColor, hColor;
		if (pwd == null || pwd == '') {
		    lColor = mColor = hColor = color;
		} else {
		    var level = content.checkStrong(pwd);
		    switch (level) {
		        case 0:
		            lColor = mColor = hColor = color;
		            document.getElementById("strength_span").innerHTML = "弱";
			    case 1:
			        lColor = lowColor;
			        mColor = hColor = color;
			        document.getElementById("strength_span").innerHTML = "弱";
			        break;
			    case 2:
			        lColor = mColor = middleColor;
			        hColor = color;
			        document.getElementById("strength_span").innerHTML = "中";
			        break;
			    default:
			        lColor = mColor = hColor = highColor;
			        document.getElementById("strength_span").innerHTML = "高";
			    }
		}
		pwdDiv.find("#strengthLow").css("background", lColor);
		pwdDiv.find("#strengthMiddle").css("background", mColor);
		pwdDiv.find("#strengthHigh").css("background", hColor);
		return;
	},
	
	/**
	 * 密码复杂度事件
	 */
	pwStrength_event:function(){
		var passwordStrong = $( '<ul id="pwd_strength">' +
								    '<li id="strengthLow"></li>' +
								    '<li id="strengthMiddle"></li>' +
								    '<li id="strengthHigh"></li>' +
								    '<span id="strength_span">弱</span>' +
							    "</ul>");
		
		$("#password").after(passwordStrong);
		$("#password").keyup(function () {
			content.pwStrength($(this).val(), passwordStrong);
		});
	}
	/* ------------密码复杂度 end ------------- */
	
};

(function() {	
	content.init();
})();

