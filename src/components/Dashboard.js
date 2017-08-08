import AllocationControl from 'containers/AllocationControl'
import React from 'react'
import PropTypes from 'prop-types'

const { number } = PropTypes

class Dashboard extends React.Component {
  static propTypes = {
    value: number
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <AllocationControl />
      </div>
    )
  }
}

export default Dashboard
