/**
*  当用户角色为租户管理员或者普通用户时，显示绑定租户下拉框
*/
	var flag1 = true;   
	var flag2 = true;
	var userRoleRow = $('#userRoleRow');
	var allTenantRow = $("<tr></tr>");
	$("#userRole").off('change').on('change',function(){ 
		var userRole = $("#userRole option:selected").val();
		if(userRole == 7 || userRole == 8){   //选择租户
			if(flag1){ 
				flag1 = false;
				flag2 = true;
				allTenantRow.empty();
				allTenantRow.show();
				var tenant_sourcesIds = [];  
				var tenant_sourcesText = [];
				var allTenantTd = $("<td></td>");
				var allTenantSelected = $("<select name='tenantId'></select>");
				allTenantRow.append("<td><i>*</i>选择租户:</td>");
				$.ajax({
					type : "POST",
					dataType: "json",
					url : "/wishstack-web/tenant/getAllTenant",
					success : function(data){
						if(data.code == 'success'){
							data = data.data;
							for(var i=0;i<data.length;i++){
								tenant_sourcesIds[i] = data[i].id;
								tenant_sourcesText[i] = data[i].name;
							}
							for(var i=0;i<data.length;i++){
								allTenantSelected.append('<option value="'+tenant_sourcesIds[i]+'">'+tenant_sourcesText[i]+'</option>');
							}
						}
					}
				});
				allTenantTd.append(allTenantSelected);
				allTenantRow.append(allTenantTd);
				allTenantRow.insertAfter("#userRoleRow");
			}
		}else if(userRole == 4 || userRole == 5 || userRole == 6){   //选择云服务商
			if(flag2){
				flag2 = false;
				flag1 = true;
				allTenantRow.empty();
				allTenantRow.show();
				var provider_sourcesIds = [];  
				var provider_sourcesText = [];
				var allProviderTd = $("<td></td>");
				var allProviderSelected = $("<select name='providerId'></select>");
				allTenantRow.append("<td><i>*</i>选择云服务商:</td>");
				$.ajax({
					type : "POST",
					dataType: "json",
					url : "/wishstack-web/provider/getAllProviders",
					success : function(data){
						if(data.code == 'success'){
							data = data.data;
							for(var i=0;i<data.length;i++){
								provider_sourcesIds[i] = data[i].id;
								provider_sourcesText[i] = data[i].name;
							}
							for(var i=0;i<data.length;i++){
								allProviderSelected.append('<option value="'+provider_sourcesIds[i]+'">'+provider_sourcesText[i]+'</option>');
							}
						}
					}
				});
				allProviderTd.append(allProviderSelected);
				allTenantRow.append(allProviderTd);
				allTenantRow.insertAfter("#userRoleRow");
			}
		}else{
			allTenantRow.hide();
			flag1 = true; 
			flag2 = true;
		}
		
	});
	