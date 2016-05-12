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
		var names1 = ["公安厅","经信委","旅游局","民政厅","住建厅","发改委","省交警总队","未使用"];
		var names2 = ["办公厅","扶贫局","法制办","安监局","财政厅","未使用"];
		var value1 = [12,48,56,16,16,26,40,1786];
		var value2 = [40,32,40,16,241,1631];
		var name1 = "百草路机房";
		var name2 = "西信机房";
		cloud_resource.set_business_tenant_charts(120, "yidong_huasan", names1, value1, name1);
		cloud_resource.set_business_tenant_charts(140, "dianxin_tengxun", names2, value2, name2);
	},
	
	/**
	 * 设置时间
	 */
	set_time : function(){
		var date = public_obj.getDateByFormat("yyyy-MM-dd hh:mm:ss");
		$("#time_calculate").text(date);
	},
	
	/**
	 * 设置业务在租户商的统计图表
	 * @param id
	 * @param name
	 * @param value
	 */
	set_business_tenant_charts : function(x, id, name, value, _name){
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(cloud_resource.set_business_tenant_options(x, name, value, _name));
		cloud_resource.charts_resize(myChart);
	},
	
	/**
	 * 设置业务在租户商的统计图表参数
	 * @param id
	 * @param name
	 * @param value
	 */
	set_business_tenant_options : function(x, name, value, _name){
		var json = {};
		var array = new Array();
		for(var i = 0; i < name.length;i++){
			json = {
				value : value[i],
				name : name[i]
			};
			array.push(json);
		}
		var option = {
			title:{
				text:_name,
				x:x,
				y:300,
				textStyle:{
					fontSize:32,
					color:"#FFC000"
				}
			},
		    tooltip : {
		    	show:false,
		        trigger: 'item',
		        formatter : function (params) {
                    return params[1] + "：" + (params.percent - 0).toFixed(0) + '%';
                }
		    },
		    legend: {
		        orient : 'vertical',
		        x : '75%',
		        y : '45%',
		        textStyle : {color: '#fff', fontSize: 20, fontFamily:"微软雅黑"},
		        selectedMode : false,
		        data:name
		    },
		    calculable : false,
		    series : [
		        {
		            name:'业务总数',
		            type:'pie',
		            radius : ['40%', '65%'],
		            center : ['40%', '53%'],
		            itemStyle : {
		                normal : {
		                	label : {
		                        position : 'outer',
		                        formatter : function (params) {                         
		                          return (params.percent - 0).toFixed(0) + '%';
		                        },
		                        textStyle : {
		                            fontSize : 24,
					            	fontFamily:"微软雅黑"
		                        }
		                    },
		                    labelLine : {
		                        show : true
		                    }
		                }
		            },
		            data:array
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
	},
	
	init_interval : function(){
		/**
		 * 定时刷新时间
		 */
		setInterval(function(){
			cloud_resource.set_time();
		}, 1000);
	}
}

$(function(){
	cloud_resource.init();
});