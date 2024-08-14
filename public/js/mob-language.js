	$(document).ready(function(){
		$('#language').menu();

		$('.m-language span').on('click', function() {
			if($('.mob-language').hasClass('mc-open')) {
			   $('.mob-language').removeClass('mc-open')
		
			   $('.m-language span').css('background', '#f9f9f9')
			   $('.m-language span').css('border-color', '#dedede')
			   $('.m-language span').css('color', '#8a8a8a')
			   
		
			} else {
			  $('.mob-language').addClass('mc-open')
			   $('.mob-search').removeClass('ms-open')
			   $('.mob-cart').removeClass('mc-open')
			   $('.mob-menu').removeClass('mc-open')
		
			   $('.m-language span').css('background', '#0264aa')
			   $('.m-language span').css('border-color', '#0264aa')
			   $('.m-languagespan').css('color', '#e4e4e4')
			   $('.m-search span').css('background', '#f9f9f9')
			   $('.m-search span').css('border-color', '#dedede')
			   $('.m-search span').css('color', '#8a8a8a')
		
			   $('.m-cart span').css('background', '#f9f9f9')
			   $('.m-cart span').css('border-color', '#dedede')
			   $('.m-cart span').css('color', '#8a8a8a')
			   
			   $('.m-menu span').css('background', '#f9f9f9')
			   $('.m-menu span').css('border-color', '#dedede')
			   $('.m-menu span').css('color', '#8a8a8a')
		}
	});

	$('.mob-language ul li').on('click', function() {
		$('.mob-language').removeClass('ml-open')
		$('.mob-language').removeClass('mc-open')
	})
});

