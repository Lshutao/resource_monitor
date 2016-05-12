/**
 * 云服务商_list js
 */
var provider_list = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//动态设置每个云服务商的宽度
		provider_list.provider_map_width();
		
		//table下拉按钮事件
		content.table_action_list_btn();
	},
	
	/**
	 * 云服务商管理逻辑图,每个云服务商的宽度，动态设置
	 */
	provider_map_width:function(){
		var num = 0 ;
		$(".provider_logic_map .provider_list li").each(function(){
			num ++;
		});
		if(num==1){
			$(".provider_logic_map .provider_platform hr").css("height","60px");
			$(".provider_logic_map .provider_list li").css("border-left","none").css("width","100%");
			$(".provider_logic_map .provider_list li.add i").css("left","50%").css("margin-left","-28px").css("top","0");
			$(".provider_logic_map .provider_list li span").css("left","50%").css("margin-left","-15px").css("top","50px");
		}else{
			var width = 100/(num-1);
			if(num==2){
				width = 99;
			}
			$(".provider_logic_map .provider_list li").css("width",(width-1)+"%");
			$(".provider_logic_map .provider_list li.add").css("width","0");
		}
	}
	
}

$(function(){
	provider_list.init();
}); 