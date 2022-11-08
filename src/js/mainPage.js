import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import { stylizePaginationOnStart } from './pagination';

let page = 1;

fetchTrendingMovies(page).then(data => {
  if (data) {
    renderList(data.results);
    //console.log(data.page);
    //console.log(data.total_pages);
    stylizePaginationOnStart(data.page, data.total_pages); //data.page, data.total_pages 15 for test
  }
});
