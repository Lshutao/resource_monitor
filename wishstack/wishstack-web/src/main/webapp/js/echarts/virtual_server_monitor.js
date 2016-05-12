/**
 * 虚拟化服务器详情 echarts图表js
 */ 
var server_index_chart = {
		
	/* 
	 * 折线图 - 初始化  - 虚拟化服务器详情 (CPU使用率、内存使用率)
	 * id 放图表的div的id
	 * name 当前资源
	 * date 最新15条记录的时间(数组)
	 * value 最新15条记录的使用率 (数组)
	 */
	init_line_server_echarts:function(id,name,date,value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( server_index_chart.init_line_server_options(id,name,date,value) );
		server_index_chart.execute_resize(myChart);
	},
	
	/*
	 * 折线图 - 配置  - 虚拟化服务器详情(CPU使用率、内存使用率)
	 */
	init_line_server_options : function(id,name,date,value){
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
			    calculable : true,
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
			            stack: '总量',
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
	
	/* 
	 * 折线图 - 初始化  - 虚拟化服务器详情 (硬盘使用情况)
	 * id 放图表的div的id
	 * date 最新15条记录的时间 (数组)
	 * value_use 最新15条记录的使用情况(数组)
	 * value_all 硬盘总大小
	 */
	init_line_server_disk_echarts:function(id,date,value_use,value_all){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( server_index_chart.init_line_server_disk_options(id,date,value_use,value_all) );
		server_index_chart.execute_resize(myChart);
	},
	
	/*
	 * 折线图 - 配置  - 虚拟化服务器详情(硬盘使用情况)
	 */
	init_line_server_disk_options : function(id,date,value_use,value_all){
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:true,
			        data:['已使用','总大小']
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : true,
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
			                  formatter: '{value} GB'
			            },
						splitNumber: 5
					}
				],
			    series : [
			        {
			            name:'已使用',
			            type:'line',
			            stack: '已使用',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#F98401',
								areaStyle: {type: 'default'}
							}
						},
			            data:value_use
			        },
			        {
			            name:'总大小',
			            type:'line',
			            stack: '总大小',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#0A95D6',
								areaStyle: {type: 'default'}
							}
						},
			            data:value_all
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

/**
 * 获取图表数据并转换
 */
$(function(){
	var obj=eval(page);
	var cpuUnilizationRate=new Array();
	var date=new Array();
	var memoryUnilizationRate=new Array();
	var usedSpace=new Array();
	var capacityAll=new Array();
	if(!(obj=='' || obj==undefined || obj==null)){
		var count=0;
		count=(obj.length>=15)?15:obj.length;
		for(var i=0;i<count;i++){
			  cpuUnilizationRate[i]=obj[i].cpuUnilizationRate;
			  date[i]=formatDate(obj[i].createdAt);
			  memoryUnilizationRate[i]=obj[i].memoryUnilizationRate;
			  usedSpace[i]=obj[i].usedSpace;
			  capacityAll[i]=obj[i].capacityAll;
		}			  
		server_index_chart.init_line_server_echarts("server_cpu_use","CPU使用率",date,cpuUnilizationRate);
		server_index_chart.init_line_server_echarts("server_memory_use","内存使用率",date,memoryUnilizationRate);
		server_index_chart.init_line_server_disk_echarts("server_disk_use",date,usedSpace,capacityAll);
	}

});

/**
 * 转换时间格式为hh:ii
 * @param v
 * @returns {String}
 */
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

/**
 * 补齐字符串
 * @param str
 * @returns
 */
function foo(str){
    str ='00'+str;
    return str.substring(str.length-2,str.length);
}

