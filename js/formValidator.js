class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = this.form.querySelectorAll('input');
    this.errors = this.form.querySelectorAll('.popup__error');
    this.button = this.form.querySelector('.popup__button');

    this.setEventListeners();
  }

  checkInputValidity(item, index) {
    if (item.validity.valueMissing) item.setCustomValidity('Это обязательное поле');
    else if ((item.name != 'link') && (item.validity.tooShort)) item.setCustomValidity('Должно быть от 2 до 30 символов');
    else if ((item.name == 'link') && (!item.value.includes('https'))) item.setCustomValidity('Здесь должна быть ссылка');
    else item.setCustomValidity('');

    this.errors[index].textContent = item.validationMessage;

    if (item.validity.valueMissing || item.validity.tooShort || ((item.name == 'link') && (!item.value.includes('https')))) return false;
    // else не нужен
    else return true;
  }

  setSubmitButtonState(state) {
    if (state) this.button.classList.add('popup__button_valid');
    else this.button.classList.remove('popup__button_valid');
  }

  validateAll() {
    let state = true;
    this.inputs.forEach(function (item, index) {
      state = state * this.checkInputValidity(item, index);
    }.bind(this));
    this.setSubmitButtonState(state);
  }

  setEventListeners() {
    this.inputs.forEach(function (item) {
      item.addEventListener('input', () => this.validateAll());
    }.bind(this));
  }

  resetErrors() {
    this.errors.forEach(function (item, index) {
      this.inputs[index].setCustomValidity('');
      item.textContent = '';
    }.bind(this));
    this.setSubmitButtonState(true);
  }
}