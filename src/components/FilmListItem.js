import React from 'react'
import PropTypes from 'prop-types'

import '../styles/FilmListItem.sass'
import defaultPoster from '../styles/DefaultPoster.jpg'

const FilmListItem = ({ film }) => {
  const { id, title, rating, poster, release } = film
  let ratingClass;
  if(rating === 'NR') {
    ratingClass = ' gray'
  } else if(rating < 5) {
    ratingClass = ' red'
  } else if(rating >= 5 && rating < 7) {
    ratingClass = ' orange'
  } else {
    ratingClass = ' green'
  }
  
  return (
    <div className="list-item">
      <div className={`rating${ratingClass}`}><span>{rating}</span></div>
      <div className={`selected-label`}
           onClick={(e) => {
             e.preventDefault()
           }}>
        <i className="fa fa-bookmark" aria-hidden="true" /></div>
      <img src={poster || defaultPoster} alt="poster" />
      <div className="info">
        <span className="title">{title}</span>
        <span className="release">{release}</span>
      </div>
    </div>
  )
}

FilmListItem.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    poster: PropTypes.string,
    release:PropTypes.string.isRequired
  }).isRequired
}

export default FilmListItem