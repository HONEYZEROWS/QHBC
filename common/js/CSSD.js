$(function () {
	$('.CSSD_content_last').on('click', 'img',function () {
		if ($(this).attr('src') == 'common/images/kaiguan.png') {
			$(this).attr('src','common/images/kaiguan2.png')
		} else {
			$(this).attr('src','common/images/kaiguan.png')
		}
	})
		

})