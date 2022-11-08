import './js/modal';
import './js/uptop';
/* import './js/loader'; */
import './js/search';
import './js/themeSwitcher';
import './js/localStorage';
import './js/library';
import './js/team';
import './js/libraryFromLocalStorage';

import { fetchTrendingMovies } from './js/fetchMovies';
import { renderList } from './js/renderFilmList';
import { stylizePaginationOnStart } from './js/pagination';

let page = 1;

fetchTrendingMovies(page).then(data => {
  if (data) {
    renderList(data.results);
    //console.log(data.page);
    //console.log(data.total_pages);
    stylizePaginationOnStart(data.page, data.total_pages); //data.page, data.total_pages 15 for test
  }
});

import './js/pagination';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
