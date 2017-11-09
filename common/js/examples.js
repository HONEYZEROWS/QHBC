var a = 75
$('.second.circle').circleProgress({
    value: a/100
}).on('circle-animation-progress', function(event) {
    $(this).find('strong').html(parseInt(a) + '<i>%</i>');
});

