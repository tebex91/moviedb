import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import '../styles/SearchPanel.sass'

const SearchPanel = ({ history }) => {
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <form className="search-panel" onSubmit={ (e) => {
      e.preventDefault()
      const query = searchQuery.trim().replace(/ /g,"+")
      if(!query) { return }
      history.push(`/search&q=${query}`)
      setSearchQuery('')}}>
      <input
        type="text"
        placeholder="find movie"
        value={ searchQuery }
        onChange={(e) => {
            setSearchQuery(e.target.value)
        }} />
      <button type="submit">go!</button>
    </form>
  )
}

export default withRouter(SearchPanel)
