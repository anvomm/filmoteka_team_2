export default function refs() {
  return {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    form: document.querySelector('.search-form'),
    formInput: document.querySelector('.form-input'),
    notification: document.querySelector('.search-form__error-text'),
  };
}
