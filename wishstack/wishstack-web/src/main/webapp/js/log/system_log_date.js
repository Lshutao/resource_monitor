(function() {
	laydate({
        elem: '#systemLogEndTimes',
		istime :true,
		format: 'YYYY-MM-DD hh:mm:ss'
    });
	laydate({
        elem: '#systemLogStartTimes',
		istime :true,
		format: 'YYYY-MM-DD hh:mm:ss'
	});
})();