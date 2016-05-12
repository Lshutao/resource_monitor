/**
 * 业务指数js文件
**/
var monitor_business = {
	/**
	 * 初始化方法
	 */
	init : function(){
		monitor_business.set_time();
		monitor_business.init_switch();
		monitor_business.get_business_count();
		monitor_business.get_business_instance();
		monitor_business.get_business_tenant();
		monitor_business.get_business_rate_lower();
		monitor_business.init_interval();
	},
	
	/**
	 * 初始化切换
	 */
	init_switch : function(){
		new TouchSlider('slider',{duration:1, direction:0, interval:15 * 1000, autoplay:true,fullsize:true});
	},
	
	/**
	 * 获取云服务商业务总数
	 */
	get_business_count : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_business/getBusinessCount",
			dataType : "json",
			success: function(data){
				monitor_business.set_provider_business_count(data);
			}
		});
	},
	
	/**
	 * 获取业务占用虚拟机数量
	 */
	get_business_instance : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_business/getBusinessInstance",
			dataType : "json",
			success: function(data){
				var index = 0;
				for(var i = 0;i < data.businessNames.length;i++){
					index += 1;
					if(index == 1 || index == 2){
						monitor_business.set_business_instance_charts("business_instance_charts_" + index, "c00000",  data.businessNames[i], data.businessCount[i]);
					}else if(index == 3 || index == 4){
						monitor_business.set_business_instance_charts("business_instance_charts_" + index, "f7881f",  data.businessNames[i], data.businessCount[i]);
					}else{
						monitor_business.set_business_instance_charts("business_instance_charts_" + index, "01b0f1",  data.businessNames[i], data.businessCount[i]);
					}
				}
			}
		});
	},
	
	/**
	 * 业务在租户商的统计信息
	 */
	get_business_tenant : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_business/getBusinessTenant",
			dataType : "json",
			success: function(data){
				monitor_business.set_business_tenant_charts("business_tenant_charts", data.tenantNames, data.businessCount);
			}
		});
	},
	
	/**
	 * 获取虚拟机资源利用率
	 */
	get_business_rate_lower : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/monitor_business/getBusinessRateLower",
			dataType : "json",
			success: function(data){
				monitor_business.set_business_rate_lower_charts("rate_lower_charts", data.names, data.cpuRates, data.memoryRates);
			}
		});
	},
	
	/**
	 * 设置虚拟机资源利用率图表
	 * @param id
	 * @param name
	 * @param value
	 */
	set_business_rate_lower_charts : function(id, names, cpuRates, memoryRates){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(monitor_business.set_business_rate_lower_options(names, cpuRates, memoryRates));
		monitor_business.charts_resize(myChart);
	},
	
	/**
	 * 设置虚拟机资源利用率图表参数
	 * @param names
	 * @param cpuRates
	 * @param memoryRates
	 */
	set_business_rate_lower_options : function(names, cpuRates, memoryRates){
		var option = {
			title:{
				text:"业务虚拟CPU消耗排行",
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
		        formatter: "{a} <br/>{b} : {c}%",
		    },
		    toolbox: {
		        show : false
		    },
		    legend: {
		        data:[
		            'VCPU','内存'
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
		    	x:50,
			    y:80,
			    x2:35,
			    y2:30,
		    	borderWidth:0
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : names,
		            axisLabel : {
		            	show : true,
		            	textStyle : {
		            		color : '#fff',
		            		fontSize:20,
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
			            	fontSize:20,
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
		            name:'VCPU',
		            type:'bar',
		            barWidth:40,
		            barCategoryGap:'60%',
		            itemStyle: {normal: {color:'#00af50', label:{show:true,textStyle:{color:'#fff',fontSize:20}}}},
		            data:cpuRates
		        },
		        {
		            name:'内存',
		            type:'bar',
		            barWidth:40,
		            yAxisIndex:1,
		            itemStyle: {normal: {color:'#f7881f', label:{show:true,textStyle:{color:'#fff',fontSize:20}}}},
		            data:memoryRates
		        }
		    ]
		};
		return option;
	},
	
	/**
	 * 设置业务在租户商的统计图表
	 * @param id
	 * @param name
	 * @param value
	 */
	set_business_tenant_charts : function(id, name, value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(monitor_business.set_business_tenant_options(name, value));
		monitor_business.charts_resize(myChart);
	},
	
	/**
	 * 设置业务在租户商的统计图表参数
	 * @param id
	 * @param name
	 * @param value
	 */
	set_business_tenant_options : function(name, value){
		var json = {};
		var array = new Array();
		for(var i = 0; i < name.length;i++){
			json = {
				value : value[i],
				name : name[i]
			};
			array.push(json);
		}
		var option = {
		    tooltip : {
		    	show:false,
		        trigger: 'item',
		        formatter : function (params) {
                    return params[1] + "：" + (params.percent - 0).toFixed(0) + '%';
                }
		    },
		    legend: {
		        orient : 'vertical',
		        x : '65%',
		        y : 'center',
		        textStyle : {color: '#fff', fontSize: 20, fontFamily:"微软雅黑"},
		        selectedMode : false,
		        data:name
		    },
		    calculable : false,
		    series : [
		        {
		            name:'业务总数',
		            type:'pie',
		            radius : ['40%', '85%'],
		            center : ['35%', '53%'],
		            itemStyle : {
		                normal : {
		                	label : {
		                        position : 'inner',
		                        formatter : function (params) {                         
		                          return (params.percent - 0).toFixed(0) + '%';
		                        },
		                        textStyle : {
		                            fontSize : 24,
					            	fontFamily:"微软雅黑"
		                        }
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                }
		            },
		            data:array
		        }
		    ]
		};
		return option;
	},
	
	/**
	 * 设置业务占用虚拟机图表
	 * @param 图表id
	 * @param 业务名称
	 * @param 虚拟机数量
	 */
	set_business_instance_charts : function(id, color, name, value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(monitor_business.set_business_instance_options(color, name, value));
		monitor_business.charts_resize(myChart);
	},
	
	/**
	 * 设置业务占用虚拟机参数
	 * @param name
	 * @param value
	 */
	set_business_instance_options : function(color, name, value){
		var option = {
		    tooltip : {
		    	show : false,
		        trigger: 'axis'
		    },
		    calculable : false,
		    grid: {y: 10, x:260, borderWidth:0},
		    legend: {
		    	show : false,
		    	data : [name]
		    },
		    xAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		            	show : false,
		            	textStyle : {
		            		color : '#fff',
		            		fontSize:20,
			            	fontFamily:"微软雅黑"
		            	}
		            },
		            axisLine : {
		            	show : false
		            },
		            splitLine:{
                        show:false
                    }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            axisLabel : {
		            	show : true,
		            	textStyle : {
		            		color : '#fff',
		            		fontSize:20,
			            	fontFamily:"微软雅黑"
		            	}
		            },
		            axisLine : {
		            	show : false
		            },
		            splitLine:{
                        show:false
                    },
		            data : [name]
		        }
		    ],
		    series : [
				        {
				            name:[name],
				            type:'bar',
				            barWidth:30,
				            data:[value],
				            itemStyle: {
				            	normal: {color:'#' + color + '', 
				            	label:{
				            		show:true,
				            		textStyle:{
				            			fontSize : 22,
				            			align:'left',
				            			color:'#fff',
						            	fontFamily:"微软雅黑"
				            		}
				            	}
				            }}
				        }
				    ]
		};
		return option;
	},
	
	/**
	 * 设置云服务商业务总数
	 * @param data
	 */
	set_provider_business_count : function(data){
		var index = 0;
		$.each(data.businessCounts, function(k, v){
			index += 1;
			$("#provider_business_" + index + "").html("<b>业务总数</b>" + v + "");
		});
		var _index = 0;
		$.each(data.providerNames, function(k, v){
			_index += 1;
			$("#provider_name_" + _index + "").html("<em></em>" + v + "");
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
			monitor_business.set_time();
		}, 1000);
		
		/**
		 * 定时刷新获取云服务商业务总数
		 */
		setInterval(function(){
			monitor_business.get_business_count();
		}, 5 * 60 * 1000);
		
		/**
		 * 定时刷新获取业务占用虚拟机数量
		 */
		setInterval(function(){
			monitor_business.get_business_instance();
		}, 5 * 60 * 1000);
		
		/**
		 * 定时刷新业务在租户商的统计信息
		 */
		setInterval(function(){
			monitor_business.get_business_tenant();
		}, 5 * 60 * 1000);
		
		/**
		 * 定时刷新获取虚拟机资源利用率
		 */
		setInterval(function(){
			monitor_business.get_business_rate_lower();
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
};

$(function(){
	monitor_business.init();
});