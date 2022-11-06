import refsList from './refs';

const refs = refsList();

refs.teamOpen.addEventListener('click', onClickTeamOpen);
function onClickTeamOpen() {
  refs.team.classList.remove('is-hidden');

  window.addEventListener('keydown', onEscClose);
  refs.team.addEventListener('click', onBackdropClickClose);
}

function onEscClose(evt) {
  if (evt.key === 'Escape') {
    refs.team.classList.add('is-hidden');
  }

  window.removeEventListener('keydown', onEscClose);
  refs.team.removeEventListener('click', onBackdropClickClose);
}

function onBackdropClickClose(evt) {
  if (!evt.target.classList.contains('backdrop_team')) return;

  refs.team.classList.add('is-hidden');

  refs.team.removeEventListener('click', onBackdropClickClose);
  window.removeEventListener('keydown', onEscClose);
}
