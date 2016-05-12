/**
 * admin 资源分配 js文件
 */ 
var resource_allot = {
	/**
	 * 初始化方法
	 */
	init : function(){ 
		//资源分配趋势图表
		resource_allot.init_resource_allot_echarts("resource_allot_qushi_chart",['2599-656','2156-85','we-er'],[334,56,334],[45,58,89],[189,95,15]);
	},
	
	
		
	/**
	 * 折线图 - 初始化  - 资源分配趋势
	 * id 放图表的div的id
	 * date 日期数组
	 * cpu_value cpu数组
	 * memory_value 内存数组
	 * storage_value 存储数组
	 */
	init_resource_allot_echarts:function(id, date, cpu_value, memory_value,storage_value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(resource_allot.init_resource_allot_options(id, date, cpu_value, memory_value,storage_value));
		resource_allot.execute_resize(myChart);
	},
	
	/**
	 * 折线图 - 配置  - 资源分配趋势
	 */
	init_resource_allot_options : function(id, date, cpu_value, memory_value,storage_value){
		var option = {
				title : {
			        text: '利用率(%)',
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
					  x:33,
					  y:30,
					  x2:35,
					  y2:20,
					  backgroundColor:'#F5F5F5'
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
			                  formatter: '{value}'
			            },
						splitNumber: 5
					}
				],
			    series : [  
			        {
			            name:"CPU",
			            type:'line',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#058FCD'
							}
						},
			            data:cpu_value
			        },
			        {
			            name:"内存",
			            type:'line',
						smooth:true,
						itemStyle : {
							normal : {
								color:'#32B98F'
							}
						},
			            data:memory_value
			        },
			        {
			            name:"存储",
			            type:'line',
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
	resource_allot.init();
});
