'use strict';

import { fetchTrendingMovies } from './fetchMovies';
import { fetchMovieByQuery } from './fetchMovies';
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
  refs.paginationArrowRight.classList.remove('visually-hidden');
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
  checkWhereUserHasClicked(event);

  fetchTrendingMovies(pageToFetch).then(data => {
    refs.filmsList.innerHTML = '';
    renderList(data.results);

    let lastPageNumber = data.total_pages;

    renderPaginationIfTotalPagesMoreThanEight(pageToFetch, lastPageNumber);
  });
};
refs.pagination.addEventListener('click', doWhenPageIsClicked);

// const doWhenSearch = event => {
//   console.log(event);
//   const query = refs.formInput.value.trim(); //поисковое слово
//   checkWhereUserHasClicked(event);

//   fetchMovieByQuery(query, pageToFetch).then(data => {
//     refs.filmsList.innerHTML = '';
//     renderList(data.results);

//     let lastPageNumber = data.total_pages;

//     renderPaginationIfTotalPagesMoreThanEight(pageToFetch, lastPageNumber);
//   });
// };
// refs.form.addEventListener('submit', doWhenSearch);

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
function renderPaginationIfTotalPagesMoreThanEight(
  pageToFetch,
  lastPageNumber
) {
  if (pageToFetch === 1) {
    stylizePaginationPageOne(pageToFetch);
    removeClassCurrent();
    addClassCurrent();
  }
  if (pageToFetch >= 2 && pageToFetch <= 4) {
    refs.paginationArrowLeft.classList.remove('visually-hidden');
    refs.paginationSecondPageBtn.textContent = '2';
    removeClassCurrent();
    addClassCurrent();
  }
  if (pageToFetch >= 5 && pageToFetch < lastPageNumber - 4) {
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
  if (pageToFetch === 5) {
    refs.paginationSecondPageBtn.textContent = '2';
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
}
function checkWhereUserHasClicked(event) {
  //проверяем на какой элемент в пагинации кликнули, записываем данные в pageToFetch
  //если клик по цифре
  if (event.target.classList.contains('pagination__item')) {
    pageToFetch = Number(event.target.textContent);
  }
  //если клик по левой стрелке
  if (
    event.target.classList.contains('pagination__arrow_left') ||
    event.target.classList.contains('test1') ||
    event.target.classList.contains('test2')
  ) {
    pageToFetch = pageToFetch - 1;
  }
  //если клик по правой стрелке
  if (
    event.target.classList.contains('pagination__arrow_right') ||
    event.target.classList.contains('test-icon-arrow-right') ||
    event.target.classList.contains('test-vector-arrow-right')
  ) {
    pageToFetch = pageToFetch + 1;
  }
}

// //а может этот весь новый блок про 9 страниц запихнуть в условие if вот это общее число меньше, чем 180, а весь другой код применять элс?

// // если вернулась только 1 страница, то пагинацию убрать вообще
// if (lastPageNumber === 1) {
//   refs.pagination.classList.add('visually-hidden');
// }
// //если вернулось от 2 до 9 страниц, то правую стрелку убрать
// if (lastPageNumber > 1 && lastPageNumber <= 9) {
//   refs.paginationArrowRight.classList.add('visually-hidden');
// }
// //если вернулось 2 страницы
// if (lastPageNumber === 2) {
//   refs.paginationArrowLeft.classList.add('visually-hidden');
//   refs.paginationSecondPageBtn.style.display = 'none';
//   refs.paginationThirdPageBtn.style.display = 'none';
//   refs.paginationFourPageBtn.style.display = 'none';
//   refs.paginationMiddlePageBtn.style.display = 'none';
//   refs.paginationSixPageBtn.style.display = 'none';
//   refs.paginationSevenPageBtn.style.display = 'none';
//   refs.paginationEighthPageBtn.style.display = 'none';

//   // refs.paginationSecondPageBtn.classList.add('visually-hidden');
//   // refs.paginationThirdPageBtn.classList.add('visually-hidden');
//   // refs.paginationFourPageBtn.classList.add('visually-hidden');
//   // refs.paginationMiddlePageBtn.classList.add('visually-hidden');
//   // refs.paginationSixPageBtn.classList.add('visually-hidden');
//   // refs.paginationSevenPageBtn.classList.add('visually-hidden');
//   // refs.paginationEighthPageBtn.classList.add('visually-hidden');
// }
// if (lastPageNumber === 3) {
//   refs.paginationFirstPageBtn.textContent = pageToFetch;
//   refs.paginationSecondPageBtn.textContent = lastPageNumber - 1;
//   refs.paginationThirdPageBtn.style.display = 'none';
//   refs.paginationFourPageBtn.style.display = 'none';
//   refs.paginationMiddlePageBtn.style.display = 'none';
//   refs.paginationSixPageBtn.style.display = 'none';
//   refs.paginationSevenPageBtn.style.display = 'none';
//   refs.paginationEighthPageBtn.style.display = 'none';
//   refs.paginationLastPageBtn.textContent = lastPageNumber;
//   // refs.paginationThirdPageBtn.classList.add('visually-hidden');
//   // refs.paginationFourPageBtn.classList.add('visually-hidden');
//   // refs.paginationMiddlePageBtn.classList.add('visually-hidden');
//   // refs.paginationSixPageBtn.classList.add('visually-hidden');
//   // refs.paginationSevenPageBtn.classList.add('visually-hidden');
//   // refs.paginationEighthPageBtn.classList.add('visually-hidden');
// }
