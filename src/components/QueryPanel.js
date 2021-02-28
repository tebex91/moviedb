import React from 'react'
import { withRouter } from 'react-router-dom'

import { QUERY_BUTTONS } from '../constants/QueryButtons'

import '../styles/QueryPanel.sass'

const QueryPanel = ({history, location}) => {
  const buttons = (
    QUERY_BUTTONS.map(({title, path}) => {
      const chosenClass = location.pathname.includes(path) ? ' chosen' : ''
      return (
        <li
          key={path}
          className={`query-btn${chosenClass}`}
          onClick={() => history.push(`/list/${path}`)}>
          {title}
        </li>)
    })
  )
  
  return (
    <ul className="query-panel">
      {buttons}
    </ul>
  )
}

export default withRouter(QueryPanel)