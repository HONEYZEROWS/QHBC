$(function () {
	var _datauserId = $.cookie('datauserId')
	var _datadeviceId = $.cookie('datadeviceId')

	$('input[type="text"]').click(function () {
		 _thisvalue = $(this).val()
		$(this).val('')
	})
	
	$('input[type="text"]').blur(function () {
		if($(this).val() == '') {
			$(this).val(_thisvalue)
		}
	})

	
	$('#changeCharts').click(function () {
		//六位供水温度
		var arr = []
		//十位供水温度
		var arr1 = []
		$('.alltr').find('td:not(.GSWDchange)').remove()
		$('.WDSD_contentTop input[data-type="0"]').each(function (index,item) {
			arr[index]= $(this).val()
			var a = `<td>${$(this).val()}℃</td>`
			$('.alltr').append(a)
		})		

		changeCharts (arr)
//		console.log(arr)
		//存数据库
		postGSWD_down(arr)
		
		$('.WDSD_contentTop input[type="text"]').each(function (index,item) {
			arr1[index]= $(this).val()
		})	
		
		var arr2 = arr;
		$.each(arr2,function (index,item) {
			arr2[index] = PrefixInteger(item,3)
		})
		
		arr2 = "F2" + "," + arr2.join(',')
		//下控设备
		getDataDown(arr2)
	})

	function postGSWD_down (latitude) {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22latitude%22:%22'+ latitude+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
		
	//防冻温度	
	$('#YCC_fdwd_finish').click(function () {
		var _YCC_fdwd = $('#YCC_fdwd').val()
		postFDWD_down(_YCC_fdwd)
		var _getYCC_fdwd = "F5" + "," + PrefixInteger(_YCC_fdwd,3)
		getDataDown(_getYCC_fdwd)
	})
	
	function postFDWD_down (longitude) {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22longitude%22:%22'+ longitude+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}

	//上课周末假期温度设置
	$('#classtime_finish').click(function () {
		var _afterclass = $('#afterclass').val()
		var _week = $('#week').val()
		var _holiday = $('#holiday').val()
		var arr = [_afterclass,_week,_holiday]		
		postTSSJGSWD_down(arr)
		var arr1 = arr
		$.each(arr1, function(index, item) {
			arr1[index] = PrefixInteger(item, 3)
		});
		arr1 = "F1" + "," + arr1.join(',')
		getDataDown(arr1)
	})
	
	function postTSSJGSWD_down (netNo) {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22netNo%22:%22'+ netNo+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
	
	$('.tepOne').blur(function () {
		$('.tepOne').val($(this).val())
	})

	$('.tepTwo').blur(function () {
		$('.tepTwo').val($(this).val())
	})
	
	$('.tepThree').blur(function () {
		$('.tepThree').val($(this).val())
	})
	
	$('.tepFour').blur(function () {
		$('.tepFour').val($(this).val())
	})
	
	function changeCharts (arr) {
		var myChart = echarts.init(document.getElementById('main'));
		option = {
			color: ['#459f6e','#fe871d', '#1068ad'],
		    grid: {
				x: 50,
				y: 20,
				x2: 20,
				y2: 30,
				borderWidth: 1
			},	
		    xAxis:  {
		    	splitLine:{show: false},
		        type: 'category',
		        boundaryGap: false,
		        data: ['-35℃', '-25℃', '-15℃',' -5℃', '5℃', '20℃' ]
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
		            data:arr,
		         
		        }
		    ]
		};	
		myChart.setOption(option);
	}
		
	$('.XXSJSD_contentDate table').on('click', 'span[data-type3="day"]', function () {
		var _spanthis = $(this)
		$('.changeMS').show()
		$('.content_bottom').css('overflow-y', 'hidden')
		
		$('#cancel_bth').click(function () {
			$('.changeMS').hide()
			$(".changeMS").load(location.href+" .changeMS")
			$('.content_bottom').css('overflow-y', 'scroll')
		})
		
		$('#changeSKcancel_bth').click(function () {
			$('.changeSK').hide()
			$(".changeSK").load(location.href+" .changeSK")
			$('.content_bottom').css('overflow-y', 'scroll')
		})
		
		$('.changeMS_center span').click(function () {
			$('.changeMS').hide()
			$('.content_bottom').css('overflow-y', 'scroll')
		})

		$('.changeMS_center p:eq(0)').click(function () {
			$('#finish_btn').val('下一步')
		})

		$('.changeMS_center p').click(function () {
			$(this).css('background-color', 'rgba(226, 220, 220, 0.7)')
			$(this).siblings('p').css('background-color', '#fff')
			
			var model= $(this).attr('data-type')
			
			$('#finish_btn').click(function () {
				_spanthis.removeAttr('class')
				if (model == 1) {
					_spanthis.addClass('jiaqi')
					_spanthis.attr('data-type','1')
				} else if (model == 2) {
					_spanthis.addClass('zhoumo')
					_spanthis.attr('data-type','2')
				} else if(model == 0){
					_spanthis.addClass('shangxue')
					_spanthis.attr('data-type','0')
					$('.changeSK').show()
				}
				$('.changeMS').hide()
				$('.changeMS').load(location.href+" .changeMS")
				$('.content_bottom').css('overflow-y', 'scroll')
			})
		})	
		var alltime = []
		$('#changeSKfinish_btn').click(function () {
			$(this).siblings().children('select').find('option:selected').each(function (index) {
				alltime[index] = $(this).html()
				_spanthis.attr('data-type1',alltime[0]+alltime[1])
				_spanthis.attr('data-type2',alltime[2]+alltime[3])
			})
			$('.changeSK').hide()
			$('.changeSK').load(location.href+" .changeSK")
			$('.content_bottom').css('overflow-y', 'scroll')
		})
	})

	var date = new Date();
	$('.cld_year').html(date.getFullYear())
	$('.cld_year2').html(date.getFullYear())
	$('.cld_year3').html(date.getFullYear() + 1)
	$('.cld_year4').html(date.getFullYear() + 1)
	$('.cld_year5').html(date.getFullYear() + 1)
	var year =   $('.cld_year').html()
	var month =  $('.cld_month').html()
	function riliTableHtml(year, month) {
	    var firstDay = new Date(year, month-1);
	    var weekday = firstDay.getDay();
	    var days = new Date(year, month, 0).getDate();
	    var res = [];
	    for (var i = 0; i < weekday; i++) {
	        res.push('');
	    }
	    for (var j = 1; j <= days; j++) {
	        res.push(j);
	    }
	    var tabHtml = '';
	    for (var i = 0; i < res.length; i++) {
	        var td = '<td><span>' + res[i] + '</span></td>';
	
	        if (i % 7 == 0) {
	            tabHtml += '<tr>' + td;
	        } else if ((i + 1) % 7 == 0) {
	            tabHtml += td + '</tr>';
	        } else {
	            tabHtml += td;
	        }
	    }
	    $('.cld_table tbody').html(tabHtml); 
	}
	
	riliTableHtml(year, month);
	var year2 =   $('.cld_year2').html()
	var month2 =  $('.cld_month2').html()
	function riliTableHtml2(year, month) {
	    var firstDay = new Date(year, month-1);
	    var weekday = firstDay.getDay();
	    var days = new Date(year, month, 0).getDate();
	    var res = [];
	    for (var i = 0; i < weekday; i++) {
	        res.push('');
	    }
	    for (var j = 1; j <= days; j++) {
	        res.push(j);
	    }
	    var tabHtml = '';
	    for (var i = 0; i < res.length; i++) {
	        var td = '<td><span>' + res[i] + '</span></td>';
	
	        if (i % 7 == 0) {
	            tabHtml += '<tr>' + td;
	        } else if ((i + 1) % 7 == 0) {
	            tabHtml += td + '</tr>';
	        } else {
	            tabHtml += td;
	        }
	    }
	    $('.cld_table2 tbody').html(tabHtml); 
	}
	
	riliTableHtml2(year2, month2);
	
	var year3 =   $('.cld_year3').html()
	var month3 =  $('.cld_month3').html()
	function riliTableHtml3(year, month) {
	    var firstDay = new Date(year, month-1);
	    var weekday = firstDay.getDay();
	    var days = new Date(year, month, 0).getDate();
	    var res = [];
	    for (var i = 0; i < weekday; i++) {
	        res.push('');
	    }
	    for (var j = 1; j <= days; j++) {
	        res.push(j);
	    }
	    var tabHtml = '';
	    for (var i = 0; i < res.length; i++) {
	        var td = '<td><span>' + res[i] + '</span></td>';
	
	        if (i % 7 == 0) {
	            tabHtml += '<tr>' + td;
	        } else if ((i + 1) % 7 == 0) {
	            tabHtml += td + '</tr>';
	        } else {
	            tabHtml += td;
	        }
	    }
	    $('.cld_table3 tbody').html(tabHtml); 
	}
	
	riliTableHtml3(year3, month3);
	
	var year4 =   $('.cld_year4').html()
	var month4 =  $('.cld_month4').html()
	function riliTableHtml4(year, month) {
	    var firstDay = new Date(year, month-1);
	    var weekday = firstDay.getDay();
	    var days = new Date(year, month, 0).getDate();
	    var res = [];
	    for (var i = 0; i < weekday; i++) {
	        res.push('');
	    }
	    for (var j = 1; j <= days; j++) {
	        res.push(j);
	    }
	    var tabHtml = '';
	    for (var i = 0; i < res.length; i++) {
	        var td = '<td><span>' + res[i] + '</span></td>';
	
	        if (i % 7 == 0) {
	            tabHtml += '<tr>' + td;
	        } else if ((i + 1) % 7 == 0) {
	            tabHtml += td + '</tr>';
	        } else {
	            tabHtml += td;
	        }
	    }
	    $('.cld_table4 tbody').html(tabHtml); 
	}
	
	riliTableHtml4(year4, month4);
	
	
	var year5 =   $('.cld_year5').html()
	var month5 =  $('.cld_month5').html()
	function riliTableHtml5(year, month) {
	    var firstDay = new Date(year, month-1);
	    var weekday = firstDay.getDay();
	    var days = new Date(year, month, 0).getDate();
	    var res = [];
	    for (var i = 0; i < weekday; i++) {
	        res.push('');
	    }
	    for (var j = 1; j <= days; j++) {
	        res.push(j);
	    }
	    var tabHtml = '';
	    for (var i = 0; i < res.length; i++) {
	        var td = '<td><span>' + res[i] + '</span></td>';
	
	        if (i % 7 == 0) {
	            tabHtml += '<tr>' + td;
	        } else if ((i + 1) % 7 == 0) {
	            tabHtml += td + '</tr>';
	        } else {
	            tabHtml += td;
	        }
	    }
	    $('.cld_table5 tbody').html(tabHtml); 
	}
	
	riliTableHtml5(year5, month5);
	
	
	//修改默认上下课时间
	function getTime () {
		var getTime = [];
		$('.getTime select:not([name="telTime"])').children('option:checked').each(function (index) {
			getTime[index] = $(this).html()
//			console.log(getTime)
			$('.XXSJSD_contentDate table span').each(function () {
				if ($(this).html() != ''){
					$(this).attr({'data-type':'0', 'data-type1': getTime[0]+getTime[1], 'data-type2': getTime[2]+getTime[3], 'data-type3':'day','class':''})
				}
			})
		})
		postSKSJ_down(getTime)
	}
	getTime()
	
	$('#postTime').click(function () {
		getTime()
//		$('#cld_table_finish').trigger('click')
//		setTimeout(function () {
//			$('#cld_table2_finish').trigger('click')
//		}, 10000)
//		setTimeout(function () {
//			$('#cld_table3_finish').trigger('click')
//		}, 20000)
//		setTimeout(function () {
//			$('#cld_table4_finish').trigger('click')
//		}, 30000)
//		setTimeout(function () {
//			$('#cld_table5_finish').trigger('click')
//		}, 40000)
	})
	
	function postSKSJ_down (devS6) {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devS6%22:%22'+ devS6+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
	
	function PrefixInteger(num, length) {  
	 return ( "0000" + num ).substr( -length );  
	}
	
	//获取模式
	$('.XXSJSD_contentDate input[type="button"]').click(function () {
		var allarr = []
		var indexarr = []

		$(this).siblings('table').find('span[data-type3="day"]').each(function (index) {
			var _model = $(this).attr('data-type')
			var _model1 = $(this).attr('data-type1')
			var _model2 = $(this).attr('data-type2')
		 	allarr[index] = _model +"," + _model1 + "," + _model2
		 	indexarr.push(index)
		})

		var _month = $(this).parents('div').children('h6').children('._month').html()
		var _year = $(this).parents('div').children('h6').children('._year').html()

		if (_month == 11) {
			_month = 0
		} else if(_month == 12) {
			_month = new Date(_year,_month-1,0).getDate()
		} else if (_month == 01) {
			_month = new Date(_year-1,12,0).getDate()+new Date(_year-1, 11,0).getDate()
		} else if (_month == 02) {
			_month = new Date(_year,_month-1,0).getDate()+new Date(_year-1,12,0).getDate()+new Date(_year-1, 11,0).getDate()
 		} else if (_month == 03) {
 			_month = new Date(_year,_month-2,0).getDate()+new Date(_year,_month-1,0).getDate()+new Date(_year-1,12,0).getDate()+new Date(_year-1, 11,0).getDate()
 		}
		
		var starthead = "F0" + ","+PrefixInteger(_month, 3)+ ","+PrefixInteger(indexarr.length, 3)
		allarr.unshift(starthead)
		allarr = allarr.join(",")

		getDataDown(allarr)
	})

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
	
	$('#cld_table_finish').click(function () {
		var allarrdata_type = []
		var allarrdata_type1 = []
		var allarrdata_type2 = []
		var allarrdata_class = []
		
		var allarr = []

		$(this).siblings('table').find('td span').each(function (index) {
			allarrdata_type[index] =  $(this).attr('data-type') 
			allarrdata_type1[index] =  $(this).attr('data-type1')
			allarrdata_type2[index] =  $(this).attr('data-type2')
			allarrdata_class[index] =  $(this).attr('class')
		})

		allarr.push(allarrdata_type)
		allarr.push(allarrdata_type1)
		allarr.push(allarrdata_type2)
		allarr.push(allarrdata_class)
		getData(allarr)
		
//		console.log(allarr)
	})
		
	function getData (devS1) {
		$.ajax({
			//要用post方式s
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devS1%22:%22'+ devS1+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
	
	$('#cld_table2_finish').click(function () {
		var allarrdata_type = []
		var allarrdata_type1 = []
		var allarrdata_type2 = []
		var allarrdata_class = []
		
		var allarr = []

		$(this).siblings('table').find('td span').each(function (index) {
			allarrdata_type[index] =  $(this).attr('data-type') 
			allarrdata_type1[index] =  $(this).attr('data-type1')
			allarrdata_type2[index] =  $(this).attr('data-type2')
			allarrdata_class[index] =  $(this).attr('class')
		})

		allarr.push(allarrdata_type)
		allarr.push(allarrdata_type1)
		allarr.push(allarrdata_type2)
		allarr.push(allarrdata_class)
		getData1(allarr)
		console.log(allarr)
	})
		
	function getData1 (devS2) {
		$.ajax({
			//要用post方式s
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devS2%22:%22'+ devS2+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}

	$('#cld_table3_finish').click(function () {
		var allarrdata_type = []
		var allarrdata_type1 = []
		var allarrdata_type2 = []
		var allarrdata_class = []
		
		var allarr = []

		$(this).siblings('table').find('td span').each(function (index) {
			allarrdata_type[index] =  $(this).attr('data-type') 
			allarrdata_type1[index] =  $(this).attr('data-type1')
			allarrdata_type2[index] =  $(this).attr('data-type2')
			allarrdata_class[index] =  $(this).attr('class')
		})

		allarr.push(allarrdata_type)
		allarr.push(allarrdata_type1)
		allarr.push(allarrdata_type2)
		allarr.push(allarrdata_class)
		getData2(allarr)
//		console.log(allarr)
	})
		
	function getData2 (devS3) {
		$.ajax({
			//要用post方式s
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devS3%22:%22'+ devS3+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
	
	$('#cld_table4_finish').click(function () {
		var allarrdata_type = []
		var allarrdata_type1 = []
		var allarrdata_type2 = []
		var allarrdata_class = []
		
		var allarr = []

		$(this).siblings('table').find('td span').each(function (index) {
			allarrdata_type[index] =  $(this).attr('data-type') 
			allarrdata_type1[index] =  $(this).attr('data-type1')
			allarrdata_type2[index] =  $(this).attr('data-type2')
			allarrdata_class[index] =  $(this).attr('class')
			
		})

		allarr.push(allarrdata_type)
		allarr.push(allarrdata_type1)
		allarr.push(allarrdata_type2)
		allarr.push(allarrdata_class)
		getData3(allarr)
//		console.log(allarr)
	})
		
	function getData3 (devS4) {
		$.ajax({
			//要用post方式s
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devS4%22:%22'+ devS4+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
	
	$('#cld_table5_finish').click(function () {
		var allarrdata_type = []
		var allarrdata_type1 = []
		var allarrdata_type2 = []
		var allarrdata_class = []
		
		var allarr = []

		$(this).siblings('table').find('td span').each(function (index) {
			allarrdata_type[index] =  $(this).attr('data-type') 
			allarrdata_type1[index] =  $(this).attr('data-type1')
			allarrdata_type2[index] =  $(this).attr('data-type2')
			allarrdata_class[index] =  $(this).attr('class')
		})

		allarr.push(allarrdata_type)
		allarr.push(allarrdata_type1)
		allarr.push(allarrdata_type2)
		allarr.push(allarrdata_class)
//		console.log	(allarrdata_class)
		getData4(allarr)
	})
		
	function getData4 (devS5) {
		$.ajax({
			//要用post方式s
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devS5%22:%22'+ devS5+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}
		
//	setInterval(loadData,5000)
	function loadData () {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8089/getBzRecord?params={%22deviceId%22:'+_datadeviceId+'}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				var data = data.deviceInfo
				console.log(data)
				var data_type = data.devS1
				data_type = data_type.split(',')
				var a = data_type.length/4
				var data_type_result = [];				
			
				for(var i=0,len=data_type.length;i<len;i+=a){
				   data_type_result.push(data_type.slice(i,i+a));
				}
				
				$('.cld_table table').find('td span').each(function (index) {
					$(this).attr('data-type', data_type_result[0][index])
					$(this).attr('data-type1', data_type_result[1][index])
					$(this).attr('data-type2', data_type_result[2][index])
					$(this).attr('class', data_type_result[3][index])
				})
				
				
				var data_type1 = data.devS2
				data_type1 = data_type1.split(',')
				var b = data_type1.length/4
				var data_type_result1 = [];
				
				for(var i=0,len=data_type1.length;i<len;i+=b){
				   data_type_result1.push(data_type1.slice(i,i+b));
				}

				$('.cld_table2 table').find('td span').each(function (index) {
					$(this).attr('data-type', data_type_result1[0][index])
					$(this).attr('data-type1', data_type_result1[1][index])
					$(this).attr('data-type2', data_type_result1[2][index])
					$(this).attr('class', data_type_result1[3][index])
				})
				
				var data_type2 = data.devS3
				data_type2 = data_type2.split(',')
				var c = data_type2.length/4
			
				var data_type_result2 = [];
				
				for(var i=0,len=data_type2.length;i<len;i+=c){
				   data_type_result2.push(data_type2.slice(i,i+c));
				}
			
				$('.cld_table3 table').find('td span').each(function (index) {
					$(this).attr('data-type', data_type_result2[0][index])
					$(this).attr('data-type1', data_type_result2[1][index])
					$(this).attr('data-type2', data_type_result2[2][index])
					$(this).attr('class', data_type_result2[3][index])
				})
				
				var data_type3 = data.devS4
				data_type3 = data_type3.split(',')
				var d = data_type3.length/4
				var data_type_result3 = [];
				
				for(var i=0,len=data_type3.length;i<len;i+=d){
				   data_type_result3.push(data_type3.slice(i,i+d));
				}

				$('.cld_table4 table').find('td span').each(function (index) {
					$(this).attr('data-type', data_type_result3[0][index])
					$(this).attr('data-type1', data_type_result3[1][index])
					$(this).attr('data-type2', data_type_result3[2][index])
					$(this).attr('class', data_type_result3[3][index])
				})
				
				
				var data_type4 = data.devS5
				data_type4 = data_type4.split(',')
				var e = data_type4.length/4
				var data_type_result4 = [];
				
				for(var i=0,len=data_type4.length;i<len;i+=e){
				   data_type_result4.push(data_type4.slice(i,i+e));
				}

				$('.cld_table5 table').find('td span').each(function (index) {
					$(this).attr('data-type', data_type_result4[0][index])
					$(this).attr('data-type1', data_type_result4[1][index])
					$(this).attr('data-type2', data_type_result4[2][index])
					$(this).attr('class', data_type_result4[3][index])
				})
				
				//二次供水温度数组
				var latitude  = data.latitude

				latitude = latitude.split(',')

				$('.alltr').find('td:not(.GSWDchange)').remove()
				$('.WDSD_contentTop input[type="text"]').each(function (index,item) {
					$(this).val(latitude[index])
				})
				var latitude2 = latitude;  
				changeCharts(latitude2)
				$.each(latitude2, function (index, item) {
					var a = `<td>${item + "℃"}</td>`
					$('.alltr').append(a)
				})
				
				//防冻温度
				$('#YCC_fdwd').val(data.longitude)
				
				//特殊时段温度
				var _netNO = data.netNo.split(',')

				$('#afterclass').val(_netNO[0])
				$('#week').val(_netNO[1])
				$('#holiday').val(_netNO[2])
				
				
				//上下课时间
				var _devS6 = data.devS6.split(',')
					
				$('#SK_time1 option').each(function () {
					if ($(this).html() == _devS6[0]) {
						$(this).attr('selected', 'selected')
						$(this).siblings().removeAttr('selected')
					}
				})
				$('#SK_time2 option').each(function () {
					if ($(this).html() == _devS6[1]) {
						$(this).attr('selected', 'selected')
						$(this).siblings().removeAttr('selected')
					}
				})
				$('#SK_time3 option').each(function () {
					if ($(this).html() == _devS6[2]) {
						$(this).attr('selected', 'selected')
						$(this).siblings().removeAttr('selected')
					}
				})
				$('#SK_time4 option').each(function () {
					if ($(this).html() == _devS6[3]) {
						$(this).attr('selected', 'selected')
						$(this).siblings().removeAttr('selected')
					}
				})
					
			}
		})	
	}
	loadData()
})

