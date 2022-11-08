import refsList from './refs';
import createDefaultMarkUp from '../templates/library-default.hbs';
import createMarkUp from '../templates/films-card.hbs';
import {
  fetchTrendingMovies,
  fetchGenres,
  fetchMovieById,
} from './fetchMovies';
import { onOpenModal } from './modal';
import { modalConnection } from './modalConnection';

const refs = refsList();

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

    modalConnection();
  }
}
