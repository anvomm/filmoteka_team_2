import refsList from './refs';
import { fetchMovieByQuery } from './fetchMovies';
import { renderList } from './renderFilmList';

const refs = refsList();
if (refs.notification) refs.notification.textContent = '';

//добавила этот момент, нужно, чтобы на странице библиотеки ошибку не било
if (refs.form) {
  refs.form.addEventListener('submit', onSubmitForm);
}
export async function onSubmitForm(event) {
  event.preventDefault();

  const page = 1;

  const query = refs.formInput.value.trim();
  refs.pagination.style.display = 'flex';
  const loader = new ldLoader({ root: '.ldld.full' });
  loader.on();

  const response = await fetchMovieByQuery(query, page);
  const movies = await response.results;

  refs.notification.textContent = `Wow! We found ${response.total_results} results on request "${query}"!`;
  refs.notification.style.color = '#818181';
  refs.formInput.value = '';

  if (movies.length === 0) {
    loader.off();
    refs.notification.textContent = `Search result not successful. Enter the correct movie name.`;
    refs.notification.style.color = '#ff001b';
    refs.pagination.style.display = 'none';
    renderList(movies);
    setTimeout(() => {
      refs.notification.textContent = '';
    }, 2000);
    return;
  }

  //   вызываем функцию рисования разметки
  renderList(movies);
  loader.off();
}
