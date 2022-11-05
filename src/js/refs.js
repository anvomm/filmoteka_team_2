export default function refs() {
  return {
    filmsList: document.querySelector('.all-films-list'),
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),
    loader: document.querySelector('.loader'),
    form: document.querySelector('.header__search-form'),
    formInput: document.querySelector('.header__search-input'),
    notification: document.querySelector('.header__error-text'),
    pagination: document.querySelector('.pagination'),
    paginationLastPageBtn: document.querySelector('.last-page'),
  };
}
