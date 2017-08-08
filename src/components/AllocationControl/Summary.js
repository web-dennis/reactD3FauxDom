import React from 'react'
import styled from 'styled-components'
import { BarWrapper } from './BarWrapper'
import { SliderWrapper } from './SliderWrapper'
import PropTypes from 'prop-types'
import { withFauxDOM } from 'react-faux-dom'
import withD3Renderer from 'hocs/withD3Renderer'
const d3 = {
  ...require('d3-selection'),
  ...require('d3-array'),
  ...require('d3-shape'),
  ...require('d3-scale'),
  ...require('d3-color')
}

const SummaryWrapper = styled.div`
  width: 350px;
  vertical-align: middle;
  display: inline-flex;
  .summary-label {
    line-height: 60px;
    margin-left: 65px;
    width: 180px;
  }
  .summary-value {
    position: relative;
    top: 13px;
  }
`

const CornerRounder = styled.div`
  max-height: 30px;
  margin-top: 15px;
  border-radius: 5px;
  overflow: hidden;
`
const { array, string, func, number } = PropTypes

class Summary extends React.Component {
  static propTypes = {
    resources: array,
    updateResources: func,
    projectId: string,
    total_budget: number
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    const { chart } = this.props
    return (
      <BarWrapper>
        <SummaryWrapper>
          <div className="summary-label">TOTAL</div>
          <div className="summary-value">
            <input
              type="number"
              defaultValue={this.props.total_budget}
              onKeyPress={this.handleChange}
              onChange={this.handleChange}
            />
          </div>
        </SummaryWrapper>
        <SliderWrapper>
          <CornerRounder>
            {chart}
          </CornerRounder>
        </SliderWrapper>
      </BarWrapper>
    )
  }

  renderD3 = mode => {
    const { connectFauxDOM, animateFauxDOM } = this.props

    // d3 helpers
    const width = 830
    const height = 50
    const margin = { top: 0, right: 10, bottom: 15, left: 0 }

    // create a faux div and store its virtual DOM in state.chart
    let faux = connectFauxDOM('div', 'chart')
    var x = d3.scaleLinear().rangeRound([0, width - margin.right])
    x.domain([0, this.props.total_budget]).nice()
    const value = this.props.total_budget
    const dataToStack = {}
    this.props.resources.forEach(res => {
      dataToStack[res.label] = res.value
    })
    const keys = this.props.resources.map(res => res.label)
    const stacked = d3.stack().keys(keys)([dataToStack])

    let svg
    if (mode === 'render') {
      svg = d3
        .select(faux)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      svg
        .append('g')
        .selectAll('g')
        .data(stacked)
        .enter()
        .append('g')
        .attr('fill', (d, i) => {
          return this.props.resources[i].color
        })
        .selectAll('rect')
        .data(function(d) {
          return d
        })
        .enter()
        .append('rect')
        .attr('x', d => x(d[0]))
        .attr('height', '30px')
        // .attr("ry", '5px')
        .attr('width', d => x(d[1]) - x(d[0]))
    } else {
      svg = d3.select(faux).select('svg').select('g')
      svg.selectAll('g').remove()
      svg
        .append('g')
        .selectAll('g')
        .data(stacked)
        .enter()
        .append('g')
        .attr('fill', (d, i) => {
          return this.props.resources[i].color
        })
        .selectAll('rect')
        .data(function(d) {
          return d
        })
        .enter()
        .append('rect')
        .attr('x', d => x(d[0]))
        .attr('height', '30px')
        .attr('width', d => x(d[1]) - x(d[0]))
    }
    animateFauxDOM(800)
  }

  handleChange(e) {
    if (e.key === 'Enter') {
      const newValue = e.target.value > 0 ? e.target.value : 0
      const delta = newValue - this.props.total_budget
      const resourcesToUpdate = this.props.resources.filter(
        resource => !resource.locked && resource.value > 0
      )
      const changePerResource = delta / resourcesToUpdate.length
      const updatedResources = this.props.resources.map(resource => {
        if (resource.locked || Math.round(resource.value) === 0) {
          return resource
        } else {
          return {
            ...resource,
            value: resource.value + changePerResource
          }
        }
      })
      this.props.updateResources(updatedResources)
    }
  }
}

const LOADING = 'loading...'

Summary.defaultProps = {
  chart: LOADING
}

export default withFauxDOM(
  withD3Renderer({ updateOn: ['total_budget', 'resources'] })(Summary)
)
