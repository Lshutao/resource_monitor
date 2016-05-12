/**
 * 租户 - 业务概览 js文件
 */
var overview = {
	/**
	 * 初始化方法
	 */
	init : function(){
		overview.init_pie_state_echarts("business_monitoring_chart",[50,35,18]);//业务监控状态统计
		overview.init_bar_top5_echarts("thisWeek_worst_top5_chart",['dfg','sdg','sdfg','asdr','dfg'],[85,62,53,38,18]);
	},
	
	/* 
	 * 饼图 - 初始化  - 业务监控状态统计(admin)
	 * id 放图表的div的id
	 * value  正常、告警、故障 三种状态的个数
	 */
	init_pie_state_echarts:function(id,value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( overview.init_pie_state_options(id,value) );
		overview.execute_resize(myChart);
			
	},
	
	/*
	 * 饼图 - 配置   - 业务监控状态统计(admin)
	 */
	init_pie_state_options : function(id,value){
		var option = {
			title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} "
		    },
		    legend: {
		        show:false,
		        data:['正常','告警','故障']
		    },
		    toolbox: {
		        show : false 
		    },
		    calculable : false,
		    series : [
		        {
		            name:'业务监控状态统计',
		            type:'pie',
		            itemStyle : {
		                normal : {
		                    label : {
		                      show:false
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                }
		            },
		            data:[
		                {
		                  value:value[0], 
		                  name:'正常',
		                  itemStyle : {
		                      normal : {
		                        color:'#088DCA'
		                      }
		                  }
		                },
		                {
		                  value:value[1], 
		                  name:'告警',
		                  itemStyle : {
		                      normal : {
		                        color:'#FFC20C'
		                      }
		                  }
		                },
		                {
		                  value:value[2], 
		                  name:'故障',
		                  itemStyle : {
		                      normal : {
		                        color:'#CB0400'
		                      }
		                  }
		                }
		            ]
		        }
		    ]
		};
		return option;
	},
	
	/* 
	 * 柱形图 - 初始化  - 本周可用性最差的业务TOP5(admin)
	 * id 放图表的div的id
	 * name 业务的名称(数组)
	 * value  业务的分数(数组)
	 */
	init_bar_top5_echarts:function(id,name,value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( overview.init_bar_top5_options(id,name,value) );
		overview.execute_resize(myChart);
		
	},
	
	/*
	 * 柱形图 - 配置 - 本周可用性最差的业务TOP5(admin)
	 */
	init_bar_top5_options : function(id,name,value){
		var option = {
			title : {
		        text: '可用性评分',
		        textStyle:{
		          color:'#6B748A',
		          fontSize:13,
		          fontWeight: 'normal',
		          fontFamily:"Microsoft YaHei"
		        }
		    },
		    tooltip : {
		        trigger: 'item'
		    },
		    legend: {
		        show : false,
		        data:['本周可用性最差的业务TOP5']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	x:30,
		    	y:38,
		    	x2:15,
		    	y2:25
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : name
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
					axisLabel: {
		                  show: true,
		                  formatter: '{value}'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'本周可用性最差的业务TOP5',
		            type:'bar',
		            data:[
							{
							    value:value[0], 
							    itemStyle : {
							        normal : {
							          color:'#4FC6FB'
							        }
							    }
							},
							{
							    value:value[1], 
							    itemStyle : {
							        normal : {
							          color:'#32B98F'
							        }
							    }
							},
							{
							    value:value[2], 
							    itemStyle : {
							        normal : {
							          color:'#FEDA6E'
							        }
							    }
							},
							{
							    value:value[3], 
							    itemStyle : {
							        normal : {
							          color:'#4FC5FA'
							        }
							    }
							},
							{
							    value:value[4], 
							    itemStyle : {
							        normal : {
							          color:'#A6CE39'
							        }
							    }
							}	
		                  
		                
		            ],
		            barWidth:32
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
};

$(function(){
	overview.init();

}); 
 

	
