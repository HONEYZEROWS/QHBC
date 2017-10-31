$(function () {
	$('.CSSD_content_last').on('click', 'img',function () {
		if ($(this).attr('src') == 'common/images/kaiguan.png') {
			$(this).attr('src','common/images/kaiguan2.png')
			$(this).parents('tr').siblings('tr').find('img').attr('src','common/images/kaiguan.png')
		} else {
			$(this).attr('src','common/images/kaiguan.png')
			$(this).parents('tr').siblings('tr').find('img').attr('src','common/images/kaiguan2.png')
		}
	})
		

})