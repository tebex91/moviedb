import * as types from '../constants/ActionTypes'

// actions for fetching film lists
const filmsRequest = () => ({
  type: types.FETCH_FILMS_REQUEST
})

const filmsLoaded = (newFilms) => ({
  type: types.FETCH_FILMS_SUCCESS,
  payload: newFilms
})

const filmsError = (error) => {
  return ({
    type: types.FETCH_FILMS_FAILURE,
    payload: error
  })
}

export const fetchFilms = (apiService, func, page, query) => (dispatch) => {
  dispatch(filmsRequest())
  apiService[func](page, query)
  .then(data => dispatch(filmsLoaded(data)))
  .catch(err => dispatch(filmsError(err)))
}

export const clearFilmList = () => ({
  type: types.CLEAR_FILM_LIST
})

// actions for updating selected films list
export const updateSelectedFilms = (film) => {
  return ({
    type: types.UPDATE_SELECTED_FILMS,
    payload: film
  })
}

export const removeAllSelectedFilms = () => ({
  type: types.REMOVE_ALL_SELECTED_FILMS
})

export const removeSelectedFilm = (id) => ({
  type: types.REMOVE_SELECTED_FILM,
  payload: id
})
