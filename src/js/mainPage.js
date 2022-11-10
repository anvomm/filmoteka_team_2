import { siteConfigs } from './siteConfigs';
import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
// import { stylizePaginationOnStart } from './pagination';
import refsList from './refs';

import './paginationEvents';
import { fetchGenres } from './fetchMovies';

const refs = refsList();
// refs.pagination.style.display = 'none';
// let page = 1;


fetchGenres().then(async data => {
  siteConfigs.geners = await data;
});

fetchTrendingMovies(siteConfigs.page).then(data => {
  siteConfigs.lastFetch = 'TRENDING';
  if (data) {
    renderList(data, siteConfigs.page);
    // stylizePaginationOnStart(data.page, data.total_pages); //data.page, data.total_pages 15 for test
  }
});
