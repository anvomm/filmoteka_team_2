import refsList from './refs';
import { fetchMovieByQuery } from './fetchMovies';
// import { renderList } from './renderFilmList';


const refs = refsList();

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

const page = 1
  const query = refs.formInput.value.trim();
  const response = fetchMovieByQuery(query, page);
  const movies = response.results;

    refs.formInput.value = '';
    
    movieSearcher(query, page)

  if (movies.length === 0) {
    refs.notification.classList.remove('off');
    setTimeout(() => {
      refs.notification.classList.add('off');
    });
    return;
  }

  //   вызываем функцию рисования разметки
}




