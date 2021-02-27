import React from 'react'

import QueryPanel from './QueryPanel'
import SearchPanel from './SearchPanel'
import {Link} from 'react-router-dom'

import '../styles/Header.sass'

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to='/' className="link" >movieDB</Link>
      </div>
      <QueryPanel />
      <Link to='/selected' className={`selected-label`}>
        <i className="fa fa-bookmark" aria-hidden="true" />
      </Link>
      <SearchPanel />
    </div>
  )
}

export default Header