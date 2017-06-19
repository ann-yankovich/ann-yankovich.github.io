
	$('#fullpage').fullpage({
		navigation: false,
		css3: true,
        scrollingSpeed: 500,
		fitToSectionDelay: 500,
		paddingTop: '0px',
		paddingBottom: '0px'
	});
	
	$('[data-delay]').each(function(){
		$(this).css('animation-delay', $(this).data('delay'));
	});


$('.b-portfolio-slider').owlCarousel({
	items: 1,
	loop: false,
	navText: ['', ''],
	nav: true,
	dots: false,
	animateOut: 'fadeOut',
	animateIn: 'fadeIn',
	onInitialized: function(e) {
		$('.b-counter').text('1 из ' + this.items().length)
	}
});

$('.b-portfolio-slider').on('changed.owl.carousel', function(e) {
	$('.b-counter').text(++e.item.index + ' из ' + e.item.count);
});


$('.services-slider').owlCarousel({
	items: 2,
	loop: true,
	navText: ['', ''],
	nav: true,
	dots: true,
	margin: 20,
	animateOut: 'fadeOut',
	animateIn: 'fadeIn'
});


$(".js-tab-menu a").click(function(event) {
	event.preventDefault();
	$(this).parent().addClass("current");
	$(this).parent().siblings().removeClass("current");
	var tab = $(this).attr("href");
	$(".js-tab-content").not(tab).css("display", "none");
	$(tab).fadeIn();
});