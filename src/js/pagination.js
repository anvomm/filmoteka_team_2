'use strict';
//console.log(23);

import { fetchTrendingMovies } from './fetchMovies';
import { renderList } from './renderFilmList';
import refsList from './refs';
const refs = refsList();

let pageToFetch;
//let lastPageNumber = 15; //data.total_pages
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
  //console.log(event.target);
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

    let lastPageNumber = data.total_pages; //data.total_pages

    if (pageToFetch === 1) {
      stylizePaginationPageOne(pageToFetch);
      removeClassCurrent();
      refs.paginationAllItems.forEach(item => {
        if (Number(item.textContent) === pageToFetch) {
          item.classList.add('pagination__item_current');
        }
      });
    }

    if (pageToFetch >= 2 && pageToFetch <= 4) {
      //toggleClassCurrent(event);
      //console.log(event.target);
      removeClassCurrent();
      //и надо добавить класс pagination__item_current
      //когда кликаю на стрелки и перемещаюсь между страницами 1, 2, 3, 4
      // event.target.classList.add('pagination__item_current'); //вешает класс при клике на цифру
      // и если кликнуть по стрелке, то класс карент на стрелку вешается

      // искать тот, у которого textContent равно твоему этому page,
      //который в глобальной области для запроса
      refs.paginationAllItems.forEach(item => {
        if (Number(item.textContent) === pageToFetch) {
          item.classList.add('pagination__item_current');
        }
      });
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '2';
    }
    if (pageToFetch === 5) {
      // console.log(555);
      // refs.paginationArrowLeft.classList.remove('visually-hidden');
      // refs.paginationArrowRight.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '2';
      // refs.paginationEighthPageBtn.textContent = '...';
      removeClassCurrent();
      refs.paginationAllItems.forEach(item => {
        if (Number(item.textContent) === pageToFetch) {
          item.classList.add('pagination__item_current');
        }
      });
    }
    if (pageToFetch >= 5 && pageToFetch < lastPageNumber - 4) {
      refs.paginationArrowLeft.classList.remove('visually-hidden');
      refs.paginationArrowRight.classList.remove('visually-hidden');
      refs.paginationSecondPageBtn.textContent = '...';
      refs.paginationEighthPageBtn.textContent = '...';

      removeClassCurrent();
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');

      refs.paginationMiddlePageBtn.textContent = pageToFetch;
      refs.paginationFourPageBtn.textContent = pageToFetch - 1;
      refs.paginationThirdPageBtn.textContent = pageToFetch - 2;
      refs.paginationSixPageBtn.textContent = pageToFetch + 1;
      refs.paginationSevenPageBtn.textContent = pageToFetch + 2;

      // console.log(`hello, ты кликнул на`);
      // console.log(event.target);
      // console.log('but el.with class current-page is');

      // refs.paginationAllItems.forEach(item => {
      //   if (item.classList.contains('pagination__item_current')) {
      //     console.log(item);
      //   }
      // });
    }

    if (pageToFetch === lastPageNumber - 4) {
      removeClassCurrent();
      refs.paginationMiddlePageBtn.classList.add('pagination__item_current');
      refs.paginationMiddlePageBtn.textContent = pageToFetch;
      refs.paginationThirdPageBtn.textContent = pageToFetch - 2;
      refs.paginationFourPageBtn.textContent = pageToFetch - 1;
      refs.paginationSixPageBtn.textContent = lastPageNumber - 3;
      refs.paginationSevenPageBtn.textContent = lastPageNumber - 2;
      refs.paginationEighthPageBtn.textContent = lastPageNumber - 1;
    }

    if (pageToFetch === lastPageNumber - 3) {
      removeClassCurrent();
      refs.paginationSixPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (pageToFetch === lastPageNumber - 2) {
      console.log(pageToFetch);

      removeClassCurrent();
      refs.paginationSevenPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (pageToFetch === lastPageNumber - 1) {
      console.log(pageToFetch);

      removeClassCurrent();
      refs.paginationEighthPageBtn.classList.add('pagination__item_current');
      refs.paginationArrowRight.classList.remove('visually-hidden');
    }

    if (pageToFetch === lastPageNumber) {
      console.log(pageToFetch);

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

    //если клик на стрелку Влево
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

// const doWhenArrowLeftClicked = eventPriClikeNaLeftArrow => {
//   console.log('you have pressed on arrowleft');

//   refs.pagination.removeEventListener('click', doWhenPageIsClicked);
//   refs.paginationAllItems.forEach(lishka => {
//     if (lishka.classList.contains('pagination__item_current')) {
//       const pageNumberBwforeArrowClick = Number(lishka.textContent);
//       console.log(
//         `до того как кликнули на стрелочку была акивна страница номер ${pageNumberBwforeArrowClick}`
//       );
//       //а страница, которую мы должны получить с бека на 1 меньше
//       fetchTrendingMovies(pageNumberBwforeArrowClick - 1).then(data => {
//         refs.filmsList.innerHTML = '';
//         renderList(data.results);

//         if (pageNumberBwforeArrowClick === 2) {
//           stylizePaginationPageOne(1);
//           removeClassCurrent();
//           refs.paginationFirstPageBtn.classList.add('pagination__item_current');
//         }
//         if (pageNumberBwforeArrowClick === 3) {
//         }
//       });
//     }
//   });
// };
// refs.paginationArrowLeft.addEventListener('click', doWhenArrowLeftClicked);
