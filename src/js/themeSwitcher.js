import refsList from './refs';

const refs = refsList();

refs.lampadario.addEventListener('click', onClickThemeChange);

function onClickThemeChange() {
  refs.body.classList.toggle('theme-switcher');
}
