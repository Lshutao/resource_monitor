/**
 * 配额详情js文件
 */
var quotas_detail = {
	/**
	 * 初始化方法
	 */
	init : function(){
		$("#region").unbind("change").change(function(){
			XUI.gotoPage('/quotas/detail?region=' + $(this).val());
		});
	}
}

$(function(){
	quotas_detail.init();
});