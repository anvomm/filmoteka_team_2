import './js/modal';
import './js/uptop';
import './js/search';
import './js/themeSwitcher';
import './js/localStorage';
import './js/team';

import './js/pagination';

localStorage.clear();

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
