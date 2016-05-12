var regexEnum = 
{
	sinaWeibo:"^((http:\/\/){0,1}.{0,}weibo\.com.{0,113}|.{0,0})$",
	tencentWeibo:"^((http:\/\/){0,1}.{0,}qq\.com.{0,113}|.{0,0})$",
	intege:"^-?[1-9]\\d*$",					//整数
	intege1:"^[1-9]\\d*$",					//正整数
	intege2:"^-[1-9]\\d*$",					//负整数
	num:"^([+-]?)\\d*\\.?\\d+$",			//数字
	num1:"^[1-9]\\d*|0$",					//正数（正整数 + 0）
	num2:"^-[1-9]\\d*|0$",					//负数（负整数 + 0）
	num3:"^[0-9]\\d*(\\.[0-9]\\d*){0,1}$",
	decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
	decmal1:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",//正浮点数
	decmal2:"^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",//负浮点数
	decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",//浮点数
	decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",//非负浮点数（正浮点数 + 0）
	decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",//非正浮点数（负浮点数 + 0）

	email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	color:"^[a-fA-F0-9]{6}$",				//颜色
	url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
	chinese:"^[^\u0000-\u00FF]+$",					//中文汉字验证
	ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
	zipcode:"^\\d{6}$",						//邮编
	mobile:"^(13|18|15|17|14)[0-9]{9}$",				//手机
	ip4:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
	notempty:"^.+$",						//非空
	picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
	rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
	date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
	qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
	tel:"^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",	//电话号码的函数(包括验证国内区号,国际区号,分机号)
	username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	letter:"^[A-Za-z]+$",					//字母
	letter_u:"^[A-Z]+$",					//大写字母
	letter_l:"^[a-z]+$",					//小写字母
	idcard:"^[\\d]{6}(19|20)\\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][\\d]|3[0-1])([\\dXx]?|[\\d]{3}[\\dXx]?)$",	//身份证
	perCash:"^[1-9][0-9]{0,3}[0]{2}|1000000$" ,// 100的倍数
	ipv4cidr:"[ \t]*(((2(5[0-5]|[0-4][0-9])|[01]?[0-9][0-9]?)\.){3}(2(5[0-5]|[0-4][0-9])|[01]?[0-9][0-9]?)(/(3[012]|[12]?[0-9])))[ \t]*",
	urls: "^(http|https)\\://([a-zA-Z0-9\\.\\-]+(\\:[a-zA-"   
        + "Z0-9\\.&%\\$\\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{"   
        + "2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}"   
        + "[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|"   
        + "[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-"   
        + "4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0"   
        + "-9\\-]+\\.)*[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,4})(\\:[0-9]+)?(/"   
        + "[^/][a-zA-Z0-9\\.\\,\\?\\'\\\\/\\+&%\\$\\=~_\\-@]*)*$" 
}		
/**
 * 验证企业规模
 * @param value
 * @returns
 */
function validatePeopleScale(value){
	var twos = value.split("-");
	return (parseInt(twos[1])-parseInt(twos[0]))>0 ? true : errorTip.validateTip("后面的数不能大于前面的数");
}
/**
 * 验证网址
 * @param str_url
 * @returns
 */
function IsURL(str_url){
    var strRegex = "^.+\..+$"; 
      var re=new RegExp(strRegex); 
      if (str_url==''||str_url==null||re.test(str_url)){
          return (true); 
      }else{ 
          return errorTip.validateTip("不是有效网址"); 
      }
}


/**
 * 验证企业规模
 * @param value
 * @returns
 */
function validateCompanyScale(value){
	var val = value.replace(/[^0-9]/ig,"");
	if(val){
		return true;
	}else{
		return errorTip.validateTip("企业规模格式不正确，请重新输入");
	}
}

/**
 * 验证企业规模
 * @param value
 * @returns
 */
function validateZero(value){
	var val = value.substring(0,1);
	if(val != "0" || val != 0){
		if(parseInt(val) >= 1){
			return true;
		}else{
			return errorTip.validateTip("格式不正确，请重新输入");
		}
	}else{
		return errorTip.validateTip("格式不正确，请重新输入");
	}
}

function checkPass(pass){
	
	var ls = 0;
	
	if(pass.match(/([a-z])+/)){
		
		ls++;
		
	}
	
	if(pass.match(/([0-9])+/)){
		
		ls++;  
	}
	
	if(pass.match(/([A-Z])+/)){
		
		ls++;
		
	}
	if(pass.match(/[^a-zA-Z0-9]+/)){
		
		ls++;
		
	}
	return ls;
	
}

