var frame = {
	init : function() { 
//			menu.init();    //动态初始化菜单
		$(window).resize(function(){
			//sidebar高度设置
			frame.set_sidebar_height(false);
		});
	
		//sidebar高度设置 
		frame.set_sidebar_height(true);
		
		//二级菜单a标签点击事件
		frame.side_a_click();
		
		//一级菜单hover事件
		frame.menu_first_hover();
		
		//sidebar选项卡切换
		frame.tab_control(".sidebar_first_nav","active",".sidebar_second_nav");
		
		//菜单主按钮事件
		frame.menu_btn_click();
		frame.menu_second_click();
		
		//菜单虚线height
		frame.sidebar_second_dashed();
		
	},
	//sidebar二级a标签点击事件
	side_a_click : function() {
		$(".sidebar ul.sidebar_second_nav > li > ul li.second_nav_other a").unbind("click").click(function(){
			$(".sidebar ul.sidebar_second_nav > li > ul li.second_nav_other a").parent().removeClass("active");
			$(this).parent().addClass("active"); 
		});
		$(".sidebar ul.sidebar_second_nav > li > ul.second_nav_tenant li a").click(function(){
			$(".sidebar ul.sidebar_second_nav > li > ul.second_nav_tenant li a").parent().removeClass("active");
			$(this).parent().addClass("active"); 
		});
	},
	
	//设置sidebar高度
	set_sidebar_height:function(state){
//		if(state){
			//是页面刷新的时候,不用延迟,直接等于content
//			$("#sidebar").css("height",$(".content_body").height());
//		}else{
//			setTimeout(function(){
				var content_height = $(".content_body").height();
				var body_height = document.body.clientHeight-70;
				var fina_height = body_height;
				if(content_height>body_height){
					fina_height = content_height;
				}
				$("#sidebar").css("height",fina_height);
//			},200);
//		}
		
		
	},
	//tab选项卡
	tab_control:function(tabTit,on,tabCon){
		$(tabCon).each(function(){
			$(this).children().eq(0).show();
		});
		$(tabTit).each(function(){
			$(this).children().eq(0).addClass(on);
		});
		$(tabTit).children().click(function(){
			$(this).addClass(on).siblings().removeClass(on);
			var index = $(tabTit).children().index(this);
			$(tabCon).children().eq(index).show().siblings().hide();
		});
		$(tabCon).find(">li").css("display","none");
		$(tabCon).find(">li:first-child").css("display","list-item");
	},
	//菜单主按钮事件单事件
	menu_btn_click:function(){
		$(".sidebar .sidebar_first_nav_space .main_btn a").unbind("click").on("click",function(){
			var sidebar = $(".sidebar");
			var sidebar_width = sidebar.css("width");	 
			if(sidebar_width=="230px"){
				sidebar.animate({width:"50px"},500);
				$(".sidebar .sidebar_first_nav_space").animate({width:"50px"},500);
				$(".content_body").animate({marginLeft:"65px"},500);
			}else{
				sidebar.animate({width:"230px"},500);
				$(".sidebar .sidebar_first_nav_space").animate({width:"230px"},500);
				$(".content_body").animate({marginLeft:"245px"},500);
			}
		});	
	},
	//一级菜单单击事件
	menu_second_click:function(){
		$(".sidebar .sidebar_first_nav_space .sidebar_first_nav li").on("click",function(){
			$(".sidebar").animate({width:"230px"},500);
			$(".sidebar .sidebar_first_nav_space").animate({width:"50px"},500);
			$(".content_body").animate({marginLeft:"245px"},500); 
		}); 
		$(".sidebar .sidebar_first_nav_space .sidebar_first_nav li").mousedown(function(){
			$(".sidebar .sidebar_first_nav_space").css("overflow","hidden").css("z-index","1");
			$(".sidebar ul.sidebar_second_nav").css("z-index","0");
		});
	},
	//二级菜单虚线的长度设置
	sidebar_second_dashed:function(){
		var obj = $(".sidebar ul.sidebar_second_nav > li > ul");
		obj.each(function() {
            var $this = $(this);
			var num = 0;
			$this.find("li").each(function() {
                num ++ ;
            });
			var total = (num-1) * 38 - 15;
			$this.find("li.second_nav_one_li em").css("height",total);
			
        });
	},
	menu_first_hover:function(){
		$(".sidebar_first_nav li").hover(
			function(){
				var width_obj = $(".sidebar .sidebar_first_nav_space").css("width");
				var sidebar_width = $(".sidebar").css("width");
				if(width_obj=="50px"){ // && sidebar_width == "230px"
					var title = $(this).text();
					$("#sidebar").append("<span class='hover_title'>"+
							   "<em class='wish_arrow-left'></em>"+
							   title +
						  	   "</span>"
					);	 

					var index = $(this).index() + 1;
					$(".hover_title").css("top", index*49 +"px" );
				}
				
			},
			function(){ 
				$("#sidebar").find(".hover_title").remove();
			}
		);
	}
};

(function() {
	frame.init();
})();

