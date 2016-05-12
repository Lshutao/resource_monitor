/**
 * 业务资源管理js文件
 */
var business = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//单个业务页面初始化 start
		business.choose_vm_click();
		business.right_panel("a.empty_add_vm",".choose_vm","a.right_close","a.cancel_btn",false);
		
		business.business_single_state($("#business_id").attr("value"), $("#business_state").attr("value") ); //页面加载的时候判断业务的状态
		business.business_single_click(); //单击业务的时候判断业务的状态
		
		public_obj.checkbox_all("","",false);
		//单个业务页面初始化 end		
		
		business.right_panel("a.topu_set_resource",".business_set_details","a.right_close",null,true);
		//business.right_panel("a.create_business_topu_set",".create_business_set","a.right_close","a.cancel_btn",false);
		$("a.create_business_topu_set").attr("onclick","XUI.gotoPage('/business/add')");
		$("#addUrl").attr("onclick","business.add_url();");
		$("#isWebsite").attr("onclick","business.show_url_div();");
		$("#urls_outer_div").hide();
		$("#url_div").hide();
		business.delete_business();
		business.choose_icon();
		business.topuset_set_add();
		public_obj.init_search_type();
		business.ins_serach_click();
	},
	
	/**
	 * 添加url文本框
	 */
	add_url :function(){
		$("#urls_div").append('<li><input type="text" name="urls"/><a class="wish_delete del_url"></a></li>');
		businessAdd.delete_url();
	},
	
	/**
	 * 
	 */
	show_url_div :function(){
		$("#business_add_form tr.add_url").toggle();
		if($("#business_add_form tr.add_url").css("display")=="none"){
			$("#urls_div").html("<li><input type='text' name='urls'><a class='wish_delete del_url'></a></li>");
		}
		businessAdd.delete_url();
	},

	/**
	 * 获取业务信息
	 */
	get_business : function(businessId){
		$.ajax({
			type: "POST",
			url: contextPath + "/business/view",
			dataType : "json",
			data : {
					"id" : businessId
					},
			success: function(data){
				$("#business_name").text(data.name);
				$("#business_businessType").text(data.businessType);
				var region;
				if(data.region == "inner")
					region = "通用性能区域";
				else if(data.region == "inner_high")
					region = "高性能区域";
				else
					region = "互联网区域"
				$("#business_region").text(region);
				$("#business_description").text(data.description);
				$("#business_instanceNum").text(data.instanceNum+'台');
				$("#business_floatingIpNum").text(data.floatingIpNum+'个');
				$("#business_routerNum").text(data.routerNum+'个');
				$("#business_firewallNum").text(data.firewallNum+'个');
				$("#business_networkNum").text(data.networkNum+'个');
				$("#business_loadbalancerNum").text(data.loadbalancerNum+'个');
				$("#btn_id").attr("onclick","XUI.gotoPage('/business/edit/?businessId="+data.id+"')");
				$("#more_id").attr("onclick","XUI.gotoPage('/business/detail/?businessId="+data.id+"')");
			}
		});
	},
	
	/**
	 * 获取业务信息
	 */
	get_business_topology : function(businessId){
		$.ajax({
			type: "POST",
			url: contextPath + "/business/view",
			dataType : "json",
			data : {
					"id" : businessId
					},
			success: function(data){
				var instanceNum = data.instanceNum;
				var volumeNum = data.volumeNum;
				var floatingIpNum = data.floatingIpNum;
				var firewallNum = data.firewallNum;
				var routerNum = data.routerNum;
				var loadbalancerNum = data.loadbalancerNum;
				var resource = [['虚拟机','台',instanceNum],['磁盘','个',volumeNum],
				                ['外网IP','个',floatingIpNum],['防火墙','个',firewallNum],
				                ['路由器','个',routerNum],['负载均衡','个',loadbalancerNum]];
				  //创建一个业务资源占用情况列表
				  business.create_business_resource_usage(resource);
				  $("#resource_more_id").attr("onclick","XUI.gotoPage('/business/detail/?businessId="+data.id+"')");
			}
		});
	},
	
	/***
	 * 获取业务可选择的虚拟机
	 */
	get_instances : function(businessId,networkId,keyword){
		$.ajax({
			type: "POST",
			url: contextPath + "/business/instanceList",
			dataType : "json",
			data : {
					"businessId" : businessId,
					"networkId" : networkId,
					"keyword" : keyword
					},
			success: function(data){
				var tr_arr = "";
				for(var n in data){
					tr_arr = tr_arr + "<tr>"+
											"<td class='multi_select_column'>"+
												"<input type='checkbox' name='instanceId' />"+
											"</td>"+
											"<td id='' class='date_id' style='display:none;'>"+data[n].id+"</td>"+
											"<td>"+data[n].instanceName+"</td>"+
								//			"<td>"+data[n].osType+"</td>"+
											"<td>"+data[n].memoryMb+"GB/"+data[n].vcpus+"vcpu核/"+data[n].disk+"GB</td>"+
									  "</tr>"
				  }
				
				//赋值 虚拟机table 循环
				var instances = data;
				$(".choose_vm_table_space tbody").html("");
				$(".choose_vm_table_space tbody").append(tr_arr);
				
				
			}
		});
	},
	
	/**
	 * 点击虚拟机图标，查看虚拟机信息
	 */
	get_instance : function(instanceId){
		$.ajax({
			type: "POST",
			url: contextPath + "/business/instanceOne",
			dataType : "json",
			data : {
					"instanceId" : instanceId
					},
			success: function(data){
				$("#instance_name span").text(data.instanceName);
				if(data.status == "ACTIVE" )
					$("#instance_status").text("在线");
				instance_uuid
				$("#instance_uuid").text(data.uuid);
				$("#instance_flavor").text(data.memoryMb+"MB/"+data.vcpus+"G/"+data.disk+"GB");
				$("#instance_ip").text(data.ip);
				$("#instance_providerName").text(data.providerName);
				$("#instance_name .cloud_host_alarm span").text("当前未处理告警"+ data.alarmNum +"条");
				if(data.alarmNum > 0){
					$(".cloud_host_details a.cloud_host_alarm").css("display","inline-block");
				}
				$("#ins_more").attr("onclick","XUI.gotoPage('/instance/detail/"+data.id+"')");
				var business_id = $(".tuopu_single_net_list li.active a").attr("id");
				$("#bus_ins_del").attr("onclick","XUI.ajax.action('解绑','确定解绑吗？','/business/deleteBusinessInstance/?instanceId="+data.id+"&businessId="+business_id+"', 'delete','/business/edit/?businessId="+business_id+"',2)");
			}
		});
	},
	
	/**
	 * 选择虚拟机点击事件
	 */
	choose_vm_click:function(){
		$(".empty_add_vm").click(function(){
			business.choose_vm_content();
		});
	},
	
	choose_vm_content:function(){
		var businessId = $(".tuopu_single_net_list li.active a").attr("id");
		var networkId = "";
		business.get_instances(businessId,networkId,null);
	},
	
	/**
	 * 有网络-添加虚拟机
	 */
	add_vm_click2:function(){
		$(".vm_empty a").click(function(){
			var businessId= $(".tuopu_single_net_list li.active a").attr("id");
			var networkId = $(this).parents(".topu_single_resource").find(".topu_single_now_net b").text();
			$('#ins_serach_netid').val(networkId);
			business.get_instances(businessId,networkId,null);
		});
	},
	
	 /**
	   * 选择虚拟机 提交事件
	   */
	  choose_vm_submit:function(){
		  $('#submit_btn').click(function(){
			  
			  var id_arr =[];
			  var businessId = $(".tuopu_single_net_list li.active a").attr("id");
			  $(".choose_vm_table_space tbody tr").each(function(){
				 var is_checked = $(this).find("input[type=checkbox]").prop("checked");
				 if(is_checked){
					  id_arr.push($(this).find(".date_id").text())
				  }
			  });
			  
			  if(id_arr.length > 0){ 
				  $("#choose_vm_prompt").css("display","none");
				  XUI.gotoPage('/business/businessInstanceAdd/?businessId='+businessId+'&instanceId='+id_arr);
			  }else{
				  $("#choose_vm_prompt").css("display","block");
			  }
		  });
	  },
	  
	  /**
		 * 点击虚拟机图标，查看虚拟机信息事件
		 */
	  ins_view_click:function(){
		  $('#').click(function(){
			//  var instanceId = 
		  });
	  },
	  
	  /**
	   * 点击搜索虚拟机事件
	   */
	  ins_serach_click:function(){
		  $('#ins_serach').click(function(){
			  var businessId= $(".tuopu_single_net_list li.active a").attr("id");
			  var networkId = $('#ins_serach_netid').val();
			  var ins_name = $('#keyword').val();
			  business.get_instances(businessId,networkId,ins_name);
		  });
	  },
	
	/**
	 * 右侧面板操作
	 * click_obj 滑出右侧菜单需要点击的按钮
	 * panel_obj 需滑出的右侧菜单
	 * close_btn 右侧菜单标题栏的关闭按钮
	 * cancel_btn 右侧菜单footer的取消按钮
	 * is_hover 是否采用鼠标hover方式滑出右侧面板
	 */
	right_panel:function(click_obj,panel_obj,close_btn,cancel_btn,is_hover){
		if(is_hover){
			var timer = null;
			$(click_obj).unbind("hover").hover(
				function(){
					var businessId = $(this).attr("id");
					business.get_business(businessId);
					clearTimeout(timer);
					$(panel_obj).animate({width:"410px"},500);
					$(panel_obj).siblings(".right_panel_frame").animate({width:"0"},500);
				},
				function(){
					timer = setTimeout(function(){
						$(panel_obj).animate({width:"0"},500);
					},1000);
				}
			);
			$(panel_obj).unbind("hover").hover(
					function(){
						clearTimeout(timer);
					},
					function(){
						timer = setTimeout(function(){
							$(panel_obj).animate({width:"0"},500);
						},1000);
					}
				);
		}else{
			$(click_obj).click(function(){
				if($(this).hasClass("vm") && $(this).parent().hasClass("vm_list")){
					var vm_id = $(this).next().next().text();
					business.get_instance(vm_id);
				}
				$(panel_obj).animate({width:"410px"},500);
				$(panel_obj).siblings(".right_panel_frame").animate({width:"0"},500);
				
			});
		}
		
		$(close_btn).click(function(){
			$(panel_obj).animate({width:"0"},500);
		});
		
		if(cancel_btn != null && cancel_btn != ""){
			$(cancel_btn).click(function(){
				$(panel_obj).animate({width:"0"},500);
			});
		}
	  },
	  
	  /**
	   * 单个业务拓扑, 业务切换事件
	   */
	  business_single_click:function(){
		  //单击事件
		  $(".business_single_topu ul.tuopu_single_net_list li").unbind("click").click(function(){
			  if($(this).hasClass("tuopu_single_resource")){
				  return false;
			  }
			  $(this).addClass("active");
			  $(this).siblings().removeClass("active");
			  var businessId = $(this).find("a").attr("id");
			  var businessState = $(this).find("#state").attr("value");
			  business.business_single_state(businessId,businessState);
//			  business.business_single_state(state)
			  $(".right_panel_frame").css("width","0");
		  });
	  },
	  
	  /**
	   * 单个业务拓扑, 业务状态判断 页面加载时，判断当前选中哪个业务
	   */
	  business_single_state:function(businessId,state){
		  
		  if(state == '0'){
			  $(".business_single_topu_empty").css("display","block");
			  $(".topu_single_map").css("display","none");
			  $(".tuopu_single_resource").css("display","none");
		  }else if(state == '1'){
			  $(".business_single_topu_empty").css("display","none");
			  $(".topu_single_map").css("display","block");
			  $(".tuopu_single_resource").css("display","block");
			  //创建一个拓扑图
			  business.get_topology(businessId);
			  
		  }
	  },
	  
	  /**
		 * 获取拓扑信息
		 */
		get_topology : function(businessId){
			$.ajax({
				type: "POST",
				url: contextPath + "/business/topologyView",
				dataType : "json",
				data : {
						"id" : businessId
						},
				success: function(data){
					var fn = data['firewallName'];
					var rn = data.routerName;
					var rip = data.ipAddr;
					var networkInstances = data['networkInstances'];
					
					//创建一个业务拓扑图
					business.create_topo_map(fn,rip,rn,networkInstances);

					business.add_vm_click2();
				}
			});
		},
		
	  /**
	   * 单个业务 拓扑图创建
	   * firewal_name 防火墙
	   * route_ip 路由ip
	   * route_name 路由名
	   * networkInstances 子网及子网下的虚拟机集合
	   */
	  create_topo_map:function(firewal_name,route_ip,route_name,networkInstances){
		  var businessId = $(".tuopu_single_net_list li.active a").attr("id");
		  var net = ""; //子网的集合
		  for(var n in networkInstances){
			  var vm = ""; //每个子网的虚拟机的集合
			  for ( var v in networkInstances[n].instances ){
				  var healthStatus;
				  if(networkInstances[n].instances[v].healthStatus== null){
					 healthStatus="vm_right" ;
				  }else if(networkInstances[n].instances[v].healthStatus=='1'){
					 healthStatus="vm_right" ;
	  			  }else if(networkInstances[n].instances[v].healthStatus=='0'){
	  				 healthStatus="vm_alarm";
	  			  }else{
	  				 healthStatus="vm_wrong";
	  			  }
				  vm = vm + "<li class='vm_list "+ healthStatus +"'>"+  //vm_wrong   vm_alarm
								"<hr>"+
								"<a class='vm' title='"+networkInstances[n].instances[v].instanceName+"'>"+
									"<span title='"+networkInstances[n].instances[v].instanceName+"'>"+
										networkInstances[n].instances[v].instanceName +
									"</span>"+
								"</a>"+
								"<a class='delete_net'></a>"+
								"<span style='display:none'>"+networkInstances[n].instances[v].instanceId+"</span>"+
							"</li>"
			  }
			  // 子网的cidr
			  var subnet_cidr = '';
			  for ( var s in networkInstances[n].subnetAdr ){
					subnet_cidr = subnet_cidr + "<span>"+networkInstances[n].subnetAdr[s]+"</span>";
				}
			  
			  net  = net +  "<li class='topu_single_resource'>" +
			  					"<a class='delete_net' onclick='XUI.ajax.action('解绑','确定解绑吗？','/business/deleteNetworkInstance/?networkId="+ networkInstances[n].networkId +"&businessId="+businessId+"', 'delete','/business',2)'></a>"+
					  			"<div class='topu_single_now_net'>"+
									"<span title='"+ networkInstances[n].networkName +"'>"+ networkInstances[n].networkName +"</span>"+
									"<b style='display:none;'>"+ networkInstances[n].networkId +"</b>"+
								"</div>"+
								"<div class='vm_space'>"+
								"<ul class='topu_single_vm_list'>"+
									vm+
									"<li class='add_vm vm_empty'>"+
										"<a class='vm'>"+
											"<label>"+
												"<i class='wish_arrow-left'></i>"+
												"添加虚拟机"+
											"</label>"+
										"</a>"+
									"</li>"+
								"</ul>"+
								"</div>"+
								"<p>"+
									subnet_cidr
								"</p>"+
							"</li>"
			  
		  }
		  
		  $(".topu_single_map").html("");
		  $(".topu_single_map").append(
				 "<div class='topu_single_title'>"+
					"<span class='net'>Internet</span>"+
					"<span class='firewall' title='"+firewal_name+"'>"+firewal_name+"</span>"+
					"<span class='ip' title='"+route_ip+"'>"+route_ip+"</span>"+
					"<span class='name' title='"+route_name+"'>"+route_name+"</span>"+
				"</div>"+
				"<ul class='topu_single_map_list'>"+
					
				"</ul>"
		  );
		   
		  $(".topu_single_map_list").append(net);
		  $(".topu_single_map_list").append("<li class='topu_single_add'>"+
												"<div class='topu_single_add_net'>"+
												"</div>"+
											"</li> "+
											"<li></li>"
		  );
		   
		  business.right_panel("li.vm_list a",".cloud_host_details","a.right_close",null,false);
		  business.right_panel("li.add_vm a",".choose_vm","a.right_close","a.cancel_btn",false);


		  business.right_panel(".topu_single_add_net",".choose_vm","a.right_close","a.cancel_btn",false);
		  
		  business.get_business_topology(businessId);
		  //加载删除网络，删除虚拟机事件
		  business.delete_network();
		  business.delete_vm();

		  $(".topu_single_add_net").click(function(){
			  business.choose_vm_content();
		  });
		  
		  //设置ul的宽度(虚拟机多了加滚动条)
		  $(".topu_single_map_list li").each(function(){
			  var num = 0;
			  $(this).find(".topu_single_vm_list li").each(function(){
				  num++;
			  });
			  var total_num = num * 85  + 120;
			  $(this).find(".topu_single_vm_list").css("width", total_num+"px");
		  });
		  
	  },
	  
	  /**
	   * 单个业务 业务资源占用情况创建
	   * resource_list 业务占用资源列表
	   */
	  create_business_resource_usage:function(resource_list){
		  var re_list = "";
		  for(var n in resource_list){
			  re_list = re_list + "<li>"+resource_list[n][0]+"("+resource_list[n][1]+"): "+resource_list[n][2]+" </li>";
		  }
		  
		  $(".topu_single_map_list").after(
				  "<div class='tuopu_single_resource_list'>"+
					"<h2>"+
						"业务资源占用情况"+
						"<a id='resource_more_id' class='resource_more'>更多</a>"+
					"</h2>"+
					"<ul>"+
						re_list+
					"</ul>"+
				"</div>"
		  );
	  },
	  
	  /**
	   * 删除网络事件
	   */
	  delete_network:function(){
		  $(".topu_single_resource a.delete_net").unbind("click").click(function(){
			  var net_id = $(this).next().find("b").text();
			  var business_id = $(".tuopu_single_net_list li.active a").attr("id");
			  XUI.ajax.action('解绑','确定解绑吗？','/business/deleteNetworkInstance/?networkId='
					  +net_id+'&businessId='+business_id, 'delete','/business/edit/?businessId='+business_id,2);
		  });
	  },
	  
	  /**
	   * 删除虚拟机事件
	   */
	  delete_vm:function(){
		  $(".topu_single_vm_list li a.delete_net").unbind("click").click(function(){
			  var vm_id = $(this).next().text();
			  var business_id = $(".tuopu_single_net_list li.active a").attr("id");
			  XUI.ajax.action('解绑','确定解绑吗？','/business/deleteBusinessInstance/?instanceId='
					  +vm_id+'&businessId='+business_id, 'delete','/business/edit/?businessId='+business_id,2);
		  });
	  },
	  
	  /**
	   * 删除业务拓扑集事件
	   */
	  delete_business:function(){
		  $(".topu_set_map_list li button.delete_bus").unbind("click").click(function(){
			  var business_id = $(this).next().text();
		  });
	  },
	  
	  /**
	   * 选择本地图标
	   */
	  choose_icon:function(){
		  $("input.choose_icon_btn").change(function(){
			  var url = $(this).val();
//			  console.log("本地图标url： "+url);
			  
			  business.loadImageFile();
		  });
	  },
	  
	  /**
	   * 页面加载时，当只有新建的时候，设置按钮样式
	   */
	  topuset_set_add:function(){
		  var num = 0;
		  $(".topu_set_map_list li").each(function(){
			  num ++ ;
		  });
		  if(num == 1){
			  $(".business_set_topu .topu_set_map .topu_set_map_list").css("border-left","0").css("position","relative").css("top","159px");
			  $(".business_set_topu .topu_set_map .topu_set_map_list li a").css("left","41px");
			  $(".business_set_topu .topu_set_map .topu_set_map_list li hr").css("width","35px");
		  }
	  },
	  
	  /**
	   * 将本地图片显示到页面
	   */
	  loadImageFile : function () {   
			if (window.FileReader) {   
				var oPreviewImg = null, oFReader = new window.FileReader(),   
				rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;   
				oFReader.onload = function (oFREvent) {   
					if (!oPreviewImg) {   
						var newPreview = document.getElementById("choose_icon_div");   
						oPreviewImg = new Image();   
						newPreview.appendChild(oPreviewImg);   
					}   
					oPreviewImg.src = oFREvent.target.result;   
				};   
			  
			  
				return function () {   
					var aFiles = document.getElementById("choose_icon_btn").files;   
					if (aFiles.length === 0) { return; }   
					if (!rFilter.test(aFiles[0].type)) { 
						alert("你选择的文件不是图片类型!"); 
						return; 
					}   
					oFReader.readAsDataURL(aFiles[0]);   
				}  
			}   
			
			if (navigator.appName === "Microsoft Internet Explorer") {  
				return function () {   
					alert(document.getElementById("choose_icon_btn").value);   
					document.getElementById("choose_icon_div").filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = document.getElementById("choose_icon_btn").value;   
				}   
			}   
	  }()
	
}

$(function(){
	business.init();
	business.choose_vm_submit();
}); 


	
	

	
