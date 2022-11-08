import { defaultPageShow } from './library';
import refsList from './refs';
import createMarkUp from '../templates/films-card.hbs';
import { modalConnection } from './modalConnection';

const refs = refsList();

const KEY__WATCHED = 'watched';
const KEY__QUEUE = 'queue';
// localStorage.setItem(KEY__WATCHED, JSON.stringify(watched));
// localStorage.setItem(KEY__QUEUE, JSON.stringify(queue));

if (
  JSON.parse(!localStorage.getItem(KEY__WATCHED)) ||
  JSON.parse(localStorage.getItem(KEY__WATCHED)).length === 0
) {
  defaultPageShow();
} else {
  libraryMainPageBuild();
}

if (refs.libraryWatchedBtn)
  refs.libraryWatchedBtn.addEventListener('click', onWatchedBtn);
if (refs.libraryQueueBtn)
  refs.libraryQueueBtn.addEventListener('click', onQueueBtn);

function onWatchedBtn() {
  defaultContainerBuild();

  if (JSON.parse(localStorage.getItem(KEY__WATCHED)).length === 0) {
    defaultPageShow();
  }

  libraryMainPageBuild();

  refsList().filmsElements.forEach(card =>
    card.addEventListener('click', onOpenModal)
  );

  if (refs.libraryWatchedBtn)
    refs.libraryWatchedBtn.classList.add('header-library__btn-current');
  if (refs.libraryQueueBtn)
    refs.libraryQueueBtn.classList.remove('header-library__btn-current');
}

function onQueueBtn() {
  if (refs.libraryQueueBtn)
    refs.libraryQueueBtn.classList.add('header-library__btn-current');
  if (refs.libraryWatchedBtn)
    refs.libraryWatchedBtn.classList.remove('header-library__btn-current');

  if (
    !JSON.parse(localStorage.getItem(KEY__QUEUE)) ||
    JSON.parse(localStorage.getItem(KEY__QUEUE)).length === 0
  ) {
    defaultContainerBuild();
    defaultPageShow();
  }

  libraryQueuePageBuild();
}

export function libraryMainPageBuild() {
  if (JSON.parse(localStorage.getItem(KEY__WATCHED)).length !== 0) {
    const markup = JSON.parse(localStorage.getItem(KEY__WATCHED))
      .map(movie => createMarkUp(movie))
      .join('');
    defaultClean();
    if (refs.libraryMoviesList)
      refs.libraryMoviesList.insertAdjacentHTML('beforeend', markup);
  }

  modalConnection();
}

function libraryQueuePageBuild() {
  if (JSON.parse(localStorage.getItem(KEY__QUEUE)).length !== 0) {
    const markup = JSON.parse(localStorage.getItem(KEY__QUEUE))
      .map(movie => createMarkUp(movie))
      .join('');
    defaultClean();
    if (refs.libraryMoviesList)
      refs.libraryMoviesList.insertAdjacentHTML('beforeend', markup);
  }
  modalConnection();
}

function defaultClean() {
  if (refs.libraryMoviesList) refs.libraryMoviesList.innerHTML = '';
  if (refs.libraryDefaultContainer)
    refs.libraryDefaultContainer.style.display = 'none';
}

export function defaultContainerBuild() {
  if (refs.libraryMoviesList) refs.libraryMoviesList.innerHTML = '';
  if (refs.libraryDefaultContainer)
    refs.libraryDefaultContainer.style.display = 'flex';
}
