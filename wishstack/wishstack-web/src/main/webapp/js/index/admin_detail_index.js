/***
 * admin分类查看处理
 */
var adminDetailIndex = {
		/**
		 * 初始化方法
		 */
		init : function(){
			adminDetailIndex.parentSelect();
			adminDetailIndex.providerSelect();
			adminDetailIndex.tenantSelect();
		},
		
		/**
		 * select onchange事件函数
		 */
		parentSelect:function(){
			$("#parent").change(function(){
				$("#parent option").each(function(i,o){
		            if($(this).attr("selected"))
		                {
		                    $(".sub").hide();
		                    $(".sub").eq(i).show();
		                    if(i == 1){
				            	$("#tenant").change();//选择租户，进行跳转
				            }else{
				            	$("#provider").change();//选择租户，进行跳转
				            }
		                }
		            });
		    });
			$("#parent").change();//初始也是改变状态
		},
		/**
		 * select onchange事件函数
		 */
		providerSelect:function(){
			 $("#provider").change(function(){
			    	$("#provider option").each(function(i,o){
			    		if($(this).attr("selected")){
			    			if($("#provider").val() != ""){
			    				adminDetailIndex.providerPage($("#provider").val());
			    			}
			    		}
			    	});
			 });
			// $("#provider").change();//初始也是改变状态
		},
		/**
		 * select onchange事件函数
		 */
		tenantSelect:function(){
			 $("#tenant").change(function(){
			    	$("#tenant option").each(function(i,o){
			    		if($(this).attr("selected")){
			    			if($("#tenant").val() != ""){
			    				adminDetailIndex.tenantPage($("#tenant").val());
			    			}
			    		}
			    	});
			 });
			 //$("#tenant").change();//初始也是改变状态
		},
		/***
		 * 显示provider对应页面
		 */
		providerPage:function(name){
			//XUI.gotoPage("/adminType", {"providerId" : name}
			XUI.gotoPage("/adminType/"+ name);
		},
		/***
		 *显示租户首页 
		 */
		tenantPage:function(name){
			//XUI.gotoPage("/adminTypeTenant", {"tenantId" : name});
			XUI.gotoPage("/adminTypeTenant/"+ name);
		}
}
$(function(){
	adminDetailIndex.init();
}); 