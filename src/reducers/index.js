import { combineReducers } from 'redux'

import filmList from './filmList'
import selectedFilms from './selectedFilms'

export default combineReducers({
  filmList,
  selectedFilms
})

