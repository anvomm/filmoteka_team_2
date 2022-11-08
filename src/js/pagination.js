'use strict';

import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import refsList from './refs';
const refs = refsList();

let pageToFetch;

export function stylizePaginationOnStart(firstPageNumber, lastPageNumber) {
  stylizePaginationPageOne(firstPageNumber);
  refs.paginationFirstPageBtn.classList.add('pagination__item_current');
  refs.paginationLastPageBtn.textContent = lastPageNumber;
}

function stylizePaginationPageOne(firstPageNumber) {
  refs.paginationArrowLeft.classList.add('visually-hidden');
  refs.paginationFirstPageBtn.textContent = firstPageNumber;
  refs.paginationSecondPageBtn.textContent = firstPageNumber + 1;
  refs.paginationThirdPageBtn.textContent = firstPageNumber + 2;
  refs.paginationFourPageBtn.textContent = firstPageNumber + 3;
  refs.paginationMiddlePageBtn.textContent = firstPageNumber + 4;
  refs.paginationSixPageBtn.textContent = firstPageNumber + 5;
  refs.paginationSevenPageBtn.textContent = firstPageNumber + 6;
  refs.paginationEighthPageBtn.textContent = '...';
}

const doWhenPageIsClicked = event => {
  //проверяем на какой элемент в пагинации кликнули, записываем данные в pageToFetch
  if (event.target.classList.contains('pagination__item')) {
    pageToFetch = Number(event.target.textContent);
  }
  if (
    event.target.classList.contains('pagination__arrow_left') ||
    event.target.classList.contains('test1') ||
    event.target.classList.contains('test2')
  ) {
    console.log('popali po item so strelkoi');
    pageToFetch = pageToFetch - 1;
  }
  if (
    event.target.classList.contains('pagination__arrow_right') ||
    event.target.classList.contains('test-icon-arrow-right') ||
    event.target.classList.contains('test-vector-arrow-right')
  ) {
    console.log('popali po item so strelkoi');
    pageToFetch = pageToFetch + 1;
  }

  fetchTrendingMovies(pageToFetch).then(data => {
    refs.filmsList.innerHTML = '';

    renderList(data.results);

    let lastPageNumber = data.total_pages;

    if (pageToFetch === 1) {
      stylizePaginationPageOne(pageToFetch);
      removeClassCurrent();
      addClassCurrent();
    }

    if (pageToFetch >= 2 && pageToFetch <= 5) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '2';
      removeClassCurrent();
      addClassCurrent();
    }
    if (pageToFetch >= 6 && pageToFetch < lastPageNumber - 4) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '...';
      refs.paginationEighthPageBtn.textContent = '...';
      refs.paginationMiddlePageBtn.textContent = pageToFetch;
      refs.paginationFourPageBtn.textContent = pageToFetch - 1;
      refs.paginationThirdPageBtn.textContent = pageToFetch - 2;
      refs.paginationSixPageBtn.textContent = pageToFetch + 1;
      refs.paginationSevenPageBtn.textContent = pageToFetch + 2;
      removeClassCurrent();
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');
    }

    if (pageToFetch === lastPageNumber - 4) {
      refs.paginationMiddlePageBtn.textContent = pageToFetch;
      refs.paginationThirdPageBtn.textContent = pageToFetch - 2;
      refs.paginationFourPageBtn.textContent = pageToFetch - 1;
      refs.paginationSixPageBtn.textContent = lastPageNumber - 3;
      refs.paginationSevenPageBtn.textContent = lastPageNumber - 2;
      refs.paginationEighthPageBtn.textContent = lastPageNumber - 1;
      removeClassCurrent();
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');
    }

    if (pageToFetch === lastPageNumber - 3) {
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationSixPageBtn.classList.add('pagination__item_current');
    }

    if (pageToFetch === lastPageNumber - 2) {
      removeClassCurrent();
      refs.paginationSevenPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (pageToFetch === lastPageNumber - 1) {
      removeClassCurrent();
      refs.paginationEighthPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (pageToFetch === lastPageNumber) {
      removeClassCurrent();
      refs.paginationLastPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      refs.paginationEighthPageBtn.textContent = lastPageNumber - 1;
      refs.paginationSevenPageBtn.textContent = lastPageNumber - 2;
      refs.paginationSixPageBtn.textContent = lastPageNumber - 3;
      refs.paginationMiddlePageBtn.textContent = lastPageNumber - 4;
      refs.paginationFourPageBtn.textContent = lastPageNumber - 5;
      refs.paginationThirdPageBtn.textContent = lastPageNumber - 6;
      refs.paginationSecondPageBtn.textContent = '...';
    }
  });
};

refs.pagination.addEventListener('click', doWhenPageIsClicked);

function removeClassCurrent() {
  refs.paginationAllItems.forEach(item => {
    if (item.classList.contains('pagination__item_current')) {
      item.classList.remove('pagination__item_current');
    }
  });
}
function addClassCurrent() {
  refs.paginationAllItems.forEach(item => {
    if (Number(item.textContent) === pageToFetch) {
      item.classList.add('pagination__item_current');
    }
  });
}
