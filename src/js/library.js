import refsList from './refs';
/* import { renderList } from './renderFilmList'; */
import createMarkUp from '../templates/library-default.hbs';
import {
  fetchTrendingMovies,
  fetchGenres,
  fetchMovieById,
} from './fetchMovies';
import { onOpenModal } from './modal';
// import createMarkUp from '../templates/films-card.hbs';
// import { onOpenModal } from './modal';
// import { fetchGenres } from './fetchMovies';

// const BASE_URL = 'https://api.themoviedb.org/';
// const API_KEY = 'd929b7a4b435aa22496bb0793b172bfc';

const refs = refsList();

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
      return createMarkUp(film);
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
/*refs.libraryWatchedBtn.addEventListener('click', onWatchedBtn);
refs.libraryQueueBtn.addEventListener('click', onQueueBtn);

function onQueueBtn() {
  refs.libraryQueueBtn.classList.add('header-library__btn-current');
  refs.libraryWatchedBtn.classList.remove('header-library__btn-current');
  renderQueueMoviesList();
}

function onWatchedBtn() {
  refs.libraryWatchedBtn.classList.add('header-library__btn-current');
  refs.libraryQueueBtn.classList.remove('header-library__btn-current');
  renderWatchedMoviesList();
}

// ======== watched & queue = keys from localStorage ==========

 function renderWatchedMoviesList() {
  try {
    const watchedMovies = JSON.parse(localStorage.getItem(watched));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }

  const markup = watchedMovies
    .map(({ id }) => {
      return fetchMovieById(id);
    })
    .join('');

  renderList(markup);
}

function renderQueueMoviesList() {
  try {
    const watchedMovies = JSON.parse(localStorage.getItem(queue));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }

  const markup = watchedMovies
    .map(({ id }) => {
      return fetchMovieById(id);
    })
    .join('');

  renderList(markup);

 */
