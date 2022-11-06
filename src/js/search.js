import refsList from './refs.js';
import { fetchMovieByQuery } from './fetchMovies.js';
import { renderList } from './renderFilmList.js';

const refs = refsList();

if (refs.form) refs.form.addEventListener('submit', onSubmitForm);

export async function onSubmitForm(event) {
  event.preventDefault();

  const page = 1;
  const query = refs.formInput.value.trim(); //event.currentTarget.elements.searchQuery.value.trim();
  const response = await fetchMovieByQuery(query, page);
  const movies = await response.results;

  refs.formInput.value = '';

  if (movies.length === 0) {
    refs.notification.classList.remove('off');
    setTimeout(() => {
      refs.notification.classList.add('off');
    });
    return;
  }
  renderList(movies);
  //   вызываем функцию рисования разметки
}
