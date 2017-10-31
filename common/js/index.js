$(function () {
	$('.amap-logo img').css('display', 'none')

	var map = new AMap.Map('container', {
	    pitch:70,
	    viewMode:'3D',
	    zoom: 12,
	    expandZoomRange:true,
	    center: [115.4338790000,39.3753670000],
	    resizeEnable: true,
	});

	var provinces = [
	{
		"name": '易县职业技术教育中心',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
		"center" : "115.5647870000,39.3571160000",
	},
	{
		"name": '易县第二高级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png',
		"center" : "115.5160100000, 39.3732800000"
	},
	{
		"name": '易县西陵满族初级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3790700000, 39.3597100000"
	},
	{
		"name": '易县燕都九年一贯制学校',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5403790000,39.3571220000"
	},
	{
		"name": '易县塘湖初级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3850800000, 39.1957500000"
	},
	{
		"name": '易县狼牙山中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.1458800000,39.0882500000"
	},
	{
		"name": '易县裴山初级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4635400000,39.2172800000"
	},
	{
		"name": '界安中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3417100000,39.1750200000"
	},
	{
		"name": '易县第四小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4771,39.3626100000"
	},
	{
		"name": '易县高村初级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.47081,39.2823600000"
	},
	{
		"name": '西山北中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.2829590000,39.1345560000"
	},
	{
		"name": '尉都中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4505930000,115.4505930000"
	},
	{
		"name": '坡仓中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "114.9990860000,39.2097430000"
	},
	{
		"name": '易县紫荆关中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.1722290000,39.4293190000"
	},
	{
		"name": '紫荆关上陈驿小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.1962120000,39.3738410000"
	},
	{
		"name": '啬色园小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.1737482907,39.4295984147"
	},
	{
		"name": '紫荆关大盘石小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.0942400000,39.4194400000"
	},
	{
		"name": '易县高陌初级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5477800000,39.2879710000"
	},
	{
		"name": '易县高陌初级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5190640000,39.3879690000"
	},
	{
		"name": '东罗中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4612800000,39.2586000000"
	},
	{
		"name": '易县牛岗中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.1616100000,39.2590800000"
	},
	{
		"name": '易县第三小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5054600000,39.3612200000"
	},
	{
		"name": '易县第三小学-分校',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5054600000,39.3612200000"
	},
	{
		"name": '易县凌云册中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5096400000,39.2368900000"
	},
	{
		"name": '良岗中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.0715690000,39.2506480000"
	},
	{
		"name": '流井中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "117.9735600000,35.0183000000"
	},
	{
		"name": '西陵中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3426900000,39.3615800000"
	},
	{
		"name": '独乐中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.2142200000,39.0895000000"
	},
	{
		"name": '神石庄中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3932900000,39.2937400000"
	},
	{
		"name": '南城司中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.2557600000,39.5349400000"
	},
	{
		"name": '南城司幼儿园',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.2551400000,39.5341600000"
	},
	{
		"name": '白虹小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3618400000,39.2530600000"
	},
	{
		"name": '南街小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4553200000,39.2339300000"
	},
	{
		"name": '易县特殊教育中心',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5025482430,39.3171132058"
	},
	{
		"name": '大北城小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.6026600000,39.2990200000"
	},
	{
		"name": '扬中小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5599708881,39.2857011471"
	},
	{
		"name": '黄水小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3912867094,39.3626279794"
	},
	{
		"name": '西北奇小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4633200000,39.2975300000"
	},
	{
		"name": '塘湖回民小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3704000000,39.2038300000"
	},
	{
		"name": '东邵中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5093318897,39.1923870656"
	},
	{
		"name": '东于坻中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5896970000,39.2816230000"
	},
	{
		"name": '大龙华中心小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.2663495027,39.3233476962"
	},
	{
		"name": '小龙华小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.2910900000,39.3346500000"
	},
	{
		"name": '大龙华野里店教学点',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.3029670000,39.2891820000"
	},
	{
		"name": '大龙华教学点',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.2748082186,39.3234341157"
	},
	{
		"name": '易县第四幼儿园',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5086110000,39.3598760000"
	},
	{
		"name": '陈旺小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5964380000,39.3236790000"
	},
	{
		"name": '坟庄小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5762170000,39.4035070000"
	},
	{
		"name": '西茹堡小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.570676,39.3377630000"
	},
	{
		"name": '西范村小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.5387740000,39.3339470000"
	},
	{
		"name": '东市小学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4887650000,39.3232500000"
	},
	{
		"name": '易县梁格庄初级中学',
		"icon": 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		"center" : "115.4338790000,39.3753670000"
	}
	]
	var tepArr = []
	for (var i = 0; i < 52; i++) {
		tepArr[i] = i
	}
	tepArr.forEach(function (item,index) {
		provinces[index].count = item + "℃"
	})
	var createMarker = function(data) {
		var marker = new AMap.Marker({			
			content: "<div class='circle'><p>" +data.count + "</p></div>",
			title : data.name,
			icon: data.icon,
			position: data.center.split(','),
//			offset: new AMap.Pixel(-24, 5),
		});
		marker.setMap(map)
	}
	
	var markers = [];
	for (var i = 0; i < provinces.length; i += 1) {
		var marker = createMarker(provinces[i]);
		markers.push(marker);
	}
})	