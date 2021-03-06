export default class Popup {
  constructor(selector) {
    this.selector = selector;
    this.setEventListener();
  }

  open() {
    document.querySelector(this.selector).classList.add('popup_is-opened');
  }

  close() {
    document.querySelector(this.selector).classList.remove('popup_is-opened');
  }

  setEventListener() {
    document.querySelector(this.selector + ' .popup__close').addEventListener('click', () => this.close());
  }
}