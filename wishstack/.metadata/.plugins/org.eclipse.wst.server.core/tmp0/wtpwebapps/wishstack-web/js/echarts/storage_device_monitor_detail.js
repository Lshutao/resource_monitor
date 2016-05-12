/**
 * 存储详情 echarts图表js
 */ 
var storage_chart = {
		
	/* 
	 * 折线图 - 初始化  - 存储详情
	 * id 放图表的div的id
	 * name 当前资源
	 * date 最近7天的日期 (数组)
	 * value_read 最近7天的读出数据(数组)
	 * value_write 最近7天的写入数据(数组)
	 */
	init_storage_echarts:function(id,name,date,value_read,value_write,unit){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( storage_chart.init_storage_options(id,name,date,value_read,value_write,unit) );
		storage_chart.execute_resize(myChart);
	},
	
	/*
	 * 折线图 - 配置  - 存储详情
	 */
	init_storage_options : function(id,name,date,value_read,value_write,unit){
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:true,
			        data:['读出数据','写入数据']
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : false,
				grid:{
					  x:75,
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
			                  formatter: unit
			            },
						splitNumber: 5
					}
				],
			    series : [
			        {
			            name:'读出数据',
			            type:'line',
			            stack: '读出数据',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#F98401',
								areaStyle: {type: 'default'}
							}
						},
			            data:value_read
			        },
			        {
			            name:'写入数据',
			            type:'line',
			            stack: '写入数据',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#0A95D6',
								areaStyle: {type: 'default'}
							}
						},
			            data:value_write
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
var ioRead=new Array();
var ioWrite=new Array();
var iopsRead=new Array();
var iopsWrite=new Array();
if(!(obj=='' || obj==undefined || obj==null)){
	var count=0;
	count=(obj.length>=15)?15:obj.length;
	for(var i=0;i<count;i++){	 
		  date[i]=formatDate(obj[i].createdTime);	  
		  ioRead[i]=obj[i].readThroughput;
		  ioWrite[i]=obj[i].writeThroughput;
		  iopsRead[i] = obj[i].deviceIopsRead;
		  iopsWrite[i] = obj[i].deviceIopsWrite;
	}
storage_chart.init_storage_echarts("storage_disk_rw", "硬盘读写数据", date, ioRead, ioWrite,'{value} Mbps');
storage_chart.init_storage_echarts("storage_iops_rw", "IOPS", date, iopsRead, iopsWrite, '{value}');
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