export default function refs() {
  return {
    filmsList: document.querySelector('.all-films-list'),
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),
    loader: document.querySelector('.loader'),
  };
}
