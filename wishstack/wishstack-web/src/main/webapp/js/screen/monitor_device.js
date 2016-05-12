/**
 * 设备状态监控js文件
**/
var monitor_device = {
	/**
	 * 初始化方法
	 */
	init : function(){
		monitor_device.get_provider_id();
		if($("#pagenavi").find("a").length == 2){
			monitor_device.init_provider_switch();
		}
		monitor_device.set_time();
		monitor_device.init_interval();
	},
	
	/**
	 * 获取云服务商id
	 */
	get_provider_id : function(){
		var index = 0;
		$("#pagenavi").find("a").each(function(){
			index += 1;
			monitor_device.get_device_statistics($(this).attr("provider_data"), index);
			monitor_device.get_device_alarm_statistics($(this).attr("provider_data"), index);
//			monitor_device.get_new_alarm_by_provider($(this).attr("provider_data"), index);
			monitor_device.get_server_alarm_statistics($(this).attr("provider_data"), index);
		});
	},
	
	/**
	 * 根据云服务商id获取设备统计信息
	 * @param providerId
	 */
	get_device_statistics : function(providerId, index){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_device/getDeviceStatistics",
			data:{
				"providerId":providerId
			},
			dataType : "json",
			success: function(data){
				$("#device_compute_provider_" + index).text(data.computeCount);
				$("#compute_device_count_" + index).text(data.computeCount);
				$("#device_storage_provider_" + index).text(data.storageCount);
				$("#storage_device_count_" + index).text(data.storageCount);
				$("#device_network_provider_" + index).text(data.networkCount);
				$("#device_security_provider_" + index).text(data.securityCount);
			}
		});
	},
	
	/**
	 * 获取告警设备统计数据
	 * @param providerId
	 */
	get_device_alarm_statistics : function(providerId, index){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_device/getDeviceAlarmStatistics",
			data:{
				"providerId":providerId
			},
			dataType : "json",
			success: function(data){
				var count = 0;
				var _index_1 = 0;
				$.each(data, function(k, v){
					_index_1 += 1;
					count += v.alarmCount;
					$("#server_name_provider_" + index + "_" + _index).parent().hide();
				});
				if(count > 0){
					var _index = 0;
					$.each(data, function(k, v){
						_index += 1;
						var per = v.alarmCount * 100 / count;
						$("#server_name_provider_" + index + "_" + _index).text(v.name);
						$("#server_style_provider_" + index + "_" + _index).css("width", per + "%");
						$("#server_count_provider_" + index + "_" + _index).text(v.alarmCount);
						$("#server_name_provider_" + index + "_" + _index).parent().show();
					});
				}
			}
		});
	},
	
	/**
	 * 根据云服务商id获取未告警统计数据
	 * @param providerId
	 */
	get_new_alarm_by_provider : function(providerId, index){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_device/getNewAlarmByProvider",
			data:{
				"providerId":providerId
			},
			dataType : "json",
			success: function(data){
				$("#new_alarm_count_" + index).text(data);
			}
		});
	},
	
	/**
	 * 获取服务器故障告警统计信息
	 * @param providerId
	 */
	get_server_alarm_statistics : function(providerId, index){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_device/getServerAlarmStatistics",
			data:{
				"providerId":providerId
			},
			dataType : "json",
			success: function(data){
				//console.log(data);
				$.each(data, function(k, v){
					if(v.deviceType == "server_device"){
						$("#compute_device_fault_" + index).text(v.faultCount);
						$("#compute_device_alarm_new_" + index).text(v.alarmCount);
						if(v.alarmCount > 0){
							$("#compute_device_alarm_new_" + index).parents(".alarm_class").addClass("alarm");
							$("#compute_device_alarm_new_" + index).parents(".detail-show").show();
						}else{
							$("#compute_device_alarm_new_" + index).parents(".alarm_class").removeClass("alarm");
							$("#compute_device_alarm_new_" + index).parents(".detail-show").hide();
						}
					}else{
						$("#storage_device_fault_" + index).text(v.faultCount);
						$("#storage_device_alarm_new_" + index).text(v.alarmCount);
						if(v.alarmCount > 0){
							$("#storage_device_alarm_new_" + index).parents(".alarm_class").addClass("alarm");
							$("#storage_device_alarm_new_" + index).parents(".detail-show").show();
						}else{
							$("#storage_device_alarm_new_" + index).parents(".alarm_class").removeClass("alarm");
							$("#storage_device_alarm_new_" + index).parents(".detail-show").hide();
						}
					}
				});
			}
		});
	},
	
	/**
	 * 初始化云服务商切换
	 */
	init_provider_switch : function(){
		console=window.console || {dir:new Function(),log:new Function()};
        var active = 0;
        var as = document.getElementById('pagenavi').getElementsByTagName('a');
        var lis = document.getElementById('slider4').getElementsByTagName('li');
        for(var i=0;i<as.length;i++){
            (function(){
                var j=i;
                as[i].onclick=function(){
                    t4.slide(j);
                    return false;
                };
            })();
        }
        
        var t4=new TouchSlider('slider4',{duration:1, speed:1000, direction:0, interval:15*1000, autoplay:true, align:'middle', mousewheel:true, mouse:true, fullsize:true});
        t4.on('before',function(m,n){
            as[m].className='';
            lis[m].style.display = none;
            as[n].className='active';
            lis[n].style.display = 'block';
        });
	},
	
	/**
	 * 设置时间
	 */
	set_time : function(){
		var date = public_obj.getDateByFormat("yyyy-MM-dd hh:mm:ss");
		$("#time_calculate").text(date);
	},
	
	/**
	 * 初始化定时器
	 */
	init_interval : function(){
		/**
		 * 定时刷新时间
		 */
		setInterval(function(){
			monitor_device.set_time();
		}, 1000);
		
		/**
		 * 定时刷新数据
		 */
		setInterval(function(){
			monitor_device.get_provider_id();
		}, 5 * 60 * 1000);
		
	},
	
	/**
	 * 根据窗口的变化改变图表的大小
	 * @param 图表对象
	 */
	charts_resize : function(chart){
		$(window).resize(function() {
			chart.resize();
		});
	}
}

$(function(){
	monitor_device.init();
});