import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withFauxDOM } from 'react-faux-dom'
import moment from 'moment'
import './style.css'
import { setSize, getWeekNum, weekInSecs } from './helpers/svgHelper'
const d3 = require('d3')

const zoomRatio = 0.03
class BezierSingle extends Component {
  static propTypes = {
    connectFauxDOM: PropTypes.func,
    animateFauxDOM: PropTypes.func,
    updateSelectedProject: PropTypes.func,
    chart: PropTypes.any
  }

  static defaultProps = {
    chart: 'loading'
  }

  constructor(props) {
    super(props)
    this.data = this.props.data
    this.state = {
      budget: this.data.total_budget
    }
  }

  componentDidMount() {
    const { data } = this
    this.initGraph(data)
    this.updateBudget(false)
  }

  initGraph = ({ controlY, zoomY, startPoint, endPoint }) => {
    // Select svg
    const faux = this.props.connectFauxDOM('div', 'chart')
    const chartContainer = d3.select(faux)
    this.svg = chartContainer.append('svg').attr('class', 'svg-container')
    const { svg } = this
    const w = window.innerWidth > 900 ? 900 : window.innerWidth - 20
    const h = window.innerHeight - 400 > 500 ? 500 : window.innerHeight - 400
    setSize(svg, { width: w, height: h })
    // Set size of real x, y.
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const width = svg.attr('width') - margin.left - margin.right
    const height = svg.attr('height') - margin.top - margin.bottom
    const x = d3.scaleLinear().rangeRound([0, width])
    const y = d3.scaleLinear().rangeRound([0, height])
    x.domain([startPoint, endPoint])
    y.domain([0, zoomY * controlY])

    const ratioX = (endPoint - startPoint) / width
    this.scale = { x, y }
    this.size = { width, height }

    // Create bars
    this.bars = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
    this.updateBarsAndAxis()

    // Create Bezier Curves
    this.bezierCurves = svg
      .append('path')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
    this.updateBezierCurve()

    // Create Control Linje
    this.controlLine = svg
      .append('path')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'control-line')
    this.updateControlLine()

    // Create Points
    this.circles = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
    this.updatePoints()

