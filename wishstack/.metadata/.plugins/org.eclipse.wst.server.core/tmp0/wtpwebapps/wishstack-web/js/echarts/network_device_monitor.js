/**
 * 网络设备详情 echarts图表js
 */ 
var network_chart = {
	/* 
	 * 折线图 - 初始化  - 网络设备详情(CPU使用率)
	 * id 放图表的div的id
	 * date 最近7天的日期 (数组)
	 * value 最近7天的使用率(数组)
	 */
	init_network_cpu_echarts:function(id,date,value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( network_chart.init_network_cpu_options(id,date,value) );
		network_chart.execute_resize(myChart);
	},
	
	/*
	 * 折线图 - 配置  - 网络设备详情(CPU使用率)
	 */
	init_network_cpu_options : function(id,date,value){
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:false,
			        data:['CPU使用率']
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
			            data : [date[0],date[1],date[2],date[3],date[4],date[5],date[6]]
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
			            name:'CPU使用率',
			            type:'line',
			            stack: 'CPU使用率',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#F98401',
								areaStyle: {type: 'default'}
							}
						},
			            data:[value[0],value[1],value[2],value[3],value[4],value[5],value[6]]
			        }
			    ]
		};
		return option;
	},
		
		
	/* 
	 * 折线图 - 初始化  - 网络设备详情(上下行速率)
	 * id 放图表的div的id
	 * date 最近7天的日期 (数组)
	 * outboundRates 最近7天的上行速率(数组)
	 * inboundRates 最近7天的下行速率(数组)
	 */
	init_network_echarts:function(id,date,outboundRates,inboundRates){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( network_chart.init_network_options(id,date,outboundRates,inboundRates) );
		network_chart.execute_resize(myChart);
	},
	
	/*
	 * 折线图 - 配置  - 网络设备详情(上下行速率)
	 */
	init_network_options : function(id,date,outboundRates,inboundRates){
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:true,
			        data:['上行速率','下行速率']
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : false,
				grid:{
					  x:80,
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
			                  formatter: '{value} Mpbs'
			            },
						splitNumber: 5
					}
				],
			    series : [
			        {
			            name:'上行速率',
			            type:'line',
			            stack: '上行速率',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#F98401',
								areaStyle: {type: 'default'}
							}
						},
			            data:outboundRates
			        },
			        {
			            name:'下行速率',
			            type:'line',
			            stack: '下行速率',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#0A95D6',
								areaStyle: {type: 'default'}
							}
						},
			            data:inboundRates
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
	
};

var obj=eval(page);
var date=new Array();
var outboundRates=new Array();
var inboundRates=new Array();
if(!(obj=='' || obj==undefined || obj==null)){
	var count=0;
	count=(obj.length>=15)?15:obj.length;
	for(var i=0;i<count;i++){	 
		  date[i]=formatDate(obj[i].createdTime);	  
		  outboundRates[i]=obj[i].outboundRate;
		  inboundRates[i]=obj[i].inboundRate;
}
network_chart.init_network_echarts("network_memory_use", date, outboundRates, inboundRates);
}

function formatDate(v){   
	  if(typeof v == 'string') v = Date.parse(v);   
	  var date = new Date( v );
	  if(date instanceof Date){   
	    var h = foo(date.getHours());   
	    var i = foo(date.getMinutes());   
	    if(h>0 || i>0 ) return h + ':' + i ;   
	  }   
	  return '';   
}
function foo(str){
    str ='00'+str;
    return str.substring(str.length-2,str.length);
}