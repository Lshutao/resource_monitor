/**
* 根据云服务商显示运维人员和网络区域
*/
	var flag = true;  //加个计数器
	var flag2 = true;
	var allHandlerRow = $("<tr id='handlerRow'></tr>");	
	var allRegionRow = $("<tr></tr>");
	var regionArray = {
			"inner" : "通用性能区域", 
			"inner_high":"高性能区域",
			"external":"互联网区域"};
	$("#provider").off('change').on('change',function(){ 
		var providerId = $("#provider option:selected").val();		
		if(providerId == 1){ //服务商1
			if(flag){
				flag = false;
				flag2 = true;
				providerChanged(providerId);
			}
		}
		else if(providerId == 2){ //服务商2
			if(flag2){
				flag = true;
				flag2 = false;
				providerChanged(providerId);
			}
		}
		else{   //否则隐藏已经存在的
			allHandlerRow.hide();
			allRegionRow.hide();
			flag = true;
			flag2 = true;
		}		
	});
	
	var providerChanged = function(providerId){
		var userType = $("#userType").val();
		allHandlerRow.empty();
		allHandlerRow.show();				
		var handler_sourcesText = [];
		var handlerArray = [];
		var allHandlerSelected = $("<select name='handlerId'></select>");
		var allHandlerTd = $("<td></td>");
		allHandlerRow.append("<td><i>*</i>工单处理人:</td>");
		
		$.ajax({
			type : "POST",
			dataType: "json",
			url : "/wishstack-web/procedure/getHandlers/"+providerId,
			success : function(data){
				if(data.code == 'success'){
					data = data.data;
					for(var i=0;i<data.length;i++){
						handler_sourcesText[i] = data[i].handlerId;
						handlerArray[i] = data[i].handler;
					}
					for(var i=0;i<data.length;i++){
						allHandlerSelected.append('<option value="'+handler_sourcesText[i]+'">'+handlerArray[i]+'</option>');
					}
				}
			}
		});
		allHandlerTd.append(allHandlerSelected);
		allHandlerRow.append(allHandlerTd);
		allHandlerRow.insertAfter("#providerRow");
		
		if(userType == 7){ 
			allRegionRow.empty();
			allRegionRow.show();
			var allRegionTd = $("<td></td>");
			var allRegionSelected = $("<select name='region'></select>");
			allRegionRow.append("<td><i>*</i>区域:</td>");
			var region_sourcesText = [];
			
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
	};
	
	var role_id = $(".role_id").text();
	if(role_id == 7){
		$(".sidebar_first_nav li").removeClass("active");
		$(".sidebar_first_nav li#tenant_menu_first_manage").addClass("active");
		$(".sidebar_second_nav > li").css("display","none");
		$(".sidebar_second_nav > li:nth-child(7)").css("display","list-item");
		$(".sidebar_second_nav > li .second_nav_tenant li").removeClass("active");
		$(".sidebar_second_nav > li:nth-child(7) .second_nav_tenant li#tenant_menu_wordOrder").addClass("active");
	}