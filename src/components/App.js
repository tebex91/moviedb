import React from 'react'
import { Switch, Route } from 'react-router'
import find from 'lodash/find'

import Header from './Header'
import MainPage from './MainPage'
import FilmListPage from '../containers/FilmListPage'
import SearchPage from '../containers/SearchPage'
import { queryButtons } from '../constants/QueryButtons'

import '../styles/App.sass'


const App = () => {
  return (
    <div className="app-block">
      <Header />
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/list/:query'
          render={({ match }) => {
            const {query} = match.params
            const func = find(queryButtons, {'path': query}).func
            return <FilmListPage func={func} />
          }}/>
        <Route path='/search&q=:query'
          render={({match}) => {
            const { query } = match.params
            return <SearchPage query={query} />
          }} />
      </Switch>
    </div>
  )
}

export default App