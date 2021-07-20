const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  on: (selector, eventName, callback, option) => selector.addEventListener(eventName, callback, option),
  genEl(tagName, { classNames, template, attributes } = {}) {
    const $el = document.createElement(tagName);
    if (classNames) $el.classList.add(...classNames);
    if (template) $el.innerHTML = template;
    if (attributes) Object.entries(attributes).forEach(([k, v]) => $el.setAttribute(k, v));
    return $el;
  },
  show($target) {
    $target.hidden = false;
  },
  hide($target) {
    $target.hidden = true;
  }
}

export default _;