import refsList from './refs';
import { siteConfigs } from './siteConfigs';

import { fetchTrendingMovies, fetchMovieByQuery } from './fetchMovies';
import { renderList } from './renderFilmList';

refsList().paginationBlock.addEventListener('click', getNewPage);
refsList().rightArrow.addEventListener('click', rightBtnClick);
refsList().leftArrow.addEventListener('click', leftBtnClick);

function leftBtnClick() {
  //   if (siteConfigs.lastFetch === 'WATCHED')
  //     siteConfigs.decrementWatchedPage();
  //   if (siteConfigs.lastFetch === 'QUEUE')
  //     siteConfigs.decrementQueuePage();

  siteConfigs.decrementPage();
  loadMovies();
}

function rightBtnClick() {
  //   if (siteConfigs.lastFetch === 'WATCHED')
  //     siteConfigs.incrementWatchedPage();
  //   if (siteConfigs.lastFetch === 'QUEUE')
  //     siteConfigs.incrementQueuePage();
  siteConfigs.incrementPage();

  loadMovies();
}

function getNewPage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') return;
  console.log(e.target.dataset.number);
  if (e.target.dataset.number !== '0') {
    const page = Number(e.target.dataset.number);
    // if (siteConfigs.lastFetch === 'WATCHED')
    //   siteConfigs.watchedPage = page;
    // if (siteConfigs.lastFetch === 'QUEUE')
    //   siteConfigs.queuePage = page;
    siteConfigs.page = page;
    console.log(siteConfigs.page, page);
    loadMovies();
  }
}

async function loadMovies() {
  window.scrollTo({
    top: 0,
    left: 0,
  });

  if (siteConfigs.lastFetch === 'TRENDING') {
    try {
      const data = await fetchTrendingMovies(siteConfigs.page);
      renderList(data, siteConfigs.page);
    } catch (error) {
      console.log(error);
    }
  }

  if (siteConfigs.lastFetch === 'SEARCH') {
    try {
      const data = await fetchMovieByQuery(
        siteConfigs.searchQuery,
        siteConfigs.page
      );
      renderList(data, siteConfigs.page);
    } catch (error) {
      console.log(error);
    }
  }
  //   if (siteConfigs.lastFetch === 'WATCHED') {
  //     try {
  //       const data = await watchedTabClickHandler();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (siteConfigs.lastFetch === 'QUEUE') {
  //     try {
  //       const data = await queueTabClickHandler();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
