/**
 * 配额js文件
 */
var quotas = {
	cores : $("#cores").val(),
	routers : $("#routers").val(),
	floatingIps : $("#floatingIps").val(),
	networks : $("#networks").val(),
	loadbalancers : $("#loadbalancers").val(),
	volumes : $("#volumes").val(),
	ram : $("#ram").val(),
	volumeTotalSize : $("#volumeTotalSize").val(),
	instances : $("#instances").val(),
	firewall : $("#firewall").val(),
	wafs : $("#wafs").val(),
	ips : $("#ips").val(),
	vpn : $("#vpn").val(),
	safeChannel : $("#safeChannel").val(),
	
	/**
	 * 初始化方法
	 */
	init : function(){
		quotas.initValidate();
		quotas.region_change();
		//配额申请 滑块

		quotas.create_quota_bar();
	},
	
	/**
	 * 检查配额信息是否有变化
	 * @returns {Boolean}
	 */
	check_quota : function(){
		if(quotas.cores == $("#cores").val() && quotas.routers == $("#routers").val()
				&& quotas.floatingIps == $("#floatingIps").val() && quotas.networks == $("#networks").val()
				&& quotas.loadbalancers == $("#loadbalancers").val() && quotas.volumes == $("#volumes").val()
				&& quotas.ram == $("#ram").val() && quotas.volumeTotalSize == $("#volumeTotalSize").val()
				&& quotas.instances == $("#instances").val() && quotas.firewall == $("#firewall").val()
				&& quotas.wafs == $("#wafs").val() && quotas.wafs == $("#wafs").val() && quotas.vpn == $("#vpn").val()){
			return false;
		}
		return true;
	},
	
	/**
	 * 初始化验证方法
	 */
	initValidate : function(){
		var flag = "quotas_";
		if($("form").attr("id").indexOf("add") > 0){
			flag += "add";
		}else{
			flag += "update";
		}
		quotas.validateConfig(flag, "1");
	},
	
	/**
	 * 改变网络区域重新获取该区域配额信息
	 */
	region_change : function(){
		$("#region").unbind("change").change(function(){
			XUI.gotoPage("/quotas/edit?region=" + $(this).val() + "");
		});
	},
	
	/**
	 * 验证配置方法
	 */
	validateConfig : function(submitId,groupId){
		$.formValidator.initConfig({
    		validatorGroup : groupId,
    		submitButtonID : submitId,
    		debug : true,
    		errorFocus : false,
    		onSuccess : function() {
    			if(quotas.check_quota()){
    				public_obj.button_repeat_submit(submitId);
    				quotas.quotaSave(submitId);
    			}else{
    				$("#quotasErrorTip").text("至少选择一种配额");
    			}
    		},
    		onError : function() {
    			
    		}
    	});
//		quotas.executeValidate(submitId, groupId);
	},
	
	/**
	 * 执行具体的验证方法
	 * @param groupId
	 */
	executeValidate : function(submitId, groupId){
		$("#cores, #ram, #floatingIps, #volumeTotalSize, #routers, " +
				"#instances, #networks, #loadbalancers, #firewall, #volumes").formValidator({
    		validatorGroup : groupId,
    		onShow : "",
    		onFocus : "",
    		onCorrect : " "
    	}).regexValidator({
			regExp : regexEnum.intege1,
			onError : "格式不正确"
		});
	
	},
	
	/**
	 * 保持配额信息
	 * @param submitId
	 */
	quotaSave : function(submitId){
//		var config = {
//			"callback" : function(data){
//				XUI.gotoPage("/order");
//				$(".wish_archive").parent().removeClass("active");
//				$(".wish_order").parent().addClass("active");
//			}
//		};
        
		//XUI.ajax.send("/quotas/saveQuotaOrder", $("#" + submitId + "_form").serialize(), "post", "json",  config);
        //debugger;
        var formData = new FormData($("#" + submitId + "_form")[0]);  
        $.ajax({  
             url: '/wishstack-web/quotas/saveQuotaOrder' ,  
             type: 'POST',  
             data: formData,  
             async: false,  
             cache: false,  
             contentType: false,  
             processData: false,  
             success: function (returndata) {  
            	XUI.gotoPage("/order");
 				$(".wish_archive").parent().removeClass("active");
 				$(".wish_order").parent().addClass("active");
             },  
             error: function (returndata) {  
                 alert("提交失败");  
             }  
        });         
		return true;
	},
	
	/**
    * 将本地图片显示到页面(暂不支持Safari6.0以下浏览器的图片预览)
    */
	PreviewImage:function(fileObj,imgPreviewId,divPreviewId){  
	    var allowExtention=".jpg,.bmp,.gif,.png";//允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;  
	    var extention=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase();              
	    var browserVersion= window.navigator.userAgent.toUpperCase();  
	    if(allowExtention.indexOf(extention)>-1){   
	        if(fileObj.files){//HTML5实现预览，兼容chrome、火狐7+等  
	            if(window.FileReader){  
	                var reader = new FileReader();   
	                reader.onload = function(e){  
	                    document.getElementById(imgPreviewId).setAttribute("src",e.target.result);  
	                }    
	                reader.readAsDataURL(fileObj.files[0]);  
	            }else if(browserVersion.indexOf("SAFARI")>-1){  
	                alert("不支持Safari6.0以下浏览器的图片预览!");  
	            }  
	        }else if (browserVersion.indexOf("MSIE")>-1){  
	            if(browserVersion.indexOf("MSIE 6")>-1){//ie6  
	                document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);  
	            }else{//ie[7-9]  
	                fileObj.select();  
	                if(browserVersion.indexOf("MSIE 9")>-1)  
	                    fileObj.blur();//不加上document.selection.createRange().text在ie9会拒绝访问  
	                var newPreview =document.getElementById(divPreviewId+"New");  
	                if(newPreview==null){  
	                    newPreview =document.createElement("div");  
	                    newPreview.setAttribute("id",divPreviewId+"New");  
	                    newPreview.style.width = document.getElementById(imgPreviewId).width+"px";  
	                    newPreview.style.height = document.getElementById(imgPreviewId).height+"px";  
	                    newPreview.style.border="solid 1px #d2e2e2";  
	                }  
	                newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";                              
	                var tempDivPreview=document.getElementById(divPreviewId);  
	                tempDivPreview.parentNode.insertBefore(newPreview,tempDivPreview);  
	                tempDivPreview.style.display="none";                      
	            }  
	        }else if(browserVersion.indexOf("FIREFOX")>-1){//firefox  
	            var firefoxVersion= parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);  
	            if(firefoxVersion<7){//firefox7以下版本  
	                document.getElementById(imgPreviewId).setAttribute("src",fileObj.files[0].getAsDataURL());  
	            }else{//firefox7.0+                      
	                document.getElementById(imgPreviewId).setAttribute("src",window.URL.createObjectURL(fileObj.files[0]));  
	            }  
	        }else{  
	            document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);  
	        }           
	    }else{  
	        alert("仅支持"+allowExtention+"为后缀名的文件!");  
	        fileObj.value="";//清空选中文件  
	        if(browserVersion.indexOf("MSIE")>-1){                          
	            fileObj.select();  
	            document.selection.clear();  
	        }                  
	        fileObj.outerHTML=fileObj.outerHTML;  
	    }  
	},
	
	/**
	 * 配额申请 生成滑块
	 * 
	 */
	create_quota_bar:function(){
		//遍历生成滑块
		$(".demo.bar_space").each(function(){
			var class_o = $(this).find("input").attr("class");//生成滑块的标签
			var value_arr = $(this).find("input").val().split(",");
			var active_val = value_arr[0]; //当前值(可以选择的最小值)
			
			var max = $(this).parent().siblings(".quota_text").find("span").text(); //可以申请的最大值
			var min = $(this).next().find("input").val(); //可以申请的最小值(0 或者 当前值)

			
			var text_id = $(this).next().find("input").attr("id"); //输入框的id
			var res_name = text_id+"_num";
			$("#"+res_name).text(min);
			
			//生成滑块
			$('.'+class_o).jRange({
				from: 0,
				to: max,
				step: 1,
				scale: [0,max], //显示的最大，最小值
				format: '%s',
				width: 220, //显示条的宽度
				showLabels: false, //是否当前值
				showScale: false, //是否显示刻度值
				textID: text_id //输入框id
			});
			
			var width_obj = $(this).find(".selected-bar"); 
			var width_obj_val = $(this).find(".selected-bar").css("width"); 
			
			var left_obj = $(this).find(".pointer.high");
			var left_obj_val = $(this).find(".pointer.high").css("left");
			
			
			//页面加载后的值
			
			
			//设置各种事件 -----------------------------------------------
			
			var focus_val = "";
			//输入框获取焦点事件
			$(this).next().find("input").focus(function(){
				focus_val = $(this).val(); //获取输入框当前的值
			});
			
			//输入框失去焦点事件
			$(this).next().find("input").blur(function(){
				var val = $(this).val();
				if(val=="" || val==null || val=="undefind"){
					//如果当前值为空 ,将初始的值赋给输入框、滑块、滑条, 并提示验证信息 
					$(this).val(min);					
					$("#"+res_name).text(min);
					left_obj.css("left",left_obj_val);
					width_obj.css("width",width_obj_val);
					$(".quota_choice #quotasErrorTip").text("配额数不能为空");
					return;
				}
				if(parseInt(val) != val){
					//如果当前值为非正整数 ,将初始的值赋给输入框、滑块、滑条, 并提示验证信息 
					$(this).val(min);
					$("#"+res_name).text(min);
					left_obj.css("left",left_obj_val);
					width_obj.css("width",width_obj_val);
					$(".quota_choice #quotasErrorTip").text("配额数必须为正整数");
				}else{
					min = parseInt(min);
					max = parseInt(max);
					val = parseInt(val);
					focus_val = parseInt(focus_val);
					//如果当前值符合输入要求
					if( val >= min && val <= max){
//						var mark = 212/max * val;
//						left_obj.css("left",mark+"px");
//						
//						var width_scale = min/max;
//						if(width_scale==0){
//							var width_val = ( 220 / max ) * ( val-min );
//							width_obj.css("width",width_val+"px");
//						}else{
//							var width_val = ( 220*width_scale / min ) * ( val-min );
//							width_obj.css("width",width_val+"px");
//						}
						$(".quota_choice #quotasErrorTip").text("");
						$("#"+res_name).text(val);
					}else{
						//如果当前值不在要求的范围内 ,将初始的值赋给输入框、滑块、滑条, 并提示验证信息 
						left_obj.css("left",left_obj_val);
						width_obj.css("width",width_obj_val);
						$(this).val(min);
						$("#"+res_name).text(min);
						$(".quota_choice #quotasErrorTip").text("配额数只能在指定范围内");
					}
				}

				content.quota_task();
			});
			

			//放开键盘的时候
			$(this).next().find("input").keyup(function(){

				var val = $(this).val();
				if ( !isNaN(val) ){
					min = parseInt(min);
					max = parseInt(max);
					val = parseInt(val);
					focus_val = parseInt(focus_val);
					if( val < min ){
						$(".quota_choice #quotasErrorTip").text("配额数只能在指定范围内");
					}else if(val >= min && val <= max ){
						var mark = 212/max * val;
						left_obj.css("left",mark+"px");
						
						var width_scale = min/max;
						if(width_scale==0){
							var width_val = ( 220 / max ) * ( val-min );
							width_obj.css("width",width_val+"px");
						}else{
							var width_val = ( 220*width_scale / min ) * ( val-min );
							width_obj.css("width",width_val+"px");
						}
						$(".quota_choice #quotasErrorTip").text("");
					}else if( val > max){
						left_obj.css("left",left_obj_val);
						width_obj.css("width",width_obj_val);
						$(this).val(min);
						$("#"+res_name).text(min);
						$(".quota_choice #quotasErrorTip").text("配额数只能在指定范围内");
					}
				} 
				
				content.quota_task();
				 
			});
			
			//重置按钮
			$(".quotas_reset").click(function(){
				left_obj.css("left",left_obj_val);
				width_obj.css("width",width_obj_val);
				$(".quota_choice #quotasErrorTip").text("");
				$("#cores_num").text(quotas.cores);
	        	$("#ram_num").text(quotas.ram);
	        	$("#volumeTotalSize_num").text(quotas.volumeTotalSize);
	        	$("#floatingIps_num").text(quotas.floatingIps);
	        	$("#routers_num").text(quotas.routers);
	        	$("#loadbalancers_num").text(quotas.loadbalancers);
	        	$("#vpn_num").text(quotas.vpn);
	        	$("#wafs_num").text(quotas.wafs);
	        	$("#safeChannel_num").text(quotas.safeChannel);
	        	$("#ips_num").text(quotas.ips);
	        	$("#firewall_num").text(quotas.firewall);
	        	$("#order_time_num").text("1个月");
	        	$("#order_time_hour_num").text("720");
	        	content.quota_task();
	        	$(".time_choose").find("li").removeClass("active");
	        	$(".quota_detail_time .cloud_calendar").css("display","none");
	        	$(".time_choose").find("li:first-child").addClass("active");
			});
			
			
		});
		
		//遍历 - 设置已有配额进度条
		$(".demo.bar_space").each(function(){
			var active_val = $(this).find(".active_value");
			var get_val = $(this).find(".selected-bar").css("left");
			active_val.css("width",get_val);
		});
		
		
		
	},
	
	/**
	 * 文本框与滑块的值互相影响
	 */
	quota_text_change:function(){
		
	}

};

$(function(){
	quotas.init();
}); 

