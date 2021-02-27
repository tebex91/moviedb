import * as types from '../constants/ActionTypes';

import MovieApi from '../api/MovieApi'

const movieApi = new MovieApi()

const filmsRequest = () => ({
    type: types.FETCH_FILMS_REQUEST
})

const filmsLoaded = (newFilms) => ({
    type: types.FETCH_FILMS_SUCCESS,
    payload: newFilms
})

const filmsError = (error) => ({
    type: types.FETCH_FILMS_FAILURE,
    payload: error
})

export const fetchFilms = (func, page, query) => (dispatch) => {
  dispatch(filmsRequest());
  movieApi[func](page, query)
  .then(data => dispatch(filmsLoaded(data)))
  .catch((err) => dispatch(filmsError(err)))
}

export const clearFilmList = () => ({
  type: types.CLEAR_FILM_LIST
})
