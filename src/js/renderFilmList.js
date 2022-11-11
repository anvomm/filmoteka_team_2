import createMarkUp from '../templates/films-card.hbs';
import refsList from './refs';
import { siteConfigs } from './siteConfigs';
import { modalConnection } from './modalConnection';
import paginationMarkup from './createPagination';

const refs = refsList();

export async function renderList(data, page) {
  refs.notification.style.visibility = 'hidden';
  const movies = data.results;
  const loader = new ldLoader({ root: '.ldld.full' });
  loader.on();
  if (refs.filmsList && refs.filmsList.innerHTML) {
    refs.filmsList.innerHTML = '';
  }

  movies.forEach(el => {
    const newArr = [];
    el.genre_ids.forEach(gener => {
      const newEl = siteConfigs.geners.find(x => x.id === gener);
      if (newEl) newArr.push(newEl.name);
    });

    if (newArr.length > 2) {
      newArr.splice(2, newArr.length - 2, 'Other');
    }

    el.genre_ids = newArr.length ? newArr.join(', ') : 'Other gener';
  });

  paginationMarkup(data.total_pages, page);

  const markup = movies
    .map(film => {
      return createMarkUp(film);
    })
    .join('');
  if (refs.filmsList) {
    refs.filmsList.insertAdjacentHTML('beforeend', markup);

    loader.off();
  }

  modalConnection();
}
