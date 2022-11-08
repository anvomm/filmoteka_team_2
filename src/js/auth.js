import { firebaseConfig } from './firebase';

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
