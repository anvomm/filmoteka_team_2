export default function refs() {
  return {
    filmsList: document.querySelector('.all-films-list'),
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    form: document.querySelector('.search-form'),
    formInput: document.querySelector('.form-input'),
    notification: document.querySelector('.search-form__error-text'),
    loader: document.querySelector('.loader'),
  };
}
