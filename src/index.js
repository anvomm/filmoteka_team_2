import './js/modal';
import './js/uptop';
import './js/loader';
import './js/search';

import { fetchTrendingMovies } from './js/fetchMovies';
import { renderList } from './js/renderFilmList';
import { stylizePaginationOnStart } from './js/pagination';

fetchTrendingMovies(1).then(data => {
  if (data) {
    renderList(data.results);
    stylizePaginationOnStart(10);
  }
});

import './js/pagination';
