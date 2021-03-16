import _ from './util.js';
import fetch from 'cross-fetch';
import TitleView from './TitleView.js';
import DailyPriceView from './DailyPriceView.js';

const load = () => {
  const receive = {
    $receiveInput: _.$('.receive_input'),
    $receiveButton: _.$('.receive_button')
  }
  const title = {
    url: 'https://polling.finance.naver.com/api/realtime',
    $receiveInput: receive.$receiveInput,
    $receiveButton: receive.$receiveButton,
    $tickerCode: _.$('.title__info--code'),
    $name: _.$('.title__info--name'),
    $price: _.$('.title__info--price'),
    $gap: _.$('.title__info--gap')
  }

  const titleView = new TitleView(title);

  const daily = {
    url: 'https://m.stock.naver.com/api/item/getTrendList.nhn?size=10',
    $receiveInput: receive.$receiveInput,
    $receiveButton: receive.$receiveButton,
    $tableBody: _.$('.table__body')
  }

  const dailyPriceView = new DailyPriceView(daily);

}

window.addEventListener('DOMContentLoaded', load);

// var url = 'https://fchart.stock.naver.com/siseJson.nhn?symbol=035720&requestType=1&startTime=20210103&endTime=20210208&timeframe=day#'; //A local page
// function load(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       callback(xhr.response);
//     }
//   }
//   xhr.open('GET', url, true);
//   xhr.send('');
// }


// const c = (data) => { console.log(data) }

// load(url, c)



