import refsList from './refs';
import { fetchMovieByQuery } from './fetchMovies';
import { renderList } from './renderFilmList';
// import { renderPagination } from './pagination';
// import { logicForPopularMoviesPag } from './pagination';
import { siteConfigs } from './siteConfigs';

const refs = refsList();

export let query = '';
if (refs.notification) refs.notification.style.visibility = 'hidden';

//добавила этот момент, нужно, чтобы на странице библиотеки ошибку не било
if (refs.form) {
  refs.form.addEventListener('submit', onSubmitForm);
}
export async function onSubmitForm(event) {
  event.preventDefault();

  if (refs.formInput.value.match(/^\s+$/)) return;
  refs.paginationNew.style.display = 'none';
  const page = 1;

  siteConfigs.searchQuery = refs.formInput.value.trim();
  refs.paginationNew.style.display = 'flex';

  const loader = new ldLoader({ root: '.ldld.full' });
  loader.on();

  siteConfigs.lastFetch = 'SEARCH';
  const response = await fetchMovieByQuery(siteConfigs.searchQuery, page);

  refs.notification.textContent = `Wow! We found ${response.total_results} results on request "${siteConfigs.searchQuery}"!`;
  refs.notification.style.color = '#818181';

  if (response.results.length === 0) {
    loader.off();
    refs.paginationNew.style.display = 'none';
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
  renderList(response, siteConfigs.page);
  refs.notification.style.visibility = 'visible';
  refs.form.reset();
  loader.off();
  // //снимаем слушателя с пагинации поп.фильмов
  // refs.pagination.removeEventListener('click', logicForPopularMoviesPag);
  // //рисуем пагинацию
  // renderPagination(response.page, response.total_pages);
}
