import './js/modal';
import './js/uptop';

import './js/search';

import './js/loader';
import { fetchTrendingMovies } from './js/fetchMovies';
import { renderList } from './js/renderFilmList';

fetchTrendingMovies(1).then(data => {
  if (data) {
    renderList(data.results);
  }
});