    // Create Control Point
    const controlDrag = d3
      .drag()
      .on('drag', () => {
        const { data } = this
        const newX =
          data.controlX +
          d3.event.sourceEvent.movementX * ratioX * data.zoomX / 1.5
        this.updateByControlPoint(newX, data.controlY)
      })
      .on('end', () => {
        const { data } = this
        let newX = Math.max(data.controlX, getWeekNum(data.start_week) - 0.5)
        newX = Math.min(newX, getWeekNum(data.end_week))
        this.updateByControlPoint(newX, data.controlY)
      })
    this.controlPoint = svg
      .append('circle')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'circle')
      .call(controlDrag)
    this.updateControlPoint()

    // Create scale controls
    const scaleControlXDrag = d3.drag().on('drag', () => {
      const { data } = this
      const newZoomX = data.zoomX + d3.event.sourceEvent.movementX * zoomRatio
      this.updateByScaleXControl(newZoomX)
    })
    const scaleControlYDrag = d3.drag().on('drag', () => {
      const { data } = this
      const newZoomY = data.zoomY + d3.event.sourceEvent.movementY * zoomRatio
      this.updateByScaleYControl(newZoomY)
    })
    this.scaleControls = {
      horizontalLine: svg
        .append('path')
        .attr('class', 'zoom-horizontal')
        .attr(
          'd',
          `M ${width - height * 0.1},${height * 0.1} ${width -
            height * 0.2},${height * 0.1}`
        ),
      verticalLine: svg
        .append('path')
        .attr('class', 'zoom-vertical')
        .attr(
          'd',
          `M ${width - height * 0.05},${height * 0.1} ${width -
            height * 0.05},${height * 0.2}`
        ),
      horizontalCircle: svg
        .append('circle')
        .attr('class', 'zoom-circle')
        .attr('cx', width - height * 0.15)
        .attr('cy', height * 0.1)
        .call(scaleControlXDrag),
      verticalCircle: svg
        .append('circle')
        .attr('class', 'zoom-circle')
        .attr('cx', width - height * 0.05)
        .attr('cy', height * 0.15)
        .call(scaleControlYDrag)
    }

    this.props.animateFauxDOM(800)
  }

  updateBarsAndAxis = () => {
    const {
      bars,
      scale: { x, y },
      size: { width, height },
      data: { hours, controlY, zoomY, startPoint, endPoint }
    } = this
    const ratioX = width / (endPoint - startPoint)
    bars.selectAll('*').remove()
    bars
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(() => ''))

    bars
      .append('g')
      .attr('class', 'axis axis--y')
      .call(
        d3
          .axisLeft(y)
          .ticks(10)
          .tickFormat(d => Math.floor(controlY * zoomY - d))
      )
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Hours')

    for (let posX = startPoint; posX < endPoint; posX++) {
      // Show ruler lines
      const iX = Math.floor(posX) + 0.5
      if (iX < startPoint) continue
      bars
        .append('path')
        .attr('class', 'ruler-line')
        .attr('d', `M ${x(iX)},0 ${x(iX)},${height}`)

      if (posX === startPoint || iX - 0.5 < startPoint) continue

      // x axis texts
      const date = moment(posX * weekInSecs * 1000)
      bars
        .append('text')
        .attr('class', 'axis-x-text')
        .attr('x', x(iX - 0.5))
        .attr('y', height + 20)
        .attr('font-size', `${Math.min(ratioX / 5, 20)}px`)
        .attr('text-anchor', 'middle')
        .text(`Week ${date.week()}`)
    }

    bars
      .selectAll('.bar')
      .data(hours)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(getWeekNum(d) - 0.25))
      .attr('y', d => height - y(d.value))
      .attr('width', x(0.5) - x(0))
      .attr('height', d => y(d.value))
  }

  updateBezierCurve = () => {
    const {
      bezierCurves,
      scale: { x, y },
      size: { height },
      data: { start_week, end_week, controlX, controlY }
    } = this

    bezierCurves
      .attr(
        'd',
        `M ${x(getWeekNum(start_week) - 0.5)},${height}
        Q ${x(controlX)},${height - y(controlY)}
        ${x(getWeekNum(end_week) - 0.5)},${height}`
      )
      .attr('class', 'bezier-curve')
  }

  updateControlLine = () => {
    const {
      controlLine,
      scale: { x, y },
      size: { height },
      data: { start_week, end_week, controlX, controlY }
    } = this

    controlLine.attr(
      'd',
      `M ${x(getWeekNum(start_week) - 0.5)},${height}
         ${x(controlX)},${height - y(controlY)}
         ${x(getWeekNum(end_week) - 0.5)},${height}`
    )
  }

  updatePoints = () => {
    const { circles, scale: { x, y }, size: { height }, data: { hours } } = this

    circles.selectAll('*').remove()
    circles
      .selectAll('.circle')
      .data(hours)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', d => x(getWeekNum(d)))
      .attr('cy', d => height - y(d.value))
  }

  updateControlPoint = () => {
    const {
      controlPoint,
      scale: { x, y },
      size: { height },
      data: { controlX, controlY }
    } = this

    controlPoint.attr('cx', x(controlX)).attr('cy', height - y(controlY))
  }

  updateZoomX = () => {
    const {
      scaleControls: { horizontalCircle },
      scale: { x },
      size: { width, height },
      data: { zoomX, startPoint, endPoint, start_week, end_week }
    } = this
    horizontalCircle
      .attr('cx', width - height * 0.15 + (zoomX - 1.5) / zoomRatio)
      .attr('cy', height * 0.1)
    const center = (startPoint + endPoint) / 2
    const period = getWeekNum(end_week) - getWeekNum(start_week)
    this.data.startPoint = center - zoomX * period / 2
    this.data.endPoint = center + zoomX * period / 2
    x.domain([this.data.startPoint, this.data.endPoint])
  }

  updateZoomY = () => {
    const {
      scaleControls: { verticalCircle },
      scale: { y },
      size: { width, height },
      data: { zoomY, controlY }
    } = this
    verticalCircle
      .attr('cx', width - height * 0.05)
      .attr('cy', height * 0.15 + (zoomY - 1.5) / zoomRatio)
    y.domain([0, controlY * zoomY])
  }

  updateByControlPoint = (cx, cy) => {
    const { data } = this
    const { start_week, end_week } = data
    const hours = []
    const x0 = getWeekNum(start_week) - 0.5
    const x1 = Math.max(
      Math.min(cx, getWeekNum(end_week) - 0.5),
      getWeekNum(start_week) - 0.5
    )
    const x2 = getWeekNum(end_week) - 0.5
    const y0 = 0
    const y1 = cy
    const y2 = 0
    const t = x =>
      (x0 - x1 + Math.sqrt(x * (x0 - 2 * x1 + x2) - x0 * x2 + x1 * x1)) /
      (x0 - 2 * x1 + x2)
    for (let x = getWeekNum(start_week); x < getWeekNum(end_week); x++) {
      const date = moment(x * weekInSecs * 1000)
      const hour = {
        year: date.year(),
        week: date.week(),
        value: (1 - t(x)) * 2 * y0 + 2 * (1 - t(x)) * t(x) * y1 + t(x) * 2 * y2
      }
      hours.push(hour)
    }
    this.data = {
      ...data,
      hours,
      controlX: x1,
      controlY: y1
    }
    this.updateAll()
  }

  updateByScaleXControl = newZoomX => {
    const { data } = this
    this.data = {
      ...data,
      zoomX: Math.min(Math.max(newZoomX, 1), 2)
    }
    this.updateZoomX()
    this.updateAll()
  }

  updateByScaleYControl = newZoomY => {
    const { data } = this
    this.data = {
      ...data,
      zoomY: Math.min(Math.max(newZoomY, 1), 2)
    }
    this.updateZoomY()
    this.updateAll()
  }

  updateBudget = (animation = true) => {
    const { budget } = this.state
    const { data } = this
    const y1 =
      budget * 3 / (getWeekNum(data.end_week) - getWeekNum(data.start_week))
    const toZoomY = Math.min(Math.max(data.zoomY / y1 * data.controlY, 1), 2)
    const toControlY = y1
    const fromZoomY = data.zoomY
    const fromControlY = data.controlY
    const stepNum = animation ? 10 : 0
    let step = 0
    data.total_budget = budget
    this.updateBudgetTimer = setInterval(() => {
      step++
      this.data.zoomY =
        (toZoomY * step + fromZoomY * (stepNum - step)) / stepNum
      this.data.controlY =
        (toControlY * step + fromControlY * (stepNum - step)) / stepNum
      if (step + 1 > stepNum) {
        clearInterval(this.updateBudgetTimer)
        this.data.zoomY = toZoomY
        this.data.controlY = toControlY
      }
      this.updateZoomY()
      this.updateByControlPoint(this.data.controlX, this.data.controlY)
    }, 10)
  }

  updateAll = () => {
    this.updateBarsAndAxis()
    this.updateControlLine()
    this.updatePoints()
    this.updateControlPoint()
    this.updateBezierCurve()
    this.props.animateFauxDOM(10)
  }

  /*
   * Component render()
   * see: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
   */
  render() {
    const { chart } = this.props
    const { budget } = this.state
    return (
      <div>
        <div className="rendered-d3">
          <div className="controls">
            <div className="title">Bezier</div>
            <div className="budget-control">
              <input
                className="budget-input"
                value={budget}
                onChange={e => this.setState({ budget: e.target.value })}
              />
              <div className="update-budget" onClick={this.updateBudget}>
                UPDATE BUDGET
              </div>
            </div>
          </div>
          {chart}
          <div
            style={{
              background: 'pink',
              padding: '10px',
              webkitBoxShadow: 'inset 0 0 0 -5px red'
            }}
          >
            Please bear in mind that this chart does not utilize redux properly
            yet, it's here now just to look nice. <br />Take a look at the{' '}
            <Link to="/example">example (dead simple)</Link> to see how we would
            like to manage rendering and state.
          </div>
        </div>
      </div>
    )
  }
}

export default withFauxDOM(BezierSingle)
