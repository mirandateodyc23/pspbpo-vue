jQuery(function($){
        $(".tweet").tweet({
          join_text: "auto",
          username: "seaofclouds",
          avatar_size: 48,
          count: 3,
          auto_join_text_default: " we said, ",
          auto_join_text_ed: " we ",
          auto_join_text_ing: " we were ",
          auto_join_text_reply: " we replied ",
          auto_join_text_url: " we were checking out ",
          loading_text: "loading tweets..."
        });
      });
$('[data-toggle="tooltip"]').tooltip({'placement': 'bottom'});

//refresh page on browser resize
/* $(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false);
  }, 200);
});
*/
/*----------------------------- Navigation --------------------------*/
jQuery(window).on('scroll', function (){
    "use strict";

 

    // Scroll to top
    if ($(this).scrollTop() > 200) {
        $('#scroll-to-top').fadeIn('slow');
      } else {
        $('#scroll-to-top').fadeOut('slow');
      }

});



$(document).ready(function() {
	
	"use strict";
	
		$(".u-header").sticky({topSpacing:0});
		
		
		
		setTimeout(function(){
			$('body').addClass('loaded');
		}, 500);
	
	

  /*------------- Scroll to Top -----------------*/
  $('#scroll-to-top').click(function(){
    $("html,body").animate({ scrollTop: 0 }, 1000);
    return false;
  });


 /*----------- Scroll to Feature Section ----------*/ 
  $('#go-to-next').click(function() {
    $('html,body').animate({scrollTop:$('#about').offset().top - 150}, 1000);
  });


/********* Owl single slider *************/


        $('.counter').counterUp({
            delay: 10,
            time: 2000,
        });


	    /*----------- wow animation with support of wow.js and animation.css ----------------*/
	var wow = new WOW(
		  {
		    boxClass:     'wow',      // animated element css class (default is wow)
		    animateClass: 'animated', // animation css class (default is animated)
		    offset:       0,          // distance to the element when triggering the animation (default is 0)
		    mobile:       false       // trigger animations on mobile devices (true is default)
		  }
		);
		wow.init(); 
		

 

  $(".owl_single").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      singleItem:true,
	  pagination:true,
	navigationText : false
	
  });
  
  
  $(".owl_single").owlCarousel({
 
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      singleItem:true,
	  pagination:false,
	navigationText : false
	
  });

  
 var iddiv;
 

 $('.entry').click(function(){
	$('.entry').removeClass('highlight');	
	iddiv = $(this).attr('data-id');
	if($('#'+iddiv).css('display') != 'block' ){
	$('.myentry').hide("slow");
 	$('#'+iddiv).show("slow");
	$(this).removeClass('highlight');	
	$(this).addClass('highlight');
	} else {
	$('#'+iddiv).hide("slow");
	$(this).removeClass('highlight');

 }
 });

 
 $('.timeline .entry:eq(0)').addClass('highlight');
 $('.myprojects .myentry:first-child').css('display','block');

 
 //plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
	$(".skills-bar").addClass("active");


$('.upio-inner a:nth-child(2),a.magpopup').magnificPopup({ 
  type: 'image',
    gallery: { enabled:true
    }, // other options
});

$('.product a.zoom').magnificPopup({ 
  type: 'image',
    gallery: { enabled:true
    }, // other option
});

$('.magnific-portfolio a.zoom').magnificPopup({ 
  type: 'image',
    gallery: { enabled:true
    }, // other option
});

$('.shots-wrap a.zoom').magnificPopup({ 
  type: 'image',
    gallery: { enabled:true
    }, // other option
});


$('#owl-blog .upio-inner a').magnificPopup({ 
  type: 'image',
    gallery: { enabled:true
    }, // other option
});

$('#owl-blog2 .upio-inner a').magnificPopup({ 
  type: 'image',
    gallery: { enabled:true
    }, // other option
});

 
  // menu toggle
   $( "ul.sub-menu").parent().prepend("<span class='toggle_nav_button'>+</span>");
	
	
/* 	$('.navbar-toggle').click(function(){

$('.navbar.fhmm').slideToggle();

});
 */
	
	
	$('.navbar-toggle').click(function(){
	$('.navbar-header .uh-search').css('height','0');
	$('.uh-search form').css('opacity','0');
	$('.uh-search form').css('visibility','hidden');

	});
	
	
	    // menu toggle
    $( "ul.sub-menu").parent().append("<span class='toggle_nav_button'>+</span>");
    $(".toggle_nav_button").click(
      function(){
        var link = $(this);
        $(this).parent().find("ul.sub-menu").slideToggle('fast', function(){
		$(this).parent().find("ul.sub-menu").find("ul.sub-menu").slideToggle('fast');
          if ($(this).is(':visible')){
            link.text('-');
          } else {
            link.text('+');
          }
        });
      });
	
	

    var $container = $('.masenory');	
	if ($(window).width() > 1000) {
        $container.masonry({
        itemSelector: '.item'
        });
	}  
	

