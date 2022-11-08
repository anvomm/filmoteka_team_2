import refsList from './refs';
import { pagePositionOnOpen, pageContentOnClose } from './modal';

const refs = refsList();
const body = document.body;

refs.teamOpen.addEventListener('click', onClickTeamOpen);

function onClickTeamOpen() {
  refs.team.classList.remove('is-hidden');

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
}
function removeAllListeners() {
  refs.teamModalCloseBtn.removeEventListener('click', onCloseBtnClick);
  refs.team.removeEventListener('click', onBackdropClickClose);
  window.removeEventListener('keydown', onEscClose);
}

function onClose() {
  removeAllListeners();
  pageContentOnClose();
}
