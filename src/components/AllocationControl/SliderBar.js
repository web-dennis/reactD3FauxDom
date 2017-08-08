import React from 'react'
import ReactSlider from 'react-slider'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withFauxDOM } from 'react-faux-dom'
import { BarWrapper } from './BarWrapper'
import { SliderWrapper } from './SliderWrapper'
import withD3Renderer from 'hocs/withD3Renderer'
const d3 = {
  ...require('d3-selection'),
  ...require('d3-array'),
  ...require('d3-scale')
}

import { ResourceDetails } from './ResourceDetails'
const { func, string, number, object, array } = PropTypes
const LOADING = 'loading...'

class SliderBar extends React.Component {
  static propTypes = {
    updateValue: func,
    updateResources: func,
    toggleLocked: func,
    value: number,
    resource: object,
    resources: array,
    projectId: string
  }

  render() {
    const { chart } = this.props
    return (
      <BarWrapper>
        <ColorIndicator color={this.props.color} />
        <ResourceDetails
          {...this.props}
          toggleLocked={this.toggleLocked()}
          onChange={this.handleChange}
        />
        <Slider
          {...this.props}
          onChange={this.handleChange()}
          chart={chart}
          max={this.props.total_budget}
        />
      </BarWrapper>
    )
  }

  handleChange = e => e => {
    //make it work for both slider and input
    const newValue = e.target ? parseInt(e.target.value, 10) : e
    const unlockedBudget =
      this.props.total_budget -
      d3.sum(
        this.props.resources.filter(res => res.locked).map(res => res.value)
      )

    if (this.props.resource.locked) {
      return
    }
    const delta = this.props.value - newValue
    const resourcesToUpdate = this.props.resources.filter(
      resource =>
        !resource.locked &&
        this.props.resource.label !== resource.label &&
        resource.value > 0
    )
    const changePerResource = delta / resourcesToUpdate.length
    const updatedResources = this.props.resources.map(resource => {
      if (resource.locked) {
        return resource
      }
      let newValue = resource.value
      if (this.props.resource.label === resource.label) {
        newValue = Math.min(resource.value - delta, unlockedBudget)
      } else {
        if (
          !resource.locked &&
          this.props.resource.label !== resource.label &&
          resource.value > 0
        ) {
          newValue = resource.value + changePerResource || 0
        }
      }
      return {
        ...resource,
        value: Math.max(newValue, 0)
      }
    })

    this.props.updateResources(updatedResources)
  }

  toggleLocked = e => e => {
    this.props.toggleLocked(this.props.label)
  }

  renderD3 = mode => {
    const { value, connectFauxDOM, animateFauxDOM } = this.props

    // d3 helpers
    const width = 830
    const height = 50
    const margin = { top: 15, right: 10, bottom: 15, left: 0 }

    // create a faux div and store its virtual DOM in state.chart
    let faux = connectFauxDOM('div', 'chart')

    const x = d3.scaleLinear().rangeRound([0, width - margin.right])
    x.domain([0, this.props.total_budget]).nice()

    let svg
    if (mode === 'render') {
      svg = d3
        .select(faux)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .append('rect')
        .attr('id', 'bar')
        .attr('width', Math.max(x(value), x(1)))
        .attr('height', 30)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', this.props.color)

      if (!this.props.resource.locked) {
        svg = d3.select(faux).select('svg').select('g')
        svg
          .append('circle')
          .attr('class', 'locked-circle-outer')
          .attr('cx', Math.max(x(value), x(1)))
          .attr('cy', 15)
          .attr('r', 8)
          .attr('fill', '#fff')
        svg
          .append('circle')
          .attr('class', 'locked-circle')
          .attr('cx', Math.max(x(value), x(1)))
          .attr('cy', 15)
          .attr('r', 5)
          .attr('fill', '#313131')
      }
    } else {
      svg = d3.select(faux).select('svg').select('g')
      svg.select('#bar').attr('width', Math.max(x(value), x(1)))

      if (!this.props.resource.locked) {
        svg.selectAll('circle').remove()
        svg
          .append('circle')
          .attr('class', 'locked-circle-outer')
          .attr('cx', Math.max(x(value), x(1)))
          .attr('cy', 15)
          .attr('r', 8)
          .attr('fill', '#fff')
        svg
          .append('circle')
          .attr('class', 'locked-circle')
          .attr('cx', Math.max(x(value), x(1)))
          .attr('cy', 15)
          .attr('r', 5)
          .attr('fill', '#313131')
      } else {
        svg.selectAll('circle').remove()
      }
    }

    animateFauxDOM(800)
  }
}

SliderBar.defaultProps = {
  chart: LOADING
}

const ColorIndicator = styled.div`
  width: 25px;
  height: 100%;
  background-color: ${props => props.color};
`

const Slider = ({ value, onChange, chart, max }) =>
  <SliderWrapper>
    <ReactSlider value={value} onChange={onChange} max={max} />
    {chart}
  </SliderWrapper>

export default withFauxDOM(
  withD3Renderer({ updateOn: ['resources'] })(SliderBar)
)
