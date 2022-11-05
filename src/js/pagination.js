'use strict';
//console.log(23);
import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import refsList from './refs';

const refs = refsList();

refs.pagination.addEventListener('click', event => {
  const clickedPageNumber = event.target.textContent;
  fetchTrendingMovies(clickedPageNumber)
    .then(data => {
      return data.results;
    })
    .then(data => {
      refs.filmsList.innerHTML = '';
      renderList(data);
    });
});
console.log(refs.paginationLastPageBtn.textContent);
export function putLastPageNumber(number) {
  refs.paginationLastPageBtn.textContent = number;
}
