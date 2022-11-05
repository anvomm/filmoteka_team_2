import refsList from './refs';
import { fetchMovieById } from './fetchMovies';
import modelTempl from '../templates/modal-content.hbs';
const refs = refsList();

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseClickBackdrop);

export function onOpenModal() {
  const id = this.dataset.action;
  fetchMovieById(id).then((resp) => {

    const markup = modelTempl(resp);
    refs.modalTmp.insertAdjacentHTML('beforeend', markup);

    window.addEventListener('keydown', onCloseKeyEsc);
    refs.modal.classList.remove('is-hidden');
  });  
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseKeyEsc);
  refs.modalTmp.innerHTML = "";
  refs.modal.classList.add('is-hidden');
}

function onCloseClickBackdrop(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onCloseKeyEsc(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
