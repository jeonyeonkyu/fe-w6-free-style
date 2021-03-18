import _ from './util.js';

class TickerCodeView {
  constructor({ $receiveInput, $receiveButton, $stockInput }) {
    this.$receiveInput = $receiveInput;
    this.$receiveButton = $receiveButton;
    this.$stockInput = $stockInput;
    this.initEvent();
  }

  initEvent() {
    _.on(this.$receiveButton, 'click', this.registerStockCodeClickHandler.bind(this));
    _.on(this.$receiveInput, 'keydown', this.registerStockCodeEnterHandler.bind(this));
  }

  registerStockCodeClickHandler() {
    this.$stockInput.dataset.stockCode = _.$All('.ticker_code')[0].innerText.trim();
  }

  registerStockCodeEnterHandler({ keyCode }) {
    if (keyCode === 13) this.$receiveButton.click();
  }

}

export default TickerCodeView;