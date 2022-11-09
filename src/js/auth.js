import { firebaseConfig } from './firebase';

const btnAuth = document.querySelector('#modal-btn-auth');
const btnRecord = document.querySelector('#modal-btn-record');
const backdrop = document.querySelector('.auth__backdrop');
const error = document.querySelector('#js-auth__error');
const library = document.querySelector('.nav__item-auth');

btnAuth.addEventListener('click', onOpenAuth);

function onOpenAuth(e) {
  if (btnAuth.textContent !== 'log out') {
    backdrop.classList.remove('visually-hidden');
    const form = document.querySelector('.auth__form');
    form.addEventListener('submit', authFormHandler);
  } else {
    sessionStorage.removeItem('sign-in');
    btnAuth.textContent = 'sign in';
    library.classList.add('visually-hidden');
    btnRecord.classList.remove('visually-hidden');
  }
  window.addEventListener('keydown', escapeKeyCloseModal);
  backdrop.addEventListener('click', clickForCloseModal);
}

function authFormHandler(e) {
  e.preventDefault();

  const email = e.target.querySelector('.email-auth').value.trim();
  const password = e.target.querySelector('.password-auth').value.trim();

  authWithEmailAndPassword(email, password)
    .then(token => firebaseFetch(token))
    .then(renderModalAfterAuth);
}

function escapeKeyCloseModal(event) {
  if (event.code === 'Escape') {
    backdrop.classList.add('visually-hidden');
  }
}

function clickForCloseModal(event) {
  if (event.target === event.currentTarget) {
    backdrop.classList.add('visually-hidden');
  }
}

function authWithEmailAndPassword(email, password) {
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => response.json())
    .then(data => data.idToken)
    .finally(loaderToggle);
}

function firebaseFetch(token) {
  if (!token) {
    return Promise.resolve(`<p class="error"> you don't have token</p>`);
  }
  return fetch(
    `https://filmoteka-209ce-default-rtdb.firebaseio.com/films.json?auth=${token}`
  )
    .then(response => response.json())
    .then(response => {
      console.log('films:', response);
      if (response && response.error) {
        return `<p class="error">${response.error}</p>`;
      }
      return response
        ? Object.keys(response).map(key => ({ ...response[key], id: key }))
        : [];
    });
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    error.textContent = 'INVALID EMAIL OR PASSWORD';
  } else {
    error.textContent = '';
    backdrop.classList.add('visually-hidden');
    library.classList.remove('visually-hidden');
    btnAuth.textContent = 'log out';
    sessionStorage.setItem('sign-in', 'true');
    btnRecord.classList.add('visually-hidden');
  }
  console.log(content);
}
