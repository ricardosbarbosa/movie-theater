import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Movie from './pages/Movie'
import Movies from './pages/Movies'

const App = () => {
  return (
    <Switch>
      <Route path="/movies/:id">
        <Movie />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
       <Route path="*">
        <Redirect to="/movies" />
      </Route>
    </Switch>
  )
}

export default App