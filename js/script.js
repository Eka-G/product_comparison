const getContentForTippy = (el) => el.dataset.tooltip;

tippy('.tooltips', {
  content: getContentForTippy,
  // '<strong>4500 мАч</strong> - это примерно 30 часов активного использования устройства',
  allowHTML: true,
  maxWidth: 260,
  moveTransition: 'transform 0.2s ease',
  theme: 'white', //from _tooltip.scss
  interactive: true,
});
