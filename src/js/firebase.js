// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAPwQhZhan68kzz8EBW2eMxBtmy4kRT4UY',
  authDomain: 'flmteka.firebaseapp.com',
  projectId: 'flmteka',
  storageBucket: 'flmteka.appspot.com',
  messagingSenderId: '76802850536',
  appId: '1:76802850536:web:0a73e5139167250614135d',
  measurementId: 'G-5JJJQV8D4R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const btnRecord = document.querySelector('#modal-btn-record');


btnRecord.addEventListener('click', onOpenRecord);
const backdrop = document.querySelector('.record__backdrop');
const errorRecord = document.querySelector('#js-record__error');

function onOpenRecord (e) {
  backdrop.classList.remove('visually-hidden');
	const form = document.querySelector('.record__form');
	form.addEventListener('submit', recordFormHandler, {once: true})
  
	window.addEventListener("keydown", escapeKeyCloseModal);
	backdrop.addEventListener("click", clickForCloseModal);
}

function recordFormHandler(e) {
  e.preventDefault();
  loaderToggle();

  const email = e.target.querySelector("#email").value.trim();
	const password = e.target.querySelector("#password").value.trim();
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    errorRecord.textContent = ''
    backdrop.classList.add('visually-hidden');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorRecord.textContent = 'this email is being used'
  }).then(loaderToggle);
}

function escapeKeyCloseModal(event) {
	if (event.code === "Escape") {
		backdrop.classList.add('visually-hidden');
	}
}

function clickForCloseModal(event) {
	if (event.target === event.currentTarget) {
		backdrop.classList.add('visually-hidden');
	}
}

export { firebaseConfig };