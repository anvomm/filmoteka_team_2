import createMarkUp from '../templates/library-default.hbs';
import refsList from './refs';
import { fetchTrendingMovies, fetchGenres } from './fetchMovies';
import { onOpenModal } from './modal';

const refs = refsList();

fetchTrendingMovies(3).then(data => {
  if (data) {
    renderList(data.results);
  }
});

export async function renderList(data) {
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
