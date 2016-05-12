(function() {
	var start = {
		    elem: '#startTime',
		    format: 'YYYY/MM/DD hh:mm:ss',
		    min: laydate.now(), //最小日期
		    istime: true,
		    istoday: false,
		    choose: function(datas){
		         end.min = datas; //开始日选好后，重置结束日的最小日期
		         end.start = datas; //将结束日的初始值设定为开始日
		         var st = $("#startTime").val();
		         var et = $("#endTime").val();
		         $("#begin_t").text(st);
		         if((st != '') && (et != '')){
		        	 var date1 = Date.parse(st);
			        	var date2 = Date.parse(et);
			        	var order_t_hour = (date2-date1)/(60*60*1000);
			        	var order_t_date =  parseInt(order_t_hour/24);
			        	var order_t_hour2 = order_t_hour - order_t_date*24;
			        	$("#order_time_num").text(order_t_date+"天 "+order_t_hour2.toFixed(1)+"小时");
			        	var task = 0;
			        	var cores_num = $("#cores_num").text();
			        	var ram_num = $("#ram_num").text();
			        	var volumeTotalSize_num = $("#volumeTotalSize_num").text();
			        	var floatingIps_num = $("#floatingIps_num").text();
			        	var routers_num = $("#routers_num").text();
			        	var loadbalancers_num = $("#loadbalancers_num").text();
			        	var vpn_num = $("#vpn_num").text();
			        	var wafs_num = $("#wafs_num").text();
			        	var safe_channel_num = $("#safe_channel_num").text();
			        	var ips_num = $("#ips_num").text();
			        	var firewall_num = $("#firewall_num").text();
			        	task = (cores_num*0.06+ram_num/1024*0.09+routers_num*0.0625+loadbalancers_num*0.0625+
			        			floatingIps_num*0.1625+volumeTotalSize_num/10*0.0141+vpn_num*0.0141+
			        			wafs_num*0.0141+safe_channel_num*0.0141+ips_num*0.0141+firewall_num*0.0141)
			        			*order_t_hour;
			        	$("#total_task").text(task.toFixed(2)+"元");
			        	$("#order_time_hour_num").text(order_t_hour);
			        }
		    }
		};
	var end = {
	    elem: '#endTime',
	    format: 'YYYY/MM/DD hh:mm:ss',
	    min: laydate.now(),
	    istime: true,
	    istoday: false,
	    choose: function(datas){
	        start.max = datas; //结束日选好后，重置开始日的最大日期
	        var st = $("#startTime").val();
	        var et = $("#endTime").val();
	        $("#end_t").text(et);
	        if((st != '') && (et != '')){
	        	var date1 = Date.parse(st);
	        	var date2 = Date.parse(et);
	        	var order_t_hour = (date2-date1)/(60*60*1000);
	        	var order_t_date =  parseInt(order_t_hour/24);
	        	var order_t_hour2 = order_t_hour - order_t_date*24;
	        	$("#order_time_num").text(order_t_date+"天 "+order_t_hour2.toFixed(1)+"小时");
	        	var task = 0;
	        	var cores_num = $("#cores_num").text();
	        	var ram_num = $("#ram_num").text();
	        	var volumeTotalSize_num = $("#volumeTotalSize_num").text();
	        	var floatingIps_num = $("#floatingIps_num").text();
	        	var routers_num = $("#routers_num").text();
	        	var loadbalancers_num = $("#loadbalancers_num").text();
	        	var vpn_num = $("#vpn_num").text();
	        	var wafs_num = $("#wafs_num").text();
	        	var safe_channel_num = $("#safe_channel_num").text();
	        	var ips_num = $("#ips_num").text();
	        	var firewall_num = $("#firewall_num").text();
	        	task = (cores_num*0.06+ram_num/1024*0.09+routers_num*0.0625+loadbalancers_num*0.0625+
	        			floatingIps_num*0.1625+volumeTotalSize_num/10*0.0141+vpn_num*0.0141+
	        			wafs_num*0.0141+safe_channel_num*0.0141+ips_num*0.0141+firewall_num*0.0141)
	        			*order_t_hour;
	        	$("#total_task").text(task.toFixed(2)+"元");
	        	$("#order_time_hour_num").text(order_t_hour);
	        }
	    }
	};
	laydate(start);
	laydate(end);
	
	$(".time_choose li").click(function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		var time_obj = $(".quota_detail_time .cloud_calendar");
		var time_choose = $(this).text();
		if(time_choose == '其他')
			time_obj.css("display","block");
		else{
			time_obj.css("display","none");
			$("#order_time_num").text(time_choose);
			var time_hour;
			if(time_choose == '1个月')
			{	time_hour = 24*30;}
			else if(time_choose == '3个月')
			{	time_hour = 24*30*3;}
			else if(time_choose == '6个月')
			{	time_hour = 24*30*6;}
			else if(time_choose == '1年')
			{	time_hour = 24*30*12;}
			$("#order_time_hour_num").text(time_hour);
	        if(time_hour != ''){
		        var task = 0;
		        var cores_num = $("#cores_num").text();
		        var ram_num = $("#ram_num").text();
		        var volumeTotalSize_num = $("#volumeTotalSize_num").text();
		        var floatingIps_num = $("#floatingIps_num").text();
		        var routers_num = $("#routers_num").text();
		        var loadbalancers_num = $("#loadbalancers_num").text();
		        var vpn_num = $("#vpn_num").text();
		        var wafs_num = $("#wafs_num").text();
		        var safe_channel_num = $("#safe_channel_num").text();
		        var ips_num = $("#ips_num").text();
		        var firewall_num = $("#firewall_num").text();
		        task = (cores_num*0.06+ram_num/1024*0.09+routers_num*0.0625+loadbalancers_num*0.0625+
		        			floatingIps_num*0.1625+volumeTotalSize_num/10*0.0141+vpn_num*0.0141+
		        			wafs_num*0.0141+safe_channel_num*0.0141+ips_num*0.0141+firewall_num*0.0141)
		        			*time_hour;
		        $("#total_task").text(task.toFixed(2)+"元");
		     }
		}
	});
})();