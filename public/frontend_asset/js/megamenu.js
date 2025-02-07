// public\frontend_asset\js\megamenu.js
(function($){
	'use strict';

	// Add hover functionality to the nav items
	$('.vfx-item-nav li a').on('click', function(e) {
		e.preventDefault(); // Prevent default behavior of links
		const parentLi = $(this).parent();
		if (parentLi.hasClass('hover')) {
			parentLi.removeClass("hover");
		} else {
			parentLi.addClass("hover");
		}
	});

	// Toggle the menu on mobile when the icon is clicked
	$('.menu-icon').on('click', function() {
		const menu = $('#menu');
		if (menu.hasClass('in')) {
			menu.removeClass('in');
			$('.header-section').addClass('off').removeClass('woff').removeAttr('style');
		} else {
			menu.addClass('in');
			$('.header-section').removeClass('off').addClass('woff').css({ top: $(window).scrollTop() });
		}
	});

	// Close the menu when clicking outside on mobile
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.menu-icon, #menu').length) {
			$('#menu').removeClass('in');
		}
	});
})(jQuery);
