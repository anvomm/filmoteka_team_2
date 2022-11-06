import refsList from './refs';

const refs = refsList();

window.addEventListener('load', () => {
  if (refs.loader) {
    refs.loader.style.display = 'none';
  }
});
