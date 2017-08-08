import React from 'react'
import styled from 'styled-components'
import { SliderWrapper } from './SliderWrapper'
import { withFauxDOM } from 'react-faux-dom'
import withD3Renderer from 'hocs/withD3Renderer'
const d3 = {
  ...require('d3-scale'),
  ...require('d3-selection'),
  ...require('d3-axis'),
}
import PropTypes from 'prop-types'

const HeaderWrapper = styled.div`
  height: 80px;
  width: 100%;
  vertical-align: middle;
  display: inline-flex;
  color: #fff;
  #axis text {
    fill: white;
    font-size: 14px;
  }
  .resource-info {
    margin-left: 50px;
    width: 180px;
    margin-top: 20px;
    padding-left: 15px;
  }
  .title {
    font-style: bold;
    font-size: 20px;
    font-weight: 900;
    margin-top: 25px;
  }
  .subtitle {
    line-height: 45px;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    bottom: 5px;
  }
  .resource-value {
    left: 250px;
    right: 0;
    span {
      position: relative;
      top: 38px;
      text-align: right;
    }
  }
`

const { array, string, func, number } = PropTypes

export class Header extends React.Component {
  static propTypes = {
    resources: array,
    project: string,
    totalBudget: number,
    updateValue: func
  }

  render() {
    const { chart } = this.props

    return (
      <HeaderWrapper>
        <div className="resource-info">
          <strong className="title">Allocation</strong>
          <br />
          <span className="subtitle">NAME / ROLE</span>
        </div>
        <div className="resource-value">
          <span className="subtitle">PLANNED</span>
        </div>
        <SliderWrapper className="axis">
          {chart}
        </SliderWrapper>
      </HeaderWrapper>
    )
  }
  renderD3 = mode => {
    const { connectFauxDOM, animateFauxDOM } = this.props

    // d3 helpers
    const width = 890
    const height = 80
    const margin = { top: 45, right: 35, bottom: 15, left: 45 }

    // create a faux div and store its virtual DOM in state.chart
    let faux = connectFauxDOM('div', 'chart')
    var x = d3.scaleLinear().rangeRound([0, width - margin.right])
    x.domain([0, this.props.total_budget]).nice()
    let svg
    if (mode === 'render') {
      var scale = d3
        .scaleLinear()
        .domain([0, this.props.totalBudget])
        .range([0, width - margin.right - margin.left])

      var axis = d3.axisBottom().scale(scale)

      svg = d3
        .select(faux)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#fff')
        .append('g')
        .attr('id', 'axis')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(axis)
    } else {
      svg = d3.select(faux).select('svg').select('g')
      // svg.selectAll('g').remove()
    }
    animateFauxDOM(800)
  }
}

const LOADING = 'loading...'

Header.defaultProps = {
  chart: LOADING
}

export default withFauxDOM(
  withD3Renderer({ updateOn: ['total_budget'] })(Header)
)
