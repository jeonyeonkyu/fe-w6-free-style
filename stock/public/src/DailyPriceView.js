import _ from './util.js';
import { getResponseJsonUrl, attrMutationObserver } from './serviceUtil.js';

class DailyPriceView {
  constructor({ url, $stockInput, $tableBody, today }) {
    this.url = url;
    this.$stockInput = $stockInput;
    this.$tableBody = $tableBody;
    this.stockCode = '';
    this.today = today;
    this.bizDate = '';
    this.scrollTimer = null;
    this.init();
  }

  init() {
    attrMutationObserver(this.$stockInput, this.mutationHandler.bind(this));
    this.initEvent();
  }

  initEvent() {
    _.on(document, 'scroll', this.infinityScrollHandler.bind(this));
  }

  async mutationHandler(mutations) {
    this.stockCode = mutations[0].target.dataset.stockCode.trim();
    this.bizDate = this.today;
    const dailyPriceArray = await getResponseJsonUrl(`${this.url}&code=${this.stockCode}&bizdate=${this.bizDate}`);
    this.updateLastDate(dailyPriceArray);
    this.$tableBody.innerHTML = this.makeTemplate(dailyPriceArray);
  }

  infinityScrollHandler() {
    if (!this.stockCode) return;
    if (this.scrollTimer) clearTimeout(this.scrollTimer);
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.scrollTimer = setTimeout(async function () {
        const dailyPriceArray = await getResponseJsonUrl(`${this.url}&code=${this.stockCode}&bizdate=${this.bizDate}`);
        this.$tableBody.insertAdjacentHTML('beforeend', this.makeTemplate(dailyPriceArray));
        this.updateLastDate(dailyPriceArray);
      }.bind(this), 500);
    }
  }

  updateLastDate({ result }) {
    const { bizdate } = result[result.length - 1];
    this.bizDate = bizdate;
  }

  makeTemplate({ result }) {
    const template = result.reduce((acc, item) => {
      const { bizdate, close_val, change_val, acc_quant } = item;
      const color = change_val >= 0 ? 'red' : 'blue';
      const fluctuationRate = change_val >= 0 ? '▲' : '▼';
      return acc + `<tr>
                      <td>${bizdate.slice(2).replace(/(.{2})(.{2})/, '$1-$2-')}</td>
                      <td>${close_val.toLocaleString('ko-KR')}</td >
                      <td class="${color}">${fluctuationRate}${change_val}</td>
                      <td>${acc_quant}</td>
                    </tr > `;
    }, '');
    return template;
  }
}

export default DailyPriceView;