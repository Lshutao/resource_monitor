//根据原文和证书产生认证数据包
function doDataProcess() {
	var Auth_Content = originalRandom;
	var DSign_Subject = "CN=CEGN_OCA, O=SIC, S=BeiJing, C=CN";
	if (Auth_Content == "") {
		//alert("认证原文不能为空!");
	} else {
		
		try{
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
		}catch(e){
			alert("该浏览器不支持CA认证,请使用IE8及以上版本浏览器登录");
			return false;
		}
	}
	document.getElementById("original_jsp").value = Auth_Content;
}
