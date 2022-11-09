import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import { logicForSearchedMoviesPas, renderPagination } from './pagination';
import refsList from './refs';

const refs = refsList();
refs.pagination.style.display = 'none';

let page = 1;

fetchTrendingMovies(page).then(data => {
  if (data) {
    renderList(data.results);

    //из-за этого слушателя перестала кликаться пагинацияПОИСК
    refs.pagination.removeEventListener('click', logicForSearchedMoviesPas);
    renderPagination(data.page, data.total_pages);
  }
});
