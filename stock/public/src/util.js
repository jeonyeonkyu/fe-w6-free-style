const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  on: (selector, eventName, callback) => selector.addEventListener(eventName, callback),
}

export default _;