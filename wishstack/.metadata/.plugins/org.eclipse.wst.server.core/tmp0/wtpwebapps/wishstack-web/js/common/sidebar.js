/**
 * 导航菜单文件
 */
var menu = {
	/**
	 * 初始化菜单
	 */
	init : function(){
		$.ajax({   //动态生成侧边栏
			type : "POST",
			dataType: "json",
			async : false,
			url : "/wishstack-web/menu",
			success : function(data){
				if(data){
					//侧边栏相同
					var sidebar_first_nav = $("#sidebar .sidebar_first_nav_space .sidebar_first_nav");
					var sidebar_second_nav = $("#sidebar .sidebar_second_nav");
					var sidebar_first_nav_name = [];
					var sidebar_first_nav_icon = [];
					var second_powers = [];
					var third_powers = [];
					if(data.result == "系统管理员型菜单"){
						data = data.data;
						//动态生成侧边栏
						for (var i = 0; i < data.length; i++) {
							sidebar_first_nav_name[i] = data[i].name;
							sidebar_first_nav_icon[i] = data[i].icon;
							sidebar_first_nav.append("<li><i class='"+ sidebar_first_nav_icon[i] +"'></i>"+ sidebar_first_nav_name[i] +"</li>");
						}
						//动态生成菜单
						for (var i = 0; i < data.length; i++) {
//							console.debug('------------------------>一级 ： ' + data[i].name);
							second_powers = data[i].children;  //二级
							var li = $("<li></li>");
							li.append("<p href='#'>" + data[i].name +"</p>");
							for (var j = 0; j < second_powers.length; j++) {
								var ul = $("<ul></ul>");
								third_powers = second_powers[j].children; //三级
//								console.debug('--------------->二级 ： ' + second_powers[j].name);
								ul.append("<li class='second_nav_one_li'><i class='wish_shujuzhongxin'></i>"+ second_powers[j].name +"<em></em></li>");
								for (var k = 0; k < third_powers.length; k++) {
//									console.debug('-------->三级 ： ' + third_powers[k].name);
//									console.debug('-------->三级 ： ' + third_powers[k].url);
									ul.append('<li class="second_nav_other"><i class="wish_arr-right"></i><a href="javascript:;" onclick="XUI.gotoPage(\''+ third_powers[k].url +'\')">'+ third_powers[k].name +'</a><em></em></li>');
								}
								li.append(ul);
							}
							$(".sidebar_second_nav").append(li);
						}

					}else{
						data = data.data;
						//动态生成侧边栏
						for (var i = 0; i < data.length; i++) {
							sidebar_first_nav_name[i] = data[i].name;
							sidebar_first_nav_icon[i] = data[i].icon;
							sidebar_first_nav.append("<li><i class='"+ sidebar_first_nav_icon[i] +"'></i>"+ sidebar_first_nav_name[i] +"</li>");
						}
						//动态生成菜单
						for (var i = 0; i < data.length; i++) {
//							console.debug('------------------------>一级 ： ' + data[i].name);
							second_powers = data[i].children;  //二级
							var li = $("<li></li>");
							li.append("<p href='#'>" + data[i].name +"</p>");
							for (var j = 0; j < second_powers.length; j++) {
								var ul = $("<ul class='second_nav_tenant'></ul>");
								third_powers = second_powers[j].children; //三级
//								console.debug('--------------->二级 ： ' + second_powers[j].name);
								for (var k = 0; k < third_powers.length; k++) {
//									console.debug('-------->三级 ： ' + third_powers[k].name);
//									console.debug('-------->三级 ： ' + third_powers[k].url);
									ul.append('<li><i class="'+ third_powers[k].icon +'"></i><a href="javascript:;" onclick="XUI.gotoPage(\''+ third_powers[k].url +'\')">'+ third_powers[k].name +'</a></li>');
								}
								li.append(ul);
							}
							$(".sidebar_second_nav").append(li);
						}

					}
				}
			}
		});
	}
}

menu.init();