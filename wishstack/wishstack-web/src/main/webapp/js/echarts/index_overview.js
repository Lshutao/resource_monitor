/**
 * admin - 总览 echarts图表js
 */ 
var admin_index_chart = {
		
	/* 
	 * 折线图 - 初始化  - admin(总览)
	 * id 放图表的div的id
	 * date 最近7天的日期 (数组)
	 * cpu_value 最近7天的cpu的利用率 (数组)
	 * memory_value 最近7天的内存的利用率 (数组)
	 * storage_value 最近7天的存储的利用率 (数组)
	 */
	init_line_echarts:function(id,date,cpu_value,memory_value,storage_value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( admin_index_chart.init_line_options(id,date,cpu_value,memory_value,storage_value) );
		admin_index_chart.execute_resize(myChart);
	},
	
	/*
	 * 折线图 - 配置  - admin(总览)
	 */
	init_line_options : function(id,date,cpu_value,memory_value,storage_value){
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:false,
			        data:['CPU平均利用率','内存平均利用率','存储平均利用率']
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : false,
				grid:{
					  x:60,
					  y:20,
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
						splitNumber: 8
					}
				],
			    series : [
			        {
			            name:'存储平均利用率',
			            type:'line',
			            stack: '存储平均利用率',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#FAA85E',
								areaStyle: {type: 'default'}
							}
						},
			            data:storage_value
			        },
			        {
			            name:'内存平均利用率',
			            type:'line',
			            stack: '内存平均利用率',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#A1E1FC',
								areaStyle: {type: 'default'}
							}
						},
			            data:memory_value
			        },
			        {
			            name:'CPU平均利用率',
			            type:'line',
			            stack: 'CPU平均利用率',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#D34D4C',
								areaStyle: {type: 'default'}
							}
						},
			            data:cpu_value
			        }
			    ]
		};
		return option;
	},
	
	/* 
	 * 圆环 - 初始化 - admin(总览)
	 * id 放图表的div的id
	 * name 资源名
	 * unit 资源的单位
	 * value_all 资源的总数
	 * value_use 已分配的资源数
	 */
	init_pie_index_echarts:function(id,name,unit,value_all,value_use){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( admin_index_chart.init_pie_index_options(id,name,unit,value_all,value_use));
		admin_index_chart.execute_resize(myChart);
			
	},
	
	/*
	 * 圆环 - 配置 - admin(总览)
	 */
	init_pie_index_options : function(id,name,unit,value_all,value_use){
		var no_use = value_all - value_use;
		var option = {
			title : {
		        text: name+"("+unit+")",
		        x:'center',
		        y:'center',
		        textStyle:{
		        	color:'#666',
		        	fontWeight: 'normal',
		        	fontSize:'14',
		        	fontFamily:"Microsoft YaHei"
		        }
		    },
			tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} "
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
		            name:"资源分配统计",
		            type:'pie',
		            radius : ['50%', '70%'],
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
		                	value:value_use,
		                	name:'已分配',
		                	itemStyle : {
		                		normal : {
		                			color:"#1878B5"
		                		}
		                	}
		                },
		                {
		                	value:no_use, 
		                	name:'未分配',
		                	itemStyle : {
		                		normal : {
		                			color:"#CFCFCF"
		                		}
		                	}
		                }
		            ]
		        }
		    ]   
		};
		return option;
	},
	
	//窗口大小改变时重置图表大小
	execute_resize : function(option){
		$(window).resize(function() {
			option.resize();
		});

		$(".sidebar_first_nav li,.main_btn a").click(function(){
			setTimeout(function(){
				option.resize();
			},500);
		});
		
	}
	
}
