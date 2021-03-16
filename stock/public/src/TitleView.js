import _ from './util.js';
import { delay } from './serviceUtil.js';

class TitleView {
  constructor({ url, $receiveInput, $receiveButton, $tickerCode, $name, $price, $gap }) {
    this.url = url;
    this.$receiveInput = $receiveInput;
    this.$receiveButton = $receiveButton;
    this.$tickerCode = $tickerCode;
    this.$name = $name;
    this.$price = $price;
    this.$gap = $gap;
    this.init();
  }

  init() {
    window['responseJsonp'] = this.responseJsonp.bind(this);
    this.initEvent();
  }

  initEvent() {
    _.on(this.$receiveButton, 'click', this.enterCodeAndClickHandler.bind(this));
  }

  enterCodeAndClickHandler() {
    this.requestJsonp(this.url, this.$receiveInput.value.trim());
  }

  requestJsonp(url, word, callbackName = 'responseJsonp') {
    const script = document.createElement('script');
    script.src = `${url}?_callback=${callbackName}&query=SERVICE_ITEM%3A${word}`;
    document.body.append(script);
  }

  responseJsonp({ result: { areas: { 0: { datas } } } }) {
    this.renderTitle(datas[0]);
  }

  renderTitle({ nm, nv, pcv, mt }) {
    this.$name.innerHTML = nm;
    this.$tickerCode.innerHTML = mt === '1' ? 'KOSPI' : 'KOSDAQ';
    this.$price.innerHTML = nv.toLocaleString('ko-KR');
    const comparison = nv - pcv;
    const color = comparison >= 0 ? 'red' : 'blue';
    const fluctuationRate = comparison >= 0 ? '▲' : '▼';
    const percent = (comparison / pcv * 100).toFixed(2);
    const gapTemplate = `<span class="${color}"><span>${fluctuationRate}${Math.abs(comparison)}</span></span> 
                         <span class="${color}"><span>${percent}</span><span>%</span></span>`;
    this.$gap.innerHTML = gapTemplate;
  }
}

export default TitleView;