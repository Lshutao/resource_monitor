(function() {
	
	var startMaxTime ;
	if($("#logEndTimes")[0].value) 
		startMaxTime = $("#logEndTimes")[0].value; 
	else 
		startMaxTime = laydate.now();
	
	var start = {
		    elem: '#logStartTimes',
		    format: 'YYYY/MM/DD hh:mm:ss',
		    max: startMaxTime, //最大日期
		    istime: true,
		    istoday: false,
		    choose: function(datas){
		         end.min = datas; //开始日选好后，重置结束日的最小日期
		         end.start = datas; //将结束日的初始值设定为开始日
		    }
		};
	var end = {
	    elem: '#logEndTimes',
	    format: 'YYYY/MM/DD hh:mm:ss',
	    max: laydate.now(),
	    min:$("#logStartTimes")[0].value,
	    istime: true,
	    istoday: false,
	    choose: function(datas){
	        start.max = datas; //结束日选好后，重置开始日的最大日期	        
	    }
	};
	laydate(start);
	laydate(end);
})();