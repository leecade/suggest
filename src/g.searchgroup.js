/*
author: yuji
Hi: leecade
Email: leecade@baidu.com
lastupdate: 2011-10-13

按产品线需求封装searchgroup，兼容首页和2级

*/
;;(function(WIN, DOC, undef) {
	
//fastst trim, form: http://blog.stevenlevithan.com/archives/faster-trim-javascript
String.trim || (String.prototype.trim = function() {
	var str = this,
		str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
});

//replace string by object, like "#{name}"
String.replaceTpl || (String.prototype.replaceTpl = function(o) {
	return this.replace(/#\{([^}]*)\}/mg, function(a, b) {
		return a = o[b.trim()]
	});
});

//encode html code("&", "<", ">", """, "'")
//实体字符全用Unicode表示
//IE不支持单引号的实体名称，故转为实体编号"&#39;"
//增加对"©"符的转义
String.htmlEncode || (String.prototype.htmlEncode = function() {
	return String(this).replace(/\x26/g,'&amp;').replace(/\x3c/g,'&lt;').replace(/\x3E/g,'&gt;').replace(/\x22/g, "&quot;").replace(/\x27/g, "&#39;").replace(/\xA9/g, "&copy;");
});

var SPACE = " ",
	NULL = null,
	CLASSLIST = !!(WIN.Element && Element.prototype.hasOwnProperty("classList")),
	isIE = /\w/.test('\u0130'),
	isIE6 = isIE && !WIN.XMLHttpRequest,
	isIE9 = DOC.documentMode && DOC.documentMode === 9,

/*
if use any library, these functions can be replaced like:
hasClass = T.baidu.hasClass
*/
namespace = function(name, create, context) {
	var ret = name.split("."), li, n;
	context = context || window;
	name = ret.pop();
	while(li = ret.shift()) context = context[li] = context[li] || {};
	return name && !context[name] ? context[name] = create ? {} : n : context;
},
hasClass = CLASSLIST ? function(el, cls) {
	return el.classList.contains(cls);
} : function(el, cls){
	return -1 < (SPACE + el.className + SPACE).indexOf(SPACE + cls + SPACE);
},
addClass = CLASSLIST ? function(el, cls) {
	el.classList.add(cls);
} : function(el,cls) {
	if (!hasClass(el,cls)) el.className += (el.className ? SPACE : "") + cls;
},
removeClass = CLASSLIST ? function(el,cls) {
	el.classList.remove(cls);
} : function(el,cls) {
	if(!hasClass(el,cls)) return;
	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	el.className = el.className.replace(reg, SPACE);
},
on = DOC.addEventListener ? function(el,type,callback){
	el.addEventListener(type, callback, !1);
} : function(el,type,callback){
	el.attachEvent("on" + type, callback);
},
bind = function(el, type, fun) {
	on(el, type, function(e) {
		e = e || WIN.event;
		var el = e.srcElement || e.target;
		fun.call(el, e);
	});
},

_searchgroup = function(o) {
	//ignore "new"
	if(!(this instanceof _searchgroup)) return new _searchgroup(el, o);
	
	var that = this;
	
	/*
	html结构：
	<dl>
		<dt><a href="#" onclick="return false">网页</a>...</dt>
		<dd>
			<a href="#"><img src="" /></a>
			<form>
				<input /><button />
			</form>
			<div>关键词</div>
		</dd>
	</dl>
	
	参数配置：
	conf = {
		default: {
			
			//input
			inputId:						//输入框id或el引用（默认："searchGroupInput"）
			
			//moreLink（没有"更多"就不配！）
			moreLinkId: 					//更多浮层
			
			//logo（不用切换logo就不配！）
			logoPath: "img/search_logo/",	//图片路径，（默认为""img/search_logo/""，如果不需要切换logo，比如2级页，设为false或undefined）
			logoId:							//
			
			//tabs（不用切换tabs就不配！）
			tabsId: 						//tabs外框id或el引用（默认："searchGroupTabs"，如果不需要切换logo，比如2级页，设为false或undefined）
			curN: 0,						//默认tab序号，从0开始（默认：0）
			
			
			
			//log
			
			//sug
			sug: {							//默认全局sug配置，格式参考sug文档
				
			
			}
		},
		
		list{
			
			//data-t="web"
			"web": {
				
			}	
			
		}	
	}
	
	
	*/
	
	
	that.conf = o.conf;
	
	that.logo = byId(o.logo || "searchGroupLogo");
}

//ths prototype's shortcut
_ = _searchgroup.prototype;

//switchTab
_.switchTab = function() {
	
}

//showMore
_.showMore = function() {
	
}

//initEvent
_.initEvent = function() {
	
}


//copy to G.sug
WIN.G || (WIN.G = {}), G.searchgroup = _searchgroup;
})(window, document);