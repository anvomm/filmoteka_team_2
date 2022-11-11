import refsList from './refs';
import { fetchMovieById } from './fetchMovies';
import modelTempl from '../templates/modal-content.hbs';
import {
  defaultContainerBuild,
  libraryMainPageBuild,
  libraryQueuePageBuild,
} from './libraryFromLocalStorage';

const refs = refsList();

let watchedMoviesToAdd = [];
let moviesToQueue = [];
const KEY__WATCHED = 'watched';
const KEY__QUEUE = 'queue';
let currentFilm = {};

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseClickBackdrop);

export function onOpenModal() {
  pagePositionOnOpen();

  const id = this.dataset.action;
  fetchMovieById(id).then(resp => {
    const loader = new ldLoader({ root: '.ldld.full' });
    loader.on();
    const markup = modelTempl(resp);
    refs.modalTmp.insertAdjacentHTML('beforeend', markup);

    loader.off();

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

    currentFilm = {
      poster_path: document.querySelector('.modal-card__img').src.slice(31),
      id: document.querySelector('.modal-card__img').dataset.id,
      title: document.querySelector('.film-card-content__title').textContent,
      genre_ids: document.querySelector('.genres').textContent,
      release_date: document.querySelector('.film-card-content__title').dataset
        .date,
    };

    const watchedBtn = document.querySelector('.watched-btn');
    const queueBtn = document.querySelector('.queue-btn');
    watchedBtn.addEventListener('click', onWatchedBtnHandler);
    queueBtn.addEventListener('click', onQueueBtnHandler);

    window.addEventListener('keydown', onCloseKeyEsc);
    refs.modal.classList.remove('is-hidden');
    document.addEventListener('click', function (e) {
      if (document.activeElement.toString() == '[object HTMLButtonElement]') {
        document.activeElement.blur();
      }
    });
  });
}

export function onCloseModal() {
  pageContentOnClose();

  window.removeEventListener('keydown', onCloseKeyEsc);
  refs.modalTmp.innerHTML = '';
  refs.modal.classList.add('is-hidden');
  document.removeEventListener('click', function (e) {
    if (document.activeElement.toString() == '[object HTMLButtonElement]') {
      document.activeElement.blur();
    }
  });
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

  if (
    window.navigator.platform === 'iPad' ||
    window.navigator.platform === 'iPod' ||
    window.navigator.platform === 'iPhone' ||
    window.navigator.platform === 'Mac68K' ||
    window.navigator.platform === 'MacPPC' ||
    window.navigator.platform === 'MacIntel'
  ) {
    return;
  } else {
    refs.body.style.paddingRight = '17px';
  }
}

export function pageContentOnClose() {
  let pagePosition = parseInt(refs.body.dataset.position, 10);
  refs.body.style.top = 'auto';
  refs.body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  refs.body.removeAttribute('data-position');

  if (
    window.navigator.platform === 'iPad' ||
    window.navigator.platform === 'iPod' ||
    window.navigator.platform === 'iPhone' ||
    window.navigator.platform === 'Mac68K' ||
    window.navigator.platform === 'MacPPC' ||
    window.navigator.platform === 'MacIntel'
  ) {
    return;
  } else {
    refs.body.style.paddingRight = '0px';
  }
}

function onWatchedBtnHandler() {
  const watchedBtn = document.querySelector('.watched-btn');

  if (watchedBtn.innerText.toUpperCase() === 'ADD TO WATCHED') {
    const localStorageHasData = JSON.parse(localStorage.getItem(KEY__WATCHED));

    if (localStorageHasData) {
      localStorageHasData.push(currentFilm);
      localStorage.setItem(KEY__WATCHED, JSON.stringify(localStorageHasData));
    } else {
      watchedMoviesToAdd.push(currentFilm);

      localStorage.setItem(KEY__WATCHED, JSON.stringify(watchedMoviesToAdd));
    }

    watchedBtn.innerText = 'REMOVE FROM WATCHED';
    libraryMainPageBuild();
  } else {
    const arr = JSON.parse(localStorage.getItem(KEY__WATCHED));
    const indexToDelete = arr.findIndex(
      el => el.id === document.querySelector('.modal-card__img').dataset.id
    );
    arr.splice(indexToDelete, 1);
    localStorage.setItem(KEY__WATCHED, JSON.stringify(arr));

    watchedBtn.innerText = 'ADD TO WATCHED';

    if (JSON.parse(localStorage.getItem(KEY__WATCHED)).length === 0) {
      defaultContainerBuild();
      return;
    }

    libraryMainPageBuild();
    if (arr.length === 0) {
      defaultContainerBuild();
    }
  }
}

function onQueueBtnHandler() {
  const queueBtn = document.querySelector('.queue-btn');

  if (queueBtn.innerText.toUpperCase() === 'ADD TO QUEUE') {
    const localStorageHasData = JSON.parse(localStorage.getItem(KEY__QUEUE));

    if (localStorageHasData) {
      localStorageHasData.push(currentFilm);
      localStorage.setItem(KEY__QUEUE, JSON.stringify(localStorageHasData));
    } else {
      moviesToQueue.push(currentFilm);

      localStorage.setItem(KEY__QUEUE, JSON.stringify(moviesToQueue));
    }
    queueBtn.innerText = 'REMOVE FROM QUEUE';
    libraryQueuePageBuild();
  } else {
    const arr = JSON.parse(localStorage.getItem(KEY__QUEUE));
    const indexToDelete = arr.findIndex(
      el => el.id === document.querySelector('.modal-card__img').dataset.id
    );
    arr.splice(indexToDelete, 1);
    localStorage.setItem(KEY__QUEUE, JSON.stringify(arr));
    queueBtn.innerText = 'ADD TO QUEUE';
    if (JSON.parse(localStorage.getItem(KEY__QUEUE)).length === 0) {
      defaultContainerBuild();
      return;
    }
    libraryQueuePageBuild();
    if (arr.length === 0) {
      defaultContainerBuild();
    }
  }
}
