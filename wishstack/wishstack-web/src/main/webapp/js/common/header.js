/**
 * header
 */
var header = {
	
	init:function(){
		header.init_header_drop_down();
	},
	
	init_header_drop_down : function(){
		$(".login_nav > li").hover(
			function(){
				$(this).find(">ul").css("display","block");
			},
			function(){
				
				$(this).find(">ul").css("display","none");
			}
		);
	}
}

header.init();

function frame_tenant_header_access(id, region){
	//console.log("region:"+region);
	$.ajax({   //动态获取云服务上跳转url
		type : "POST",
		dataType: "json",
		async : false,
		url : "/wishstack-web/access/url/" + id+"/"+region,
		success : function(data){
			if(data.result){
				window.open(data.result);
			}
		}
	});
}