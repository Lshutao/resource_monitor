/**
 * 公用js文件
 */
var public_obj = {
		getCookie :function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';'); //把cookie分割成组    
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i]; //取得字符串    
				while (c.charAt(0) == ' ') { //判断一下字符串有没有前导空格    
					c = c.substring(1, c.length); //有的话，从第二位开始取    
				}
				if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name    
					return unescape(c.substring(nameEQ.length, c.length)); //解码并截取我们要值    
				}
			}
			return false;
		},


		//设置cookie    
		setCookie:function(name, value, seconds) {
			seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。    
			var expires = "";
			if (seconds != 0) { //设置cookie生存时间    
				var date = new Date();
				date.setTime(date.getTime() + (seconds * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + escape(value) + expires + "; path=/";
		},
		
		//清除cookie    
		clearCookie:function(name) {
			setCookie(name, "", -1);
		},

	/**
	 * 初始化检索和检索关键字的控制关系
	 */
	init_search_type : function(){
		$("#searchType").unbind("change").change(function(){
			if($(this).val()){
				$("#keyword").removeAttr("disabled");
			}else{
				$("#keyword").attr("disabled", "disabled");
			}
		});
	},
	
	/**
	 * 通过点击云服务商名称改变样式
	 * @param obj
	 */
	resource_click : function(obj){
		$(obj).unbind("click").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		});
	},
	
	/**
	 * 获取字符串中的数字
	 * @param text
	 * @returns
	 */
	get_num : function(text){
		var value = text.replace(/[^0-9]/ig,""); 
		return value;
	},
	
	/**
	 * 获取云服务商id
	 * @returns
	 */
	get_provider_id : function(){
		return $("#provider").find(".active").attr("value");
	},
	
	/**
	 * 复选框操作
	 * action_url 操作的url eg: /user/   不需要带上编号‘
	 * callback_url 刷新的url
	 * is_delete 是否需要加删除按钮事件
	 * 例：public_obj.checkbox_all("/user/","/user",false); 用户列表的调用
	 */
	checkbox_all:function(action_url,callback_url,is_delete){
		//thead的复选框点击事件
		$("thead th.multi_select_column input[type=checkbox]").unbind("click").click(function(){
			var is_checked = $(this).prop("checked");
			$(this).parents("table").find("tbody td.multi_select_column input[type=checkbox]").prop("checked",is_checked);
		});
		
		//tbody的复选框点击事件
		$("tbody td.multi_select_column input[type=checkbox]").unbind("click").click(function(){
			var is_checked = $(this).prop("checked");
			
			if(is_checked){
				var flag = true;
				$(this).parents("tbody").find("tr").each(function(){
					var sub_check = $(this).find("td.multi_select_column input[type=checkbox]").prop("checked");
					if(sub_check==false){
						flag = false;
						return ;
					}
				});
				$(this).parents("table").find("thead th.multi_select_column input[type=checkbox]").prop("checked",flag);
			}else{
				$(this).parents("table").find("thead th.multi_select_column input[type=checkbox]").prop("checked",false);
			}
			
		});
		
		if(is_delete){
			//所有复选框事件
			$("table .multi_select_column input[type=checkbox]").click(function(){
				var flag = false;
				$(this).parents("table").find("tbody tr").each(function(){
					var check = $(this).find("td.multi_select_column input[type=checkbox]").prop("checked");
					if(check){
						flag = true;
						return false;
					}
				});
				var btn = $(this).parents("#vmContainer").find("button.delete_btn");
				if(flag){
					btn.removeAttr("disabled");
					
					//批量删除事件
					btn.click(function(){
						var id_arr = [];
						$(this).parents("#vmContainer").find("table tbody tr").each(function(){
							var check = $(this).find("td.multi_select_column input[type=checkbox]").prop("checked");
							if(check){
								id_arr.push($(this).find("td.date_id").text());
							}
						});
						public_obj.batch_action('删除','确定删除吗？',action_url, 'delete',callback_url, 2, id_arr);
					});
				}else{
					btn.attr("disabled","disabled");
				}
			});
		}
		
	},
	
	/**
	 * 批量执行各种操作 (批量删除)
	 * title 确认框标题
	 * message 确认框信息
	 * url 处理请求地址
	 * action 执行的动作
	 * callback_url 执行操作回调列表页地址
	 * mark 是否添加文本框标识 1：添加 2：未添加
	 * arr 被选中的数组
	 */ 
	batch_action : function(title, message, url, action, callback_url, mark,  arr) {
		//debugger;
		if(arr == "undefined"){
			//var arr.length=1;
		}
		if(mark == 1){
			message = message+"<br /> <textarea   placeholder='请输入理由'></textarea>";
		}
		
		var config = {
				"callback" : function(data){
					//XUI.gotoPage(callback_url);
					windown.top.localtion=callback_url;
				}
		}
		var config_null = {
				"callback" : function(data){
					
				}
		}
			
		$.confirm({
			'title'		: title,
			'message'	: message,
			'buttons'	: {
				'确定'	: {
					'class'	: 'sure',
					'action': function(){
						for(var i=0; i < arr.length ; i++){
							if( i+1 == arr.length){
								//XUI.ajax.send(url+arr[i], "", action, "", config);
								//alert(contextPath+url+arr[i]);
								$.ajax({
									  type: action,
									  url: contextPath+url+arr[i],
									  success: function(data){
										  window.top.location=contextPath+callback_url;
										},
									  dataType: 'json'
									});
							}else{
								//XUI.ajax.send(url+arr[i], "", action, "", config_null);
								$.ajax({
									  type: action,
									  url: contextPath+url+arr[i],
									  success: function(data){
											
										},
									  dataType: 'json'
									});
							}
						}
					}
				},
				'取消'	: {
					'class'	: 'cancel',
					'action': function(){}	
				}
			}
		});
	},
	
	/**
	  * 根据给定格式获取时间
	  * @param date
	  * @param format
	  */
	 getDateByFormat : function(format){
		  return new Date().format(format);
	 },
	 
	/**
	 * 按钮id
	 * @param id
	 */
	button_repeat_submit : function(id){
		$("#" + id).attr("disabled", true);
	},
	
	/**
	 * 提示信息框
	 * state 状态 success or failure
	 * info 信息
	 */
	prompt_show:function(state,info){
		//success,failure
		var icon_obj = "";
		var state_text = "";
		if(state == "success"){
			icon_obj = "<i class='prompt_icon wish_enable succeed'></i>";
			state_text = "成功";
		}else if(state == "failure"){
			icon_obj = "<i class='prompt_icon wish_notification fail'></i>";
			state_text = "失败";
		}
		$("body").append("<div class='prompt_frame'>"+
						icon_obj + 
						"<span class='prompt_result'> "+ state_text +"  : </span>"+
						"<span class='prompt_info'> "+ info +" </span>"+
						"</div>");
		
		setTimeout(function(){
			$(".prompt_frame").animate({opacity:"0"},1000);
			setTimeout(function(){
				$(".prompt_frame").remove();
			},1000);
		},3000);
		
	},
	
	/**
	 * 设置菜单当前项
	 */
	 set_menu_active:function(){
		 //获取当前页面的id
		 var page_id = $("#pageid").text();

		 $(".sidebar_second_nav .page_menu li").each(function(){
			 var menu_pageid = $(this).attr("pageid");
			 if(menu_pageid==page_id){
				 //去掉所有的active
				 $(".sidebar_first_nav li").removeClass("active");
				 $(".sidebar_second_nav .page_menu li").removeClass("active");
				 $(".sidebar_second_nav > li").css("display","none");
				 
				 //给pageID=page_id的li加上active
				 $(this).addClass("active");
				 $(this).parents("li").css("display","list-item");
				 
				 //给pageID=page_id的li的父li加上active
				 var index_o = $(this).parents("li").index();
				 $(".sidebar_first_nav").children().eq(index_o).addClass("active");

//				 debugger;
				 if(public_obj.getCookie("menuFlag")=="0"){
					 $(".sidebar").css("width","50px");
					 $(".sidebar .sidebar_first_nav_space").css("width","50px");
					 $(".content_body").css("margin-left","65px");
					 public_obj.setCookie("menuFlag", "1", 1800);
				 } else {

//					 $(".sidebar").css("width","230px");
//					 $(".sidebar .sidebar_first_nav_space").css("width","50px");
//					 $(".content_body").css("margin-left","245px");
				 }
				 
				 return false;
			 }
			 
		 });
	 },
	 gotoPage:function(pageNo){
		 $("input[name='currentPage']").val(pageNo);
		 $("form").submit();
		 
	 }
	
	
};

Date.prototype.format = function(format){
	var o = {
		"M+" : this.getMonth() + 1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S" : this.getMilliseconds()
	//millisecond 
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
							.substr(("" + o[k]).length));
		}
	}
	return format; 
}
        

$(function(){

	//设置菜单当前项
	public_obj.set_menu_active();
	
	
	//分页按钮跳转到X页
	$("#page-number").blur(function(){
  		var value=$("#page-number").val();
  		if(!isNaN(value)){
  			var total= $("#page-pageAmount").val();
  			if(parseInt(value) > (total)){
  				$("#page-number").val(parseInt(total));
  			}
  		}else{
  			$("#page-number").val(1);
  		}
  		$("#gotoPageA").attr("href","javascript:;");
  		$("#gotoPageA").attr("onclick","public_obj.gotoPage($('#page-number').val())");
	});
}); 



