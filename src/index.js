import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
    </Route>
  </Router>
), document.getElementById('app'))
