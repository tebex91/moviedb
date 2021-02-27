import React from 'react'
import PropTypes from 'prop-types'

import FilmListItem from './FilmListItem'

import '../styles/FilmList.sass'

const FilmList = ({ films, fetchFilms, func, query, pageNum, totalPagesNum, setPageNum }) => {
  const list = films.map((film) => {
    return (
      <li key={ film.id }>
        <FilmListItem film={film} />
      </li>
    )
  })
  
  const btn = (
    <button
      className="show-more-btn"
      onClick={() => {
        fetchFilms(func, pageNum + 1, query)
        setPageNum(pageNum + 1)
      }}>more</button>
  );
  
  return (
    <div className="film-list">
      <ul>
        { list }
      </ul>
      { totalPagesNum >= pageNum + 1 && list.length && btn }
    </div>
  )
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  func: PropTypes.string.isRequired,
  query: PropTypes.string,
  pageNum: PropTypes.number,
  totalPagesNum: PropTypes.number,
  fetchFilms: PropTypes.func.isRequired,
  setPageNum: PropTypes.func.isRequired
}

export default FilmList