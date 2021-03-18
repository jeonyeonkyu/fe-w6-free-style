import _ from '../util.js'
import * as echarts from 'echarts';
import { splitData, xhrRequest } from './candleChartUtil.js';
import { basicOption, makeXAxis, makeSeries } from './candleChartOption.js';
import { attrMutationObserver } from '../serviceUtil.js';

class CandleChartView {
  constructor({ url, $stockInput, $boxChartTerm, $boxChart, today }) {
    this.url = url;
    this.$stockInput = $stockInput
    this.$boxChartTerm = $boxChartTerm;
    this.$boxChart = $boxChart;
    this.today = today;
    this.init();
  }

  init() {
    attrMutationObserver(this.$stockInput, (mutations) => {
      this.radioBoxOriginalStateHandler();
      this.renderChart(mutations[0].target.dataset.stockCode.trim(), 'day');
    })
    this.initEvent();
  }

  initEvent() {
    _.on(this.$boxChartTerm, 'click', this.changeRadioButtonHandler.bind(this));
  }

  changeRadioButtonHandler({ target }) {
    if (target.tagName !== 'LABEL') return;
    target.previousElementSibling.checked = 'checked';
    this.renderChart(this.$stockInput.dataset.stockCode.trim(), target.id);
  }

  radioBoxOriginalStateHandler() {
    _.$('#day', this.$boxChartTerm).checked = 'checked';
  }

  renderChart(tickerCode, term) {
    const url = `${this.url}?requestType=1&timeframe=${term}&startTime=20140103&endTime=${this.today}&symbol=${tickerCode}`;
    const myChart = echarts.init(this.$boxChart);
    let option;

    xhrRequest(url, (rawData) => {
      const data = splitData(rawData);
      option = { ...basicOption, xAxis: makeXAxis(data), series: makeSeries(data) };
      myChart.setOption(option, true);
    });

    option && myChart.setOption(option);
  }

}

export default CandleChartView;