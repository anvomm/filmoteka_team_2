import refsList from './refs';

const refs = refsList();

const STORAGE_THEME_KEY = 'theme';
const theme = localStorage.getItem(STORAGE_THEME_KEY);

refs.lampadario.addEventListener('click', onClickThemeChange);

if (theme === 'dark') {
  refs.switch.setAttribute('checked', 'checked');
  themeDark();
  refs.lightOn.setAttribute('checked', 'checked');

  if (theme === 'light') {
    themeLight();
  }
}

function onClickThemeChange() {
  if (refs.body.classList.contains('theme-switcher')) {
    themeLight();
    localStorage.setItem(STORAGE_THEME_KEY, 'light');
  } else {
    refs.body.classList.remove('theme-switcher');
    refs.body.style.transition = 'background 0.7s ease-in-out';
    themeDark();
    localStorage.setItem(STORAGE_THEME_KEY, 'dark');
  }
}

function themeLight() {
  refs.switch.setAttribute('checked', 'checked');
  refs.body.classList.remove('theme-switcher');
}

function themeDark() {
  refs.switch.removeAttribute('checked');
  refs.body.classList.add('theme-switcher');
}
