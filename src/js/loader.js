import refsList from './refs';

const refs = refsList();

window.addEventListener('load', () => {
  refs.loader.style.display = 'none';
});
