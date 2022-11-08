import refsList from './refs';
import { fetchMovieById } from './fetchMovies';
import modelTempl from '../templates/modal-content.hbs';
import {
  defaultContainerBuild,
  libraryMainPageBuild,
} from './libraryFromLocalStorage';
import { defaultPageShow } from './library';

const refs = refsList();

let watchedMoviesToAdd = [];
let moviesToQueue = [];
const KEY__WATCHED = 'watched';
const KEY__QUEUE = 'queue';

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseClickBackdrop);

export function onOpenModal() {
  pagePositionOnOpen();

  const id = this.dataset.action;
  fetchMovieById(id).then(resp => {
    const markup = modelTempl(resp);
    refs.modalTmp.insertAdjacentHTML('beforeend', markup);

    if (JSON.parse(localStorage.getItem(KEY__WATCHED))) {
      const data = JSON.parse(localStorage.getItem(KEY__WATCHED));
      if (
        data.find(
          el => el.id === document.querySelector('.modal-card__img').dataset.id
        )
      ) {
        document.querySelector('.watched-btn').innerText =
          'REMOVE FROM WATCHED';
      }
    }

    if (JSON.parse(localStorage.getItem(KEY__QUEUE))) {
      const data = JSON.parse(localStorage.getItem(KEY__QUEUE));
      if (
        data.find(
          el => el.id === document.querySelector('.modal-card__img').dataset.id
        )
      ) {
        document.querySelector('.queue-btn').innerText = 'REMOVE FROM QUEUE';
      }
    }

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
  refs.body.classList.add('disable-scroll');
  refs.body.dataset.position = pagePosition;
  refs.body.style.top = -pagePosition + 'px';
  refs.body.style.paddingRight = '17px';
}

export function pageContentOnClose() {
  let pagePosition = parseInt(refs.body.dataset.position, 10);
  refs.body.style.top = 'auto';
  refs.body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  refs.body.removeAttribute('data-position');
  refs.body.style.paddingRight = '0px';
}

function onWatchedBtnHandler() {
  const watchedBtn = document.querySelector('.watched-btn');
  const currentFilm = {
    poster_path: document.querySelector('.modal-card__img').src.slice(31),
    id: document.querySelector('.modal-card__img').dataset.id,
    title: document.querySelector('.film-card-content__title').textContent,
    vote_average: document.querySelector('.rating').textContent,
    genre_ids: document.querySelector('.film-card-content__item-text-right')
      .textContent,
    release_date: document.querySelector('.film-card-content__title').dataset
      .date,
  };

  if (watchedBtn.innerText.toUpperCase() === 'ADD TO WATCHED') {
    const localStorageHasData = JSON.parse(localStorage.getItem(KEY__WATCHED));

    if (localStorageHasData) {
      localStorageHasData.push(currentFilm);
      localStorage.setItem(KEY__WATCHED, JSON.stringify(localStorageHasData));
    } else {
      watchedMoviesToAdd.push(currentFilm);

      console.log(watchedMoviesToAdd);

      localStorage.setItem(KEY__WATCHED, JSON.stringify(watchedMoviesToAdd));
    }

    watchedBtn.innerText = 'REMOVE FROM WATCHED';
  } else {
    const arr = JSON.parse(localStorage.getItem(KEY__WATCHED));
    const indexToDelete = arr.findIndex(
      el => el.id === document.querySelector('.modal-card__img').dataset.id
    );
    arr.splice(indexToDelete, 1);
    localStorage.setItem(KEY__WATCHED, JSON.stringify(arr));
    watchedBtn.innerText = 'ADD TO WATCHED';
    libraryMainPageBuild();
    if (arr.length === 0) {
      defaultContainerBuild();
      defaultPageShow();
    }
  }
}

function onQueueBtnHandler() {
  const queueBtn = document.querySelector('.queue-btn');

  const currentFilm = {
    poster_path: document.querySelector('.modal-card__img').src.slice(31),
    id: document.querySelector('.modal-card__img').dataset.id,
    title: document.querySelector('.film-card-content__title').textContent,
    vote_average: document.querySelector('.rating').textContent,
    genre_ids: document.querySelector('.film-card-content__item-text-right')
      .textContent,
    release_date: document.querySelector('.film-card-content__title').dataset
      .date,
  };

  if (queueBtn.innerText.toUpperCase() === 'ADD TO QUEUE') {
    const localStorageHasData = JSON.parse(localStorage.getItem(KEY__QUEUE));

    if (localStorageHasData) {
      localStorageHasData.push(currentFilm);
      localStorage.setItem(KEY__QUEUE, JSON.stringify(localStorageHasData));
    } else {
      moviesToQueue.push(currentFilm);

      console.log(moviesToQueue);

      localStorage.setItem(KEY__QUEUE, JSON.stringify(moviesToQueue));
    }
    queueBtn.innerText = 'REMOVE FROM QUEUE';
  } else {
    const arr = JSON.parse(localStorage.getItem(KEY__QUEUE));
    const indexToDelete = arr.findIndex(
      el => el.id === document.querySelector('.modal-card__img').dataset.id
    );
    arr.splice(indexToDelete, 1);
    localStorage.setItem(KEY__QUEUE, JSON.stringify(arr));
    queueBtn.innerText = 'ADD TO QUEUE';
    libraryMainPageBuild();
    if (arr.length === 0) {
      defaultContainerBuild();
      defaultPageShow();
    }
  }
}
