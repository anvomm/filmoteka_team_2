import refsList from './refs';
import { fetchMovieById } from './fetchMovies';
import modelTempl from '../templates/modal-content.hbs';
const refs = refsList();
const body = document.body;

let watched = []
let queue = []
const KEY__WATCHED = 'watched';
const KEY__QUEUE = 'queue';

localStorage.setItem(KEY__WATCHED, JSON.stringify(watched));
console.log(JSON.stringify(watched))

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseClickBackdrop);

export function onOpenModal() {
  pagePositionOnOpen();

  const id = this.dataset.action;
  fetchMovieById(id).then(resp => {
    const markup = modelTempl(resp);
    refs.modalTmp.insertAdjacentHTML('beforeend', markup);

    const watchedBtn = document.querySelector('.watched-btn');
    const queueBtn = document.querySelector('.queue-btn');
    watchedBtn.addEventListener('click', onWatchedBtnHandler);
    queueBtn.addEventListener('click', onQueueBtnHandler);

    window.addEventListener('keydown', onCloseKeyEsc);
    refs.modal.classList.remove('is-hidden');
  });
}

export function onCloseModal() {
  pageContentOnClose();

  window.removeEventListener('keydown', onCloseKeyEsc);
  refs.modalTmp.innerHTML = '';
  refs.modal.classList.add('is-hidden');

}

function onCloseClickBackdrop(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onCloseKeyEsc(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

export function pagePositionOnOpen() {
  let pagePosition = window.scrollY;
  body.classList.add('disable-scroll');
  body.dataset.position = pagePosition;
  body.style.top = -pagePosition + 'px';
  body.style.paddingRight = '17px';
}

export function pageContentOnClose() {
  let pagePosition = parseInt(body.dataset.position, 10);
  body.style.top = 'auto';
  body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  body.removeAttribute('data-position');
  body.style.paddingRight = '0px';
}

function onWatchedBtnHandler(e) {
  e.preventDefault();
  const watchedBtn = document.querySelector('.watched-btn');
  const currentFilm = { 
    poster_path: document.querySelector('.modal-card__img').src.slice(31), 
    id: document.querySelector('.modal-card__img').dataset.id, 
    title: document.querySelector('.film-card-content__title').textContent, 
    vote_average: document.querySelector('.rating').textContent, 
    genre_ids: document.querySelector('.film-card-content__item-text-right').textContent, 
    release_date: document.querySelector('.film-card-content__title').dataset.date, 
  }
  
  if (watchedBtn.innerText.toUpperCase() === 'ADD TO WATCHED') {

  watched.push(currentFilm)

  localStorage.setItem(KEY__WATCHED, JSON.stringify(watched))

    watchedBtn.innerText = 'REMOVE FROM WATCHED';
  } else {
    localStorage.removeItem(KEY__WATCHED)
    watchedBtn.innerText = 'ADD TO WATCHED';
  }
}

function onQueueBtnHandler() {
  const queueBtn = document.querySelector('.queue-btn');
  if (queueBtn.innerText.toUpperCase() === 'ADD TO QUEUE') {
    queueBtn.innerText = 'REMOVE FROM QUEUE';
  } else {
    queueBtn.innerText = 'ADD TO QUEUE';
  }
}
