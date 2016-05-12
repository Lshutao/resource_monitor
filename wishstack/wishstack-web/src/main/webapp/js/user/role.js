/**
*  当选择基本角色时，显示基本角色可以拥有的权限
*/
var basicRoleRow = $('#basicRoleRow');
var powerTitleRow = $('#powerTitle');
var powerListRow = $('#powerList');

//是否创建系统角色
$("#systemRole").off('change').on('change',function(){ 	
	var systemRoleId = $("#systemRole option:selected").val();
	if(systemRoleId == 0 && systemRoleId != null && systemRoleId != ""){
		powerTitleRow.css("display","");
		powerListRow.css("display","");
		basicRoleRow.css("display","none");
		loadTree(contextPath+'/role/getResourceTreeNode'); 
	}
	else if(systemRoleId == 1 && systemRoleId != null && systemRoleId != ""){
		basicRoleRow.css("display","");
		powerTitleRow.css("display","none");
		powerListRow.css("display","none");
	}
	else{
		powerTitleRow.css("display","none");
		powerListRow.css("display","none");
		basicRoleRow.css("display","none");
	}
});

//创建自定义角色时，选择基本角色
$("#basicRole").off('change').on('change',function(){ 		
	var basicRoleId = $("#basicRole option:selected").val();
	if(basicRoleId != "" && basicRoleId != null){
		powerTitleRow.css("display","");
		powerListRow.css("display","");
		
		//根据角色id加载树结构
		$("#powerIds").tree({
			url:"/wishstack-web/role/getPowerIds/"+basicRoleId,
	        checkbox: true,
	        cascadeCheck: false,
	        onCheck: function (node, checked) {
	            if (checked) {
	                var parentNode = $("#powerIds").tree('getParent', node.target);
	                if (parentNode != null) {
	                    $("#powerIds").tree('check', parentNode.target);
	                }
	            } else {
	                var childNode = $("#powerIds").tree('getChildren', node.target);
	                if (childNode.length > 0) {
	                    for (var i = 0; i < childNode.length; i++) {
	                        $("#powerIds").tree('uncheck', childNode[i].target);
	                    }
	                }
	            }
	        },
			onLoadSuccess:function(){
				var flag = eval(editFlag);
				if(flag != 0 ){
					var obj = eval(powerIds);
					for(var i=0; i<obj.length; i++){
						var node = $("#powerIds").tree('find',obj[i]);
						$("#powerIds").tree('check',node.target);
					}
				}
			}
	    });
		
	}
	else{
		powerTitleRow.css("display","none");
		powerListRow.css("display","none");
	}
	
});


loadTree = function (url) {
	var obj = eval(powerIds);	
    $("#powerIds").tree({
    	url:url,  
        checkbox: true,
        cascadeCheck: false,
        onCheck: function (node, checked) {
            if (checked) {
                var parentNode = $("#powerIds").tree('getParent', node.target);
                if (parentNode != null) {
                    $("#powerIds").tree('check', parentNode.target);
                }
            } else {
                var childNode = $("#powerIds").tree('getChildren', node.target);
                if (childNode.length > 0) {
                    for (var i = 0; i < childNode.length; i++) {
                        $("#powerIds").tree('uncheck', childNode[i].target);
                    }
                }
            }
        },
		onLoadSuccess:function(){
			for(var i=0; i<obj.length; i++){
				var node = $("#powerIds").tree('find',obj[i]);
				$("#powerIds").tree('check',node.target);
			}
		}
    });
};

var basicRole = eval(basicRole);
var systemRole = eval(systemRole);
var url = null;
if( systemRole == 1 ){
	url = "/wishstack-web/role/getPowerIds/"+basicRole;
	loadTree(url);
}
else if( systemRole == 0){
	url = contextPath+'/role/getResourceTreeNode';
	loadTree(url); 
}