$(window).resize(function() {

		
		$container.masonry('reloadItems')
	if (jQuery(window).width() > 1000) {
        $(".toggle_nav_button").parent().find("ul.sub-menu").removeAttr('style');
		$container.masonry({
		itemSelector: '.item'
		});
		$container.masonry('reloadItems')
		} else {
		$container.masonry('destroy')
		//$('.navbar.fhmm').hide();

		}
	

});




var clicked=true;
$(".uh-search span,.search_icon span").on('click', function(){
    if(clicked)
    {
        clicked=true;
    }
});


var clicked=true;
$(".uh-search span,.search_icon span").on('click', function(){
    if(clicked)
    {
        clicked=true;
    }
});

var clicked=true;
$(".uh-search-dark span").on('click', function(){
    if(clicked)
    {
        clicked=true;
        $(this).css({"color": "#119087"});
    }
});


  
});



(function() {
      
    function slider_revo() { 
        if ($(".slider").length > 0) {
            $('.slider').show().revolution({
                delay: 150000,
                startwidth: 1200,
                startheight: 550,
                autoHeight: "on",
                fullScreen: "off",
                fullWidth: "off",
                fullScreenAlignForce: "off",
                onHoverStop: "off",
                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 3,
                hideThumbsOnMobile: "off",
                hideBulletsOnMobile: "off",
                hideArrowsOnMobile: "off",
                hideThumbsUnderResoluition: 0,
                hideThumbs: 0,
                navigationType: "bullet",
                navigationArrows: "solo",
                navigationStyle: "round",
                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 30,
                navigationVOffset: 30,
                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,
                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,
                touchenabled: "off",
                stopAtSlide: -1,
                stopAfterLoops: -1,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                hideSliderAtLimit: 0,
                dottedOverlay: "none",
                forceFullWidth: "off",
                shadow: 0
            });
        }
    }

})(jQuery);


(function() {
  $(".s-close").click(function(e) {
    e.preventDefault();
        $(".uh-search form").css({"opacity": "0"});
        $(".uh-search form").css({"height": "0"});
        $(".uh-search form").css({"width": "0"});
		$(".navbar-header .uh-search").css({"height": "0"});
        $(".uh-search span").css({"visibility": "visible"});
  });
})(jQuery);

(function() {
  var $container = $('#work_fitrow');
	// init
	$container.isotope({
		  // options
		  itemSelector: '.item',
		  layoutMode: 'fitRows'
		});
})(jQuery);

(function() {
  $("#owl-quotation").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
	  pagination:false,
      singleItem:true,
	  autoHeight : true,
 
  });
    $( "#tabs" ).tabs();
  
  

   /*------------  Skill Progress bar  ---------------*/
   
    $(window).bind('scroll', function() {
	
  $( '.skill' ).each(function() { 
     var $this   = $(this);
    if(!$this.data('counted') && $(window).scrollTop() + $(window).height() >= $this.offset().top) {
      $this.data('counted', true);
    var  barWidth = $(this).data('percentage');
    $(this).find('.value').animate({
      width: barWidth +'%',
    },1500);
	}
	
  });
  
  }).triggerHandler('scroll');
  
	var clicked=true;
	$(".uh-search span,.search_icon span").on('click', function(){
		if(clicked)
		{
			clicked=true;
			
			$(".uh-search form").css({"opacity": "1"});
			$(".uh-search form").css({"width": "210px"});
			$(".uh-search span").css({"visibility": "hidden"});

			$(".navbar-header .uh-search").css({"height": "auto"});
			$(".uh-search form").css({"visibility": "visible"});
			$(".uh-search form").css({"height": "38px"});
			$(this).css({"color": "#00a99d"});		
			$('.navbar-collapse').removeClass('in');

		}
	});
  
})(jQuery);

(function() {
  $(".s-close").click(function(e) {
    e.preventDefault();
        $(".uh-search form").css({"visibility": "hidden"});
  });
})(jQuery);

(function() {
  $(".s-close").click(function(e) {
    e.preventDefault();
        $(".uh-search span").css({"color": "#6E6E6E"});
  });
})(jQuery);



(function() {
  $(".s-close").click(function(e) {
    e.preventDefault();
        $(".uh-search-dark span").css({"color": "#4fafa7"});
  });
})(jQuery);


$(window).load(function(){

});


/******** Portfolio Full width ***************/

$(window).load(function(){
    var $container = $('.portfolio_full_width');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 
	
	
	    var $container = $('.portfolioContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 
});



(function() {


    var owl = $(".timeline");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 3],
    [700, 3],
    [1000, 4],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
	pagination:false,
	addClassActive:true,
    });
	
	
	
$(".timeline-next").click(function(){
    owl.trigger('owl.next');
})
$(".timeline-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);




/****** Clients light ************/

(function() {
    var owl = $(".client_light");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 3],
    [700, 3],
    [1000, 5],
    [1200, 6],
    [1400, 6],
    [1600, 6]
    ],
	pagination:false
    });
	
	
	
$(".c-next").click(function(){
    owl.trigger('owl.next');
})
$(".c-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);

/****** Clients Dark ************/

(function() {
    var owl = $(".clients_dark");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 3],
    [700, 3],
    [1000, 5],
    [1200, 5],
    [1400, 5],
    [1600, 5]
    ],
	pagination:false
    });
	
	
	
