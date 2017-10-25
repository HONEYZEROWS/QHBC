$(function () {
	$('.WDSD_contentBottom div:eq(2)').on('click', 'span', function () {
		$('.WDSD_contentTepsdFirst').find('p').first().find('input').val($(this).find('i').first().text())
		$('.WDSD_contentTepsdFirst').find('p').last().find('input').val($(this).find('i').last().text())
		$('.WDSD_contentTepsdLast').find('p').first().find('input').val($(this).find('i').eq(1).text())
		$('.WDSD_contentTepsdLast').find('p').last().find('input').val($(this).find('i').last().text())
	})
	
	
	
	var myChart = echarts.init(document.getElementById('main'));
	option = {
		color: ['#459f6e','#fe871d', '#1068ad'],
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
	        data: ['-35℃', '-25℃', '-15℃',' -5℃', '5℃', '15℃' ]
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
	            data:[65, 60, 55, 50, 45, 40, 35],
	         
	        }
	    ]
	};

	myChart.setOption(option);


})