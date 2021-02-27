import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import PropTypes from 'prop-types'
import find from 'lodash/find'

import FilmList from '../components/FilmList'
import Spinner from '../components/Spinner'
import { fetchFilms, clearFilmList } from '../actions'

import withMovieApi from '../hoc/withMovieApi';


const FilmListPage = ({ loading, films, movieApi, fetchFilms, func, clearFilmList }) => {
  const getTotalPages = useMemo(() => movieApi.getTotalPages, [movieApi]);

  const [totalPagesNum, setTotalPageNum] = useState(null)
  const [pageNum, setPageNum] = useState(null)
  
  
  useEffect(() => {
    clearFilmList()
    setPageNum(1)
    fetchFilms(func)
    getTotalPages(func)
    .then(data => setTotalPageNum(data))
  }, [func, clearFilmList, fetchFilms, getTotalPages])
  
  const list = films.length && (
    <FilmList
      films={films}
      func={func}
      fetchFilms={fetchFilms}
      totalPagesNum={totalPagesNum}
      pageNum={pageNum}
      setPageNum={setPageNum} />
  );
  const spinner = loading && <Spinner />

  return find([list, spinner]);
}

FilmListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  func: PropTypes.string.isRequired,
  fetchFilms: PropTypes.func.isRequired,
  clearFilmList: PropTypes.func.isRequired
}

export default
compose(
  withMovieApi,
  connect(
  ({ filmList: {films, loading} }) => ({films, loading}),
  { fetchFilms, clearFilmList }
)
)(FilmListPage)