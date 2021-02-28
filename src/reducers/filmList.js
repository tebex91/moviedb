import {
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  CLEAR_FILM_LIST
} from '../constants/ActionTypes'

const filmList = (state, action) => {
  const initialValue = {
    films: [],
    loading: true,
    error: null
  }
  
  if(state === undefined) {
    return initialValue
  }
  
  const { films } = state
  
  switch (action.type) {
    case FETCH_FILMS_REQUEST:
      return {
        films: [...films],
        loading: true,
        error: null
      }
    case FETCH_FILMS_SUCCESS:
      return {
        films: [...films, ...action.payload],
        loading: false,
        error: null
      }
    case FETCH_FILMS_FAILURE:
      return {
        films: [],
        loading: false,
        error: action.payload
      }
    case CLEAR_FILM_LIST:
      return initialValue
    default:
      return state
  }
}

export default filmList