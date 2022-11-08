import refsList from './refs';
import createMarkUp from '../templates/films-card.hbs';
import { fetchMovieById } from './fetchMovies';
import modalId from '../templates/modal-content.hbs';
const refs = refsList();

// console.log(refs.addLocalStorageBtn);
// function addToWatched() {}
// class LocalStorage {
//   constructor() {
//     this.keyName = 'watched';
//     this.keyName = 'queue';
//   }

//   getId() {
//     const idLocalStorage = localStorage.getItem(this.id);
//     if (idLocalStorage !== null) {
//       return JSON.parse(idLocalStorage);
//     }
//     return [];
//   }

//   putId(id) {}
// }

// const localStorageUtil = new LocalStorage();

// const a = localStorageUtil.getId();
// console.log(a);
