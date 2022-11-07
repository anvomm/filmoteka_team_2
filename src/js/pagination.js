'use strict';
//console.log(23);

import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import refsList from './refs';

const refs = refsList();

let clickedPageNumber;

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

const doWhenPageIsClicked = kakoitoevent => {
  //clickedPageNumber = Number(kakoitoevent.target.textContent);
  console.log(kakoitoevent.target);

  if (kakoitoevent.target.classList.contains('pagination__item')) {
    console.log('popali po cifre');
    clickedPageNumber = Number(kakoitoevent.target.textContent);
  }
  if (kakoitoevent.target.classList.contains('pagination__arrow_left')) {
    console.log('popali po item so strelkoi');
    clickedPageNumber = clickedPageNumber - 1;
  }
  //console.log(kakoitoevent.target);
  //console.log(kakoitoevent.target.classList.contains('pagination__arrow_left'));
  // if (kakoitoevent.target.classList.contains('pagination__arrow_left')) {
  //   console.log('fjifiewfuh');
  //   refs.paginationAllItems.forEach(lishka => {
  //     if (lishka.classList.contains('pagination__item_current')) {
  //       const pageNumberBwforeArrowClick = Number(lishka.textContent);
  //       console.log(
  //         `до того как кликнули на стрелочку была акивна страница номер ${pageNumberBwforeArrowClick}`
  //       );
  //       // а страница, которую мы должны получить с бека(clickedPageNumber) на 1 меньше
  //       clickedPageNumber = pageNumberBwforeArrowClick - 1
  //       console.log(clickedPageNumber)
  //     }
  //   })
  fetchTrendingMovies(clickedPageNumber).then(data => {
    refs.filmsList.innerHTML = '';
    renderList(data.results);

    let lastPageNumber = 15; //data.total_pages

    if (clickedPageNumber === 1) {
      stylizePaginationPageOne(clickedPageNumber);
      toggleClassCurrent(kakoitoevent);
      // console.log(`hello, ты кликнул на`);
      // console.log(kakoitoevent.target);
    }

    if (clickedPageNumber >= 2 && clickedPageNumber <= 4) {
      toggleClassCurrent(kakoitoevent);
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '2';
      // console.log(`hello, ты кликнул на`);
      // console.log(kakoitoevent.target);
    }

    if (clickedPageNumber >= 5 && clickedPageNumber < lastPageNumber - 4) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '...';
      refs.paginationEighthPageBtn.textContent = '...';

      removeClassCurrent();
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');

      refs.paginationMiddlePageBtn.textContent = clickedPageNumber;
      refs.paginationFourPageBtn.textContent = clickedPageNumber - 1;
      refs.paginationThirdPageBtn.textContent = clickedPageNumber - 2;
      refs.paginationSixPageBtn.textContent = clickedPageNumber + 1;
      refs.paginationSevenPageBtn.textContent = clickedPageNumber + 2;

      // console.log(`hello, ты кликнул на`);
      // console.log(kakoitoevent.target);
      // console.log('but el.with class current-page is');

      // refs.paginationAllItems.forEach(item => {
      //   if (item.classList.contains('pagination__item_current')) {
      //     console.log(item);
      //   }
      // });
    }

    if (clickedPageNumber === lastPageNumber - 4) {
      removeClassCurrent();
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');
      refs.paginationMiddlePageBtn.textContent = clickedPageNumber;
      refs.paginationThirdPageBtn.textContent = clickedPageNumber - 2;
      refs.paginationFourPageBtn.textContent = clickedPageNumber - 1;
      refs.paginationSixPageBtn.textContent = lastPageNumber - 3;
      refs.paginationSevenPageBtn.textContent = lastPageNumber - 2;
      refs.paginationEighthPageBtn.textContent = lastPageNumber - 1;
    }

    if (clickedPageNumber === lastPageNumber - 3) {
      removeClassCurrent();
      refs.paginationSixPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (clickedPageNumber === lastPageNumber - 2) {
      console.log(clickedPageNumber);

      removeClassCurrent();
      refs.paginationSevenPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (clickedPageNumber === lastPageNumber - 1) {
      console.log(clickedPageNumber);

      removeClassCurrent();
      refs.paginationEighthPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (clickedPageNumber === lastPageNumber) {
      console.log(clickedPageNumber);

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

    if (clickedPageNumber === 5) {
      refs.paginationSecondPageBtn.textContent = '2';
    }
    //если клик на стрелку Влево
    // if (kakoitoevent.target.classList.contains('pagination__arrow_left')) {
    //   //console.log(23);
    //   refs.paginationAllItems.forEach(lishka => {
    //     if (lishka.classList.contains('pagination__item_current')) {
    //       const pageNumberBwforeArrowClick = Number(lishka.textContent);
    //       // console.log(
    //       //   `до того как кликнули на стрелочку была акивна страница номер ${pageNumberBwforeArrowClick}`
    //       // );
    //       //а страница, которую мы должны получить с бека на 1 меньше
    //       return (clickedPageNumber = pageNumberBwforeArrowClick - 1);
    //     }
    //   });
    // }
  });
};

refs.pagination.addEventListener('click', doWhenPageIsClicked);

function toggleClassCurrent(event) {
  refs.paginationAllItems.forEach(item => {
    if (item.classList.contains('pagination__item_current')) {
      item.classList.remove('pagination__item_current');
    }
  });
  //console.log(event.target);
  event.target.classList.add('pagination__item_current');
}

function removeClassCurrent() {
  refs.paginationAllItems.forEach(item => {
    if (item.classList.contains('pagination__item_current')) {
      item.classList.remove('pagination__item_current');
    }
  });
}

const doWhenArrowLeftClicked = eventPriClikeNaLeftArrow => {
  console.log('you have pressed on arrowleft');

  refs.pagination.removeEventListener('click', doWhenPageIsClicked);
  refs.paginationAllItems.forEach(lishka => {
    if (lishka.classList.contains('pagination__item_current')) {
      const pageNumberBwforeArrowClick = Number(lishka.textContent);
      console.log(
        `до того как кликнули на стрелочку была акивна страница номер ${pageNumberBwforeArrowClick}`
      );
      //а страница, которую мы должны получить с бека на 1 меньше
      fetchTrendingMovies(pageNumberBwforeArrowClick - 1).then(data => {
        refs.filmsList.innerHTML = '';
        renderList(data.results);

        if (pageNumberBwforeArrowClick === 2) {
          stylizePaginationPageOne(1);
          removeClassCurrent();
          refs.paginationFirstPageBtn.classList.add('pagination__item_current');
        }
        if (pageNumberBwforeArrowClick === 3) {
        }
      });
    }
  });
};
// refs.paginationArrowLeft.addEventListener('click', doWhenArrowLeftClicked);
