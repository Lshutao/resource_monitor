/**
 * 业务概览js
 */
var business_overview_list = {
	/**
	 * 部分页面刷新
	 */
	refresh : function(businessId){
		$.ajax({
			type : "POST",
			dataType: "json",
			url : "/wishstack-web/businessOverview/"+businessId,
			success : function(data){
				if(data.code == 'success'){
					data = data.data;									
					var allInstance = data.allInstances;
					var allInstancesStatistics = data.allInstancesStatistics;
					var business = data.business;
					var repTime = data.repTime;
					var repTimeWeek = data.repTimeWeek;
					
					//刷新业务概况
					$("#businessName").text(business.businessName);
					$("#businessOverviewName").text('['+business.businessName+']');
					if(business.currentState == "normal"){
						$("#currentState").text("正常");
					}else if(business.currentState == "alarm"){
						$("#currentState").text("告警");
					}
					else if(business.currentState == "fault"){
						$("#currentState").text("故障");
					}
					if(repTime != null && repTime.repTime != null){
						$("#repTime").text(repTime.repTime + "ms");
					}
					if(repTimeWeek != null && repTimeWeek.repTimeWeek != null){
						$("#repTimeWeek").text(repTimeWeek.repTimeWeek + "ms");
					}
					var date = new Date(business.updatedAt);
					$("#updatedAt").text(date.format("yyyy-MM-dd hh:mm:ss"));
					
					//刷新虚拟机统计
					if(allInstancesStatistics.instanceNum == null){
						$("#instanceNum").text(0+"台");
					}else{
						$("#instanceNum").text(allInstancesStatistics.instanceNum+"台");
					}					
					if(allInstancesStatistics.vcpus == null){
						$("#vcpus").text(0 + "个");
					}else{
						$("#vcpus").text(allInstancesStatistics.vcpus+"个");
					}
					if(allInstancesStatistics.memory == null){
						$("#memory").text(0+"个");
					}else{
						$("#memory").text(allInstancesStatistics.memory+"GB");
					}
					if(allInstancesStatistics.disk == null){
						$("#disk").text(0+"个");
					}else{
					$("#disk").text(allInstancesStatistics.disk+"TB");
					}
					
					//刷新业务占用的所有虚拟机详细信息
					$("#instance").html("");
					var instanceRow = $("#instance");
					if(!(allInstance=='' || allInstance==undefined || allInstance==null)){
						var count = 0;
						count = allInstance.length;
						for(var i=0;i<count;i++){	
							var trRow = $("<tr></tr>");
							trRow.append('<td>' + allInstance[i].instanceName + '</td>');
							trRow.append('<td>' + allInstance[i].vcpus + '</td>');
							trRow.append('<td>' + allInstance[i].memory + '</td>');
							trRow.append('<td>' + allInstance[i].disk + '</td>');
							var instanceState = "";
							if(allInstance[i].instanceState == 1){
								instanceState = "正常";
							}else if(allInstance[i].instanceState == 2){
								instanceState = "异常";
							}
							trRow.append('<td>' + instanceState + '</td>');
							instanceRow.append(trRow);
						}
					}
				}				
				
			}
		});
	},
	
	/**业务列表点击事件
	 */
	bus_list_click:function(){
		$(".business_list_alarm_top5 .business_list ul.business_listing li:first-child > a").addClass("active");
		$(".business_list_alarm_top5 .business_list ul.business_listing li > a").click(function(){
			$(".business_list_alarm_top5 .business_list ul.business_listing li > a").removeClass("active");
			$(this).addClass("active");
		});
	}
};

$(function(){
	business_overview_list.bus_list_click();

}); 