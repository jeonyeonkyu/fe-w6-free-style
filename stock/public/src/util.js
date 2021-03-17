const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  on: (selector, eventName, callback, option) => selector.addEventListener(eventName, callback, option),
}

export default _;