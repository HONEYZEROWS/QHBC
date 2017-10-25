$(function () {
	$('.XXSJSD_content').on('focus', 'input',function () {
		$(this).val('')
	})
	
	$('.XXSJSD_content').on('blur', 'input',function () {
		if ($(this).val() == '') {
			$(this).val('0')
		}
	})
	
	$('.XXSJSD_content').on('keyup', 'input',function () {	
		if($(this).val() != '0' || $(this).val() != '') {
			$(this).css('background-color', '#00a0e9')
			$(this).parent().css('background-color','#00a0e9')
		} else if($(this).val() == '' || $(this).val() == '0') {
			$(this).val('0')
			$(this).css('background-color', '#fff')
			$(this).parent().css('background-color','#fff')
		} else {
			$(this).css('background-color', '#fff')
			$(this).parent().css('background-color','#fff')
		}
	})
	
	$('.XXSJSD_content').on('change', 'input',function () {
		if ($(this).val() == '0') {
			$(this).css('background-color', '#fff')
			$(this).parent().css('background-color','#fff')
		}
	})


})