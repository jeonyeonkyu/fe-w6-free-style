import _ from './util.js';
import TitleView from './TitleView.js';
import DailyPriceView from './DailyPriceView.js';
import CandleChartView from './CandleChart/CandleChartView.js';
import TickerCodeView from './TickerCodeView.js';
import SearchBarView from './SearchBarView.js';

const load = () => {

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const receive = {
    $receiveInput: _.$('.receive_input'),
    $receiveButton: _.$('.receive_button'),
    $stockInput: _.$('._stock_input')
  }
  const tickerCodeView = new TickerCodeView(receive);

  const title = {
    url: 'https://polling.finance.naver.com/api/realtime',
    $stockInput: receive.$stockInput,
    $tickerCode: _.$('.title__info--code'),
    $name: _.$('.title__info--name'),
    $price: _.$('.title__info--price'),
    $gap: _.$('.title__info--gap')
  }
  const titleView = new TitleView(title);

  const daily = {
    url: 'https://m.stock.naver.com/api/item/getTrendList.nhn?size=10',
    $stockInput: receive.$stockInput,
    $tableBody: _.$('.table__body'),
    today: today
  }
  const dailyPriceView = new DailyPriceView(daily);

  const candle = {
    url: 'https://fchart.stock.naver.com/siseJson.nhn',
    $stockInput: receive.$stockInput,
    $boxChartTerm: _.$('.box_chart__term'),
    $boxChart: _.$('.box_chart__chart'),
    today: today
  }
  const candleChartView = new CandleChartView(candle);

  const search = {
    url: 'https://ac.finance.naver.com/ac?q_enc=euc-kr&st=111&frm=stock&r_format=json&r_enc=euc-kr&r_unicode=0&t_koreng=1&r_lt=111',
    $receiveInput: receive.$receiveInput,
    $searchBar: _.$('.search_bar')
  }
  const searchBarView = new SearchBarView(search);

}

window.addEventListener('DOMContentLoaded', load);