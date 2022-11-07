import refsList from './refs';
import { fetchMovieById } from './fetchMovies';
import modelTempl from '../templates/modal-content.hbs';
const refs = refsList();
const body = document.body;

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseClickBackdrop);

export function onOpenModal() {
  let pagePosition = window.scrollY;
  body.classList.add('disable-scroll');
  body.dataset.position = pagePosition;
  body.style.top = -pagePosition + 'px';
  body.style.paddingRight = '17px';

  const id = this.dataset.action;
  fetchMovieById(id).then(resp => {
    const markup = modelTempl(resp);
    refs.modalTmp.insertAdjacentHTML('beforeend', markup);

    window.addEventListener('keydown', onCloseKeyEsc);
    refs.modal.classList.remove('is-hidden');
  });
}

function onCloseModal() {
  let pagePosition = parseInt(body.dataset.position, 10);
  body.style.top = 'auto';
  body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  body.removeAttribute('data-position');
  body.style.paddingRight = '0px';

  window.removeEventListener('keydown', onCloseKeyEsc);
  refs.modalTmp.innerHTML = '';
  refs.modal.classList.add('is-hidden');
}

function onCloseClickBackdrop(e) {
  if (e.currentTarget === e.target) {
    console.log('here');
    onCloseModal();
  }
}

function onCloseKeyEsc(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
