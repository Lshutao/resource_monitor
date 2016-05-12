/**
 * 虚拟机基本信息 echarts图表js
 */ 
var vm_basic_chart = {
		
	/* 
	 * 圆环 - 初始化  - 虚拟机basic(未处理告警信息)
	 * id 放图表的div的id
	 * value  设备的 在线、离线、其他 三种状态的个数 (数组)
	 */
	init_vm_basic_echarts:function(id,value){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( vm_basic_chart.init_vm_basic_options(id,value) );
		vm_basic_chart.execute_resize(myChart);
			
	},
	
	/*
	 * 圆环 - 配置  - 虚拟机basic(未处理告警信息)
	 */
	init_vm_basic_options : function(id,value){
		var option = {
			title : {
		        text: '总数: '+ value[0] + "个",
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
		        formatter: "{a} <br/>{b} : {c}"
		    },
		    legend: {
		    	show:false,
		        data:['紧急','严重','一般']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [
		        {
		            name:"未处理告警信息",
		            type:'pie',
		            radius : ['50%', '60%'],
		            itemStyle : {
		                normal : {
		                    label : { 
		                        textStyle:{
		                        	color:'#666666',
		                        	fontSize:14,
		        		        	fontFamily:"Microsoft YaHei"
		                        }
		                    },
		                    labelLine : { 
		                        lineStyle:{
		                        	color:'#666666'
		                        }
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
		                	value:value[1], 
		                	name:'紧急',
				            type:'bar',
		                	itemStyle : {
		                		normal : {
		                			color:"#FA8301",
		                			label : {
				                        show : function () {
				                            if ( value[1] == 0){ 
				                            	return false; 
				                            }
				                        }()  
				                    }, 
				                    labelLine : {
				                        show : function () {
				                            if ( value[1] == 0){ 
				                            	return false; 
				                            }
				                        }()  
				                    }
		                		}
		                	}
		                },
		                {
		                	value:value[2], 
		                	name:'严重',
				            type:'bar',
		                	itemStyle : {
		                		normal : {
		                			color:"#2EC6C7",
		                			label : {
				                        show : function () {
				                            if ( value[2] == 0){ 
				                            	return false; 
				                            }
				                        }()  
				                    }, 
				                    labelLine : {
				                        show : function () {
				                            if ( value[2] == 0){ 
				                            	return false; 
				                            }
				                        }()  
				                    }
		                		}
		                	}
		                },
		                {
		                	value:value[3], 
		                	name:'一般',
				            type:'bar',
		                	itemStyle : {
		                		normal : {
		                			color:"#0A96D3",
		                			label : {
				                        show : function () {
				                            if ( value[3] == 0){ 
				                            	return false; 
				                            }
				                        }()  
				                    }, 
				                    labelLine : {
				                        show : function () {
				                            if ( value[3] == 0){ 
				                            	return false; 
				                            }
				                        }()  
				                    }
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
	},
	
}

var value = [30,20,10,6];
//vm_basic_chart.init_vm_basic_echarts("no_alarm_info",value);
