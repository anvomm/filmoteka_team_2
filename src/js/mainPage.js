import { siteConfigs } from './siteConfigs';
import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';

import './paginationEvents';
import { fetchGenres } from './fetchMovies';

fetchGenres().then(async data => {
  siteConfigs.geners = await data;
});

fetchTrendingMovies(siteConfigs.page).then(data => {
  siteConfigs.lastFetch = 'TRENDING';
  if (data) {
    renderList(data, siteConfigs.page);
  }
});
