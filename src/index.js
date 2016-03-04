import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import FlowJsonSchemaEditor from './containers/flow-json-schema-editor'

render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={FlowJsonSchemaEditor}/>
    </Route>
  </Router>
, document.getElementById('app'))
