import refsList from './refs';
/* import { renderList } from './renderFilmList'; */
import createDefaultMarkUp from '../templates/library-default.hbs';
import createMarkUp from '../templates/films-card.hbs';
import {
  fetchTrendingMovies,
  fetchGenres,
  fetchMovieById,
} from './fetchMovies';
import { onOpenModal } from './modal';

const refs = refsList();

/* defaultPageShow(); */

/* const watched = [
  807356, 414906
];
const queue = [595586]; // пробный массив
const KEY__WATCHED = 'watched';
const KEY__QUEUE = 'queue';
localStorage.setItem(KEY__WATCHED, JSON.stringify(watched)); //убрать
localStorage.setItem(KEY__QUEUE, JSON.stringify(queue)); //убрать
let watchedMovies;
let queueMovies; */

/* libraryMainPage(); */

/* async function libraryMainPage() {
  if (JSON.parse(localStorage.getItem(KEY__WATCHED)).length !== 0) {
    const movies = await renderWatchedMoviesList();
    renderWatchedCards(movies);
  }
}
 */
export function defaultPageShow() {
  fetchTrendingMovies(3).then(data => {
    if (data) {
      renderList(data.results);
    }
  });

  async function renderList(data) {
    const genersList = await fetchGenres();
    data.forEach(el => {
      const newArr = [];
      el.genre_ids.forEach(gener => {
        const newEl = genersList.find(x => x.id === gener);
        newArr.push(newEl.name);
      });

      if (newArr.length > 2) {
        newArr.splice(2, newArr.length - 2, 'Other');
      }

      el.genre_ids = newArr.join(', ');
    });

    const markup = data
      .map(film => {
        return createDefaultMarkUp(film);
      })
      .slice(0, 6)
      .join('');

    if (refs.libraryMoviesList) {
      refs.libraryMoviesList.insertAdjacentHTML('beforeend', markup);
    }

    refsList().filmsElements.forEach(card =>
      card.addEventListener('click', onOpenModal)
    );
  }
}
/* if (
  JSON.parse(!localStorage.getItem(KEY__WATCHED)) ||
  JSON.parse(localStorage.getItem(KEY__WATCHED)).length === 0
) {
  defaultPageShow();
} */

// Wached -> queue button part

/* if (refs.libraryWatchedBtn)
  refs.libraryWatchedBtn.addEventListener('click', onWatchedBtn);
if (refs.libraryQueueBtn)
  refs.libraryQueueBtn.addEventListener('click', onQueueBtn);

// WATCHED BTN

async function onWatchedBtn() {
  defaultContainerBuild();

  if (JSON.parse(localStorage.getItem(KEY__WATCHED)).length === 0) {
    defaultPageShow();
  }

  if (JSON.parse(localStorage.getItem(KEY__WATCHED)).length !== 0) {
    defaultClean();
    const movies = await renderWatchedMoviesList();
    renderWatchedCards(movies);
  }
  if (refs.libraryWatchedBtn)
    refs.libraryWatchedBtn.classList.add('header-library__btn-current');
  if (refs.libraryQueueBtn)
    refs.libraryQueueBtn.classList.remove('header-library__btn-current');
}

// ======== watched & queue = keys from localStorage ==========

async function renderWatchedMoviesList() {
  try {
    watchedMovies = JSON.parse(localStorage.getItem(KEY__WATCHED));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }

  const arrayOfPromises = watchedMovies.map(async movieId => {
    const response = await fetchMovieById(movieId);
    return response;
  });

  const movies = await Promise.all(arrayOfPromises);
  return movies;
}
function renderWatchedCards(movies) {
  console.log(movies);
  const genres = movies.map(movie => movie.genres.map(genre => genre.name));
  movies.map((movie, i) => (movie.genre_ids = genres[i].join(', ')));

  const markup = movies.map(movie => createMarkUp(movie)).join('');
  defaultClean();
  if (refs.libraryMoviesList)
    refs.libraryMoviesList.insertAdjacentHTML('beforeend', markup);

  refsList().filmsElements.forEach(card =>
    card.addEventListener('click', onOpenModal)
  );
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

// QUEUE BTN

async function onQueueBtn() {
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
  if (JSON.parse(localStorage.getItem(KEY__QUEUE)).length !== 0) {
    const movies = await renderQueueMoviesList();
    renderWatchedCards(movies);
  }
}

async function renderQueueMoviesList() {
  try {
    queueMovies = JSON.parse(localStorage.getItem(KEY__QUEUE));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }

  const arrayOfPromises = queueMovies.map(async movieId => {
    const response = await fetchMovieById(movieId);
    return response;
  });

  const movies = await Promise.all(arrayOfPromises);
  return movies;
}
 */
