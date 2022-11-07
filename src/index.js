import './js/modal';
import './js/uptop';
import './js/loader';
import './js/search';

import './js/themeSwitcher';
import './js/localStorage';

import { fetchTrendingMovies } from './js/fetchMovies';
import { renderList } from './js/renderFilmList';
import { stylizePaginationOnStart } from './js/pagination';

fetchTrendingMovies(1).then(data => {
  if (data) {
    renderList(data.results);
    //console.log(data.page);
    //console.log(data.total_pages);
    stylizePaginationOnStart(data.page, 15); //data.page, data.total_pages
  }
});

import './js/pagination';
