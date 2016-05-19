/**
 * 登录js
 */
var login = {
	username : null,
	password : null,
	init:function(){
		login.init_function();
		frame.tab_control(".login_tab","active",".login_tab_list");
	},
	
	init_function : function(){
		//前台验证登录
		username = $("#username");  
		password = $("#password");
		username.on("blur",function(){
			if(username.val()){
				$('#msg').html('');
			}
		});
		
		//enter键
		document.onkeydown=function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode==13){ 
				login.validate_function();
			}
		}; 
		//向后台提交登录
		$("#login_add").off('click').on('click',function(){
			login.validate_function();
		});
	},
	
	validate_function : function(){
		if(!username.val() && !password.val()){
			$('#msg').html('<i class="wish_notification"></i>请输入账户名和密码');
		}else if(!username.val()){
			$('#msg').html('<i class="wish_notification"></i>请输入账户名');
		}else if(!password.val()){
			$('#msg').html('<i class="wish_notification"></i>请输入密码');
		}else{		
			$.ajax({
				type : "POST",
				dataType: "json",
				data: {'username' : username.val(), 'password' : password.val()},
				url : contextPath + "/login",
				success : function(data){
					if(data.code == 'failure'){
						$('#msg').html('<i class="wish_notification"></i>' + data.result);
					}else if(data.code == 'success'){
						public_obj.setCookie("menuFlag", "0", 1800);
						window.location = "/wishstack-web/tenantHomePage";
					}
				}
			});
		}
	},
	
	/**
	 * 登录界面 max-height(js实现)
	 */
	login_media:function(){
		$(window).resize(function() {
			var height_screen = document.body.clientHeight;
			if(height_screen<=710){
				$("div#cloud_login #login_form").css("bottom","116px");
			}else if(height_screen<=800){
				$("div#cloud_login #login_form").css("bottom","190px");
			}else{
				$("div#cloud_login #login_form").css("bottom","250px");
			}
		});
	}
	
};
login.init();
login.login_media();