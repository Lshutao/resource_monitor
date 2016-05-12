/**
 * tenant - home echarts图表js
 */ 
var tenant_index_chart = {
		
	/* 
	 * 双层圆环 - 初始化  - tenant(云主机概况)
	 * id 放图表的div的id
	 * value  设备的 在线、离线、其他 三种状态的个数 
	 */
	init_pie_index_echarts:function(id,valueOn,valueOff,valueOther){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( tenant_index_chart.init_pie_index_options(id,valueOn,valueOff,valueOther) );
		tenant_index_chart.execute_resize(myChart);
			
	},
	
	/*
	 * 双层圆环 - 配置 - tenant(云主机概况)
	 */
	init_pie_index_options : function(id,valueOn,valueOff,valueOther){
		var total_num = valueOn+valueOff+valueOther;
		var color_o = "#fff";
		if(total_num==0){
			color_o = "#999";
		}
		var option = {
			title : {
		        text: total_num,
		        x:'center',
		        y:'center',
		        textStyle:{
		        	color:color_o,
		         	fontSize:45,
		         	fontWeight:'normal'
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
		            name:'云主机概况',
		            type:'pie',
//		            selectedMode: 'single', //选择模式，默认开启图例开关，可选single，multiple
		            radius : [0, 37],
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
		                  value:total_num, 
		                  name:'云主机概况',
		                  itemStyle : {
		                      normal : {
		                        color:'#67BE5F'
		                      }
		                  }
		                }
		            ]
		        },
		        {
		            name:'云主机概况',
		            type:'pie',
		            radius : [42, 65],
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
		                  value:valueOn, 
		                  name:'在线',
		                  itemStyle : {
		                      normal : {
		                        color:'#058FCD'
		                      }
		                  }
		                },
		                {
		                  value:valueOff, 
		                  name:'离线',
		                  itemStyle : {
		                      normal : {
		                        color:'#F4595F'
		                      }
		                  }
		                },
		                {
		                  value:valueOther, 
		                  name:'其他',
		                  itemStyle : {
		                      normal : {
		                        color:'#F1F1F1'
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
	 * 圆环 - 初始化  - tenant(工单概览)
	 * id 放图表的div的id
	 * value  工单的 已处理、处理中、未处理、关闭 四种状态的个数 
	 */
	init_pie_gongdan_echarts:function(id,value_ed,value_ing,value_un,value_close){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( tenant_index_chart.init_pie_gongdan_options(id,value_ed,value_ing,value_un,value_close) );
		tenant_index_chart.execute_resize(myChart);
			
	},
	
	/*
	 * 圆环 - 配置 - tenant(工单概览)
	 */
	init_pie_gongdan_options : function(id,value_ed,value_ing,value_un,value_close){
		var total_num = value_ed+value_ing+value_un+value_close;
		var option = {
			title : {
		        text: total_num,
		        x:'center',
		        y:'center',
		        textStyle:{
		        	color:'#999999',
		         	fontSize:45,
		         	fontWeight:'normal'
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} "
		    },
		    legend: {
		        show:false,
		        data:['已处理','处理中','未处理','关闭']
		    },
		    toolbox: {
		        show : false 
		    },
		    calculable : false,
		    series : [
		        {
		            name:'工单概况',
		            type:'pie',
		            radius : [40, 65],
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
		                  value:value_ed, 
		                  name:'已处理',
		                  itemStyle : {
		                      normal : {
		                        color:'#058FCD'
		                      }
		                  }
		                },
		                {
		                  value:value_ing, 
		                  name:'处理中',
		                  itemStyle : {
		                      normal : {
		                        color:'#40AF36'
		                      }
		                  }
		                },
		                {
		                  value:value_un, 
		                  name:'未处理',
		                  itemStyle : {
		                      normal : {
		                        color:'#FA8301'
		                      }
		                  }
		                },
		                {
			                  value:value_close, 
			                  name:'关闭',
			                  itemStyle : {
			                      normal : {
			                        color:'#F1F1F1'
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
	 * 圆环 - 初始化  - tenant(订单概览)
	 * id 放图表的div的id
	 * value  订单的 成功、失败、驳回 三种状态的个数 
	 */
	init_pie_order_echarts:function(id,value_su,value_fail,value_bohui){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption( tenant_index_chart.init_pie_order_options(id,value_su,value_fail,value_bohui) );
		tenant_index_chart.execute_resize(myChart);
			
	},
	
	/*
	 * 圆环 - 配置 - tenant(订单概览)
	 */
	init_pie_order_options : function(id,value_su,value_fail,value_bohui){
		var total_num = value_su+value_fail+value_bohui;
		var option = {
			title : {
		        text: total_num,
		        x:'center',
		        y:'center',
			    textStyle:{
			    	color:'#999999',
			     	fontSize:45,
			     	fontWeight:'normal'
			    }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} "
		    },
		    legend: {
		        show:false,
		        orient : 'vertical',
		        x : 'left',
		        data:['成功','失败','驳回']
		    },
		    toolbox: {
		        show : false 
		    },
		    calculable : false,
		    series : [
		        {
		            name:'云主机概况',
		            type:'pie',
		            radius : [40, 65],
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
		                  value:value_su, 
		                  name:'成功',
		                  itemStyle : {
		                      normal : {
		                        color:'#058FCD'
		                      }
		                  }
		                },
		                {
		                  value:value_fail, 
		                  name:'失败',
		                  itemStyle : {
		                      normal : {
		                        color:'#F4595F'
		                      }
		                  }
		                },
		                {
		                  value:value_bohui, 
		                  name:'驳回',
		                  itemStyle : {
		                      normal : {
		                        color:'#FA8301'
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
	 * 柱形图 - 初始化  - tenant(业务概览)
	 * id 放图表的div的id
	 * name 业务的名称(数组)
	 * value  业务的使用个数(数组)
	 */
	init_bar_bus_echarts:function(id,name,value){
		if( name.length<1 || value.length<1 ){
			$("#"+id).html("<span class='prompt'>无业务使用虚拟机</span>");
			$("#"+id).next().remove();
		}else{
			var myChart = echarts.init(document.getElementById(id));
			myChart.setOption( tenant_index_chart.init_bar_bus_options(id,name,value) );
			tenant_index_chart.execute_resize(myChart);
		}
		
	},
	
	/*
	 * 柱形图 - 配置 - tenant(业务概况)
	 */
	init_bar_bus_options : function(id,name,value){
		var option = {
			title : {
		        text: '业务使用虚拟机排行',
		        subtext: '虚拟机个数 ( 个 ) ',
		        textStyle:{
		          color:'#000',
		          fontSize:14,
		          fontWeight: 'normal',
		          fontFamily:"Microsoft YaHei"
		        },
		        subtextStyle:{
			          fontWeight: 'normal',
			          fontFamily:"Microsoft YaHei"
			    }
		    },
		    tooltip : {
		        trigger: 'item'
		    },
		    legend: {
		        show : false,
		        data:['业务使用虚拟机排行']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	x:30,
		    	y:60,
		    	x2:20,
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
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'虚拟机个数',
		            type:'bar',
		            data:[
							{
							    value:value[0], 
							    itemStyle : {
							        normal : {
							          color:'#F3565D'
							        }
							    }
							},
							{
							    value:value[1], 
							    itemStyle : {
							        normal : {
							          color:'#FA8301'
							        }
							    }
							},
							{
							    value:value[2], 
							    itemStyle : {
							        normal : {
							          color:'#40AF36'
							        }
							    }
							},
							{
							    value:value[3], 
							    itemStyle : {
							        normal : {
							          color:'#40AF36'
							        }
							    }
							},
							{
							    value:value[4], 
							    itemStyle : {
							        normal : {
							          color:'#058FCD'
							        }
							    }
							}	
		                  
		                
		            ],
		            barWidth:45,
//		            itemStyle:{
//		            	normal:{
//		            		lineStyle:{
//		            			color:'red',
//		            			width:3
//		            		}
//		            	}
//		            }
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