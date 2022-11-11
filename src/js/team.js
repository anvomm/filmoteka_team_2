import refsList from './refs';
import { pagePositionOnOpen, pageContentOnClose } from './modal';

const refs = refsList();

refs.teamOpen.addEventListener('click', onClickTeamOpen);

function onClickTeamOpen() {
  refs.team.classList.remove('is-hidden');
  showModal();

  pagePositionOnOpen();
  addListenersForClose();
}

function onCloseBtnClick() {
  refs.team.classList.add('is-hidden');

  onClose();
}

function onEscClose(evt) {
  if (evt.key === 'Escape') {
    refs.team.classList.add('is-hidden');
  }

  onClose();
}

function onBackdropClickClose(evt) {
  if (!evt.target.classList.contains('backdrop_team')) return;

  refs.team.classList.add('is-hidden');

  onClose();
}

function addListenersForClose() {
  refs.teamModalCloseBtn.addEventListener('click', onCloseBtnClick);

  window.addEventListener('keydown', onEscClose);
  refs.team.addEventListener('click', onBackdropClickClose);
  document.addEventListener('click', function (e) {
    if (document.activeElement.toString() == '[object HTMLButtonElement]') {
      document.activeElement.blur();
    }
  });
}
function removeAllListeners() {
  refs.teamModalCloseBtn.removeEventListener('click', onCloseBtnClick);
  refs.team.removeEventListener('click', onBackdropClickClose);
  window.removeEventListener('keydown', onEscClose);
  document.removeEventListener('click', function (e) {
    if (document.activeElement.toString() == '[object HTMLButtonElement]') {
      document.activeElement.blur();
    }
  });
}

function onClose() {
  removeAllListeners();
  showModal();
  pageContentOnClose();
}

function showModal(e) {
  refs.team.classList.toggle('hidden');

  if (!refs.team.classList.contains('hidden')) {
    refs.body.style.overflow = 'hidden';
  } else {
    refs.body.style.overflow = 'auto';
  }
}
