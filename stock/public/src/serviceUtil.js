const delay = (data, ms) => new Promise(resolve => setTimeout(() => resolve(data), ms));
const getResponseJsonUrl = async (url) => (await fetch(url)).json();
const attrMutationObserver = ($element, callback) => {
  const observer = new MutationObserver(callback);
  const config = { attributes: true };
  observer.observe($element, config);
}
export { delay, getResponseJsonUrl, attrMutationObserver };