/**
 * 验证密码复杂度
 * @param value
 * @returns
 */
function validatePassword(value){
	if(checkPass(value) < 3){
          return "密码复杂度不够，请重新设置！" ;
	}else{
		return true;
	}
}


/**
 * 验证两次输入的密码是否相同
 * @param value
 * @returns
 */
function validatePasswordDiff(value){
	var newPwd = $("#password").val();
	var confirmNewPwd = $("#confirmPassword").val();
	if(newPwd && confirmNewPwd && newPwd != confirmNewPwd){
		return "两次输入的密码不一致，请重新输入";
	}else{
		return true;
	}
}

/**
 * 验证用户名是否同名
 * @param value
 */
function validateUserName(value){
	return validateUser("username", value);
}

/**
 * 验证手机号是否同名
 * @param value
 */
function validateUserTelephone(value){
	return validateUser("telephone", value);
}

/**
 * 验证邮箱地址是否同名
 * @param value
 */
function validateUserEmail(value){
	return validateUser("email", value);
}

/**
 * 验证用户名、手机号、邮箱是否重复
 * @returns
 */
function validateUser(flag, value) {
	var data = {};
	if(flag == "username"){
		data = {"username" : value};
	}else if(flag == "telephone"){
		data = {"telephone" : value};
	}else if(flag == "email"){
		data = {"email" : value};
	}
	data = $.extend(data, {"id" : $("#id").val()});
	var bool = false;
	$.ajax({
		type: "POST",
		url: contextPath + "/user/validate",
		dataType : "json",
		data : data,
		async : false,
		success: function(data){
			if(data.code == "success"){
				bool = true;
			}
		}
	});
	if(!bool){
		if(flag == "username"){
			return "用户名已经存在，请重新输入";
		}else if(flag == "telephone"){
			return "手机号已经存在，请重新输入";
		}else if(flag == "email"){
			return "邮件已经存在，请重新输入";
		}
	}else{
		return true;
	}
}


/**
 * 验证租户名是否同名
 * @param value
 */
function validateTenantName(value){
	return validateTenant("name", value);
}

/**
 * 验证租户名称是否重复
 * @returns
 */
function validateTenant(flag, value) {
	var data = {};
	if(flag == "name"){
		data = {"name" : value};
	}
	data = $.extend(data, {"id" : $("#id").val()});
	var bool = false;
	$.ajax({
		type: "POST",
		url: contextPath + "/tenant/validate",
		dataType : "json",
		data : data,
		async : false,
		success: function(data){
			if(data.code == "success"){
				bool = true;
			}
		}
	});
	if(!bool){
		if(flag == "name"){
			return "租户已经存在，请重新输入";
		}
	}else{
		return true;
	}
}

/**
 * 验证租户名是否同名
 * @param value
 */
function validateBusinessName(value){
	return validateBusiness("name", value);
}

/**
 * 验证租户名称是否重复
 * @returns
 */
function validateBusiness(flag, value) {
	var data = {};
	if(flag == "name"){
		data = {"name" : value};
	}
	data = $.extend(data, {"id" : $("#id").val()});
	var bool = false;
	$.ajax({
		type: "POST",
		url: contextPath + "/business/validate",
		dataType : "json",
		data : data,
		async : false,
		success: function(data){
			if(data.code == "success"){
				bool = true;
			}
		}
	});
	if(!bool){
		if(flag == "name"){
			return "业务名称已经存在，请重新输入";
		}
	}else{
		return true;
	}
}

/**
 * 验证云硬盘是否同名
 * @param value
 */
function validateVolumesName(value){
	return validateVolumes("name", value);
}

/**
 * 验证云硬盘是否重复
 * @returns
 */
function validateVolumes(flag, value) {
	var data = {};
	if(flag == "name"){
		data = {"name" : value};
	}
	data = $.extend(data, {"id" : $("#id").val()});
	var bool = false;
	$.ajax({
		type: "POST",
		url: contextPath + "/volumes/validate",
		dataType : "json",
		data : data,
		async : false,
		success: function(data){
			if(data.code == "success"){
				bool = true;
			}
		}
	});
	if(!bool){
		if(flag == "name"){
			return "云硬盘名称已经存在，请重新输入";
		}
	}else{
		return true;
	}
}


function validateSymbol(value){
	if(value.indexOf(".") > 0){
		return errorTip.validateTip("格式不正确，请重新输入");
	}else{
		return true;
	}
}

