import { defaultPageShow } from './library';
import refsList from './refs';
import createMarkUp from '../templates/films-card.hbs';
import { onOpenModal } from './modal';

const watched = [
  /*   {
    poster_path: '/wdbiMjXd4CxPfCx4r4Jfy8cGec0.jpg',
    id: '11111',
    title: 'My policeman',
    vote_average: '8.249',
    vote_count: '177',
    popularity: '290.839',
    overview:
      'In the late 1990s, the arrival of elderly invalid Patrick into Marion and Tom’s home triggers the exploration of seismic events from 40 years previous: the passionate relationship between Tom and Patrick at a time when homosexuality was illegal.',
    genre_ids: 'Drama, Romance',
    release_date: '2022-11-04',
  },

  {
    poster_path: '/wdbiMjXd4CxPfCx4r4Jfy8cGec0.jpg',
    id: '2222',
    title: 'My policeman',
    vote_average: '8.249',
    vote_count: '177',
    popularity: '290.839',
    overview:
      'In the late 1990s, the arrival of elderly invalid Patrick into Marion and Tom’s home triggers the exploration of seismic events from 40 years previous: the passionate relationship between Tom and Patrick at a time when homosexuality was illegal.',
    genre_ids: 'Drama, Romance',
    release_date: '2022-11-04',
  },

  {
    poster_path: '/wdbiMjXd4CxPfCx4r4Jfy8cGec0.jpg',
    id: '3333',
    title: 'My policeman',
    vote_average: '8.249',
    vote_count: '177',
    popularity: '290.839',
    overview:
      'In the late 1990s, the arrival of elderly invalid Patrick into Marion and Tom’s home triggers the exploration of seismic events from 40 years previous: the passionate relationship between Tom and Patrick at a time when homosexuality was illegal.',
    genre_ids: 'Drama, Romance',
    release_date: '2022-11-04',
  }, */
];

const queue = [
  {
    poster_path: '/5EB9LAzIePTQoMpg2M1GNJpNn9s.jpg',
    id: '11111',
    title: 'King Lines',
    vote_average: '8.249',
    vote_count: '177',
    popularity: '290.839',
    overview:
      'In the late 1990s, the arrival of elderly invalid Patrick into Marion and Tom’s home triggers the exploration of seismic events from 40 years previous: the passionate relationship between Tom and Patrick at a time when homosexuality was illegal.',
    genre_ids: 'Adventure, Documentary',
    release_date: '2022-11-04',
  },

  {
    poster_path: '/9nAWnMNvFrhSmytB2VLw3OR7BJ3.jpg',
    id: '2222',
    title: 'Christine',
    vote_average: '8.249',
    vote_count: '177',
    popularity: '290.839',
    overview:
      'In the late 1990s, the arrival of elderly invalid Patrick into Marion and Tom’s home triggers the exploration of seismic events from 40 years previous: the passionate relationship between Tom and Patrick at a time when homosexuality was illegal.',
    genre_ids: 'Drama',
    release_date: '2022-11-04',
  },

  {
    poster_path: '/8PT4sAcneQ7MtZ1Mqoe2EyOJHmZ.jpg',
    id: '2323',
    title: 'Field of Dreams',
    vote_average: '8.249',
    vote_count: '177',
    popularity: '290.839',
    overview:
      'In the late 1990s, the arrival of elderly invalid Patrick into Marion and Tom’s home triggers the exploration of seismic events from 40 years previous: the passionate relationship between Tom and Patrick at a time when homosexuality was illegal.',
    genre_ids: 'Drama, Romance',
    release_date: '2022-11-04',
  },
];

const refs = refsList();

const KEY__WATCHED = 'watched';
const KEY__QUEUE = 'queue';
localStorage.setItem(KEY__WATCHED, JSON.stringify(watched));
localStorage.setItem(KEY__QUEUE, JSON.stringify(queue));

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

function libraryMainPageBuild() {
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

function defaultContainerBuild() {
  if (refs.libraryMoviesList) refs.libraryMoviesList.innerHTML = '';
  if (refs.libraryDefaultContainer)
    refs.libraryDefaultContainer.style.display = 'flex';
}

function modalConnection() {
  refsList().filmsElements.forEach(card =>
    card.addEventListener('click', onOpenModal)
  );
}
