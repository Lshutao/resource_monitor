/**
 * 云资源概况js文件
**/
var cloud_service = {
	/**
	 * 初始化方法
	 */
	init : function(){
		cloud_service.init_switch();
		cloud_service.set_time();
		cloud_service.get_quota_used();
		cloud_service.get_quota_total();
		cloud_service.get_vcpu_top5();
		cloud_service.get_memory_top5();
		cloud_service.init_interval();
	},
	
	/**
	 * 初始化切换
	 */
	init_switch : function(){
		new TouchSlider('slider',{duration:1, direction:0, interval:15 * 1000, autoplay:true,fullsize:true});
	},
	
	/**
	 * 获取配额分配信息
	 */
	get_quota_used : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/cloud_service/getQuotaUsed",
			dataType : "json",
			success: function(data){
				cloud_service.set_quota_used(data);
			}
		});
	},
	
	/**
	 * 查询云服务配额分布情况
	 */
	get_quota_total : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/cloud_service/getQuotaTotal",
			dataType : "json",
			success: function(data){
				cloud_service.set_quota_used_charts("quota_total_chart", data);
			}
		});
	},
	
	/**
	 * 设置云服务商配额图表
	 * @param data
	 */
	set_quota_used_charts : function(id, data){
		var provider1_data = new Array();
		var provider2_data = new Array();
		var provider_name = new Array();
		$.each(data, function(k, v){
			if(k == 0){
				provider1_data.push(v.instancesCount);
				provider1_data.push(v.volumesCount);
				provider1_data.push(v.loadbalancersCount);
				provider1_data.push(v.securityGroupsCount);
				provider1_data.push(v.otherCount);
			}else{
				provider2_data.push(v.instancesCount);
				provider2_data.push(v.volumesCount);
				provider2_data.push(v.loadbalancersCount);
				provider2_data.push(v.securityGroupsCount);
				provider2_data.push(v.otherCount);
			}
			provider_name.push(v.name);
		});
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(cloud_service.set_quota_used_options(provider1_data, provider2_data, provider_name));
		cloud_service.charts_resize(myChart);
	},
	
	/**
	 * 设置云服务商配额分布情况
	 * @param provider1_data
	 * @param provider2_data
	 */
	set_quota_used_options : function(provider1_data, provider2_data, provider_name){
		var option = {
			title:{
				text:"云服务商实例分布",
				y:0,
				textStyle:{
					fontSize:32,
					color:"#01b0f1",
					fontWeight:'normal',
	            	fontFamily:"微软雅黑"
				}
			},
		    tooltip : {
		    	show:false,
		        trigger: 'axis',
		        formatter: "{a} <br/>{b} : {c} 个",
		    },
		    toolbox: {
		        show : false
		    },
		    legend: {
		        data:provider_name,
		        textStyle:{
		        	color:"#fff",
		        	fontSize:20,
	            	fontFamily:"微软雅黑"
		        },
		        x:'right',
		        y:12,
		        selectedMode:false
		    },
		    calculable : false,
		    grid: {
		    	x:60,
			    y:50,
			    x2:60,
			    y2:30,
		    	borderWidth:0
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['虚拟机','虚拟磁盘','负载均衡','防火墙','其他'],
		            axisLabel : {
		            	show : true,
		            	textStyle : {
		            		color : '#fff',
		            		fontSize : 20,
			            	fontFamily:"微软雅黑"
		            	}
		            },
		            splitLine:{
                        show:false
                    }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel:{formatter:'{value}'},
			        axisLabel: {
		                 show: true,
		                 textStyle : {
			            	color : '#fff',
			            	fontSize : 20,
			            	fontFamily:"微软雅黑"
			             },
		                 formatter: '{value}'
		            },
		            splitLine:{
                        show:false,
                        lineStyle:{
                        	color: ['#4d545d'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
		        },
		        {
		            type : 'value',
		            axisLabel: {
		                 show: true,
		                 textStyle : {
			            	color : '#fff',
			            	fontSize : 20,
			            	fontFamily:"微软雅黑"
			             },
		                 formatter: '{value}'
		            },
		            splitLine:{
                        show:false
                    }
		        }
		    ],
		    series : [
				{
				    name:provider_name[0],
				    type:'bar',
				    barWidth:100,
				    barCategoryGap:'50%',
				    yAxisIndex:1,
				    itemStyle: {normal: {color:'#f6881f', label:{show:true,textStyle:{color:'#fff', fontSize:20}}}},
				    data:provider1_data
				},
		        {
		            name:provider_name[1],
		            type:'bar',
		            barWidth:100,
		            itemStyle: {normal: {color:'#11caff', label:{show:true,textStyle:{color:'#fff', fontSize:20}}}},
			        data:provider2_data
		        }
		    ]
		};
		return option;
	},
	
	/**
	 * 设置云服务配额分配信息
	 * @param data
	 */
	set_quota_used : function(data){
		var totals = 0;
		var instances = 0;
		var loadbalancers = 0;
		var volumes = 0;
		var security_groups = 0;
		var others = 0;
		if(data){
			instances += data.instancesCount;
			loadbalancers += data.loadbalancersCount;
			volumes += data.volumesCount;
			security_groups += data.securityGroupsCount;
			others += data.otherCount;
		}
		totals = instances + loadbalancers + volumes + security_groups + others;
		$("#service_total").text(totals);
		$("#instance_total").text(instances);
		$("#loadbalancer_total").text(loadbalancers);
		$("#volume_total").text(volumes);
		$("#security_group_total").text(security_groups);
		$("#other_total").text(others);
	},
	
	/**
	 * 获取vcpu保有量/使用率租户排行top5
	 */
	get_vcpu_top5 : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/cloud_service/getVcpu",
			dataType : "json",
			success: function(data){
				cloud_service.set_top5_charts(50, "租户虚拟CPU配额排行", "vcpu_top5_chart", "个", data.vcpuUseds , data.vcpuTotals , data.tenantNames);
			}
		});
	},
	
	/**
	 * 获取内存保有量/使用率租户排行top5
	 */
	get_memory_top5 : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/cloud_service/getMemory",
			dataType : "json",
			success: function(data){
				cloud_service.set_top5_charts(80, "租户虚拟内存配额排行", "memory_top5_chart", "GB", data.memoryUseds , data.memoryTotals , data.tenantNames);
			}
		});
	},
	
	/**
	 * 设置vcpu和内存租户排行榜图表
	 * @param id
	 * @param unit
	 * @param used_data
	 * @param total_data
	 */
	set_top5_charts : function(x, title, id, unit, used_data, total_data, tenant_name){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(cloud_service.set_top5_options(x, title, unit, used_data, total_data, tenant_name));
		cloud_service.charts_resize(myChart);
	},
	
	/**
	 * 设置vcpu和内存租户排行榜图表参数
	 * @param unit
	 * @param used_data
	 * @param total_data
	 */
	set_top5_options : function(x, title, unit, used_data, total_data, tenant_name){
		var option = {
			title:{
				text:title,
				y:0,
				textStyle:{
					fontSize:32,
					color:"#01b0f1",
					fontWeight:'normal',
	            	fontFamily:"微软雅黑"
				}
			},
		    tooltip : {
		    	show:false,
		        trigger: 'axis',
		        formatter: "{a} <br/>{b} : {c} " + unit + "",
		    },
		    toolbox: {
		        show : false
		    },
		    legend: {
		        data:[
		            '保有量','使用率'
		        ],
		        textStyle:{
		        	color:"#fff",
		        	fontSize:20,
	            	fontFamily:"微软雅黑"
		        },
		        x:'right',
		        y:12,
		        selectedMode:false
		    },
		    calculable : false,
		    grid: {
		    	x:x,
			    y:80,
			    x2:35,
			    y2:35,
		    	borderWidth:0
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : tenant_name,
		            axisLabel : {
		            	show : true,
		            	textStyle : {
		            		color : '#fff',
		            		fontSize : 20,
			            	fontFamily:"微软雅黑"
		            	}
		            },
		            splitLine:{
                        show:false
                    }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel:{formatter:'{value}'},
			        axisLabel: {
		                 show: true,
		                 textStyle : {
			            	color : '#fff',
			            	fontSize : 20,
			            	fontFamily:"微软雅黑"
			             },
		                 formatter: '{value}'
		            },
		            splitLine:{
                        show:false,
                        lineStyle:{
                        	color: ['#4d545d'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
		        },
		        {
		            type : 'value',
		            axisLabel: {
		                 show: true,
		                 textStyle : {
			            	color : '#fff',
			            	fontSize : 20,
			            	fontFamily:"微软雅黑"
			             },
		                 formatter: '{value}'
		            },
		            splitLine:{
                        show:false
                    }
		        }
		    ],
		    series : [
		        {
		            name:'保有量',
		            type:'bar',
		            barWidth:40,
		            barCategoryGap:'60%',
		            itemStyle: {normal: {color:'#f6881f', label:{show:true, textStyle:{color:'#fff', fontSize:20}}}},
		            data:total_data
		        },
		        {
		            name:'使用率',
		            type:'bar',
		            barWidth:40	,
		            yAxisIndex:1,
		            itemStyle: {normal: {color:'#11c1ff', label:{show:true,textStyle:{color:'#fff', fontSize:20}}}},
		            data:used_data
		        }
		    ]
		};
		return option;
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
			cloud_service.set_time();
		}, 1000);
		
		/**
		 * 定时刷新配额分配信息
		 */
		setInterval(function(){
			cloud_service.get_quota_used();
		}, 5 * 60 * 1000);
		
		/**
		 * 定时刷新云服务资源分布情况
		 */
		setInterval(function(){
			cloud_service.get_quota_total();
		}, 5 * 60 * 1000);
		
		/**
		 * 定时刷新vcpu保有量/使用率租户排行top5
		 */
		setInterval(function(){
			cloud_service.get_vcpu_top5();
		}, 5 * 60 * 1000);
		
		/**
		 * 定时刷新内存保有量/使用率租户排行top5
		 */
		setInterval(function(){
			cloud_service.get_memory_top5();
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
	cloud_service.init();
});