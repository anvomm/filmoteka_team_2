import refsList from './refs';
import { fetchMovieByQuery } from './fetchMovies';
import { fetchGenres } from './fetchMovies';
import createMarkUp from '../templates/films-card.hbs';

const refs = refsList();
if (refs.notification) refs.notification.textContent = '';

// if (refs.form) refs.form.addEventListener('submit', onSubmitForm);

//добавила этот момент, нужно, чтобы на странице библиотеки ошибку не било
if (refs.form) {
  refs.form.addEventListener('submit', onSubmitForm);
}
export async function onSubmitForm(event) {
  event.preventDefault();

  const page = 1;

  const query = refs.formInput.value.trim();
  const loader = new ldLoader({ root: '.ldld.full' });
  loader.on();

  const response = await fetchMovieByQuery(query, page);
  const movies = await response.results;

  //    function renderList(data) {
  //       refs.filmsList.innerHTML = '';
  //       const markup = createMarkUp({ ...data });
  //       refs.filmsList.insertAdjacentHTML('afterbegin', markup);
  //     }

  async function renderList(data) {
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

    refs.filmsList.innerHTML = '';

    const markup = data
      .map(film => {
        return createMarkUp(film);
      })
      .join('');
    if (refs.filmsList) {
      refs.filmsList.insertAdjacentHTML('beforeend', markup);
      loader.off();
    }

    //   refs.notification.textContent = ''
  }

  refs.notification.textContent = `Wow! We found ${response.total_results} results on request "${query}"!`;
  refs.notification.style.color = '#818181';
  refs.formInput.value = '';

  if (movies.length === 0) {
    refs.notification.textContent = `Search result not successful. Enter the correct movie name.`;
    refs.notification.style.color = '#ff001b';
    setTimeout(() => {
      refs.notification.textContent = '';
    }, 2000);
    return;
  }

  renderList(movies);
  //   вызываем функцию рисования разметки
}
