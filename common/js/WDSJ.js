$(function () {
	var mySchedule = new Schedule({
		el: '#schedule-box',
	});
	 
	$('.schedule-bd').on('click', '.current-month span', function () {
		$(this).toggleClass('selected-style')
		$('.today').html($(this).attr('title'))
	})

	var arr = ['65', '60', '52', '48', '43', '30'];

	$('input[type="text"]').click(function () {
		$(this).val('')
	})
		
	$('#changeCharts').click(function () {
		$('.alltr').find('td:not(.GSWDchange)').remove()
		$('.WDSD_contentTop input[data-type="0"]').each(function (index,item) {
			arr[index]= $(this).val()
			changeCharts (arr)
			var a = `
				<td>${$(this).val()}℃</td>
			`
			$('.alltr').append(a)
		})		
	})
	
	changeCharts (arr)

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
		            data:arr,
		         
		        }
		    ]
		};	
		myChart.setOption(option);
	}
})