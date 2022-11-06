import refsList from './refs';
import { fetchMovieByQuery } from './fetchMovies';
import { renderList } from './renderFilmList';

const refs = refsList();


 //добавила этот момент, нужно, чтобы на странице библиотеки ошибку не било
if (refs.form) {
  refs.form.addEventListener('submit', onSubmitForm);
}

export async function onSubmitForm(event) {
  event.preventDefault();

  const page = 1;
  const query = refs.formInput.value.trim();
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
renderList(movies)
  //   вызываем функцию рисования разметки
}



