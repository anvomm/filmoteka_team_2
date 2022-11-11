import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'd929b7a4b435aa22496bb0793b172bfc';

//популярные фильмы на главную страницу
export async function fetchTrendingMovies(page) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}3/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

//запрос по поисковому слову
export async function fetchMovieByQuery(query, page) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

//запрос по ид для модалки
export async function fetchMovieById(id) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}3/movie/${id}?api_key=${API_KEY}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchGenres() {
  try {
    const { data } = await axios.get(
      `${BASE_URL}3/genre/movie/list?api_key=${API_KEY}`
    );
    return data.genres;
  } catch (error) {
    console.error(error);
  }
}
