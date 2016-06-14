//код для body-background

(function() {
	var body = $('body'),
		black = $('.black-bg');

		if(black.length !== 0) {
			body.addClass('body-black');
		}else{
			body.addClass('body-white');
		};		
}());


//prevent default для ссылок с #test
(function(){
    $("a[href='#test']").on('click', function(e) {
        e.preventDefault();
    });
}());




// Меню-гамбургер

	(function() {
		var $trigger = $('.trigger'),
			hamburger = $('.hamburger'),
			menu = $('.header-menu-list');

		$trigger.on('click', function() {


			if(menu.hasClass('menu-hidden')) {
				menu.removeClass('menu-hidden').addClass('menu-show');
				hamburger.addClass('is-active');
			}else if(menu.hasClass('menu-show')) {
				menu.removeClass('menu-show').addClass('menu-hidden');
				hamburger.removeClass('is-active');
			};
		});
	}());


//Плавное появление страниц
$(document).ready(function() {
	$('.article').addClass('article_show');
})


//Выделение активной ссылки в меню
$(document).ready(function() {
	$('.header-menu__link').each(function () {
		if (this.href == location.href) {
			$(this).parent().addClass('header-menu__item--active');
		};
	});
});


//Gallery slider
var slider = (function () {

	var init       = function () {
		    _setUpListners();
	    },
	    img      = $('.content-gallery__img'),
	    prev_click = $('.gallery__button-prev'),
	    next_click = $('.gallery__button-next');

	// img.eq(0).addClass('active__img').fadeIn(1000);

	var _setUpListners = function () {

		next_click.on('click', function (e) {
			e.preventDefault();
			animate_next();
		});

		prev_click.on('click', function (e) {
			e.preventDefault();
			animate_prev();
		});

	};

	function animate_next() {
		var length = img.length - 1;

		img.each(function (index) {

			if ($(this).hasClass('active__img') && index != length) {
				$(this).removeClass('active__img').fadeOut(300).next(img).addClass('active__img').delay(300).fadeIn(300);
				return false;
			} else if (index == length) {
				$(this).removeClass('active__img').fadeOut(300);
				img.eq(0).addClass('active__img').delay(300).fadeIn(300);
				return false;
			}
		});
	}


	function animate_prev() {

		img.each(function (index) {
			if ($(this).hasClass('active__img') && index != 0) {
				$(this).removeClass('active__img').fadeOut(300).prev(img).addClass('active__img').delay(300).fadeIn(300);
				return false;
			} else if (img.eq(0).hasClass('active__img')) {
				$(this).removeClass('active__img').fadeOut(300);
				img.last().addClass('active__img').delay(300).fadeIn(300);
				return false;
			}
		});
	}

	return {
		init : init
	};

})();


$(document).ready(function () {
	if ($('.content-block-gallery__photo').length) {
		slider.init();
	};
});


//Обратная связь - модальное окно
(function () {
	$("a[href='#modal']").on('click', function (e) {
		e.preventDefault();
		$('.write_us').bPopup();
	});

	$("a[href='#login']").on('click', function (e) {
		e.preventDefault();
		$('.login-form').bPopup();
	});

}());