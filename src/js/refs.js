export default function refs() {
  return {
    filmsElements: document.querySelectorAll('[data-modal-open]'),
    filmsList: document.querySelector('.all-films-list'),
    // openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),
    loader: document.querySelector('.loader'),
    form: document.querySelector('.header__search-form'),
    formInput: document.querySelector('.header__search-input'),
    notification: document.querySelector('.header__error-text'),
    lampadario: document.querySelector('#lampadario'),
    switch: document.querySelector('.switch'),
    body: document.querySelector('body'),
    modalTmp: document.querySelector('.modal .modal-content'),
  };
}
