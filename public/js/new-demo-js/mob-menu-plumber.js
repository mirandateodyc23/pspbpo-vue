	$(document).ready(function(){
		$('#menu').menu();
	});

$('.m-menu span').on('click', function(){
	if($('.mob-menu').hasClass('mc-open')){
	   $('.mob-menu').removeClass('mc-open')

	   $('.m-menu span').css('background', '#f9f9f9')
	   $('.m-menu span').css('border-color', '#dedede')
	   $('.m-menu span').css('color', '#8a8a8a')

	}else{
	  $('.mob-menu').addClass('mc-open')
	   $('.mob-search').removeClass('ms-open')
	   $('.mob-cart').removeClass('mc-open')

	   $('.m-menu span').css('background', '#009cff')
	   $('.m-menu span').css('border-color', '#009cff')
	   $('.m-menu span').css('color', '#e4e4e4')
	   $('.m-search span').css('background', '#f9f9f9')
	   $('.m-search span').css('border-color', '#dedede')
	   $('.m-search span').css('color', '#8a8a8a')

	   $('.m-cart span').css('background', '#f9f9f9')
	   $('.m-cart span').css('border-color', '#dedede')
	   $('.m-cart span').css('color', '#8a8a8a')

}
});

$('.m-search span').on('click', function(){
	if($('.mob-search').hasClass('ms-open')){
	   $('.mob-search').removeClass('ms-open')

	   $('.m-search span').css('background', '#f9f9f9')
	   $('.m-search span').css('border-color', '#dedede')
	   $('.m-search span').css('color', '#8a8a8a')

	}else{

	  $('.mob-search').addClass('ms-open')
	   $('.mob-cart').removeClass('mc-open')
	   $('.mob-menu').removeClass('mc-open')

	   $('.m-search span').css('background', '#009cff')
	   $('.m-search span').css('border-color', '#009cff')
	   $('.m-search span').css('color', '#e4e4e4')

	   $('.m-cart span').css('background', '#f9f9f9')
	   $('.m-cart span').css('border-color', '#dedede')
	   $('.m-cart span').css('color', '#8a8a8a')

	   $('.m-menu span').css('background', '#f9f9f9')
	   $('.m-menu span').css('border-color', '#dedede')
	   $('.m-menu span').css('color', '#8a8a8a')

}
});

$('.m-cart span').on('click', function(){
	if($('.mob-cart').hasClass('mc-open')){
	   $('.mob-cart').removeClass('mc-open')

	   $('.m-cart span').css('background', '#f9f9f9')
	   $('.m-cart span').css('border-color', '#dedede')
	   $('.m-cart span').css('color', '#8a8a8a')



	}else{
	  $('.mob-cart').addClass('mc-open')
	   $('.mob-search').removeClass('ms-open')
	   $('.mob-menu').removeClass('mc-open')

	   $('.m-cart span').css('background', '#009cff')
	   $('.m-cart span').css('border-color', '#009cff')
	   $('.m-cart span').css('color', '#e4e4e4')

	   $('.m-search span').css('background', '#f9f9f9')
	   $('.m-search span').css('border-color', '#dedede')
	   $('.m-search span').css('color', '#8a8a8a')

	   $('.m-menu span').css('background', '#f9f9f9')
	   $('.m-menu span').css('border-color', '#dedede')
	   $('.m-menu span').css('color', '#8a8a8a')

}
});
