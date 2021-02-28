import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import PropTypes from 'prop-types'

import FilmDetails from '../components/FilmDetails'
import Spinner from '../components/Spinner'
import ErrorPage from '../components/ErrorPage'
import withMovieApiService from '../hoc/withMovieApiService'
import { updateSelectedFilms } from '../actions'

const FilmDetailsContainer = ({ id, movieApi, selectedFilms, updateSelectedFilms }) => {
  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let cancelled = false
    movieApi.getMovieDetails(id)
    .then(data => {
      !cancelled && setFilm(data)
      setLoading(false)})
    .catch(() => {
      setError(true)
      setLoading(false)})
    return () => {cancelled = true}
  },[id, movieApi])
  
  const props = { film, selectedFilms, updateSelectedFilms }
  
  const filmDetails = film && (
    <FilmDetails { ...props } />
  )
  const spinner = loading && <Spinner />
  const errorMessage = error && <ErrorPage />
  
  return find([filmDetails, spinner, errorMessage])
}

FilmDetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  movieApi: PropTypes.object.isRequired,
  selectedFilms: PropTypes.array.isRequired,
  updateSelectedFilms: PropTypes.func.isRequired
}

export default compose(
  withMovieApiService,
  connect(
    ({ selectedFilms }) => ({ selectedFilms }),
    { updateSelectedFilms }
  ))(FilmDetailsContainer)