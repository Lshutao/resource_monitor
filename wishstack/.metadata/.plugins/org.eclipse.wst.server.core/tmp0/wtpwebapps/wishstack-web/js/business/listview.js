/**
 * 业务拓扑js文件
 */
var listview = {
	/**
	 * 初始化方法
	 */
	init : function(){
		var id = $("#tenatId").attr("id");
		listview.get_data(1); //获取数据，并且生成业务列表和虚拟机列表
	},
	
	/**
	 * 获取数据
	 */
	get_data:function(id){
		
		$.ajax({
			  type: 'get',
			  url: contextPath+'/business/topological/'+id,
			  success: function(data){
				  	listview.create_business_sys(id,data);//生成业务系统列表
					
					listview.business_sys_width(); //计算业务系统标题的高度
					listview.vm_width_height(); //计算虚拟机列表的宽度和高度
				},
			  dataType: 'json'
			});
	},
	
	/**
	 * 生成 业务系统,虚拟机
	 */
	create_business_sys:function(id,data){
		var data_list = [data];
		$.each(data_list, function(k, v){
			if(v.id==id){
				//生成业务系统列表
				var sys_list = ""; //业务系统列表
				var h3c_vm_external_list = ""; // 华三互联网列表
				var h3c_vm_inner_list = ""; // 华三政务外网列表
				var tengxun_vm_external_list = ""; // 腾讯互联网列表
				var tengxun_vm_inner_list = ""; // 腾讯政务外网列表
				for(var i in v.businesses){
					sys_list = sys_list + "<li id='"+v.businesses[i].primaryId+"'>" +
												"<label>"+v.businesses[i].name+"</label>"+
												"<img src='"+contextPath+"/business/icon/"+v.businesses[i].primaryId+"' />"+
												"<ul class='sys_state_btn'>"+
													"<li></li>"+
													"<li></li>"+
													"<li></li>"+
												"</ul>"+
										   "</li>";
					
					
					//生成虚拟机列表
					for(var j in v.businesses[i].instances){
						var vm_o = v.businesses[i].instances[j];
						vm_o.status = "ACTIVE"
						if(vm_o.providerId == 2 ){ //2 腾讯
							if(vm_o.region == "external"){
								tengxun_vm_external_list = tengxun_vm_external_list +
															"<li id='"+vm_o.id+"'>" +
																"<img title="+vm_o.instanceName+" src='/wishstack-web/img/vm_img_"+vm_o.status+".jpg' />" +
															"</li>"
							}else if(vm_o.region == "inner"){
								tengxun_vm_inner_list = tengxun_vm_inner_list +
														"<li id='"+vm_o.id+"'>" +
															"<img title="+vm_o.instanceName+" src='/wishstack-web/img/vm_img_"+vm_o.status+".jpg' />" +
										 				"</li>"
							}
						}else if(vm_o.providerId == 1 ){  //1 华三
							if(vm_o.region == "external"){
								h3c_vm_external_list = h3c_vm_external_list +
															"<li id='"+vm_o.id+"'>" +
																"<img title="+vm_o.instanceName+" src='/wishstack-web/img/vm_img_"+vm_o.status+".jpg' />" +
															"</li>"
							}else if(vm_o.region == "inner"){
								h3c_vm_inner_list = h3c_vm_inner_list +
														"<li id='"+vm_o.id+"'>" +
															"<img title="+vm_o.instanceName+" src='/wishstack-web/img/vm_img_"+vm_o.status+".jpg' />" +
														"</li>"
							}
						}
					}
				}
				if(sys_list==""){
					$(".sys_list").html("无业务");//将业务系统添加到列表中
				}else{
					$(".sys_list").html(sys_list);//将业务系统添加到列表中
				}
				
				
				if(h3c_vm_external_list==""){
					$("ul.h3c_vm_external").html("<li style='width:100px;'>无虚拟机</li>");
				}else{
					$("ul.h3c_vm_external").html(h3c_vm_external_list);
				}
				
				if(h3c_vm_inner_list==""){
					$("ul.h3c_vm_inner").html("<li style='width:100px;'>无虚拟机</li>");
				}else{
					$("ul.h3c_vm_inner").html(h3c_vm_external_list);
				}
				
				if(tengxun_vm_external_list==""){
					$("ul.tengxun_vm_external").html("<li style='width:100px;'>无虚拟机</li>");
				}else{
					$("ul.tengxun_vm_external").html(h3c_vm_external_list);
				}
				
				if(tengxun_vm_inner_list==""){
					$("ul.tengxun_vm_inner").html("<li style='width:100px;'>无虚拟机</li>");
				}else{
					$("ul.tengxun_vm_inner").html(h3c_vm_external_list);
				}
				
			}
		});
		
	},
	
	/**
	 * 计算业务系统列表每项的宽度
	 */
	business_sys_width:function(){
		var bus_div_height = $(".business_sys > div").css("height");
		var title_height = ( parseInt(bus_div_height)-73 )/2;
		$(".business_sys > h2").css("padding-top",title_height+"px");
		$(".business_sys > h2").css("padding-bottom",title_height+"px");
	},
	
	/**
	 * 计算虚拟机列表的宽度和高度
	 */
	vm_width_height:function(){
		
		//遍历区域网络的vm，如果没有vm，则删除当前网络区域
		$(".virtual_machine .vm_area").each(function(){
			var num = 0;
			$(this).find("li").each(function(){
				num++;
			});
			if(num==0){
//				$(this).remove();
			}
		});
		
		//计算网络区域的宽度
		$(".virtual_machine > div > ul").each(function(){
			var num = $(this).find(".vm_area").length;
			if(num==1){
				$(this).find(".vm_area").css("width","90%");
			}else if(num==2){
				$(this).find(".vm_area").css("width","43%");
			}
		});
		
		//使每个网络区域的高度相等
		var height_arr = [];
		$(".virtual_machine > div > ul > li .vm_area").each(function(){
			height_arr.push( parseInt( $(this).css("height") ) );
		});
		var max_height = height_arr[0];
		for(var i=1; i<height_arr.length; i++){
			if(max_height<height_arr[i]){
				max_height = height_arr[i];
			}
		}
		$(".virtual_machine > div > ul > li .vm_area").css("height",max_height+"px");
		
		//使腾讯和华三的虚拟机框的高度相等
		var tengxun_height = $(".virtual_machine .vm_tengxun").css("height");
		var h3c_height = $(".virtual_machine .vm_h3c").css("height");
		var t_num = parseInt(tengxun_height);	
		var h_num = parseInt(h3c_height);
		if( t_num < h_num ){
			$(".virtual_machine .vm_tengxun").css("height",h3c_height);
		}else if( t_num > h_num ){
			$(".virtual_machine .vm_h3c").css("height",tengxun_height);
		}
		
		//计算虚拟机标题的高度
		var vm_div_height = $(".virtual_machine > div").css("height");
		var title_height = ( parseInt(vm_div_height)-54 )/2;
		$(".virtual_machine > h2").css("padding-top",title_height+"px");
		$(".virtual_machine > h2").css("padding-bottom",title_height+"px");
	}
	
}

$(function(){
	listview.init();
}); 


	
	

	
