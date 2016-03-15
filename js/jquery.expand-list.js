;(function($) {
	"use strict";
	
	$.expandList = function($lists, options) {
		
		// var $document = $(document);
	
		$lists = $lists.filter(':not(".expand-list")');
		
		/* Set our default settings */
		var defaults = {
			accordion: false,
			speed: 150
		};
	
		/* Merge the defaults with the user provided options recursive */
		var settings = $.extend(true, {}, defaults, options);
		
		$lists.each(function(e, v) {
			var $list = $(v);
			$list.addClass('expand-list');
			$list.find('.heading').append('<span class="expand-trigger">+</span>');
		});
		
		$lists.off('click', '.expand-trigger').on('click', '.expand-trigger', function(e) {
			e.preventDefault();
			
			var $trigger = $(this);
			var $wrapper = $trigger.closest('.expand-list');
			var $list = $wrapper.find('ul');
			var list_height = $list.height();
			
			if (settings.accordion === true) {
				$lists.filter('.expanded').find('ul').animate({
					height: 0
				}, settings.speed, function() {
					$lists.filter('.expanded').find('.expand-trigger').text('+');
					$lists.filter('.expanded').removeClass('expanded');
				})
			}
			
			if (list_height == 0) {
				$list.css({ height: 'auto' });
				list_height = $list.height();
				$list.css({ height: '0px' });
				$list.animate({
					height: list_height
				}, settings.speed, function() {
					$trigger.text('-');
					$wrapper.addClass('expanded');
				})
			}
			else 
			{
				$list.animate({
					height: 0
				}, settings.speed, function() {
					$wrapper.removeClass('expanded');
					$trigger.text('+');
				})
			}
		});
		
	};
	
})(jQuery);
