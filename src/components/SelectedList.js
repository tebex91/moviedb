import React from 'react'
import { Link } from 'react-router-dom'

import SelectedListItem from './SelectedListItem'

import '../styles/SelectedList.sass'
import PropTypes from 'prop-types';

const SelectedList = ({ selectedFilms, removeSelectedFilm }) => {
  const items = selectedFilms.map((film) => {
    const { id } = film
    return (
      <li key={id}>
        <Link to={`/movie/${id}`}>
          <SelectedListItem
            film={film}
            removeSelectedFilm={removeSelectedFilm}/>
        </Link>
      </li>
    )
  })
  
  return (
    <ul className="selected-list">
      {items}
    </ul>
  )
}

SelectedList.propTypes = {
  selectedFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired
    })).isRequired,
  
  removeSelectedFilm: PropTypes.func.isRequired
}

export default SelectedList