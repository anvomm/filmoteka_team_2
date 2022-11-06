'use strict';
//console.log(23);

import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import refsList from './refs';

const refs = refsList();
let currentPage = 1;
console.log(refs.paginationAllItems);
refs.pagination.addEventListener('click', event => {
  const clickedPageNumber = Number(event.target.textContent);
  //console.log(clickedPageNumber);
  fetchTrendingMovies(clickedPageNumber)
    .then(data => {
      return data.results;
    })
    .then(data => {
      refs.filmsList.innerHTML = '';
      renderList(data);
      if (clickedPageNumber === 1) {
        refs.paginationArrowLeft.classList.add('visually-hidden');

        refs.paginationAllItems.forEach(item => {
          if (item.classList.contains('pagination__item_current')) {
            item.classList.remove('pagination__item_current');
          }
        });

        refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      }
      if (clickedPageNumber >= 2 && clickedPageNumber <= 4) {
        refs.paginationArrowLeft.classList.remove('visually-hidden');

        refs.paginationAllItems.forEach(item => {
          if (item.classList.contains('pagination__item_current')) {
            item.classList.remove('pagination__item_current');
          }
        });

        event.target.classList.add('pagination__item_current');
      }
    });
});

export function stylizePaginationOnStart(number) {
  refs.paginationLastPageBtn.textContent = number;
  refs.paginationArrowLeft.classList.add('visually-hidden');
  refs.paginationFirstPageBtn.classList.add('pagination__item_current');
  refs.paginationDotsLeft.style.display = 'none';
}
