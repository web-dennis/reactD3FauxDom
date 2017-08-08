import SliderBar from '../../containers/AllocationControl/SliderBar.js'
import Header from 'containers/AllocationControl/Header'
import Summary from 'containers/AllocationControl/Summary'
import { Footer } from './Footer'
import React from 'react'
import PropTypes from 'prop-types'

const { array, string, func, number } = PropTypes

class AllocationControl extends React.Component {
  static propTypes = {
    resources: array,
    project: string,
    totalBudget: number,
    updateValue: func
  }

  render() {
    return (
      <div style={{ border: '1px solid #d7dee2' }}>
        <Header totalBudget={this.props.totalBudget} />
        {this.props.resources.map((resource, index) => {
          return <SliderBar key={index} resource={resource} {...this.props} />
        })}
        <Summary />
        <Footer />
      </div>
    )
  }
}

export default AllocationControl
