import refsList from './refs';
import createMarkUp from '../templates/films-card.hbs';
import { modalConnection } from './modalConnection';
import { onOpenModal } from './modal';
import paginationMarkup from './createPagination';
import { siteConfigs } from './siteConfigs';
import './paginationEvents';

const refs = refsList();

const KEY__WATCHED = 'watched';
const KEY__QUEUE = 'queue';

if (
  !JSON.parse(localStorage.getItem(KEY__WATCHED)) ||
  JSON.parse(localStorage.getItem(KEY__WATCHED)).length === 0
) {
  if (refs.libraryDefaultContainer)
    refs.libraryDefaultContainer.style.visibility = 'visible';
} else {
  libraryMainPageBuild();
}

if (refs.libraryWatchedBtn)
  refs.libraryWatchedBtn.addEventListener('click', onWatchedBtn);
if (refs.libraryQueueBtn)
  refs.libraryQueueBtn.addEventListener('click', onQueueBtn);

function onWatchedBtn() {
  defaultContainerBuild();
  if (refs.libraryWatchedBtn)
    refs.libraryWatchedBtn.classList.add('header-library__btn-current');
  if (refs.libraryQueueBtn)
    refs.libraryQueueBtn.classList.remove('header-library__btn-current');

  if (
    !JSON.parse(localStorage.getItem(KEY__WATCHED)) ||
    JSON.parse(localStorage.getItem(KEY__WATCHED)).length === 0
  ) {
    defaultContainerBuild();
    defaultPageShow();
  }

  libraryMainPageBuild();
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
    if (refs.libraryDefaultContainer)
      refs.libraryDefaultContainer.style.visibility = 'visible';
    defaultContainerBuild();
  }

  libraryQueuePageBuild();
}

export async function libraryMainPageBuild() {
  defaultClean();
  siteConfigs.lastFetch = 'WATCHED';
  if (
    JSON.parse(localStorage.getItem(KEY__WATCHED)) &&
    JSON.parse(localStorage.getItem(KEY__WATCHED)).length !== 0
  ) {
    let watchedMovies = JSON.parse(localStorage.getItem(KEY__WATCHED));

    watchedMovies = watchedMovies.splice(
      (siteConfigs.watchedPage - 1) * siteConfigs.perPage,
      siteConfigs.watchedPage * siteConfigs.perPage
    );
    const markup = watchedMovies.map(movie => createMarkUp(movie)).join('');
    defaultClean();
    if (refs.libraryMoviesList)
      refs.libraryMoviesList.insertAdjacentHTML('beforeend', markup);
  }

  paginationMarkup(
    Math.ceil(
      JSON.parse(localStorage.getItem(KEY__WATCHED)).length /
        siteConfigs.perPage
    ),
    siteConfigs.watchedPage
  );

  if (
    JSON.parse(localStorage.getItem(KEY__WATCHED)).length <= siteConfigs.perPage
  ) {
    refs.paginationNew.classList.add('pagination--off');
  }

  refsList().filmsElements.forEach(card =>
    card.addEventListener('click', onOpenModal)
  );
}

export async function libraryQueuePageBuild() {
  siteConfigs.lastFetch = 'QUEUE';
  if (
    JSON.parse(localStorage.getItem(KEY__QUEUE)) &&
    JSON.parse(localStorage.getItem(KEY__QUEUE)).length !== 0
  ) {
    let queueMovies = JSON.parse(localStorage.getItem(KEY__QUEUE));

    queueMovies = queueMovies.splice(
      (siteConfigs.queuePage - 1) * siteConfigs.perPage,
      siteConfigs.queuePage * siteConfigs.perPage
    );
    const markup = queueMovies.map(movie => createMarkUp(movie)).join('');
    defaultClean();
    if (refs.libraryMoviesList)
      refs.libraryMoviesList.insertAdjacentHTML('beforeend', markup);

    paginationMarkup(
      Math.ceil(
        JSON.parse(localStorage.getItem(KEY__QUEUE)).length /
          siteConfigs.perPage
      ),
      siteConfigs.queuePage
    );
    if (
      JSON.parse(localStorage.getItem(KEY__QUEUE)).length <= siteConfigs.perPage
    )
      refs.paginationNew.classList.add('pagination--off');
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
  refs.libraryDefaultContainer.style.visibility = 'visible';
}
