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
	}
}

$(function(){
	cloud_resource.init();
});