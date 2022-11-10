import refsList from './refs';
import { fetchMovieByQuery } from './fetchMovies';
import { renderList } from './renderFilmList';
import { renderPagination } from './pagination';
import {
  logicForPopularMoviesPag,
  logicForSearchedMoviesPas,
} from './pagination';

const refs = refsList();

export let query = '';
if (refs.notification) refs.notification.style.visibility = 'hidden';

//добавила этот момент, нужно, чтобы на странице библиотеки ошибку не било
if (refs.form) {
  refs.form.addEventListener('submit', onSubmitForm);
}
export async function onSubmitForm(event) {
  event.preventDefault();
  refs.pagination.style.display = 'none';

  refs.notification.style.visibility = 'hidden';
  const page = 1;

  query = refs.formInput.value.trim();
  refs.pagination.style.display = 'flex';

  const loader = new ldLoader({ root: '.ldld.full' });
  loader.on();

  const response = await fetchMovieByQuery(query, page);
  const movies = await response.results;

  refs.notification.textContent = `Wow! We found ${response.total_results} results on request "${query}"!`;
  refs.notification.style.color = '#818181';
  refs.notification.style.visibility = 'visible';

  if (movies.length === 0) {
    loader.off();
    refs.pagination.style.display = 'none';
    refs.notification.textContent = `Search result not successful. Enter the correct movie name.`;
    refs.notification.style.color = '#ff001b';
    refs.notification.style.visibility = 'visible';
    refs.filmsList.innerHTML = '';
    refs.form.reset();

    /*   setTimeout(() => {
      refs.notification.style.visibility = 'visible';
    }, 8000); */

    return;
  }

  //   вызываем функцию рисования разметки
  renderList(movies);
  refs.form.reset();
  loader.off();

  //рисуем пагинацию
  renderPagination(response.page, response.total_pages);
  //снимаем слушателя с пагинации поп.фильмов
  refs.pagination.removeEventListener('click', logicForPopularMoviesPag);
  //вешаем слушателя для пагинации поиск.фильмов
  refs.pagination.addEventListener('click', logicForSearchedMoviesPas);
}
