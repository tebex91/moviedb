import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import find from 'lodash/find'

import FilmList from '../components/FilmList'
import Spinner from '../components/Spinner'
import { fetchFilms, clearFilmList } from '../actions'

import MovieApi from '../api/MovieApi'


const SearchPage = ({ loading, films, fetchFilms, query, clearFilmList }) => {
  const movieApi = useMemo(() => new MovieApi(), [])

  const func = 'getBySearch'
  
  const [totalPagesNum, setTotalPageNum] = useState(null)
  const [pageNum, setPageNum] = useState(null)
  
  useEffect(() => {
    clearFilmList()
    setPageNum(1)
    fetchFilms(func, 1, query)
    movieApi.getTotalPages(func, query)
    .then(data => setTotalPageNum(data))
  }, [query, func, clearFilmList, fetchFilms, movieApi])
  
  const list = films.length && (
    <FilmList
      films={films}
      func={func}
      query={query}
      fetchFilms={fetchFilms}
      totalPagesNum={totalPagesNum}
      pageNum={pageNum}
      setPageNum={setPageNum} />
  );
  const spinner = loading && <Spinner />
  
  const message = <p className="message">no results for your query</p>

  return find([list, spinner, message])
}

SearchPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
  fetchFilms: PropTypes.func.isRequired,
  clearFilmList: PropTypes.func.isRequired
}

export default connect(
  ({ filmList: {films, loading} }) => ({films, loading}),
  { fetchFilms, clearFilmList }
  )(SearchPage)