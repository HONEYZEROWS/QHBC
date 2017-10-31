$(function () {
	
	$('.JCSJ_content_bottom_TOP_leftInput').on('click', 'input', function () {
		$(this).css({'background-color':'#0a94e3', 'color': '#fff'})
		$(this).siblings().css({'background-color':'#fff', 'color':'#0a94e3'})
		
		if($(this).val() == '手动') {
			$('.JCSJ_content_bottom_TOP_leftImages input[type="checkbox"]').show()
		} else {
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

	$('.JCSJ_content_bottom_TOP_leftImages input:eq(0)').blur(function () {
		if ($(this).val() != ' ') {
			$(this).val($(this).val() + '%')
		}
	})
	
	$('.JCSJ_content_bottom_TOP_leftImages input:not(:eq(0))').blur(function () {
		if ($(this).val() != ' ') {
			$(this).val($(this).val() + '℃')
		}
	})
	
	$('.JCSJ_content_bottom_TOP_leftImages').on('click','input',function () {
		$(this).val(' ')
	})
	
	var myChart = echarts.init(document.getElementById('main'));
	option = {
		color: ['#459f6e','#fe871d', '#1068ad'],
//	    legend: {
//			icon: 'rect',
//			itemWidth: 14,
//			itemHeight: 5,
//			itemGap: 13,
//			data: ['二次供水温度', '二次回水温度', '设定温度'],
//			right: '4%',
//			textStyle: {
//				fontSize: 12,
//				
//			}
//		},
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
//	    legend: {
//			icon: 'rect',
//			itemWidth: 14,
//			itemHeight: 5,
//			itemGap: 13,
//			data: ['室外温度', '一次供水温度', '水箱温度'],
//			right: '4%',
//			textStyle: {
//				fontSize: 12,
//					
//			}
//		},
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