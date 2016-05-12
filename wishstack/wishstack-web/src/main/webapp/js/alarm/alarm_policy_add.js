/*
根据区域显示虚拟机选项
*/
var allInstanceRow = $("<li></li>");
var allInstanceDiv = $("<div class='option' id='instance'>"+"</div>");
var allInstanceUl = $("<ul class='alarm_obj'>"+"</ul>");
allInstanceRow.append("<label>云主机：</label>");
var instance_sourcesIds = [];  
var instance_sourcesNames = [];
$("#region").off('change').on('change',function(){ 
	var region = $("#region option:selected").val();
	if(region != ""){
		allInstanceRow.show();
		allInstanceUl.empty();
		allInstanceUl.append("<li>"+"<input type='checkbox' name='par_check'  />"+"<span> 全选 </span>"+"</li>");
		$.ajax({
			type : "POST",
			dataType: "json",
			url : "/wishstack-web/instance/getInstances/"+region,
			success : function(data){
				if(data.code == 'success'){
					data = data.data;
					for(var i=0;i<data.length;i++){
						instance_sourcesIds[i] = data[i].id;
						instance_sourcesNames[i] = data[i].instanceName;
					}
					for(var i=0;i<data.length;i++){
						allInstanceUl.append('<li>'+ '<input type="checkbox" name="'+instance_sourcesIds[i]+'" class="instance_flag"/>'						
						+ '<span>'+ instance_sourcesNames[i]+ '</span>' + '</li>');						
					}					
				}
			}
		});
		allInstanceDiv.append(allInstanceUl);
		allInstanceRow.append(allInstanceDiv);
		allInstanceRow.insertAfter("#regionRow");
	}
	else{
		allInstanceRow.hide();
	}
});