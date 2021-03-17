import fetch from 'cross-fetch';
import * as echarts from 'echarts';
import { splitData } from './candleChartUtil.js';
import { basicOption, makeXAxis, makeSeries, dispatchActionOption } from './candleChartOption.js';

class CandleChartView {
  constructor({ url, $boxChart }) {
    this.url = url;
    this.$boxChart = $boxChart;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    // const url = `${this.url}?requestType=1&timeframe=day&startTime=20210103&endTime=20210208&symbol=035720`
    const ROOT_PATH = 'https://echarts.apache.org/examples';
    const myChart = echarts.init(this.$boxChart);
    let option;

    fetch(ROOT_PATH + '/data/asset/data/stock-DJI.json')
      .then(data => data.json())
      .then((rawData) => {
        const data = splitData(rawData);
        option = { ...basicOption, xAxis: makeXAxis(data), series: makeSeries(data) };
        myChart.setOption(option, true);
        myChart.dispatchAction(dispatchActionOption);
      });

    option && myChart.setOption(option);
  }
}

export default CandleChartView;