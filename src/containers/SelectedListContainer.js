import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SelectedList from '../components/SelectedList'
import { removeSelectedFilm, removeAllSelectedFilms } from '../actions'

import '../styles/SelectedListContainer.sass'

const SelectedListContainer = ({ selectedFilms, removeSelectedFilm, removeAllSelectedFilms }) => {
  const message = <p className="message">there is no one selected film yet</p>
  const btn = (
    <button
      onClick={() => removeAllSelectedFilms() }>
      remove all</button>
  )
  
  const content = (
    <div className="content">
      <SelectedList
        selectedFilms={selectedFilms}
        removeSelectedFilm={removeSelectedFilm}/>
      {selectedFilms.length > 1 && btn}
    </div>
  )
  
  return (
    <div className="selected-page">
      {selectedFilms.length ? content : message}
    </div>
  )
}

SelectedListContainer.propTypes = {
  selectedFilms: PropTypes.array.isRequired,
  removeSelectedFilm: PropTypes.func.isRequired,
  removeAllSelectedFilms: PropTypes.func.isRequired
}

export default connect(
  ({ selectedFilms }) => ({ selectedFilms }),
  { removeSelectedFilm, removeAllSelectedFilms }
  )(SelectedListContainer)