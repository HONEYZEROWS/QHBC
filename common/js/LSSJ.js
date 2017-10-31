$(function() {
	var devid = 266;
	var theDate = new Date();
	var _hour = theDate.getHours();
	var _minute = theDate.getMinutes();
	var _second = theDate.getSeconds();
	var _year = theDate.getFullYear();
	var _month = theDate.getMonth();
	var _date = theDate.getDate();
	if(_hour < 10) {
		_hour = "0" + _hour
	}
	if(_minute < 10) {
		_minute = "0" + _minute
	}
	if(_second < 10) {
		_second = "0" + _second
	}
	if(_month < 10) {
		_month = _month + 1
	}
	if(_date < 10) {
		_date = "0" + _date
	}

	//默认日历为今天
	var today = _year + "-" + _month + "-" + _date + " " + " 00:00:00";
	var today1 = _year + "-" + _month + "-" + _date +" "+ _hour + ":" + _minute + ":" + _second; 
	$('.startdate1').val(today);
	$('.enddate1').val(today1);
	
	$('.startdate2').val(today);
	$('.enddate2').val(today1);
	//当天的历史曲线（默认显示）
	var startToday = _year + "-" + _month + "-" + _date + " 00:00:00";
	var endToday = _year + "-" + _month + "-" + _date +" "+ _hour + ":" + _minute + ":" + _second; ;
	devicehistorysdata(devid, startToday, endToday);
	devicetablesdata(devid, startToday, endToday);
	$("#historydata_btn").click(function() {
		var begindate1 = $('.startdate1').val();
		var enddate1 = $('.enddate1').val();

		var start = begindate1 + " 00:00:00";
		var end = enddate1 +" "+ _hour + ":" + _minute + ":" + _second; ;

		//控制日期的选择
		if(begindate1 == "" || enddate1 == "") {
			alert('开始日期或结束日期不能为空！');
			return;
		}
		if(end < start) {
			alert('结束日期不能小于开始日期！');
			return;
		}
		devicehistorysdata(devid, start, end);
	});
	$("#historytable_btn").click(function() {
		var begindate2 = $('.startdate2').val();
		var enddate2 = $('.enddate2').val();

		var start = begindate2 + "00:00:00";
		var end = enddate2 +" "+ _hour + ":" + _minute + ":" + _second; ;

		//控制日期的选择
		if(begindate2 == "" || enddate2 == "") {
			alert('开始日期或结束日期不能为空！');
			return;
		}
		if(end < start) {
			alert('结束日期不能小于开始日期！');
			return;
		}
		$('.tbodyAll').empty();
		devicetablesdata(devid, start, end);
	});

	function devicetablesdata(devid, startdate, enddate) {
		var devname = 266;
		var index = 0;
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.57.162.77:8081/AppInterface/queryAllBzRecord?params={%22deviceId%22:' + devid + ',%22beginTime%22:%22' + startdate + '%22,%22endTime%22:%22' + enddate + '%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
	
				if(data.data){
					var datas = data.data.reverse();

					var a = [];
					for(var i = 0; i < datas.length; i++) {
						var shuju = datas[i].data.split(",");
						a[i] = [
							parseInt(shuju[6]) - parseInt(10),
							parseInt(shuju[7]) + parseInt(30),
							parseInt(shuju[8]) + parseInt(20),
							parseInt(shuju[8]) + parseInt(10),
							parseInt(shuju[8]) + parseInt(19)
						]
					}
					var row = a.length;
					$('.table_body').empty();

					$(document).Table('.table_body', 're', row, 6, ['序号', '室外温度(℃)', '阀门开度(%)', '供水温度(℃)', '回水温度(℃)', '设定温度(℃)'], [, , , , , , , , , ], a);
					$(document).PaginBar('page_navigation', 'table_body', 22);

					$("tbody").each(function() {
						var _this = $(this);
						_this.find("tr").hover(function() {
							$(this).attr("bColor", $(this).css("background-color")).css({"background-color":"#00a0e9", 'color':'#fff'}).css("cursor", "pointer");
						}, function() {
							$(this).css({"background-color":$(this).attr("bColor"), 'color': '#000'});
						});
					});
				}
			},
			error: function(err) {
				alert(err);
			}
		});
	}

	function devicehistorysdata(devid, startdate, enddate) {
		var devname = 266;
		var index = 0;
		
		$.ajax({

			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.57.162.77:8081/AppInterface/queryAllBzRecord?params={%22deviceId%22:' + devid + ',%22beginTime%22:%22' + startdate + '%22,%22endTime%22:%22' + enddate + '%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				if(data.data) {
					//查看返回的数据data
					var datas = data.data.reverse();

					var a = [];
					for(var i = 0; i < datas.length; i++) {

						var shuju = datas[i].data.split(",");

						a[i] = {
							'devdata0': parseInt(shuju[6]) - parseInt(Math.random() * 10),
							'devdata1': parseInt(shuju[7]) + parseInt(Math.random() * 10),
							'devdata2': parseInt(shuju[8]) + parseInt(Math.random() * 10),
							'devdata3': parseInt(shuju[8]) + parseInt(Math.random() * 10),
							'devdata4': parseInt(shuju[8]) + parseInt(Math.random() * 10),

							'deviceTime': datas[i].syncTime,
							'deviceName': devname
						}
					}
					var arr1 = [];
					var arr2 = [];
					var arr3 = [];
					var arr4 = [];
					var arr5 = [];
					var arr6 = [];
					a.forEach(function(item, index) {
						arr1.push(item.devdata0);
						arr2.push(item.devdata1);
						arr3.push(item.devdata2);
						arr4.push(item.devdata3);
						arr5.push(item.devdata4);
						arr6.push(item.deviceTime);
					})
	
					var myChart = echarts.init(document.getElementById('main'));
					option = {
						tooltip: {
							trigger: 'axis',

							axisPointer: {
								lineStyle: {
									color: '#57617B'
								}
							}
						},

						legend: {
							icon: 'rect',
							itemWidth: 14,
							itemHeight: 5,
							itemGap: 13,
							data: ['供水温度', '回水温度', '设定温度', '室外温度', '阀门开度'],
							top: '5%',
							right: '4%',
							textStyle: {
								fontSize: 12,
							}
						},
						grid: {
							top: '8%',
							left: '4%',
							right: '8%',
							bottom: '14%',
							containLabel: true
						},
						dataZoom: {
						    orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
						                               // 'horizontal' ¦ 'vertical'
						    // x: {number},            // 水平安放位置，默认为根据grid参数适配，可选为：
						                               // {number}（x坐标，单位px）
						    // y: {number},            // 垂直安放位置，默认为根据grid参数适配，可选为：
						                               // {number}（y坐标，单位px）
						    // width: {number},        // 指定宽度，横向布局时默认为根据grid参数适配
						    // height: {number},       // 指定高度，纵向布局时默认为根据grid参数适配
						    backgroundColor: 'rgba(0,0,0,0)',       // 背景颜色
						    dataBackgroundColor: '#eee',            // 数据背景颜色
						    fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
						    handleColor: 'rgba(70,130,180,0.8)'     // 手柄颜色
						},
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							splitLine: {　　　　
								show: false　　
							},
							axisLine: {
								onZero: false,
								lineStyle: {
								}

							},
							axisLabel: {
								textStyle: {
								}
							},
							data: arr6
						}],
						
						yAxis: {
					    	splitLine:{show: false},
					        type: 'value',
					        axisLabel: {
					            formatter: '{value} °C'
					        }
					    },
	  
						series: [{
								name: '供水温度',
								type: 'line',
								smooth: true,
								symbol: 'circle',
								symbolSize: 5,
								showSymbol: false,
								lineStyle: {
									normal: {
										width: 1
									}
								},
								areaStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgba(137, 189, 27, 0.3)'
										}, {
											offset: 0.8,
											color: 'rgba(137, 189, 27, 0)'
										}], false),
										shadowColor: 'rgba(137, 189, 27, 0)',
										shadowBlur: 10
									}
								},
								itemStyle: {
									normal: {
										color: 'rgb(137,189,27)',
										borderColor: 'rgba(0,0,0,0.27)',
										borderWidth: 12

									}
								},
								data: arr3
							}, {
								name: '回水温度',
								type: 'line',
								smooth: true,
								symbol: 'circle',
								symbolSize: 5,
								showSymbol: false,
								lineStyle: {
									normal: {
										width: 1
									}
								},
								areaStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgba(0, 136, 212, 0.3)'
										}, {
											offset: 0.8,
											color: 'rgba(0, 136, 212, 0)'
										}], false),
										shadowColor: 'rgba(0, 0, 0, 0.1)',
										shadowBlur: 10
									}
								},
								itemStyle: {
									normal: {
										color: 'rgb(0,136,212)',
										borderColor: 'rgba(0,136,212,0.2)',
										borderWidth: 12

									}
								},
								data: arr4
							}, {
								name: '设定温度',
								type: 'line',
								smooth: true,
								symbol: 'circle',
								symbolSize: 5,
								showSymbol: false,
								lineStyle: {
									normal: {
										width: 1
									}
								},
								areaStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgba(219, 50, 51, 0.3)'
										}, {
											offset: 0.8,
											color: 'rgba(219, 50, 51, 0)'
										}], false),
										shadowColor: 'rgba(0, 0, 0, 0.1)',
										shadowBlur: 10
									}
								},
								itemStyle: {
									normal: {

										color: 'rgb(219,50,51)',
										borderColor: 'rgba(219,50,51,0.2)',
										borderWidth: 12
									}
								},
								data: arr5
							},
							{
								name: '室外温度',
								type: 'line',
								smooth: true,
								symbol: 'circle',
								symbolSize: 5,
								showSymbol: false,
								lineStyle: {
									normal: {
										width: 1
									}
								},
								areaStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgba(81, 76, 202, 0.3)'
										}, {
											offset: 0.8,
											color: 'rgba(81, 76, 202, 0)'
										}], false),
										shadowColor: 'rgba(0, 0, 0, 0.1)',
										shadowBlur: 10
									}
								},
								itemStyle: {
									normal: {
										color: 'rgb(81, 76, 202)',
										borderColor: 'rgba(81, 76, 202,0.2)',
										borderWidth: 12
									}
								},
								data: arr1
							},
							{
								name: '阀门开度',
								type: 'line',
								smooth: true,
								symbol: 'circle',
								symbolSize: 5,
								showSymbol: false,
								lineStyle: {
									normal: {
										width: 1
									}
								},
								areaStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgba(255, 235, 59, 0.3)'
										}, {
											offset: 0.8,
											color: 'rgba(255, 235, 59, 0)'
										}], false),
										shadowColor: 'rgba(0, 0, 0, 0.1)',
										shadowBlur: 10
									}
								},
								itemStyle: {
									normal: {
										color: 'rgb(255, 235, 59)',
										borderColor: 'rgba(255, 235, 59,0.2)',
										borderWidth: 12
									}
								},
								data: arr2
							},
						]
					};
					myChart.setOption(option);

				}
			},
			error: function(err) {
				alert(err);
			}
		});
	}

})

