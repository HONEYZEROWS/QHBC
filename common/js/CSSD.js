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

	$('.CSSD_content_last').on('click', 'img',function () {
		if ($(this).attr('src') == 'common/images/kaiguan.png') {
			$(this).attr('src','common/images/kaiguan2.png')
			$(this).attr("data-type", "1")
		} 
		else {
			$(this).attr('src','common/images/kaiguan.png')
			$(this).attr("data-type", "0")
		}
	})
	
	$('#PID_sz').click(function () {
		var _PID_zfsd = $('#PID_zfsd').val() 
		var _PID_blzy = $('#PID_blzy').val() 
		var _PID_cysj = $('#PID_cysj').val() 
		var _PID_jfsj = $('#PID_jfsj').val() 
		var arr = [_PID_zfsd,_PID_blzy,_PID_cysj,_PID_jfsj]
		var arr1 = []
		$.each(arr, function (index,item) {
			arr1[index] = item
		})
		
		arr1[0] = PrefixInteger(arr[0],1)
		arr1[1] = PrefixInteger(arr[1],2)
		arr1[2] = PrefixInteger(arr[2],2)
		arr1[3] = PrefixInteger(arr[3],2)
		
		arr1 = "F3" + "," +  arr1.join(',')
		postPID_down(arr)
		getDataDown(arr1)
	})

	
	function postPID_down (devP1) {
		$.ajax({
			//要用post方式
			type: "post",
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:' + _datauserId +',%22id%22:%22'+_datadeviceId+'%22,%22devP1%22:%22'+ devP1+'%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {
				console.log(data)
			}
		})	
	}

	$('#SB_sz').click(function () {
//		var _SB_1 = $('#SB_1').children('img').attr('data-type')
		var _SB_2 = $('#SB_2').children('img').attr('data-type')
		var sbArr = [];
//		sbArr.push(_SB_1) 
		sbArr.push(_SB_2) 
		postSB_down(sbArr)
		resultsbArr = "F7," + sbArr.join(',')
		getDataDown(resultsbArr)
	})
	
	
	function postSB_down (devP2) {
		$.ajax({
			//要用post方式
			type: "post",		
			//方法所在页面和方法名
			url: 'http://123.56.156.91:8081/AppInterface/modifyDevice?params={%22userId%22:'+_datauserId+',%22id%22:%22'+_datadeviceId+'%22,%22devP2%22:%22'+ devP2+'%22}',
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
				//PID
				var devP1 = data.devP1
				devP1 = devP1.split(',')
				$('#PID_zfsd').val(devP1[0])
				$('#PID_blzy').val(devP1[1])
				$('#PID_cysj').val(devP1[2])
				$('#PID_jfsj').val(devP1[3])

				var devP2 = data.devP2
				var SB_img1 = '<img src="common/images/kaiguan.png"  data-type = "0"/>'
				var SB_img2 = '<img src="common/images/kaiguan2.png"  data-type = "1"/>'	
//				if (devP2[0] == 0) {
//					$('#SB_1').html(SB_img1)
//				} else {
//					$('#SB_1').html(SB_img2)
//				}
				if (devP2 == 0) {
					$('#SB_2').html(SB_img1)
				} else {
					$('#SB_2').html(SB_img2)
				}
				
			}
		})	
	}
	loadData()
	
	function PrefixInteger(num, length) {  
	 return ( "0000" + num ).substr( -length );  
	}

})