$(function () {
	var _datauserId = $.cookie('datauserId')
	var _datadeviceId = $.cookie('datadeviceId')
	$('.JCSJ_content_bottom_TOP_leftInput').on('click', 'input', function () {
		$(this).css({'background-color':'#0a94e3', 'color': '#fff'})
		$(this).siblings().css({'background-color':'#fff', 'color':'#0a94e3'})
		
		if($(this).val() == '手动') {
			$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').show()
			$('#PID_finish').show()
			clearInterval(setInterData)
		} else {
			$('#PID_finish').hide()
			$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').removeAttr('checked')
			$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').hide()
			$('.JCSJ_content_bottom_TOP_leftImages input[type="text"]').attr('disabled', 'disabled')
		}
	})
	
	$('.JCSJ_content_bottom_TOP_leftImages').on('click', ' input[type="checkbox"]',function () {
		if ($(this).is(':checked')) {
			$(this).siblings('input[type="text"]').removeAttr('disabled')
			$(this).parent().siblings('div').children('input[type="text"]').attr('disabled', 'disabled')
			$(this).parent().siblings('div').children('input[type="checkbox"]').removeAttr('checked')
		} else {
			$(this).siblings('input[type="text"]').attr('disabled', 'disabled')
		}
	})

	$('.JCSJ_content_bottom_TOP_leftImages input[type="text"]:eq(0)').blur(function () {
		if ($(this).val() == ' ') {
			$(this).val('100')
		} 
		clearInterval(setInterData)
		setInterData =  setInterval(loadData,5000)
	})

	$('.JCSJ_content_bottom_TOP_leftImages input[type="text"]:eq(1)').blur(function () {
		if ($(this).val() == ' ') {
			$(this).val('50')
		}
		clearInterval(setInterData)
		setInterData =  setInterval(loadData,5000)
	})
	
	$('.JCSJ_content_bottom_TOP_leftImages').on('click','input[type="text"]',function () {
		$(this).val(' ')
		clearInterval(setInterData)
	})

	
	$('#PID_finish').click(function () {
		//F4
		var arr = []
		var postarr = []
		var flag
		$(this).parent().siblings('div').find('input[type="text"]').each(function (index,item) {
			postarr[index] = $(this).val().trim()
			arr[index] = PrefixInteger($(this).val().trim(),3)
		})

		if ($('#PID_fmkd').attr('disabled') == 'disabled') {
			flag = 2
		} else {
			flag = 0
		}
		
		arr = "F4," + flag + "," + arr.join(',')
		postarr.push(flag)
		postSB_down(postarr)
		getDataDown(arr)
		clearInterval(setInterData)
		setInterData =  setInterval(loadData,5000)
		
//		$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').removeAttr('checked')
//		$('.JCSJ_content_bottom_TOP_leftImages input[type="text"]').attr('disabled', 'disabled')
	})
	
	$('#PID_tjzd').click(function () {
		var arr = []
		var postarr = []
		
		var _PID_fmkd = $('#PID_fmkd').val()
		var PID_gswd = $('#PID_gswd').val()
		_PID_fmkd = _PID_fmkd.trim()
		PID_gswd = PID_gswd.trim()
		arr.push(PrefixInteger(_PID_fmkd,3))
		arr.push(PrefixInteger(PID_gswd,3))
		
		postarr.push($('#PID_fmkd').val())
		postarr.push($('#PID_gswd').val())
		postarr.push('1')

		arr = "F4," +"1,"+ arr.join(',')
		postSB_down(postarr)
		getDataDown(arr)
	})
	
	function postSB_down (devP3) {
		$.ajax({
			//要用post方式
			type: "post",		
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devP3%22:%22'+ devP3+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
	
	function getDataDown (a) {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.57.162.77:8081/AppInterface/sendInstruction?params={%22userId%22:'+_datauserId+',%22deviceId%22:'+_datadeviceId+',%22instruction%22:%22'+a+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
				console.log(a)
			}
		})	
	}	


	function PrefixInteger(num, length) {  
	 return ( "0000" + num ).substr( -length );  
	}

	var setInterData =  setInterval(loadData,3000)
	function loadData () {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8089/getBzRecord?params={%22deviceId%22:'+_datadeviceId+'}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
				var getdata = data.deviceInfo
				var data = data.data.data
				var arr = data.split(',')
				function zerodeal (data) {
					if (data == 0) {
						return data + "℃"
					} else {
						return parseFloat(data).toFixed(1) + "℃"
					}
				}
				
				function zerobfbdeal (data) {
					if (data == 0) {
						return data + "%"
					} else {
						return parseFloat(data).toFixed(1) + "%"
					}
				}
				
				$('#ECGSWD').html(zerodeal(arr[4]/10))
				$('#ECHSWD').html(zerodeal(arr[5]/10))
				$('#SXWD').html(zerodeal(arr[6]/10))
				$('#YCCWD').html(zerodeal(arr[7]/10))
//				$('#WDSD').html(parseFloat(arr[8]/10).toFixed(1)+"℃")
				$('#WDSD').html(zerodeal(arr[8]/10))
				$('#FMKD').html(parseInt(arr[10])+"%")
				$('#SWSD').html(zerobfbdeal(arr[11]/10))
				$('#SWWD').html(zerodeal(arr[12]/10))

				var status = arr[9] 
				
				if (arr[0] == 0) {
					$('#bengstatus1').html('<img src="common/images/kaiguan.png"/>')
				} else {
					$('#bengstatus1').html('<img src="common/images/kaiguan2.png"/>')
				}
				
				if (arr[1] == 0) {
					$('#bengstatus2').html('<img src="common/images/kaiguan.png"/>')
				} else {
					$('#bengstatus2').html('<img src="common/images/kaiguan2.png"/>')
				}
				if (arr[2] == 0) {
					$('#bengstatus3').html('<img src="common/images/kaiguan.png"/>')
				} else {
					$('#bengstatus3').html('<img src="common/images/kaiguan2.png"/>')
				}
				if (arr[3] == 0) {
					$('#bengstatus4').html('<img src="common/images/kaiguan.png"/>')
				} else {
					$('#bengstatus4').html('<img src="common/images/kaiguan2.png"/>')
				}
				
				if (status == 0) {
					$('#status').html('<img src="common/images/ringred.png"/> 现场停止')
				} else if(status == 1) {
					$('#status').html('<img src="common/images/ringblue.png"/> 正常供暖')
				} else if(status == 2) {
					$('#status').html('<img src="common/images/ringyellow.png"/> 应急供暖')
				}
				
				//PID手自动
				var devP3 = getdata.devP3.split(',')
				var PID_result = []
				var a = devP3.length/3
				
				for(var i=0,len=devP3.length;i<len;i+=a){
				   PID_result.push(devP3.slice(i,i+a));
				}			
				
				$('#PID_fmkd').val(PID_result[0])
				$('#PID_gswd').val(PID_result[1])
				if (PID_result[2] == 0) {
					$('#PID_tjSD').css({'background':'#0a94e3','color':'#fff'})
					$('#PID_tjzd').css({'background':'#fff','color':'rgb(10, 148, 227)'})
					$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').show()
					$('#PID_fmkdcheckbox').attr('checked','checked')
					$('#PID_finish').show()
					$('#PID_fmkd').removeAttr('disabled')
				} else if (PID_result[2] == 1) {
					$('#PID_tjzd').css({'background':'#0a94e3','color':'#fff'})
					$('#PID_tjSD').css({'background':'#fff','color':'rgb(10, 148, 227)'})
					$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').hide()
					$('#PID_finish').hide()
				}else if (PID_result[2] == 2) {
					$('#PID_tjSD').css({'background':'#0a94e3','color':'#fff'})
					$('#PID_tjzd').css({'background':'#fff','color':'rgb(10, 148, 227)'})
					$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').show()
					$('#PID_gswdcheckbox').attr('checked','checked')
					$('#PID_finish').show()
					$('#PID_gswd').removeAttr('disabled')
				}
			}
		})	
	}
	loadData()
	
	var myChart = echarts.init(document.getElementById('main'));
	option = {
		color: ['#459f6e','#fe871d', '#1068ad'],
	    legend: {
			icon: 'rect',
			itemWidth: 10,
			itemHeight: 5,
			itemGap: 13,
			data: ['二次供水温度', '二次回水温度', '设定温度'],
			right: '4%',
			textStyle: {
				fontSize: 12,
				
			}
		},
	  	tooltip : {
			trigger: 'axis',
	        axisPointer : {         
	          type : 'shadow'     
	        }
	    },
	    grid: {
			x: 50,
			y: 20,
			x2: 20,
			y2: 20,
			borderWidth: 1
		},
		
	    xAxis:  {
	    	splitLine:{show: false},
	        type: 'category',
	        boundaryGap: false,
	        data: (function() {
				var now = new Date();
				var res = [];
				var len = 10;
				while(len--) {
					res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
					now = new Date(now - 2000);
				}
				return res;
			})()
	    },
	    yAxis: {
	    	splitLine:{show: false},
	        type: 'value',
	        axisLabel: {
	            formatter: '{value} °C'
	        }
	    },
	  
	    series: [
	        {
	            name:'二次供水温度',
	            type:'line',
	            symbolSize: 8,
	            data:[47, 50, 48, 46, 50, 49, 54, 43, 47, 55],
	         
	        },
	        {
	            name:'二次回水温度',
	            type:'line',
	            symbolSize: 8,
	            data:[37, 40, 38, 36, 40, 39, 44, 33, 37, 45],

	        },
	        {
	            name:'设定温度',
	            type:'line',
	            symbolSize: 8,
	            data:[46, 48, 46, 41, 48, 44, 50, 45, 49, 50],

	        }
	    ]
	};

	myChart.setOption(option);
	
	var myChart1 = echarts.init(document.getElementById('main1'));
	option1 = {
		color: ['#459f6e','#fe871d', '#1068ad'],
	    legend: {
			icon: 'rect',
			itemWidth: 10,
			itemHeight: 5,
			itemGap: 13,
			data: ['室外温度', '一次供水温度', '水箱温度'],
			right: '4%',
			textStyle: {
				fontSize: 12,
					
			}
		},
		tooltip : {
			trigger: 'axis',
	        axisPointer : {         
	          type : 'shadow'     
	        }
	    },
	    grid: {
			x: 50,
			y: 20,
			x2: 20,
			y2: 20,
			borderWidth: 1
		},
		
	    xAxis:  {
	    	splitLine:{show: false},
	        type: 'category',
	        boundaryGap: false,
	        data: (function() {
				var now = new Date();
				var res = [];
				var len = 10;
				while(len--) {
					res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
					now = new Date(now - 2000);
				}
				return res;
			})()
	    },
	    yAxis: {
	    	splitLine:{show: false},
	        type: 'value',
	        axisLabel: {
	            formatter: '{value} °C'
	        }
	    },
	  
	    series: [
	        {
	            name:'室外温度',
	            type:'line',
	            symbolSize: 8,
	            data:[47, 50, 48, 46, 50, 49, 54, 43, 47, 55],
	         
	        },
	        {
	            name:'一次供水温度',
	            type:'line',
	            symbolSize: 8,
	            data:[37, 40, 38, 36, 40, 39, 44, 33, 37, 45],

	        },
	        {
	            name:'水箱温度',
	            type:'line',
	            symbolSize: 8,
	            data:[46, 48, 46, 41, 48, 44, 50, 45, 49, 50],

	        }
	    ]
	};

	myChart1.setOption(option1);

})