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

export function stylizePaginationOnStart(number) {
  refs.paginationLastPageBtn.textContent = number;
  refs.paginationArrowLeft.classList.add('visually-hidden');
  refs.paginationDotsLeft.style.display = 'none';
}
