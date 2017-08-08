import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Example from './Example'

const NoMatch = ({ location }) =>
  <div>
    <h3>
      Components for <code>{location.pathname}</code> are still to come!
    </h3>
  </div>

const Main = () =>
  <main>
    <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/example' exact component={Example} />
      <Route path='/projects' exact component={NoMatch} />
      <Route path='/addProject' exact component={NoMatch} />
      <Route path='/people' exact component={NoMatch} />
    </Switch>
  </main>

export default Main
