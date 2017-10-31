$(document).ready(function(){

	$(function(){
	     //获取浏览器宽度
	     var _width = $(window).width(); 
	     if(_width < 1024){
            //直接为该div添加w1024样式,会覆盖前一个样式
            $(".content-wrapper").css('background-color', '#fff')
       
    	 }
	});

	$('.treeview-menu').on('click','li',function () {
		var _postindex = $(this).index()
		var _top = $('.treeview-menu').scrollTop()
		location.href = "YXZYJSJY.html?" + "index" + _postindex + "top" + _top	

	})

	var _location =  window.location.search
	var _getindex = _location.indexOf('x')
	var _gettop = _location.indexOf("p")
	var _getindex = _location.substring(_getindex+1,_gettop-2)
	var _gettop = _location.substring(_gettop+1)

	$('.treeview-menu li a').eq(_getindex).css({'background-color':'rgba(240, 241, 243, 0.63)','color': '#fd7c53', 'font-weight':'bold'})
	$('.treeview-menu').scrollTop(_gettop)	
	$('#INDEXHTML').click(function () { location.href='index.html'})

	userid = $.cookie('userid');
	truename = $.cookie('truename');
	$('.header-name').html(truename);
	wecome();
	setInterval(wecome,1000);
	
	tt();

	if (userid == ' ' || userid == undefined || truename == ' ' || truename == undefined) {
		window.location = 'login.html'
	}
	
	$("#login_btn").click(function () {
        //获取用户名
        var username = $('#username_txt').val();
        //获取密码
        var userpass = $('#userpass_txt').val();
        if (username == "" || userpass == "") { alert("用户名密码不能为空！"); }
        else {

            //调用登录方法
            $.ajax({
                //要用post方式     
                type: "Post",
                //方法所在页面和方法名     
                url: 'http://123.57.162.77:8081/AppInterface/userLogin?params={%22userName%22:%22'+username+'%22,%22password%22:%22'+userpass+'%22}',
                dataType: "jsonp",
				jsonp: "jsonpCallback",
                success: function (data) {
					console.log(data);
					
					var datas = data.result;
					switch (datas)
					{
						case 4:
						    alert('温馨提示','用户名不存在！','info');
						    break;
						case 101:
						    alert('温馨提示','密码错误！','info');
						    break;
						case 0:
							window.location.href = "index.html";
						    break;
						
					}
                    
                },
                error: function (err) {
                    alert('系统连接错误，请重试！');
                }
            });
        }
    });
	
	$("body").keydown(function(event) {
	  if (event.keyCode == "13") {//keyCode=13是回车键
		$("#login_btn").click();
	  }
	}); 
	$(".header-btn").click(function(){
		if(confirm("你确定退出系统吗？")){
			window.location.href = "login.html";
			clearAllCookie()
		}else{
			return;
		}
	});
})
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//头部欢迎方法
function wecome() {
	var theDate = new Date();
	var _hour = theDate.getHours();
	var _year = theDate.getFullYear();
	var _month = theDate.getMonth();
	var _date = theDate.getDate();
	var _dayNum = theDate.getDay();
	var _day; switch (_dayNum) {
		case 0: _day = "星期日";
			break;
		case 1: _day = "星期一";
			break;
		case 2: _day = "星期二";
			break;
		case 3: _day = "星期三";
			break;
		case 4: _day = "星期四";
			break;
		case 5: _day = "星期五";
			break;
		case 6: _day = "星期六";
			break;
	}

	//获取系统标题
	//$('#systemName').html('<strong>' + systemName + '</strong>');

	var hello = "";
	if (_hour >= 12)
		hello = '下午好';
	else
		hello = '上午好';
	$('.header-time').html(_year + "年" + (_month + 1) + "月" + _date + "日  " + _day);
}
function tt(){
    $.ajax({
        //要用post方式
        type: "post",
        //方法所在页面和方法名
        url: 'http://123.57.162.77:8089/getBzRecordList?params={%22deviceIds%22:%22289%22}',
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        success: function (data) {
            //查看返回的数据data
//            console.log(data);
            var datas = data.data[0].bzRecord.data.split(",");
           
            $('.header-tem').html(parseFloat(datas[16]).toFixed(1));
        },
        error: function (err) {
            //alert(err);
        }
    });
}

function clearAllCookie() {  
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
    if(keys) {  
        for(var i = keys.length; i--;)  
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
    }  
}  
