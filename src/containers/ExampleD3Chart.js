import { connect } from 'react-redux'
import ExampleD3Chart from 'components/ExampleD3Chart'
import toJS from 'hocs/toJS'
import { getValue } from 'redux/selectors'

const mapStateToProps = (state, ownProps) => ({
  value: getValue(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  // not used in this simplified case
  // see ExampleSlider container
})

export default connect(mapStateToProps, mapDispatchToProps)(
  toJS(ExampleD3Chart)
)
