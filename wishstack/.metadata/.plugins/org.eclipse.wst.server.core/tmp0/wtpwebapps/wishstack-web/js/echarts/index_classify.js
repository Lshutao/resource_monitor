/**
 * admin - 分类查看 echarts图表js
 */ 
var admin_index_classify_chart = {
		
	/* 
	 * 圆环 - 初始化  - admin(分类查看)
	 * id 放图表的div的id
	 * name 设备的名字(eg：服务器、存储设备、网络设备)
	 * value1,value2,value3  设备的 在线、离线、其他 三种状态的个数 
	 */
	init_pie_index_echarts:function(id,name,value1,value2,value3){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( admin_index_classify_chart.init_pie_index_options(id,name,value1,value2,value3));
		admin_index_classify_chart.execute_resize(myChart);
			
	},
	
	/*
	 * 圆环 - 配置 - admin(分类查看)
	 */
	init_pie_index_options : function(id,name,value1,value2,value3){
		var option = {
			title : {
		        text: '总数: '+(parseInt(value1) + parseInt(value2) + parseInt(value3)),
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
		        data:['在线','离线','其他']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [
		        {
		            name:name,
		            type:'pie',
		            radius : ['43%', '50%'],
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
		                        show : false,
		                        position : 'center',
		                        textStyle : {
		                            fontSize : '30',
		                            fontWeight : 'bold'
		                        }
		                    }
		                }
		            },
		            data:[
		                {
		                	value:value1,
		                	name:'在线',
		                	itemStyle : {
		                		normal : {
		                			color:"#1878B5"
		                		}
		                	}
		                },
		                {
		                	value:value2, 
		                	name:'离线',
		                	itemStyle : {
		                		normal : {
		                			color:"#F7881F"
		                		}
		                	}
		                },
		                {
		                	value:value3, 
		                	name:'其他',
		                	itemStyle : {
		                		normal : {
		                			color:"#CCCCCC"
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
	}
	
}

