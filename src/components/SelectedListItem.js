import React from 'react'
import PropTypes from 'prop-types'

import '../styles/SelectedListItem.sass'

const SelectedListItem = ({ film, removeSelectedFilm }) => {
  const { id, title, rating } = film
  
  return (
    <div className="selected-list-item">
      <div className="rating">{rating}</div>
      <div className="title">{title}</div>
      <div className="trash"
           onClick={(e) => {
             e.preventDefault()
             removeSelectedFilm(id)
           }}>
        <i className="fa fa-trash-o" aria-hidden="true" />
      </div>
    </div>
  )
}

SelectedListItem.propTypes = {
  selectedFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired
    })),
  
  removeSelectedFilm: PropTypes.func.isRequired
}

export default SelectedListItem