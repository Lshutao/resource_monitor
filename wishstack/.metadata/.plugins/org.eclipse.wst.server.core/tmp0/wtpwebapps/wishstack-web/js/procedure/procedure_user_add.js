/**
* 根据云服务商显示网络区域
*/
	var count = 0;  //加个计数器
	var regionArray = {
					"inner" : "通用性能区域", 
					"inner_high":"高性能区域",
					"external":"互联网区域"};
	var allRegionRow = $("<tr></tr>");
	var allRegionTd = $("<td></td>");
	var allRegionSelected = $("<select name='region'></select>");
	allRegionRow.append("<td><i>*</i>区域:</td>");
	var region_sourcesText = [];
	$("#provider").off('change').on('change',function(){ 
		var providerId = $("#provider option:selected").val();
		if(providerId != ""){
			if(count == 0){
				count = 1;
				allRegionRow.show();
				allRegionSelected.empty();
				$.ajax({
					type : "POST",
					dataType: "json",
					url : "/wishstack-web/quotas/getRegions/"+providerId,
					success : function(data){
						if(data.code == 'success'){
							data = data.data;
							for(var i=0;i<data.length;i++){
								region_sourcesText[i] = data[i].region;
							}
							for(var i=0;i<data.length;i++){
								allRegionSelected.append('<option value="'+region_sourcesText[i]+'">'+regionArray[region_sourcesText[i]]+'</option>');
							}
						}
					}
				});
				allRegionTd.append(allRegionSelected);
				allRegionRow.append(allRegionTd);
				allRegionRow.insertAfter("#providerRow");
			}
		}else{   //否则隐藏已经存在的
			allRegionRow.hide();
			count = 0;
		}
	});
	
	
	var role_id = $(".role_id").text();
	if(role_id == 7){
		$(".sidebar_first_nav li").removeClass("active");
		$(".sidebar_first_nav li#tenant_menu_first_manage").addClass("active");
		$(".sidebar_second_nav > li").css("display","none");
		$(".sidebar_second_nav > li:nth-child(7)").css("display","list-item");
		$(".sidebar_second_nav > li .second_nav_tenant li").removeClass("active");
		$(".sidebar_second_nav > li:nth-child(7) .second_nav_tenant li#tenant_menu_wordOrder").addClass("active");
	}
	