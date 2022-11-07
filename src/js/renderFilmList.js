import createMarkUp from '../templates/films-card.hbs';
import refsList from './refs';
import { fetchGenres } from './fetchMovies';
import { onOpenModal } from './modal';

const refs = refsList();

export async function renderList(data) {
  const loader = new ldLoader({ root: '.ldld.full' });
  loader.on();
  if (refs.filmsList && refs.filmsList.innerHTML) {
    refs.filmsList.innerHTML = "";
  }
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
    .join('');
  if (refs.filmsList) {
    refs.filmsList.insertAdjacentHTML('beforeend', markup);
  }

  refsList().filmsElements.forEach(card =>
    card.addEventListener('click', onOpenModal)
  );
  loader.off();
}
