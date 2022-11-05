import createMarkUp from '../templates/films-card.hbs';
import refsList from './refs';
import { fetchGenres } from './fetchMovies';

const refs = refsList();

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

    el.genre_ids = newArr;
  });

  const markup = data
    .map(film => {
      return createMarkUp(film);
    })
    .join('');
  refs.filmsList.insertAdjacentHTML('beforeend', markup);
}
