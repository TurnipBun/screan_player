(function($){
	//选择全部
	$.fn.selectAll = function(name){
		$("input:checkbox[name="+name+"]").attr('checked', this.prop('checked') == true);
		return $(this);
	};
	$.fn.newsStyple = (function(options){
		var box = $(this).find(options.cellTag);
		for(var i = 0; i < box.length; i+=options.insertSum) {
           box.slice(i, i+options.insertSum).wrapAll('<'+options.insertTag+'></'+options.insertTag+'>');
        }
        box.parent().unwrap();
    	$(this).find(options.insertTag).last().css('border-bottom', '0px');
    	return $(this);
	});
	//tab切换
	$.fn.tabs = function(options){
		var tabs = $(this);
		tabs.removeClass(options.onBg);
		tabs.first().addClass(options.onBg);
		if($.isFunction(options.getItems))
		{
			options.getItems().hide();
			options.getItems(0).show();
		}	
		if($.isFunction(options.callback))
		{
			options.callback(0);
		}
		tabs.each(function(index, el){
			$(el).bind(options.event || 'mouseover', function(){
				tabs.removeClass(options.onBg);
				tabs.eq(index).addClass(options.onBg);
				if($.isFunction(options.getItems))
				{
					options.getItems().hide();
					options.getItems(index).show();
				}
				if($.isFunction(options.callback))
				{
					options.callback(index);
				}
			});
		});
		return tabs;
	};
	//分享链接
	$.fn.share = function(options){
		options = options || {};
		var div = $(this);
		var targetList = options.list || ['评论', '海鲜微薄', '新浪微薄'];

		for(var i = 0; i < targetList.length; i++)
		{
			switch(targetList[i])
			{
				case '评论':
					var url = options.id || options.url || '';
					div.append('<span class="share_comment"><a href="'+url+'#comment_iframe" class="comment">评论</a></span>');
					break;
				case '海鲜微薄':
					var _w = options.width || 108 , _h = options.height || 16;
					var param = {url:location.href, type:"f", count:"", appkey:"145005924", title:encodeURI(document.title), relateUid:"", rnd:new Date().valueOf()};
					var temp = [];
					for(var p in param)
					{
						temp.push(p + "=" + encodeURIComponent(param[p] || ""));
					}	
					div.append('<span class="share_hxwb"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://t.cnss.com.cn/share.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe></span>');
					break;
				case '新浪微薄':
					div.append("<span class=\"share_slwb\"><a href=\"javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u=d.location.href,p=['url=',e(u),'&title=',e(d.title),'&appkey=2924220432'].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent));\"><img src=\"http://timg.sjs.sinajs.cn/t3/style/images/toolbar/s_red.gif\" style=\"margin:-3px auto 0px;border:0;vertical-align:middle;\"><span>分享到新浪微博</span></a></div></span>");
					break;
			}
		}
		
		return div;
	};
	//收藏
	$.fn.addFvrt = function(title,url,desc){
		title = title || document.title;
		url = url || document.URL;
		desc = desc || title;
		if ((typeof window.sidebar == 'object') && (typeof window.sidebar.addPanel == 'function')){//Gecko
			window.sidebar.addPanel(title,url,desc);
		}
		else {//IE
			window.external.AddFavorite(url,title);
		}
		$.post('/api.php?op=add_favorite', {url:url, title:title}, function(html){});
		return this;
	};
	//设为首页
	$.fn.setHomepage = function(url){
		url = url || document.URL;
		if (document.all){//IE
	        document.body.style.behavior='url(#default#homepage)';
	  		document.body.setHomePage(url);
	    }else if (window.sidebar){//firefox
		    if(window.netscape) {
		         try{ 
		            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
		         } 
		         catch (e) { 
		    		alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" ); 
		         }
		    }
		    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
		    prefs.setCharPref('browser.startup.homepage',url);
	 	}
	}
	//输入框默认值
	$.fn.defaultValue = function(){
		this.attr("default_value", this.val());
		this.focus(function(){
			var el = $(this);
			(el.val() == el.attr("default_value")) && (el.val(""));
		});
		this.blur(function(){
			var el = $(this);
			(el.val() == "") && (el.val(el.attr("default_value")));
		});
	};
	//名船事典
	$.fn.mcsd = function(options){
		options = options || {fx:'scrollHorz', delay:-1000, height:168, next:'a.mcsd_leftPic', prev:'a.mcsd_rightPic', timeout:0};
		var btn = "<div class='btnBg' style='opacity: 0.5;'></div><div class='btnPic'><a class='left' href='javascript:void(0)'><img src='/statics/images/cnss/qy/qy_fyz.gif'></a><a class='right' href='javascript:void(0)'><img src='/statics/images/cnss/qy/qy_fyy.gif'></a></div>";
		this.append(btn);
		this.addClass('mcsd');
		var ul = this.find('ul');
		ul.cycle(options);
	}
	//自动登入
	$.fn.autoLogin = function(){
		var container = this;
		if(container.length == 0) return ;
		//http://www.cnss.com.cn/index.php?m=resource&c=member&a=ajax_get_current_userinfo
		//$.getJSON('/index.php?m=resource&c=member&a=ajax_get_current_userinfo', null, function(json){
		//	if(json && json.userid)
		//	{
		//		container.empty();
		//		container.append('<span>欢迎您,</span><a href="http://www.cnss.com.cn/index.php?m=member&c=index"><span> '+(json.username || json.nickname)
		//				+'</span> 会员中心</a> <a href="http://www.cnss.com.cn/index.php?m=member&c=index&a=logout&forward='+window.location.href+'" id="logout"><span>安全退出</span></a>');
		//	}
		//});
	}
	
	//初始化
	jQuery(document).ready(function($){
		//tab切换
		$("*.cnsstabs").each(function(i, el){
			$(el).find("*.cnsstabs_a").tabs({onBg:'onBg', getItems:function(index){
				var items = $(el).find("*.cnsstabs_ul");
				return (typeof index == 'undefined') ? items : items.eq(index);
			}});
		});
		//select选择默认值
		$("select").each(function(){
			var select = $(this), val = select.attr('defval');
			if(val !== undefined)
			{
				if(select.attr("multiple"))
				{
					$(val.split(",")).each(function(){
						select.find("option[value="+this+"]").attr("selected", true);
					});
				}
				else
				{
					select.find("option[value="+val+"]").attr("selected", true);
				}
			}	
		});
		//填写股票数据
		var table = $("table.stock_table tbody");
		table.each(function(){
			var el = $(this);
			var classStr = el.attr("class").split(' ');
			$(classStr).each(function()
			{
				eval("var data = typeof hq_str_" + this + " == 'undefined' ? null : hq_str_" + this + ";");
				if(data != null)
				{
					data = data.split(',');
					el.find('td.'+this+'_code').text(this.substr(2));
					el.find('td.'+this+'_name').text(data[0]);
					el.find('td.'+this+'_open').text(data[1]);
					el.find('td.'+this+'_close').text(data[2]);
					el.find('td.'+this+'_price').text(data[3]);
				}
			});
		});
		//收藏
		$("a.addFvrt").each(function(){$(this).click(function(){$(this).addFvrt();});});
		$("a.setHomepage").each(function(){$(this).click(function(){$(this).setHomepage();});});
		//设定默认值
		$("input.defaultValue").each(function(){$(this).defaultValue();});
		//日期控件
		($.fn.dateinput) && ($("input.date").dateinput({format: 'yyyy-mm-dd',trigger: false,selectors: true}));
		//自动登入
		$("div.login").autoLogin();
	});
})(jQuery);