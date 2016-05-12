function doDataProcess2() {
	var Auth_Content = originalRandom;
	var DSign_Subject = "CN=CEGN_OCA, O=SIC, S=BeiJing, C=CN";
	if (Auth_Content == "") {
		alert("认证原文不能为空!");
	} else {
		// 控制证书为一个时，不弹出证书选择框
		JITDSignOcx.SetCertChooseType(0);
		JITDSignOcx.SetCert("SC", "", "", "", DSign_Subject, "");
		if (JITDSignOcx.GetErrorCode() != 0) {
			alert("错误码：" + JITDSignOcx.GetErrorCode() + "　错误信息："
					+ JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
			return false;
		} else {
			var temp_DSign_Result = JITDSignOcx.DetachSignStr("", Auth_Content);
			if (JITDSignOcx.GetErrorCode() != 0) {
				alert("错误码："
						+ JITDSignOcx.GetErrorCode()
						+ "　错误信息："
						+ JITDSignOcx.GetErrorMessage(JITDSignOcx
								.GetErrorCode()));
				return false;
			}
			document.getElementById("signed_data").value = temp_DSign_Result;
		}
	}
	document.getElementById("original_jsp").value = Auth_Content;
}

/**
*  为用户绑定key
*/
var user_bound_key = {
	
	init:function(){
		user_bound_key.init_function();
	},
	
	init_function : function(){
		//向后台提交登录
		$("#user_bound_key").off('click').on('click',function(){
			doDataProcess2();
			var signed_data = $("#signed_data").val();
			var original_jsp = $("#original_jsp").val();
			var id = $("#id").val();
			$.ajax({
				type : "POST",
				dataType: "json",
				data: {'id' : id, 'signed_data' : signed_data, 'original_jsp' : original_jsp},
				url : contextPath + "/user/bound",
				success : function(data){
					XUI.gotoPage("/user");
					public_obj.prompt_show(data.code, data.result);
				}
			});
		});
	}
	
};

user_bound_key.init();
