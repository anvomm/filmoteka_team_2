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
    themeDark();
    localStorage.setItem(STORAGE_THEME_KEY, 'dark');
  }
}

function themeLight() {
  refs.switch.setAttribute('checked', 'checked');
  refs.body.classList.remove('theme-switcher');
  refs.footer.style.backgroundColor = '#f7f7f7';
  refs.footerText.forEach(el => (el.style.color = '#545454'));
  document
    .querySelectorAll('.film-card__title')
    .forEach(title => (title.style.color = '#000'));
  document
    .querySelectorAll('.library-default-film-card__title')
    .forEach(title => (title.style.color = '#000'));
}

function themeDark() {
  refs.switch.removeAttribute('checked');
  refs.body.classList.add('theme-switcher');
  refs.footer.style.backgroundColor = '#3a3a3a';
  refs.footerText.forEach(el => (el.style.color = '#8a8480'));
  document
    .querySelectorAll('.film-card__title')
    .forEach(title => (title.style.color = '#8a8480'));
  document
    .querySelectorAll('.library-default-film-card__title')
    .forEach(title => (title.style.color = '#8a8480'));
}
