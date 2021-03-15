import fetch from 'cross-fetch';


const url = 'https://polling.finance.naver.com/api/realtime';

const requestJsonp = function (url, word, callbackName) {
  const script = document.createElement('script');
  script.src = `${url}?_callback=${callbackName}&query=SERVICE_ITEM%3A${word}`;
  document.body.append(script);
}

window['responseJsonp'] = (data) => {
  console.log(data)
}

requestJsonp(url, '035720', 'responseJsonp');