import refsList from './refs';

const refs = refsList();

const STORAGE_THEME_KEY = 'theme';
const theme = localStorage.getItem(STORAGE_THEME_KEY);

refs.lampadario.addEventListener('click', onClickThemeChange);

if (theme === 'dark') {
  refs.switch.setAttribute('checked', 'checked');

  refs.body.classList.add('theme-switcher');
  refs.switch.removeAttribute('checked');
  refs.lightOn.setAttribute('checked', 'checked');

  if (theme === 'light') {
    refs.switch.setAttribute('checked', 'checked');
    refs.body.classList.remove('theme-switcher');
  }
}

function onClickThemeChange() {
  if (refs.body.classList.contains('theme-switcher')) {
    refs.switch.setAttribute('checked', 'checked');
    refs.body.classList.remove('theme-switcher');

    localStorage.setItem(STORAGE_THEME_KEY, 'light');
  } else {
    refs.switch.removeAttribute('checked');
    refs.body.classList.add('theme-switcher');
    localStorage.setItem(STORAGE_THEME_KEY, 'dark');
  }
}
