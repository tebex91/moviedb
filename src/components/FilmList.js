import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import FilmListItem from './FilmListItem'

import '../styles/FilmList.sass'

const FilmList = ({ films, fetchMoreFilms, pageNum, totalPagesNum, setPageNum,
                    selectedFilms, updateSelectedFilms }) => {
  const list = films.map((film) => {
    const { id } = film
    const props = { film, selectedFilms, updateSelectedFilms }
    return (
      <li key={id}>
        <Link to={`/movie/${id}`} className="link">
          <FilmListItem { ...props } />
        </Link>
      </li>
    )
  })
  
  const btn = (
    <button
      className="show-more-btn"
      onClick={() => {
        fetchMoreFilms()
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
  pageNum: PropTypes.number,
  totalPagesNum: PropTypes.number,
  setPageNum: PropTypes.func.isRequired,
  selectedFilms: PropTypes.array.isRequired,
  updateSelectedFilms: PropTypes.func.isRequired
}

export default FilmList