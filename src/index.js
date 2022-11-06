import './js/modal';
import './js/uptop';
import './js/loader';
import './js/search';
import './js/themeSwitcher';
import './js/localStorage';
import './js/team';

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

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
