import React from 'react'
import PropTypes from 'prop-types'
import ExampleD3Chart from 'containers/ExampleD3Chart'
import ExampleSlider from 'containers/ExampleSlider'

const { number } = PropTypes

class Dashboard extends React.Component {
  static propTypes = {
    value: number
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <ExampleSlider />
        <ExampleD3Chart />
      </div>
    )
  }
}

export default Dashboard
