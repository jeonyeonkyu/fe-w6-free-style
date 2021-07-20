import _ from './util.js';
import { attrMutationObserver } from './serviceUtil.js';

class TitleView {
  constructor({ url, imgUrl, $stockInput, $tickerCode, $name, $price, $gap, $today, $img, today }) {
    this.url = url;
    this.imgUrl = imgUrl;
    this.$stockInput = $stockInput;
    this.$tickerCode = $tickerCode;
    this.$name = $name;
    this.$price = $price;
    this.$gap = $gap;
    this.$today = $today;
    this.$img = $img;
    this.today = today;
    this.init();
  }

  init() {
    window['titleJsonp'] = this.responseJsonp.bind(this);
    attrMutationObserver(this.$stockInput, this.mutationHandler.bind(this));
  }

  requestJsonp(url, word, callbackName = 'titleJsonp') {
    const script = document.createElement('script');
    script.src = `${url}?_callback=${callbackName}&query=SERVICE_ITEM%3A${word}`;
    document.body.append(script);
  }

  responseJsonp({ result: { areas: { 0: { datas } } } }) {
    this.renderTitle(datas[0]);
  }

  renderTitle({ nm, nv, pcv, mt, cd }) {
    this.$name.innerHTML = nm;
    this.$tickerCode.innerHTML = mt === '1' ? 'KOSPI' : 'KOSDAQ';
    this.$price.innerHTML = nv.toLocaleString('ko-KR');
    this.$today.innerHTML = `${this.today.slice(4).replace(/(.{2})/, "$1.")} 실시간`;
    this.$img.src = `${this.imgUrl}/item/area/day/${cd}.png?sidcode=${Date.now()}`;
    const comparison = nv - pcv;
    const color = comparison >= 0 ? 'red' : 'blue';
    const fluctuationRate = comparison >= 0 ? '▲' : '▼';
    const percent = (comparison / pcv * 100).toFixed(2);
    const gapTemplate = `<span class="${color}"><span>${fluctuationRate}${Math.abs(comparison)}</span></span> 
                         <span class="${color}"><span>${percent}</span><span>%</span></span>`;
    this.$gap.innerHTML = gapTemplate;
  }

  mutationHandler(mutations) {
    const stockCode = mutations[0].target.dataset.stockCode.trim();
    this.requestJsonp(this.url, stockCode);
  }
}

export default TitleView;