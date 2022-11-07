'use strict';
//console.log(23);

import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import refsList from './refs';

const refs = refsList();

//let currentPage = 1;

export function stylizePaginationOnStart(firstPageNumber, lastPageNumber) {
  refs.paginationArrowLeft.classList.add('visually-hidden');
  refs.paginationFirstPageBtn.classList.add('pagination__item_current');
  refs.paginationFirstPageBtn.textContent = firstPageNumber;
  refs.paginationSecondPageBtn.textContent = firstPageNumber + 1;
  refs.paginationThirdPageBtn.textContent = firstPageNumber + 2;
  refs.paginationFourPageBtn.textContent = firstPageNumber + 3;
  refs.paginationMiddlePageBtn.textContent = firstPageNumber + 4;
  refs.paginationSixPageBtn.textContent = firstPageNumber + 5;
  refs.paginationSevenPageBtn.textContent = firstPageNumber + 6;
  refs.paginationEighthPageBtn.textContent = '...';
  refs.paginationLastPageBtn.textContent = lastPageNumber;
}

refs.pagination.addEventListener('click', event => {
  const clickedPageNumber = Number(event.target.textContent);
  //console.log(clickedPageNumber);
  fetchTrendingMovies(clickedPageNumber).then(data => {
    //console.log(data);
    renderList(data.results);

    //console.log(data);
    let lastPageNumber = 15; //data.total_pages

    if (clickedPageNumber === 1) {
      refs.paginationArrowLeft.classList.add('visually-hidden');
      //refs.paginationSecondPageBtn.textContent = '...';
      refs.paginationSecondPageBtn.textContent = clickedPageNumber + 1;
      refs.paginationThirdPageBtn.textContent = clickedPageNumber + 2;
      refs.paginationFourPageBtn.textContent = clickedPageNumber + 3;
      refs.paginationMiddlePageBtn.textContent = clickedPageNumber + 4;
      refs.paginationSixPageBtn.textContent = clickedPageNumber + 5;
      refs.paginationSevenPageBtn.textContent = clickedPageNumber + 6;
      toggleClassCurrent(event);
    }

    if (clickedPageNumber >= 2 && clickedPageNumber <= 4) {
      toggleClassCurrent(event);
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '2';
      // //refs.paginationSecondPageBtn.style.display = 'flex';
      // refs.paginationDotsLeft.textContent = clickedPageNumber;
      // // refs.paginationDotsRight.style.display = 'block';
      // refs.paginationDotsRight.textContent = '...';
      // //refs.paginationDotsLeft.style.display = 'block';
    }

    if (clickedPageNumber >= 5 && clickedPageNumber < lastPageNumber - 4) {
      //toggleClassCurrent(event);
      // console.log(clickedPageNumber);
      // console.log(lastPageNumber);
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '...';
      refs.paginationEighthPageBtn.textContent = '...';

      refs.paginationAllItems.forEach(item => {
        //console.log(item);
        if (item.classList.contains('pagination__item_current')) {
          item.classList.remove('pagination__item_current');
        }
      });
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');
      //toggleClassCurrent(event);
      refs.paginationMiddlePageBtn.textContent = clickedPageNumber;
      refs.paginationFourPageBtn.textContent = clickedPageNumber - 1;
      refs.paginationThirdPageBtn.textContent = clickedPageNumber - 2;
      refs.paginationSixPageBtn.textContent = clickedPageNumber + 1;
      refs.paginationSevenPageBtn.textContent = clickedPageNumber + 2;
    }

    // if (clickedPageNumber >= 5 && clickedPageNumber < lastPageNumber - 4) {
    //   refs.paginationArrowLeft.classList.remove('visually-hidden');
    //   refs.paginationArrowRight.classList.remove('visually-hidden');
    //   refs.paginationDotsRight.textContent = '...';
    //   //refs.paginationDotsLeft.style.display = 'block';
    //   //refs.paginationSecondPageBtn.style.display = 'none';
    //   //refs.paginationDotsRight.style.display = 'block';
    //   refs.paginationAllItems.forEach(item => {
    //     if (item.classList.contains('pagination__item_current')) {
    //       item.classList.remove('pagination__item_current');
    //     }
    //   });
    //   refs.paginationMiddlePageBtn.classList.add('pagination__item_current');

    //   refs.paginationMiddlePageBtn.textContent = clickedPageNumber;
    //   refs.paginationFourPageBtn.textContent = clickedPageNumber - 1;
    //   refs.paginationThirdPageBtn.textContent = clickedPageNumber - 2;
    //   refs.paginationSixPageBtn.textContent = clickedPageNumber + 1;
    //   refs.paginationSevenPageBtn.textContent = clickedPageNumber + 2;
    // }

    if (clickedPageNumber === lastPageNumber - 4) {
      // console.log(event);
      // console.log(clickedPageNumber);
      // console.log(lastPageNumber);
      // console.log(lastPageNumber - 4); //11
      refs.paginationAllItems.forEach(item => {
        if (item.classList.contains('pagination__item_current')) {
          item.classList.remove('pagination__item_current');
        }
      });
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');
      refs.paginationMiddlePageBtn.textContent = clickedPageNumber;
      refs.paginationThirdPageBtn.textContent = clickedPageNumber - 2;
      refs.paginationFourPageBtn.textContent = clickedPageNumber - 1;
      refs.paginationSixPageBtn.textContent = lastPageNumber - 3;
      refs.paginationSevenPageBtn.textContent = lastPageNumber - 2;
      refs.paginationEighthPageBtn.textContent = lastPageNumber - 1;
      //refs.paginationArrowRight.classList.add('visually-hidden');
    }
    // if (clickedPageNumber === lastPageNumber - 4) {
    //   refs.paginationArrowRight.classList.add('visually-hidden');
    //   refs.paginationFourPageBtn.textContent = clickedPageNumber - 1;
    //   refs.paginationThirdPageBtn.textContent = clickedPageNumber - 2;
    //   refs.paginationMiddlePageBtn.textContent = clickedPageNumber;
    //   refs.paginationSixPageBtn.textContent = clickedPageNumber + 1;
    //   refs.paginationSevenPageBtn.textContent = clickedPageNumber + 2;
    //   refs.paginationDotsRight.textContent = clickedPageNumber + 3;
    //   console.log(222);
    // }

    if (clickedPageNumber === lastPageNumber - 3) {
      // console.log(clickedPageNumber);
      // console.log(lastPageNumber);
      // console.log(lastPageNumber - 3); //12
      refs.paginationAllItems.forEach(item => {
        if (item.classList.contains('pagination__item_current')) {
          item.classList.remove('pagination__item_current');
        }
      });
      refs.paginationSixPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (clickedPageNumber === lastPageNumber - 2) {
      console.log(clickedPageNumber);

      refs.paginationAllItems.forEach(item => {
        if (item.classList.contains('pagination__item_current')) {
          item.classList.remove('pagination__item_current');
        }
      });
      refs.paginationSevenPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }
    if (clickedPageNumber === lastPageNumber - 1) {
      console.log(clickedPageNumber);
      refs.paginationAllItems.forEach(item => {
        if (item.classList.contains('pagination__item_current')) {
          item.classList.remove('pagination__item_current');
        }
      });
      refs.paginationEighthPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }
    if (clickedPageNumber === lastPageNumber) {
      console.log(clickedPageNumber);
      refs.paginationAllItems.forEach(item => {
        if (item.classList.contains('pagination__item_current')) {
          item.classList.remove('pagination__item_current');
        }
      });
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

    if (clickedPageNumber === 4) {
      refs.paginationSecondPageBtn.textContent = '2';
    }
  });
});

function toggleClassCurrent(event) {
  refs.paginationAllItems.forEach(item => {
    if (item.classList.contains('pagination__item_current')) {
      item.classList.remove('pagination__item_current');
    }
  });
  //console.log(event.target);
  event.target.classList.add('pagination__item_current');
}
