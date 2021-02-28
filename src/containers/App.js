import React from 'react'
import { Switch, Route } from 'react-router'
import find from 'lodash/find'

import HeaderContainer from '../containers/HeaderContainer'
import MainPage from '../components/MainPage'
import FilmListContainer from './FilmListContainer'
import FilmDetailsContainer from './FilmDetailsContainer'
import SelectedListContainer from './SelectedListContainer'
import ErrorPage from '../components/ErrorPage'
import ArrowUp from '../components/ArrowUp'
import { QUERY_BUTTONS } from '../constants/QueryButtons'

import '../styles/App.sass'


const App = () => {
  return (
    <div className="app-block">
      <HeaderContainer />
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/list/:query'
          render={({ match }) => {
            const {query} = match.params
            const btn = find(QUERY_BUTTONS, {'path': query})
            return btn ? <FilmListContainer func={btn.func} /> : <ErrorPage />
          }}/>
        <Route path='/search&q=:query'
          render={({match}) => {
            const { query } = match.params
            return <FilmListContainer query={query} />
          }} />
        <Route path='/movie/:id'
         render={({match}) => {
           const { id } = match.params
           return <FilmDetailsContainer id={id} />
        }} />
        <Route path='/selected' component={SelectedListContainer} />
        <Route component={ErrorPage} />
      </Switch>
      <ArrowUp />
    </div>
  )
}

export default App