import refsList from './refs';

const refs = refsList();

refs.libraryWatchedBtn.addEventListener('click', onWatchedBtn);
refs.libraryQueueBtn.addEventListener('click', onQueueBtn);

function onQueueBtn() {
    refs.libraryQueueBtn.classList.add('header-library__btn-current');
    refs.libraryWatchedBtn.classList.remove('header-library__btn-current');
}

function onWatchedBtn() {
    refs.libraryWatchedBtn.classList.add('header-library__btn-current');
    refs.libraryQueueBtn.classList.remove('header-library__btn-current');
}