import './js/modal';
import './js/uptop';
import { fetchTrendingMovies } from './js/fetchMovies';
import { renderList } from './js/renderFilmList';

fetchTrendingMovies(1).then(data => {
    if (data) {
        renderList(data.results);
    }
});