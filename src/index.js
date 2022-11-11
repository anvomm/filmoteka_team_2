import './js/uptop';
import './js/search';
import './js/themeSwitcher';
import './js/team';
import './js/libraryFromLocalStorage';
import './js/createPagination';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
