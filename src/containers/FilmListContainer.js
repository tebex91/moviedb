import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import find from 'lodash/find'

import FilmList from '../components/FilmList'
import Spinner from '../components/Spinner'
import ErrorPage from '../components/ErrorPage'
import { fetchFilms, clearFilmList, updateSelectedFilms } from '../actions'

import withMovieApiService from '../hoc/withMovieApiService'

const FilmListContainer = ({ loading, error, films, movieApi, fetchFilms, func = 'getBySearch',
                             query, clearFilmList, updateSelectedFilms, selectedFilms }) => {
  
  const [totalPagesNum, setTotalPageNum] = useState(null)
  const [pageNum, setPageNum] = useState(null)
  
  useEffect(() => {
    let cancelled = false
    clearFilmList()
    setPageNum(1)
    movieApi.getTotalPages(func, 1, query)
    .then(data => !cancelled && setTotalPageNum(data))
    !cancelled && fetchFilms(movieApi, func, 1, query)
    return () => {
      cancelled = true
      clearFilmList()
    }
  }, [func, query, clearFilmList, fetchFilms, movieApi])
  
  const fetchMoreFilms = () => {
    fetchFilms(movieApi, func, pageNum + 1, query)
  }
  
  const props = { films, fetchMoreFilms, totalPagesNum, pageNum, setPageNum, selectedFilms, updateSelectedFilms }
  
  const list = films.length && (
    <FilmList { ...props } />
  )
  
  const spinner = loading && <Spinner />
  const message = <div className="message">no results for your query</div>
  const errorMessage = error && <ErrorPage />
  
  return find([list, spinner, errorMessage, message])
}

FilmListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  func: PropTypes.string,
  query: PropTypes.string,
  movieApi: PropTypes.object.isRequired,
  fetchFilms: PropTypes.func.isRequired,
  clearFilmList: PropTypes.func.isRequired,
  updateSelectedFilms: PropTypes.func.isRequired,
  selectedFilms: PropTypes.array.isRequired
}

export default
compose(
  withRouter,
  withMovieApiService,
  connect(
  ({ filmList: {films, loading, error}, selectedFilms }) => ({ films, loading, error, selectedFilms }),
  { fetchFilms, clearFilmList, updateSelectedFilms }
  ))(FilmListContainer)