import reject from 'lodash/reject'

import {
  UPDATE_SELECTED_FILMS,
  REMOVE_ALL_SELECTED_FILMS,
  REMOVE_SELECTED_FILM
} from '../constants/ActionTypes'

const selectedFilms = (state, action) => {
  if(state === undefined) {
    return []
  }
  
  switch(action.type) {
    case UPDATE_SELECTED_FILMS:
      return updateList(state, action.payload)
    case REMOVE_SELECTED_FILM:
      return removeFilm(state, action.payload)
    case REMOVE_ALL_SELECTED_FILMS:
      return []
    default:
      return state
  }
}

const removeFilm = (selectedList, filmId) => {
  return reject(selectedList, {id: filmId})
}

const updateList = (selectedList, selectedFilm) => {
  const film = selectedList.find(({id}) => id === selectedFilm.id)
  const idx = selectedList.indexOf(film)
  
  if (idx > -1) {
    return [
      ...selectedList.slice(0, idx),
      ...selectedList.slice(idx + 1)
    ]
  }
  
  return [...selectedList, selectedFilm]
}

export default selectedFilms;