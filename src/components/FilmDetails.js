import React from 'react'
import PropTypes from 'prop-types'

import '../styles/FilmDetails.sass'
import defaultPoster from '../styles/img/DefaultPoster.jpg'

const FilmDetails = ({ film, selectedFilms, updateSelectedFilms }) => {
  const { id, title, tagline, revenue, budget, runtime, overview, rating,
          genres, year, productionCountries, poster } = film
  
  const elem = selectedFilms.find((film) => film.id === id)
  const clazz = 'selected-label';
  const selectedClazz = elem ? ' selected' : ''
  
  return (
    <div className="film-details">
      <div>
        <div className={clazz + selectedClazz}
             onClick={() => updateSelectedFilms({id, title, rating})}>
          <i className="fa fa-bookmark" aria-hidden="true" /></div>
        <div className="film-rating">{rating}</div>
        <img className="film-poster" src={poster || defaultPoster} alt="poster"/>
        <div className="film-info">
          <h1 className="film-title">{title}</h1>
          <div className="film-tagline">{tagline}</div>
          <table>
            <tbody>
            <tr>
              <td>year</td>
              <td>{year}</td>
            </tr>
            <tr>
              <td>country</td>
              <td>{productionCountries}</td>
            </tr>
            <tr>
              <td>genre</td>
              <td>{genres}</td>
            </tr>
            <tr>
              <td>budget</td>
              <td>{budget}</td>
            </tr>
            <tr>
              <td>box office</td>
              <td>{revenue}</td>
            </tr>
            <tr>
              <td>runtime</td>
              <td>{runtime}</td>
            </tr>
            </tbody>
          </table>
          <div className="film-overview">{overview}</div>
        </div>
      </div>
    </div>
  )
}

FilmDetails.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    revenue: PropTypes.string,
    budget: PropTypes.string,
    runtime: PropTypes.string,
    overview: PropTypes.string,
    rating: PropTypes.string.isRequired,
    genre: PropTypes.string,
    year: PropTypes.string,
    productionCountries: PropTypes.string,
    poster: PropTypes.string
  }).isRequired,
  
  selectedFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired
    })).isRequired,
  
  updateSelectedFilms: PropTypes.func.isRequired
}

export default FilmDetails;