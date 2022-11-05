import refsList from './refs';

const refs = refsList();

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseClickBackdrop);

function onOpenModal() {
  window.addEventListener('keydown', onCloseKeyEsc);
  refs.modal.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseKeyEsc);
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
