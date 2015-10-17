import React, { Component } from 'react'
import Trix from '../src/react-trix'

class App extends Component {
  render() {
    return <Trix />
  }
}

React.render(<App />, document.getElementById('app'));