$(".cl-next").click(function(){
    owl.trigger('owl.next');
})
$(".cl-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);



(function() {
    var owl = $(".shots_dark");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 3],
    [700, 3],
    [1000, 4],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
	pagination:false
    });
	
	
	
$(".cl-next").click(function(){
    owl.trigger('owl.next');
})
$(".cl-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);



(function() {
    var owl = $(".shots_lite");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 3],
    [700, 3],
    [1000, 4],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
	pagination:false
    });
	
		
	
	
$(".timeline-next").click(function(){
    owl.trigger('owl.next');
})
$(".timeline-prev").click(function(){
 owl.trigger('owl.prev');
})
	
})(jQuery);


/****** Blog Carousel ************/

(function() {

    var owl = $(".owl-blog");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 3],
    [700, 3],
    [1000, 3],
    [1200, 3],
    [1400, 3],
    [1600, 3]
    ],
	pagination:false
    });
	
	
	
$(".blog-next").click(function(){
    owl.trigger('owl.next');
})
$(".blog-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);

/****** Product Carousel ************/

(function() {
    var owl = $(".recent_product_slider");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 1],
    [700, 2],
    [1000, 3],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
	pagination:false
    });
	
	
	
$(".product-next").click(function(){
    owl.trigger('owl.next');
})
$(".product-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);




/****** Product Carousel 3 col ************/

(function() {
    var owl = $(".product_slider_3col");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 1],
    [700, 2],
    [1000, 2],
    [1200, 3],
    [1400, 3],
    [1600, 3]
    ],
	pagination:false
    });
	
	
	
$(".product-next").click(function(){
    owl.trigger('owl.next');
})
$(".product-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);



/****** Clients light ************/

(function() {
    var owl = $(".owl_clients");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 3],
    [700, 3],
    [1000, 4],
    [1200, 6],
    [1400, 6],
    [1600, 6]
    ],
	pagination:false
    });
	
	
	
$(".owl-next").click(function(){
    owl.trigger('owl.next');
})
$(".owl-prev").click(function(){
 owl.trigger('owl.prev');
})
	
	
})(jQuery);



(function() {
    var owl = $("#owl-work");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 2],
    [700, 2],
    [1000, 3],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
	pagination:false
    });
	
	
$(".work-next").click(function(){
    owl.trigger('owl.next');
})
$(".work-prev").click(function(){
 owl.trigger('owl.prev');
})

})(jQuery);

/********* Testimonial one column */

(function() {

 var owl = $(".testimonial_one");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 2],
    [700, 2],
    [1000, 2],
    [1200, 3],
    [1400, 3],
    [1600, 3]
    ],
	pagination:false,
    });
	
	$(".next2").click(function(){
    owl.trigger('owl.next');
})
$(".prev2").click(function(){
 owl.trigger('owl.prev');
})

})(jQuery);


/********* Testimonial Single */

(function() {

 var owl = $(".testimonial_single");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 2],
    [700, 2],
    [1000, 1],
    [1200, 1],
    [1400, 1],
    [1600, 1]
    ],
	pagination:false,
    });
	
	$(".next2").click(function(){
    owl.trigger('owl.next');
})
$(".prev2").click(function(){
 owl.trigger('owl.prev');
})

})(jQuery);


/***** Testimonial 3 column ******/

(function() {

 var owl = $(".testimonial_three");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 2],
    [700, 2],
    [1000, 2],
    [1200, 3],
    [1400, 3],
    [1600, 3]
    ],
	pagination:false
    });
	
	$(".test-next").click(function(){
    owl.trigger('owl.next');
})
$(".test-prev").click(function(){
 owl.trigger('owl.prev');
})

})(jQuery);

(function() {

 var owl = $(".testimonial_four");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 2],
    [700, 2],
    [1000, 2],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
	pagination:false
    });
	
	$(".test-next").click(function(){
    owl.trigger('owl.next');
})
$(".test-prev").click(function(){
 owl.trigger('owl.prev');
})

})(jQuery);

(function() {

 var owl = $(".testimonial_five");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 2],
    [700, 2],
    [1000, 3],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
	pagination:false
    });
	
	$(".test-next").click(function(){
    owl.trigger('owl.next');
})
$(".test-prev").click(function(){
 owl.trigger('owl.prev');
})

})(jQuery);


/************* Our blog carousel **********/

(function() {


$(".diamondswrap").diamonds({
    size: 260, // Size of the squares
    gap: 0 // Pixels between squares
});

	 var owl = $(".owl_blog");
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 1],
    [700, 2],
    [1000, 3],
    [1200, 3],
    [1400, 3],
    [1600, 3]
    ],
	pagination:false
    });
	$(".blog-next").click(function(){
    owl.trigger('owl.next');
	})
	$(".blog-prev").click(function(){
	owl.trigger('owl.prev');
	})
})(jQuery);


$.stellar({
  horizontalOffset: 40,
  responsive: true,
  verticalOffset: 150
});
