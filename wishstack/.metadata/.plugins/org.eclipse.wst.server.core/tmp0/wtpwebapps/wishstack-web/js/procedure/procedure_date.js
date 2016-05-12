
(function() {
var start = {
	    elem: '#startTime',
	    format: 'YYYY/MM/DD hh:mm:ss',
	    max: laydate.now(), //最大日期
	    istime: true,
	    istoday: false,
	    choose: function(datas){
	         end.min = datas; //开始日选好后，重置结束日的最小日期
	         end.start = datas; //将结束日的初始值设定为开始日
	    }
	};
	var end = {
	    elem: '#endTime',
	    format: 'YYYY/MM/DD hh:mm:ss',
	    max: laydate.now(),
	    istime: true,
	    istoday: false,
	    choose: function(datas){
	        start.max = datas; //结束日选好后，重置开始日的最大日期
	    }
	};
	laydate(start);
	laydate(end);
	
	
	var role_id = $(".role_id").text();
	if(role_id == 7){
		$(".sidebar_first_nav li").removeClass("active");
		$(".sidebar_first_nav li#tenant_menu_first_manage").addClass("active");
		$(".sidebar_second_nav > li").css("display","none");
		$(".sidebar_second_nav > li:nth-child(7)").css("display","list-item");
		$(".sidebar_second_nav > li .second_nav_tenant li").removeClass("active");
		$(".sidebar_second_nav > li:nth-child(7) .second_nav_tenant li#tenant_menu_wordOrder").addClass("active");
	}
})();