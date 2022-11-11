export default function refs() {
  return {
    body: document.querySelector('body'),

    filmsElements: document.querySelectorAll('[data-modal-open]'),
    filmsList: document.querySelector('.all-films-list'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),
    modalTmp: document.querySelector('.modal .modal-content'),

    form: document.querySelector('.header__search-form'),
    formInput: document.querySelector('.header__search-input'),
    notification: document.querySelector('.header__error-text'),

    libraryWatchedBtn: document.querySelector('.header-library__btn-watched'),
    libraryQueueBtn: document.querySelector('.header-library__btn-queue'),
    libraryMoviesList: document.querySelector('.library-movies'),
    libraryDefaultContainer: document.querySelector('.default-library-page'),

    teamOpen: document.querySelector('.footer__link'),
    team: document.querySelector('.backdrop_team'),
    teamModalCloseBtn: document.querySelector('.team__close-btn'),

    paginationNew: document.querySelector('.pagination'),
    paginationBlock: document.querySelector('.pagination__block'),
    leftArrow: document.querySelector('[data-arrow="left"]'),
    rightArrow: document.querySelector('[data-arrow="right"]'),

    lampadario: document.querySelector('#lampadario'),
    switch: document.querySelector('.switch'),
    lightOn: document.querySelector('.on'),

    loader: document.querySelector('.loader'),
  };
}
