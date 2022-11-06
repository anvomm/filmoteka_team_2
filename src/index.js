import './js/modal';
import './js/uptop';
import './js/loader';
import './js/search';
import './js/localStorage';
import { fetchTrendingMovies } from './js/fetchMovies';
import { renderList } from './js/renderFilmList';

let page = 1;

fetchTrendingMovies(page).then(data => {
  if (data) {
    renderList(data.results);
  }
});
