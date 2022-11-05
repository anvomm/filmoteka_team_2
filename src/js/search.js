import refsList from './refs';
import { fetchMovieByQuery } from './fetchMovies';

const refs = refsList();

refs.form.addEventListener('submit', onSubmitForm);

export async function onSubmitForm(event) {
  event.preventDefault();

  const query = refs.formInput.value.trim();
  const response = await fetchMovieByQuery(query);
  const movies = await response.results;

  refs.formInput.value = '';

  if (movies.length === 0) {
    refs.notification.classList.remove('off');
    setTimeout(() => {
      refs.notification.classList.add('off');
    });
    return;
  }

  //   вызываем функцию рисования разметки
}
