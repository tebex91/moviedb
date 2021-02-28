import React from 'react'
import PropTypes from 'prop-types'

import QueryPanel from './QueryPanel'
import SearchPanel from './SearchPanel'
import { Link } from 'react-router-dom'

import '../styles/Header.sass'

const Header = ({ selectedFilms }) => {
  const fulfilledClass = selectedFilms.length ? ' fulfilled' : ''
  
  return (
    <div className="header">
      <div className="logo">
        <Link to='/' className="link" >movieDB</Link>
      </div>
      <QueryPanel />
      <Link to='/selected' className={`selected-label${fulfilledClass}`}>
        <i className="fa fa-bookmark" aria-hidden="true" />
      </Link>
      <SearchPanel />
    </div>
  )
}

Header.propTypes = {
  selectedFilms: PropTypes.array.isRequired
}

export default Header