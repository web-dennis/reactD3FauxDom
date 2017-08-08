import React from 'react'
import ReactSlider from 'react-slider'
import PropTypes from 'prop-types'
import { withFauxDOM } from 'react-faux-dom'
import styled from 'styled-components'
import withD3Renderer from 'hocs/withD3Renderer'
const d3 = {
  ...require('d3-selection')
}

const { func } = PropTypes
const LOADING = 'loading...'

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  background: #fff;
  border-left: 5px solid #499bb1;
  .slider {
    width: 100%;
    max-width: 500px;
    height: 50px;
    margin-left: 50px;
  }
  .handle {
    background-color: transparent;
    cursor: pointer;
  }
  .slider .handle {
    width: 50px;
    height: 50px;
  }
`

const SliderWrapper = styled.div`
  width: 600px;
  display: inline-flex;
`

const ResourceWrapper = styled.div`
  width: 150px;
  padding: 15px;
`

class ExampleSlider extends React.Component {
  static propTypes = {
    updateValue: func
  }

  handleChange = e => e => {
    this.props.updateValue(e)
  }

  renderD3 = mode => {
    const { value, connectFauxDOM, animateFauxDOM } = this.props

    // d3 helpers
    const width = 600
    const height = 50
    const margin = { top: 15, right: 50, bottom: 15, left: 50 }

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
        .append('rect')
        .attr('id', 'bar')
        .attr('width', Math.max(value * 5, 10))
        .attr('height', 20)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', '#499bb1')
    } else {
      svg = d3.select(faux).select('svg').select('g')
      svg.select('#bar').attr('width', Math.max(value * 5, 10))
    }

    animateFauxDOM(800)
  }

  render() {
    const { chart } = this.props
    return (
      <Wrapper>
        <ResourceWrapper>
          Resource value: {this.props.value}
        </ResourceWrapper>
        <SliderWrapper>
          <ReactSlider
            defaultValue={this.props.value}
            onChange={this.handleChange()}
          />
          <div style={{ position: 'absolute' }}>
            {chart}
          </div>
        </SliderWrapper>
      </Wrapper>
    )
  }
}

ExampleSlider.defaultProps = {
  chart: LOADING
}

export default withFauxDOM(
  withD3Renderer({ updateOn: ['value'] })(ExampleSlider)
)
