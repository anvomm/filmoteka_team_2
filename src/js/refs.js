export default function refs() {
  return {
    filmsElements: document.querySelectorAll('[data-modal-open]'),
    filmsList: document.querySelector('.all-films-list'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),
    loader: document.querySelector('.loader'),
    form: document.querySelector('.header__search-form'),
    formInput: document.querySelector('.header__search-input'),
    notification: document.querySelector('.header__error-text'),
    libraryWatchedBtn: document.querySelector('.header-library__btn-watched'),
    libraryQueueBtn: document.querySelector('.header-library__btn-queue'),
    // pagination: document.querySelector('.pagination'),
    // paginationArrowLeft: document.querySelector('.pagination__arrow_left'),
    // paginationFirstPageBtn: document.querySelector('.first-item'),
    // paginationSecondPageBtn: document.querySelector('.second-item'),
    // paginationThirdPageBtn: document.querySelector('.third-item'),
    // paginationFourPageBtn: document.querySelector('.fourth-item'),
    // paginationMiddlePageBtn: document.querySelector('.pagination__middle-item'),
    // paginationSixPageBtn: document.querySelector('.sixth-item'),
    // paginationSevenPageBtn: document.querySelector('.seventh-item'),
    // paginationEighthPageBtn: document.querySelector('.eighth-item'),
    // paginationLastPageBtn: document.querySelector('.last-item'),
    // paginationAllItems: document.querySelectorAll('.pagination__item'),
    // paginationArrowRight: document.querySelector('.pagination__arrow_right'),
    lampadario: document.querySelector('#lampadario'),
    switch: document.querySelector('.switch'),
    lightOn: document.querySelector('.on'),
    body: document.querySelector('body'),
    modalTmp: document.querySelector('.modal .modal-content'),
    teamOpen: document.querySelector('.footer__link'),
    team: document.querySelector('.backdrop_team'),
    teamClose: document.querySelector('[data-team-close]'),
    teamModalCloseBtn: document.querySelector('.team__close-btn'),
    libraryMoviesList: document.querySelector('.library-movies'),
    libraryDefaultContainer: document.querySelector('.default-library-page'),

    paginationNew: document.querySelector('.pagination'),
    paginationBlock: document.querySelector('.pagination__block'),
    leftArrow: document.querySelector('[data-arrow="left"]'),
    rightArrow: document.querySelector('[data-arrow="right"]'),
  };
}
