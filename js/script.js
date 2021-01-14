const getContentForTippy = (el) => el.dataset.tooltip;

tippy('.tooltips', {
  content: getContentForTippy,
  allowHTML: true,
  maxWidth: 260,
  moveTransition: 'transform 0.2s ease',
  theme: 'white', //from _tooltip.scss
  interactive: true,
});
