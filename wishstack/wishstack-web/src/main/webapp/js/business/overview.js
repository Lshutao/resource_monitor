/**
 * 租户 - 业务概览 js文件
 */
var overview = {
	/**
	 * 初始化方法
	 */
	init : function(){
		overview.init_pie_state_echarts("business_state_chart",state);
		overview.init_bar_top5_echarts("business_zhanyong_top5_chart", businessName, instanceNum,"虚拟机个数",0);
		overview.init_alarm_echarts("alarm_chart",date,normalValue,alarmValue,faultValue);
		
//		overview.init_alarm_echarts("alarm_chart",['5.5','5.5','5.5','5.5','5.5','5.5','5.5','5.5'],[34,5,6,2,3,5,7,2],[45,56,8,2,87,4,2,85],[15,58,2,4,5,2,5,28]);
		
		overview.init_bar_top5_echarts("thisWeek_top5_max",['1','2','sdf','2412','wer'],[580,512,368,256,18],"可用性",1);
		overview.init_bar_top5_echarts("thisWeek_top5_min",['67','67gch','gh','24fxg12','ert '],[12,58,259,368,598,698],"可用性",1);
		
		
		//设置业务列表tr隔行颜色
		overview.set_tr_color();
		
		//设置业务列表每项的颜色
		overview.set_business_list_color();
		
		//sidebar选项卡切换
		frame.tab_control(".business_thisWeek_top5_hd","active",".business_thisWeek_top5_bd");
	},
	
	/* 
	 * 饼图 - 初始化  - 业务状态统计(tenant)
	 * id 放图表的div的id
	 * value  正常、告警、故障 三种状态的个数
	 */
	init_pie_state_echarts:function(id,value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( overview.init_pie_state_options(id,value) );
		overview.execute_resize(myChart);
			
	},
	
	/*
	 * 饼图 - 配置   - 业务状态统计(tenant)
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
		            name:'业务状态统计',
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
	 * 柱形图 - 初始化  - 业务概览(tenant)
	 * id 放图表的div的id
	 * name 业务的名称(数组)
	 * value  业务的使用个数(数组)
	 * title 图表标题
	 * state  0：业务资源占用TOP5，y轴不要%
	 * 		  1：本周业务可用性TOP5，y轴要%
	 */
	init_bar_top5_echarts:function(id,name,value,title,state){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( overview.init_bar_top5_options(id,name,value,title,state) );
		overview.execute_resize(myChart);
		
	},
	
	/*
	 * 柱形图 - 配置 - 业务概览(tenant)
	 */
	init_bar_top5_options : function(id,name,value,title,state){
		var formatter_o = '{value}';
		var grid_x = 30;
		if(state==1){
			formatter_o = '{value} %';
			grid_x = 60;
		}
		var option = {
			title : {
		        text: title,
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
		        data:['业务资源占用TOP5']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	x:grid_x,
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
		                  formatter: formatter_o
		            }
		        }
		    ],
		    series : [
		        {
		            name:'业务资源占用TOP5',
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
	
	/**
	 * 折线图 - 初始化  - 业务概览-告警发生趋势(tenant)
	 * id 放图表的div的id
	 * name 当前资源
	 * date 时间 (数组)
	 * cpu_value cpu的数组值
	 * memory_value memory的数组值
	 * storage_value storage的数组值
	 */
	init_alarm_echarts:function(id, date, cpu_value,memory_value,storage_value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(overview.init_alarm_options(id, date, cpu_value,memory_value,storage_value));
		overview.execute_resize(myChart);
	},
	
	/**
	 * 折线图 - 配置  - 业务概览-告警发生趋势(tenant)
	 */
	init_alarm_options : function(id, date, cpu_value,memory_value,storage_value){
		var option = {
				title : {
			        text: '个数',
			        textStyle:{
			          color:'#6B748A',
			          fontSize:13,
			          fontWeight: 'normal',
			          fontFamily:"Microsoft YaHei"
			        }
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:false,
			        data:['CPU','内存','存储']
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : false,
				grid:{
					  x:30,
					  y:30,
					  x2:35,
					  y2:20
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
			                  show: true
			            },
						splitNumber: 5
					}
				],
			    series : [
			        {
			            name:'CPU',
			            type:'line',
			            stack: name,
						smooth:true,
						itemStyle : {
							normal : {
								color:'#058FCD'
							}
						},
			            data:cpu_value
			        },
			        {
			            name:'内存',
			            type:'line',
			            stack: name,
						smooth:true,
						itemStyle : {
							normal : {
								color:'#32B98F'
							}
						},
			            data:memory_value
			        },
			        {
			            name:'存储',
			            type:'line',
			            stack: name,
						smooth:true,
						itemStyle : {
							normal : {
								color:'#996600'
							}
						},
			            data:storage_value
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
	},
	
	/**
	 * 设置业务列表tr隔行颜色
	 */
	set_tr_color:function(){
		var num = 1;
		$(".business_list_table_list_vm tbody tr").each(function(){
			if(num%2==0){
				$(this).addClass("double");
			}
			num++;
		});
	},
	
	/**
	 * 设置业务列表每项的颜色
	 */
	set_business_list_color:function(){

//		var color_arr = ['#CCEFFC','#C2EADE','#FFEDB7','#E4F0C4','#F9CECE','#FDE1C8','#EBE0CC','#E1D1E1'];
//		var color_arr_hover = ['#00B0F0','#32B98F','#FEDA6E','#A6CE39','#E43939','#F58723','#996600','#996699'];
		
		$(".business_listing li").each(function(){
			var num_o = parseInt(Math.random()*8); 
			$(this).find("a").addClass("color"+num_o);
		});
	}
};

$(function(){
	overview.init();

}); 
 
var businessInstance = eval(businessInstance);
var businessName = new Array();
var instanceNum = new Array();
if(!(businessInstance=='' || businessInstance==undefined || businessInstance==null)){
	var count=0;
	count = businessInstance.length;
	for(var i=0;i<count;i++){	 	  
		businessName[i]=businessInstance[i].businessName;
		instanceNum[i]=businessInstance[i].instanceNum;
	}
}

var statisticsMap = eval(statisticsMapString);
var state = new Array();	
state.push(statisticsMap.normal);
state.push(statisticsMap.alarm);
state.push(statisticsMap.fault);

//业务告警统计数据处理
var alarmStatistics = eval(alarmStatistics);
var date = new Array();
var normalValue = new Array();
var alarmValue = new Array();
var faultValue = new Array();
var normalList = alarmStatistics.normal;
var alarmList = alarmStatistics.alarm;
var faultList = alarmStatistics.fault;
if(!(normalList=='' || normalList==undefined || normalList==null)){
	var count=0;
	var j = 0 ;
	count = normalList.length;
	for(var i=count-1; i>-1; i--){	 	  
		normalValue[j]=normalList[i].num;
		alarmValue[j]=alarmList[i].num;
		faultValue[j]=faultList[i].num;
		date[j] = normalList[i].showTime;
		j++;
	}
}

