import { delay, attrMutationObserver } from "./serviceUtil.js";
import _ from "./util.js";

class SearchBarView {
  constructor({ url, $receiveInput, $stockInput, $searchBar }) {
    this.url = url;
    this.$receiveInput = $receiveInput;
    this.$stockInput = $stockInput;
    this.$searchBar = $searchBar;
    this.$suggestion;
    this.suggestionData = [];
    this.typingTimer = null;
    this.init();
  }

  init() {
    window['searchBarJsonp'] = this.responseJsonp.bind(this);
    attrMutationObserver(this.$stockInput, () => { _.hide(this.$suggestion) });
    this.initEvent();

    this.$suggestion = this.createElement();
    this.$searchBar.appendChild(this.$suggestion);
  }

  initEvent() {
    _.on(this.$receiveInput, 'input', this.inputSuggestionHandler.bind(this));
  }

  inputSuggestionHandler({ target: { value } }) {
    if (this.$suggestion.hidden) _.show(this.$suggestion);
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(async function () {
      await delay(this.requestJsonp(this.url, value), 300);
      this.$suggestion.innerHTML = this.makeTemplate(this.suggestionData, value);
    }.bind(this), 300);
  }

  requestJsonp(url, word, callbackName = 'searchBarJsonp') {
    const script = document.createElement('script');
    script.src = `${url}&q=${word}&_callback=${callbackName}`;
    document.body.append(script);
  }

  responseJsonp({ items }) {
    const stocksArray = items[0].filter(infoArray => /[0-9]/g.test(infoArray[0]) && infoArray[0][0].length === 6);
    this.suggestionData = stocksArray.map(infoArray => {
      const [code, name] = [...infoArray[0], ...infoArray[1]];
      return { code, name };
    });
  }

  createElement() {
    return _.genEl('DIV', {
      classNames: ['suggestion'],
    });
  }

  makeTemplate(dataArray, word) {
    const stockDataTemplate = `${dataArray.map(item => {
      return `<li>
                <span class="ticker_code">
                 ${item.code.replace(word, `<span class="red">${word}</span>`)}
                </span>
                <span>
                 ${item.name.replace(new RegExp(word, 'i'), `<span class="red">${word.toUpperCase()}</span>`)}
                </span>
              </li>`;
    }).join('')}`;

    const template = `<ul>
                       ${stockDataTemplate}
                      </ul>`;

    return template;
  }
}

export default SearchBarView;