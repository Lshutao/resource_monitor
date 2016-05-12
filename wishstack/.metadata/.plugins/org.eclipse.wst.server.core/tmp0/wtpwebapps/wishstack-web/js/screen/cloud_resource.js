/**
 * 云资源统计js文件
**/
var cloud_resource = {
	/**
	 * 初始化方法
	 */
	init : function(){
//		cloud_resource.init_switch();
		cloud_resource.set_time();
		cloud_resource.get_resources();
//		cloud_resource.get_trends();
		cloud_resource.init_interval();
	},
	
	/**
	 * 初始化切换
	 */
	init_switch : function(){
		new TouchSlider('slider',{duration:1, direction:0, interval:15 * 1000, autoplay:true,fullsize:true});
	},
	
	/**
	 * 设置时间
	 */
	set_time : function(){
		var date = public_obj.getDateByFormat("yyyy-MM-dd hh:mm:ss");
		$("#time_calculate").text(date);
	},
	
	init_interval : function(){
		/**
		 * 定时刷新时间
		 */
		setInterval(function(){
			cloud_resource.set_time();
		}, 1000);
		
		/**
		 * 定时刷新资源池分配数据
		 */
		/*setInterval(function(){
			cloud_resource.get_resources();
		}, 5 * 60 * 1000);*/
		
		/**
		 * 定时刷新计算资源池趋势
		 */
		/*setInterval(function(){
			cloud_resource.get_trends();
		}, 5 * 60 * 1000);*/
	},
	
	/**
	 * 获取资源池分配数据
	 */
	get_resources : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/cloud_resource/getResources",
			dataType : "json",
			success: function(data){
				//console.log(data);
				cloud_resource.set_resource_chart_data(data);
				cloud_resource.set_resource_chart_background(data);
				cloud_resource.set_resource_value(data);
			}
		});
	},
	
	/**
	 * 获取计算资源池趋势数据
	 */
	get_trends : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/cloud_resource/getTrends",
			dataType : "json",
			success: function(data){
				cloud_resource.init_compute_chart("compute_trends", data);
			}
		});
	},
	
	/**
	 * 设置资源池value
	 * @param data
	 */
	set_resource_value : function(data){
		$.each(data, function(k,v){
			var index = k + 1;
			$("#provider_name_" + index).text(v.name);
			$("#cpu_provider_p_" + index).text(v.vcpuUsedCount + "/" + v.vcpuCount);
			$("#memory_provider_p_" + index).text(v.memoryUsedCount + "/" + v.memoryCount);
			$("#storage_provider_p_" + index).text(v.storageUsedCount + "/" + v.storageCount);
		});
	},
	
	/**
	 * 设置资源池图表背景颜色
	 * @param data
	 */
	set_resource_chart_background : function(data){
		$.each(data, function(k,v){
			var index = k + 1;
			var cpu_per = (v.vcpuUsedCount * 100 / v.vcpuCount).toFixed(0);
			var memory_per = (v.memoryUsedCount * 100 / v.memoryCount).toFixed(0);
			var storage_per = (v.storageUsedCount * 100 / v.storageCount).toFixed(0);
			$("#cpu_provider_bg_" + index).addClass(cloud_resource.set_background_class(cpu_per)).text(cpu_per + "%");
			$("#memory_provider_bg_" + index).addClass(cloud_resource.set_background_class(memory_per)).text(memory_per + "%");
			$("#storage_provider_bg_" + index).addClass(cloud_resource.set_background_class(storage_per)).text(storage_per + "%");
		});
	},
	
	/**
	 * 设置颜色class
	 * @param value
	 */
	set_background_class : function(value){
		if(value >= 0 && value < 50){
			return "bg-green";
		}else if(value >= 50 && value < 80){
			return "bg-yellow";
		}else{
			return "bg-red";
		}
	},
	
	/**
	 * 设置资源池图表数据
	 * @param data
	 */
	set_resource_chart_data : function(data){
		$.each(data, function(k,v){
			var index = k + 1;
			cloud_resource.init_resource_charts("cpu_provider_" + index, v.vcpuUsedCount, v.vcpuCount - v.vcpuUsedCount);
			cloud_resource.init_resource_charts("memory_provider_" + index, v.memoryUsedCount, v.memoryCount - v.memoryUsedCount);
			cloud_resource.init_resource_charts("storage_provider_" + index, v.storageUsedCount, v.storageCount - v.storageUsedCount);
		});
	},
	
	/**
	 * 初始化资源池分配图表
	 * @param 资源图表id
	 * @param 资源使用数量
	 * @param 资源剩余数量
	 */
	init_resource_charts : function(id, value_used, value_surplus){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(cloud_resource.init_resource_options(id, value_used, value_surplus));
		cloud_resource.charts_resize(myChart);
	},
	
	/**
	 * 初始化图表参数
	 * @param 资源图表id
	 * @param 资源使用数量
	 * @param 资源剩余数量
	 */
	init_resource_options : function(id, value_used, value_surplus){
		var option = {
			tooltip : {
				show:false,
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ",
		        textStyle:{
		        	fontSize:16,
		        	fontFamily:"微软雅黑"
		        }
		    },
		    legend: {
		    	show:false,
		        data:['已分配','未分配']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [
		        {
		            name:"资源池分配统计",
		            type:'pie',
		            radius : ['60%', '90%'],
		            itemStyle : {
		                normal : {
		                    label : {
		                        show : false
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                },
		                emphasis : {
		                    label : {
		                        show : false
		                    }
		                }
		            },
		            data:[
		                {
		                	value:value_used,
		                	name:'已分配',
		                	itemStyle : {
		                		normal : {
		                			color:"#00b0f0"
		                		}
		                	}
		                },
		                {
		                	value:value_surplus, 
		                	name:'未分配',
		                	itemStyle : {
		                		normal : {
		                			color:"#bfbfbf"
		                		}
		                	}
		                }
		            ]
		        }
		    ]   
		};
		return option;
	},
	
	/**
	 * 初始化计算资源池图表
	 * @param id
	 * @param data
	 */
	init_compute_chart : function(id, data){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(cloud_resource.init_computer_options(id,data));
		cloud_resource.charts_resize(myChart);
	},
	
	/**
	 * 初始化计算资源图表参数
	 * @param id
	 * @param data
	 */
	init_computer_options : function(id, data){
		var option = {
		    tooltip : {
		    	show:false,
		        trigger: 'axis'
		    },
		    legend: {
		    	x:'right',
		    	data:['移动-华三：cpu','移动-华三：内存','电话-腾讯：cpu','电话-腾讯：内存'],
		    	show:false
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
			grid:{
				  x:100,
				  y:10,
				  x2:35,
				  y2:40,
				  borderWidth:0
			},
		    xAxis : [
		        {
                    splitLine:{
                        show:false,
                        lineStyle:{
                        	color: ['#4d545d'],
                            width: 1,
                            type: 'solid'
                        }
                    },
		            type : 'category',
		            boundaryGap : false,
		            axisLabel : {
		            	show : true,
		            	textStyle : {
		            		color : '#fff',
		            		fontSize : 24,
		            		fontFamily:"微软雅黑"
		            	}
		            },
					axisLine : {
						show : true
					},
		            data : data.date
		        }
		    ],
			yAxis : [
				{
					type : 'value',
					splitLine:{
                        show:false,
                        lineStyle:{
                        	color: ['#4d545d'],
                            width: 1,
                            type: 'solid'
                        }
                    },
					axisLabel: {
		                 show: true,
		                 textStyle : {
			            	color : '#fff',
			            	fontSize : 24,
			            	fontFamily:"微软雅黑"
			             },
		                 formatter: '{value} %'
		            },
					axisLine : {
						show : true
					},
					splitNumber: 6
				}
			],
		    series : [
		        {
		            type:'line',
					smooth:true,
					itemStyle : {
						normal : {
							color:'#c00000'
						}
					},
		            data:data.provider1_memory
		        },
		        {
		            type:'line',
					smooth:true,
					itemStyle : {
						normal : {
							color:'#f68519'
						}
					},
		            data:data.provider1_cpu
		        }
		    ]
		};
		return option;
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
	cloud_resource.init();
});