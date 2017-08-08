import React from 'react'
import PropTypes from 'prop-types'
import { withFauxDOM } from 'react-faux-dom'
import styled from 'styled-components'
import withD3Renderer from 'hocs/withD3Renderer'
const d3 = {
  ...require('d3-selection')
}

const { number } = PropTypes
const LOADING = 'loading...'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

class ExampleD3Chart extends React.Component {
  static propTypes = {
    data: number
  }

  render() {
    const { chart } = this.props
    return (
      <Wrapper className="exampleD3Chart">
        {chart}
      </Wrapper>
    )
  }

  renderD3 = mode => {
    const { value, connectFauxDOM, animateFauxDOM } = this.props

    // d3 helpers
    const width = 300
    const height = 300
    const margin = { top: 20, right: 10, bottom: 50, left: 50 }

    // create a faux div and store its virtual DOM in state.chart
    let faux = connectFauxDOM('div', 'chart')

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
        .append('circle')
        .attr('id', 'outer')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', value)
        .attr('fill', '#832846')

      svg
        .append('circle')
        .attr('id', 'inner')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', Math.sqrt(value) * 2)
        .attr('fill', '#132846')
    } else {
      svg = d3.select(faux).select('svg').select('g')
      svg.select('#outer').attr('r', value)
      svg.select('#inner').attr('r', Math.sqrt(value) * 2)
    }

    animateFauxDOM(800)
  }
}

ExampleD3Chart.defaultProps = {
  chart: LOADING
}

export default withFauxDOM(
  withD3Renderer({ updateOn: ['value'] })(ExampleD3Chart)
)
