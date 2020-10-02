$('.header-burger').click(function(event) {
	$(this).toggleClass('active');
	if($(this).hasClass('active'))
		$('.header-menu').animate({
			right: '0'}, 300);
	else
		$('.header-menu').animate({
			right: '-321'}, 300);
});

setInterval(
	function() {
		$('.header__arrow').animate({bottom: '15'}, 400)
							.animate({bottom: '30'}, 300)
							.animate({bottom: '15'}, 400)
							.animate({bottom: '30'}, 300);
	},
3000);

$('.header-menu a, .header__arrow a').on('click', function(e){
	$('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
	e.preventDefault();
});


$('[data-toggle="tooltip"]').tooltip({placement: 'bottom', container: 'body'});







function getNumber(number) {
	return String(number).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

function calc() {
	let square = $('.square .calculator-item__number span').text().split(' ').join('');
	let price = $('.price .calculator-item__number span').text().split(' ').join('');
	let res = getNumber(square*price);
	$('.cost .calculator-item__number span').text(res);
}

$('.calculator-package__item input[type="radio"]').on('click', function(event) {
	$('.price .calculator-item__number span').text($('input[name=package]:checked').val());
	calc();
});

$('.range-labels li').on('click', function () {
	$('.range-labels li.active').removeClass('active');
	$(this).addClass('active');
	$('.square .calculator-item__number span').text($(this).find('span').text());
	calc();
});

var down = false;
var x = 0;
var obj = null;

$('.range .range__point').on('mousedown', function (event) {
	down  = true;
	x = event.pageX;
	obj = $(this);
	$('.range div.active').removeClass('active');
	obj.addClass('active');
	$('.square .calculator-item__number span').text(getNumber($(obj).data('value')));
	calc();
});

$('.range .range__point').on('mouseup', function (event) {
	console.log('up');
	down  = false;
	x = 0;
	obj = null;
});


$(window).on('mousemove', function (event) {
	if(down) {
		let nearest = Array.from($('.range .range__point')).filter(function(e) {
			if(Math.abs(event.pageX - $(e).offset().left + 9) < 25 && e != obj)
				return e;
		})[0];
		if(nearest) {
			$(nearest).addClass('active');
			$(obj).removeClass('active');
			obj = nearest;
			$('.square .calculator-item__number span').text(getNumber($(obj).data('value')));
			calc();
		}
	}
});



$('.portfolio-buttons button').on('click', function () {
	$('.portfolio-buttons button.active').removeClass('active').prev().css({position: 'relative'});
	$(this).addClass('active');

	if($(this).prev() != undefined) {
		$(this).prev().css({position: 'static'});
	}

	let curData = $(this).data('tab');
	if($(this).data('tab') == "all") {
		Array.from($('.portfolio-images img')).forEach(function(img) {
			$(img).css({display: 'inline-block'});
		});
	}
	else {
		Array.from($('.portfolio-images img')).forEach(function(img) {
			if($(img).data('tab') == curData)
				$(img).css({display: 'inline-block'});
			else
				$(img).css({display: 'none'});
		});
	}
});