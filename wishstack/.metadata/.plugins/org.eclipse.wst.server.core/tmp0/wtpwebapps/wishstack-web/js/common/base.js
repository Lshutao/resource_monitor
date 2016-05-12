/*!
 * base.js
 */
//定义JS命名空间、防止JS签名重复
var Namespace = Namespace || new Object();
Namespace.register = function(path) {
	var arr = path.split("."), ns = "";
	;
	for (var i = 0; i < arr.length; i++) {
		if (i > 0) {
			ns += ".";
		}
		ns += arr[i];
		eval("if(typeof(" + ns + ")=='undefined'){" + ns + " = new Object();}");
	}
};

// 基础框架
Namespace.register("XUI");
(function() {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
	String.prototype.ltrim = function() {
		return this.replace(/^\s+/g, "");
	};
	String.prototype.rtrim = function() {
		return this.replace(/\s+$/g, "");
	};
	String.prototype.firstIndexOf = function(prefix) {
		var index = -1, temp = -1, str = this;
		while ((temp = str.lastIndexOf(prefix)) >= 0) {
			str = str.substring(0, temp);
			index = temp;
		}
		return index;
	};
	String.prototype.endsWith = function(suffix) {
		var C = this.length;
		var D = suffix.length;
		if (D > C)
			return false;
		return (D == 0 || this.substr(C - D, D) == suffix);
	};
	String.prototype.replaceAll = function(regex, replacement) {
		var raRegExp = new RegExp(regex, "g");
		return this.replace(raRegExp, replacement);
	};
	String.prototype.chineseLength = function() {
		return this.replace(/[^\x00-\xff]/g, "**").length;
	};
	String.prototype.remove = function(startIndex, removeLength) {
		var s = '';
		if (startIndex > 0)
			s = this.substring(0, startIndex);
		if (startIndex + removeLength < this.length)
			s += this.substring(startIndex + removeLength, this.length);
		return s;
	};
	Date.prototype.format = function(mask) {
		var d = this;
		var zeroize = function(value, length) {
			if (!length)
				length = 2;
			value = String(value);
			for (var i = 0, zeros = ''; i < (length - value.length); i++) {
				zeros += '0';
			}
			return zeros + value;
		};
		return mask
				.replace(
						/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g,
						function($0) {
							switch ($0) {
							case 'd':
								return d.getDate();
							case 'dd':
								return zeroize(d.getDate());
							case 'ddd':
								return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thr',
										'Fri', 'Sat' ][d.getDay()];
							case 'dddd':
								return [ 'Sunday', 'Monday', 'Tuesday',
										'Wednesday', 'Thursday', 'Friday',
										'Saturday' ][d.getDay()];
							case 'M':
								return d.getMonth() + 1;
							case 'MM':
								return zeroize(d.getMonth() + 1);
							case 'MMM':
								return [ 'Jan', 'Feb', 'Mar', 'Apr', 'May',
										'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
										'Nov', 'Dec' ][d.getMonth()];
							case 'MMMM':
								return [ 'January', 'February', 'March',
										'April', 'May', 'June', 'July',
										'August', 'September', 'October',
										'November', 'December' ][d.getMonth()];
							case 'yy':
								return String(d.getFullYear()).substr(2);
							case 'yyyy':
								return d.getFullYear();
							case 'h':
								return d.getHours() % 12 || 12;
							case 'hh':
								return zeroize(d.getHours() % 12 || 12);
							case 'H':
								return d.getHours();
							case 'HH':
								return zeroize(d.getHours());
							case 'm':
								return d.getMinutes();
							case 'mm':
								return zeroize(d.getMinutes());
							case 's':
								return d.getSeconds();
							case 'ss':
								return zeroize(d.getSeconds());
							case 'l':
								return zeroize(d.getMilliseconds(), 3);
							case 'L':
								var m = d.getMilliseconds();
								if (m > 99)
									m = Math.round(m / 10);
								return zeroize(m);
							case 'tt':
								return d.getHours() < 12 ? 'am' : 'pm';
							case 'TT':
								return d.getHours() < 12 ? 'AM' : 'PM';
							case 'Z':
								return d.toUTCString().match(/[A-Z]+$/);
							default:
								return $0.substr(1, $0.length - 2);
							}
						});
	};
	XUI.isne = function(str) {
		return str == null || str == "undefined" || str.trim() == "";
	};
	XUI.vmContainer = function() {
		return $("#vmContainer");
	};

	XUI.constructor = new Array();// 构造方法列表
	XUI.addConstructor = function(func) {
		XUI.constructor.push(func);
	};// 新增构造方法
	XUI.init = function(panel) {// 初始化执行所有构造方法
		var execute = function(func) {
			try {
				eval("func();");
			} catch (e) {
				console.log(e);
			}
		};
		for ( var func in XUI.constructor) {
			execute(function() {
				XUI.constructor[func](panel);
			});
		}
		$("SPAN.pageLoad").each(function(i, o) {
			execute(function() {
				eval($(o).remove().attr("data-pageLoad"));
			});
		});
		var navBar = $("#vmContainer #navBar");
		$("BODY.admin>DIV.content>.content_title").html(navBar.html());
		$("BODY.admin>DIV.content>UL.breadcrumb").html(navBar.html());
		$("BODY.admin>DIV.content>DIV.header>H1.page-title").text(
				navBar.attr("title"));
	};
	
	XUI.gotoPage = function(url){
		window.top.location=contextPath + url;
	};
	
})();	
	
	
	
	
Namespace.register("XUI.ajax");
	(function() {	
	
	XUI.ajax.action = function(title, message, url, method, callback_url, mark) {
		if(mark == 1){
			message = message+"<br /> <textarea   placeholder='请输入理由'></textarea>";
		}
		var config = {
			"callback" : function(data){
				XUI.gotoPage(callback_url);
			}
		}
		$.confirm({
			'title'		: title,
			'message'	: message,
			'buttons'	: {
				'确定'	: {
					'class'	: 'sure',
					'action': function(){
						
						//XUI.ajax.send(url, "", action, "", config);
						//debugger;
						$.ajax({
							  type: method,
							  url: contextPath + url,
							  success: function(data){
								  //window.top.location=contextPath + callback_url;
								  config.callback(data);
								},
							  dataType: 'json'
							});
					}
				},
				'取消'	: {
					'class'	: 'cancel',
					'action': function(){}	
				}
			}
		});

	};
	
	XUI.ajax.send = function(url, params, method, type, config) {
		var user_identifination = $("#user_identifination");
		if(user_identifination && user_identifination.html()){
			$.ajax({
				type : "POST",
				dataType: "json",
				data: {'username' : user_identifination.html()},
				url : contextPath+"/user_identify.do",
				success : function(data){
					if(data.code == 'failure'){  //header的用户名与服务器缓存的用户名不一致，则刷新当前窗口
						top.location.reload();
					} else {
						//debugger;
						$.ajax({
							  type: method,
							  url: contextPath + url,
							  data: params,
							  success:function(data){
								  config.callback(data);
							  },
							  dataType: type
							});
					} 
				}
			});
		}
	};
})();