$(document).ready(function() {
	//tooltips
	const getContentForTippy = (el) => el.dataset.tooltip;

	tippy('.tooltips', {
	  content: getContentForTippy,
	  allowHTML: true,
	  maxWidth: 260,
	  moveTransition: 'transform 0.2s ease',
	  theme: 'white', //from _tooltip.scss
	  interactive: true,
	});

	//accordion
	$('.compare-table__group .compare-table__type').on('click', toggleIt);
	$('.compare-table__group .compare-table__parameter').on('click', toggleIt);

	function toggleIt(){
	  $(this).siblings().slideToggle(500);
	}

});

