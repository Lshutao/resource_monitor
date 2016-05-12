/**
 * 订单js文件
 */
var order_approve = {
	/**
	 * 初始化方法
	 */
	init : function(){
		//右侧面板
		order_approve.roll_right_panel();
		//订单审批  下拉框的显示与隐藏
		content.order_result();
		order_approve.init_submit_click();
	},
	
	/**
	 * 提交审批
	 */
	submit_approve : function(){
		$.ajax({
			type: "POST",
			url: contextPath + "/order/approve",
			dataType : "json",
			data : {
					"reason"       : $("#reason").val(),
					"orderStatus"  : $("#orderStatus").val(),
					"providerId"   : $("#providerId").val(),
					"orderId"      : $("#orderId").val()
					},
			success: function(data){
				if(data.code == "success"){
					XUI.gotoPage("/order");
				}
			}
		});
	},
	
	/**
	 * 初始化提交事件
	 */
	init_submit_click : function(){
		$("#submitApprove").unbind("click").click(function(){
			if($("#reason").val()){
				public_obj.button_repeat_submit("submitApprove");
				order_approve.submit_approve();
			}else{
				$("#reasonTip").text("请填写通过/驳回理由");
			}
		});
	},
	
	/**
	 * 滑出右侧面板,,, 
	 */
	roll_right_panel:function(){
		$(".order_look_quota").click(function(){
			$(".order_quotas_frame").css("display","block");
			$(".order_resource_total").css("display","none");
			$(".order_approve_right").animate({width:"370px"},500);
		});
		
		$(".order_look_provider").click(function(){
			$(".order_resource_total").css("display","block");
			$(".order_quotas_frame").css("display","none");
			$(".order_approve_right").animate({width:"370px"},500);
		});
		
		$(".roll_out").click(function(){
			$(".order_approve_right").animate({width:"0"},500);
		});
	},
	
	/*
	 * 订单审批  下拉框的显示与隐藏
	 */
	order_result:function(){
		$(".approve_result").change(function(){
			var this_val = $(this).val();
			var hide_obj = $(".service_pro");
			if(this_val == "pass"){
				hide_obj.css("display","inline-block");
			}else if(this_val == "refuse"){
				hide_obj.css("display","none");
			}
		});
	}
}
$(function(){
	order_approve.init();
});