function validateSymbol(value){
	if(value.indexOf(".") > 0){
		return errorTip.validateTip("格式不正确，请重新输入");
	}else{
		return true;
	}
}

/**
 * 验证联系方式，不能通用
 */
function validateContactNum(){
	var contactType = $("#contactType").val();
	var contactNum = $("#contactNum").val();
	if(contactType == 1){
		if(contactNum == '' || contactNum == null || contactNum == 'undefined' || contactNum.length <=0 || contactNum.length > 11){
			return errorTip.validateTip("请输入最多11位QQ号码");
		}else{
			var urlpartern = new RegExp("^[1-9]\\d*$");
			if(!urlpartern.test(contactNum)){
				return errorTip.validateTip("QQ号码输入不正确");
			}else{
				return true;
			}
		}
	}else if(contactType == 2){
		if(contactNum == '' || contactNum == null || contactNum == 'undefined' || contactNum.length <11 || contactNum.length > 11){
			return errorTip.validateTip("请输入11位手机号码");
		}else{
    		var urlpartern = new RegExp("^(13|18|15|17|14)[0-9]{9}$");
			if(!urlpartern.test(contactNum)){
				return errorTip.validateTip("手机号码格式不正确");
			}else{
				return true;
			}
		}
	}else if(contactType == 3){
		if(contactNum == '' || contactNum == null || contactNum == 'undefined' || contactNum.length <=0 || contactNum.length > 50){
			return errorTip.validateTip("请输入1-50位邮箱");
		}else{
    		var urlpartern = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
			if(!urlpartern.test(contactNum)){
				return errorTip.validateTip("邮箱格式不正确");
			}else{
				return true;
			}
		}
	}
}

/**
 * 验证证书注册地，不能通用
 */
function validateCertRegistAddress(){
	var registerType = $("#registerType").val();
	if(registerType == '' || registerType == '变更注册'){
		var certRegistAddress = $('#certRegistAddress').val();
		if(certRegistAddress == ''){
			return errorTip.validateTip("请选择证书注册地");
		}else{
			return true;
		}
	}else{
		return true;
	}
}

/**
 * 验证证书到期日期，不能通用
 */
function validateCertExpire(){
	var registerType = $("#registerType").val();
	if(registerType == '' || registerType == '变更注册'){
		var certExpire = $('#certExpire').val();
		if(certExpire == ''){
			return errorTip.validateTip("请选择证书到期时间");
		}else{
			return true;
		}
	}else{
		return true;
	}
}
/**
 * 验证网关IP(非必填输入框验证)
 * */
function validateGatewayIp(){
	var ip = $("#subnetGatewayIp").val();
	if(ip.length == 0){//没有输入，不进行验证
		return;
	}else{
		var ipPartern = new RegExp("^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$");
		if(ipPartern.test(ip)){
			return true;
		}else{
			return "输入格式错误，请重新输入";
		}
	}
}

/**
 * 验证DNS(非必填输入框验证)
 * */
function validateDns(){
	var ip = $("#dnsAddress").val();
	if(ip.length == 0){//没有输入，不进行验证
		return;
	}else{
		var ipPartern = new RegExp("^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$");
		if(ipPartern.test(ip)){
			return true;
		}else{
			return "输入格式错误，请重新输入";
		}
	}
}

/**
 * 验证分配地址池
 */
function validateLocationPools(){
	var pool = $("#locationPools").val();
	if(pool.length == 0){//没有输入，不进行验证
		return true;
	}else{
		var ipPartern = new RegExp("^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$");
		if(pool.indexOf("-") > 0){
			var arrys = pool.split('-');
			if(ipPartern.test(arrys[0]) && ipPartern.test(arrys[1])){
				var ipAddLeft = arrys[0].split('.');
				var ipAddRight = arrys[1].split('.');
				if(ipAddLeft[0] == ipAddRight[0] && ipAddLeft[1] == ipAddRight[1] && ipAddLeft[2] == ipAddRight[2] && ipAddLeft[3] <= ipAddRight[3]){
					return true;
				}else{
					return "输入格式错误，请重新输入";
				}
			}else{
				return "输入格式错误，请重新输入";
			}
		}else{
			return "输入格式错误，请重新输入";
		}
	}
}
/**
 * 端口验证
 */
function validateport(){
	var pool = $("#port").val();
	var isNum = new RegExp("^([+-]?)\\d*\\.?\\d+$");
	if(isNum.test(pool) && parseInt(pool) < 65536){
		return true;
	}else{
		return "输入格式错误，请重新输入";
	}
}



