/**
 * 虚拟机详情 echarts图表js
 */ 
var instance_chart = {
	/**
	 * 初始化方法
	 */
	init : function(){
		instance_chart.get_trends();
	},
	
	/**
	 * 获取区域
	 */
	get_trends : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/instance/getTrends",
			dataType : "json",
			data : {
					"uuid"   : $("#instanceUuid").val()
					},
			success: function(data){
				if(data.dates.length > 0){
					instance_chart.init_instance_echarts("instance_cpu_use", "CPU使用率", data.dates, data.cpus);
					instance_chart.init_instance_echarts("instance_memory_use", "内存使用率", data.dates, data.memorys);
					instance_chart.init_instance2_echarts("instance_disk_rw", ['磁盘读速率','磁盘写速率'], data.dates, data.diskReadIo,data.diskWriteIo);
					instance_chart.init_instance2_echarts("instance_network_bw", ['网络上行带宽','网络下行带宽'], data.dates, data.netSender,data.netRevicer);
				}
			}
		});
	},
		
	/**
	 * 折线图 - 初始化  - 虚拟机详情(CPU使用率、内存使用率)
	 * id 放图表的div的id
	 * name 当前资源
	 * date 最新15条记录的时间 (数组)
	 * value 最新15条记录的使用率(数组)
	 */
	init_instance_echarts:function(id, name, date, value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(instance_chart.init_instance_options(id, name, date, value));
		instance_chart.execute_resize(myChart);
	},
	
	/**
	 * 折线图 - 配置  - 虚拟机详情(CPU使用率、内存使用率)
	 */
	init_instance_options : function(id, name, date ,value){
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:false,
			        data:[name]
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : false,
				grid:{
					  x:60,
					  y:50,
					  x2:35,
					  y2:30
				},
			    xAxis : [
			        {
	                    splitLine:{
	                        show:false
	                    },
			            type : 'category',
			            boundaryGap : false,
			            data : date
			        }
			    ],
				yAxis : [
					{
						type : 'value',
						axisLabel: {
			                  show: true,
			                  formatter: '{value} %'
			            },
						splitNumber: 5
					}
				],
			    series : [
			        {
			            name:name,
			            type:'line',
			            stack: name,
						smooth:true,
						itemStyle : {
							normal : {
								color:'#F98401',
								areaStyle: {type: 'default'}
							}
						},
			            data:value
			        }
			    ]
		};
		return option;
	},
	
	/**
	 * 折线图 - 初始化  - 虚拟机详情(磁盘读写速率、网络上下行带宽)
	 * id 放图表的div的id
	 * name 当前资源
	 * date 最新15条记录的时间(数组)
	 * value1 最新15条记录的磁盘读速率(网络上行带宽)
	 * value1 最新15条记录的磁盘写速率(网络下行带宽)
	 */
	init_instance2_echarts:function(id, name, date, value1, value2){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(instance_chart.init_instance2_options(id, name, date, value1, value2));
		instance_chart.execute_resize(myChart);
	},
	
	/**
	 * 折线图 - 配置  - 虚拟机详情(磁盘读写速率、网络上下行带宽)
	 */
	init_instance2_options : function(id, name, date, value1, value2){
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:false,
			        data:name
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : false,
				grid:{
					  x:60,
					  y:50,
					  x2:35,
					  y2:30
				},
			    xAxis : [
			        {
	                    splitLine:{
	                        show:false
	                    },
			            type : 'category',
			            boundaryGap : false,
			            data : date
			        }
			    ],
				yAxis : [
					{
						type : 'value',
						axisLabel: {
			                  show: true,
			                  formatter: '{value} '
			            },
						splitNumber: 5
					}
				],
			    series : [
			        {
			            name: name[0],
			            type:'line',
			            stack: name[0],
						smooth:true,
						itemStyle : {
							normal : {
								color:'#F98401',
								areaStyle: {type: 'default'}
							}
						},
			            data:value1
			        },
			        {
			            name: name[1],
			            type:'line',
			            stack:name[1],
						smooth:true,
						itemStyle : {
							normal : {
								color:'#0A95D6',
								areaStyle: {type: 'default'}
							}
						},
			            data:value2
			        }
			    ]
		};
		return option;
	},
	
	/**
	 * 窗口大小改变时重置图表大小
	 */
	execute_resize : function(option){
		$(window).resize(function() {
			option.resize();
		});
		
		$(".sidebar_first_nav li,.main_btn a").click(function(){
			setTimeout(function(){
				option.resize();
			},500);
		});
	},
	
};

$(function(){
	instance_chart.init();
});

/*var date = ['2015-2-5','2015-2-5','2015-2-5','2015-2-5','2015-2-5','2015-2-5','2015-2-5'];
var value1= [50,32,12,67,32,12,90];
var value2 = [12,80,53,29,82,18,35];
*/
//instance_chart.init_instance2_echarts("instance_disk_rw", ['磁盘读速率','磁盘写速率'], date, value2,value1);
//instance_chart.init_instance2_echarts("instance_network_bw", ['网络上行带宽','网络下行带宽'], date, value1,value2);