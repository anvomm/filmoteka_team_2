import { fetchTrendingMovies } from './fetchMovies';
import { fetchMovieByQuery } from './fetchMovies';
import { renderList } from './renderFilmList';
import refsList from './refs';
const refs = refsList();

import { query } from './search';
let pageToFetch;

export function renderPagination(pageToFetch, lastPageNumber) {
  if (lastPageNumber >= 10) {
    renderPaginationIfTotalPagesMoreThanEight(pageToFetch, lastPageNumber);
  } else if (lastPageNumber >= 2 || lastPageNumber <= 9) {
    console.log(`total pages = ${lastPageNumber}`);
    renderPaginationIfTotalPagesLessThanEight(pageToFetch, lastPageNumber);
  } else {
    //не прячется при total pages 1, разобрались чтоб пряталась при поиске, надо будет проверить в библиотеке, если подключим паги туда
    //if (data.length < 20) {
    //refs.pagination.style.display = 'none';
    // }
    console.log(`total pages = ${lastPageNumber}`);
    //refs.pagination.style.display = 'none';
  }
}

if (refs.pagination)
  refs.pagination.addEventListener('click', logicForPopularMoviesPag);
export function logicForPopularMoviesPag(event) {
  checkWhereUserHasClicked(event);

  fetchTrendingMovies(pageToFetch).then(data => {
    /* refs.filmsList.innerHTML = ''; */
    renderList(data.results);

    let lastPageNumber = data.total_pages;

    renderPagination(pageToFetch, lastPageNumber);
  });
}

export function logicForSearchedMoviesPas(event) {
  checkWhereUserHasClicked(event);

  fetchMovieByQuery(query, pageToFetch).then(data => {
    //Настя закомментила refs.filmsList.innerHTML = ''; в logicForPopularMoviesPag , может и тут не надо?
    refs.filmsList.innerHTML = '';
    renderList(data.results);
    let lastPageNumber = data.total_pages;
    renderPagination(pageToFetch, lastPageNumber);
  });
}

function renderPaginationIfTotalPagesMoreThanEight(
  pageToFetch,
  lastPageNumber
) {
  if (pageToFetch === 1) {
    refs.paginationArrowLeft.classList.add('visually-hidden');
    refs.paginationArrowRight.classList.remove('visually-hidden');
    refs.paginationFirstPageBtn.textContent = pageToFetch;
    refs.paginationSecondPageBtn.textContent = pageToFetch + 1;
    refs.paginationThirdPageBtn.textContent = pageToFetch + 2;
    refs.paginationFourPageBtn.textContent = pageToFetch + 3;
    refs.paginationMiddlePageBtn.textContent = pageToFetch + 4;
    refs.paginationSixPageBtn.textContent = pageToFetch + 5;
    refs.paginationSevenPageBtn.textContent = pageToFetch + 6;
    refs.paginationEighthPageBtn.textContent = '...';
    refs.paginationLastPageBtn.textContent = lastPageNumber;
    removeClassCurrent();
    refs.paginationFirstPageBtn.classList.add('pagination__item_current');
    //addClassCurrent();
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
function renderPaginationIfTotalPagesLessThanEight(
  pageToFetch,
  lastPageNumber
) {
  if (lastPageNumber == 2) {
    refs.paginationSecondPageBtn.style.display = 'list-item';
    refs.paginationThirdPageBtn.style.display = 'none';
    refs.paginationFourPageBtn.style.display = 'none';
    refs.paginationMiddlePageBtn.style.display = 'none';
    refs.paginationSixPageBtn.style.display = 'none';
    refs.paginationSevenPageBtn.style.display = 'none';
    refs.paginationEighthPageBtn.style.display = 'none';
    refs.paginationLastPageBtn.style.display = 'none';
    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
    if (pageToFetch === 2) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
  }
  if (lastPageNumber === 3) {
    refs.paginationThirdPageBtn.style.display = 'list-item';
    refs.paginationFourPageBtn.style.display = 'none';
    refs.paginationMiddlePageBtn.style.display = 'none';
    refs.paginationSixPageBtn.style.display = 'none';
    refs.paginationSevenPageBtn.style.display = 'none';
    refs.paginationEighthPageBtn.style.display = 'none';
    refs.paginationLastPageBtn.style.display = 'none';
    if (pageToFetch === 3) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (pageToFetch === 2) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
  }
  if (lastPageNumber === 4) {
    refs.paginationFourPageBtn.style.display = 'list-item';
    refs.paginationMiddlePageBtn.style.display = 'none';
    refs.paginationSixPageBtn.style.display = 'none';
    refs.paginationSevenPageBtn.style.display = 'none';
    refs.paginationEighthPageBtn.style.display = 'none';
    refs.paginationLastPageBtn.style.display = 'none';
    if (pageToFetch === 4) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (pageToFetch === 3 || pageToFetch === 2) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
  }
  if (lastPageNumber === 5) {
    refs.paginationMiddlePageBtn.style.display = 'list-item';
    refs.paginationSixPageBtn.style.display = 'none';
    refs.paginationSevenPageBtn.style.display = 'none';
    refs.paginationEighthPageBtn.style.display = 'none';
    refs.paginationLastPageBtn.style.display = 'none';
    if (pageToFetch === 5) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (pageToFetch === 4 || pageToFetch === 3 || pageToFetch === 2) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
  }
  if (lastPageNumber === 6) {
    refs.paginationSixPageBtn.style.display = 'list-item';
    refs.paginationSevenPageBtn.style.display = 'none';
    refs.paginationEighthPageBtn.style.display = 'none';
    refs.paginationLastPageBtn.style.display = 'none';
    if (pageToFetch === 6) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (
      pageToFetch === 5 ||
      pageToFetch === 4 ||
      pageToFetch === 3 ||
      pageToFetch === 2
    ) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }

    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
  }
  if (lastPageNumber === 7) {
    refs.paginationSevenPageBtn.style.display = 'none';
    refs.paginationLastPageBtn.style.display = 'none';
    if (pageToFetch === 7) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (
      pageToFetch === 6 ||
      pageToFetch === 5 ||
      pageToFetch === 4 ||
      pageToFetch === 3 ||
      pageToFetch === 2
    ) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }

    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
  }
  if (lastPageNumber === 8) {
    refs.paginationEighthPageBtn.style.display = 'list-item';
    refs.paginationEighthPageBtn.textContent = '8';
    refs.paginationLastPageBtn.style.display = 'none';
    if (pageToFetch === 8) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (
      pageToFetch === 7 ||
      pageToFetch === 6 ||
      pageToFetch === 5 ||
      pageToFetch === 4 ||
      pageToFetch === 3 ||
      pageToFetch === 2
    ) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }

    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
  }
  if (lastPageNumber === 9) {
    refs.paginationLastPageBtn.style.display = 'list-item';
    refs.paginationEighthPageBtn.textContent = '8';
    if (pageToFetch === 9) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.add('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }
    if (
      pageToFetch === 8 ||
      pageToFetch === 7 ||
      pageToFetch === 6 ||
      pageToFetch === 5 ||
      pageToFetch === 4 ||
      pageToFetch === 3 ||
      pageToFetch === 2
    ) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      addClassCurrent();
    }

    if (pageToFetch === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      removeClassCurrent();
      refs.paginationFirstPageBtn.classList.add('pagination__item_current');
      //addClassCurrent();
    }
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
