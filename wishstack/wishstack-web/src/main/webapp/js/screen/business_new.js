/**
 * 云资源统计js文件
**/
var cloud_resource = {
	/**
	 * 初始化方法
	 */
	init : function(){
		cloud_resource.set_time();
		cloud_resource.init_interval();
		cloud_resource.set_num();
	},
	
	set_num : function(){
		var min = 10;
		var max = 70;
		var value = [cloud_resource.genern_num(min, 40),
		             cloud_resource.genern_num(60, max),
		             cloud_resource.genern_num(50, max),
		             cloud_resource.genern_num(min, 30),
		             cloud_resource.genern_num(40, max),
		             cloud_resource.genern_num(min, max),
		             cloud_resource.genern_num(min, 40),
		             cloud_resource.genern_num(45, max),
		             cloud_resource.genern_num(20, max),
		             cloud_resource.genern_num(min, 62),
		             cloud_resource.genern_num(min, 45)];
		cloud_resource.init_line_echarts("yidong_huasan",value);
	},
	
	genern_num : function(min, max){
		var range = max - min;
		var rand = Math.random();
		return (min + Math.round(rand * range));
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
		 * 定时刷新时间
		 */
		setInterval(function(){
			cloud_resource.set_num();
		}, 30 * 1000);
	},
	
	/* 
	 * 折线图
	 * id 放图表的div的id
	 * value 最近7天的数据 (数组)
	 */
	init_line_echarts:function(id,value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( cloud_resource.init_line_options(id,value) );
		cloud_resource.charts_resize(myChart);
	},
	
	/*
	 * 折线图 - 配置  
	 */
	init_line_options : function(id,value){
		var option = {
			title : {
				 show:false
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				show:false,
				data:['云业务负载状态']
			},
			toolbox: {
				show : false
			},
			calculable : false,
			grid:{
				  x:160,
				  y:10,
				  x2:80,
				  y2:150
			},
			xAxis : [
				{
					splitLine:{
						show:false
					},
					type : 'category',
					data : ['打击黄赌毒违法犯罪...','门户网站系统','旅游应急系统','川经网平台','交通安全综合服务','数据交换平台','涉税系统','四川扶贫与移民网','四川爱心扶贫网','行政执法管理系统','四川省人民政府法制信息网'],
					axisLabel: {
						 show: true,
						 textStyle:{
							color:'#fff',
							fontSize:20 
						 },
						 rotate:30
					}	
				}
			],
			yAxis : [
				{
					type : 'value',
					axisLabel: {
						 show: true,
						 textStyle:{
							color:'#fff',
							fontSize:24 
						 },
						 formatter:'{value}%'
					}	
				}
			],
			series : [
				{
					name:'云业务负载状态',
					type:'bar',
					data:value,
		            barWidth:40,
					itemStyle:{
						normal:{
							color:'#F6881F'	
						}
					}
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