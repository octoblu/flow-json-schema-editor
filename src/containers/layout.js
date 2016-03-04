import React, { Component } from 'react'

import 'zooid-ui/dist/style.css'

import { TopBar, TopBarTitle } from 'zooid-ui'
import { Page } from 'zooid-ui'

export default class Layout extends Component {
  render() {
    return <div>
      <TopBar>
        <TopBarTitle>Flow-Json Schema Editor</TopBarTitle>
      </TopBar>
      <Page>
        {this.props.children}
      </Page>
    </div>
  }
}
