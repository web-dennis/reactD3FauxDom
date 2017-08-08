import { connect } from 'react-redux'
import ExampleSlider from 'components/ExampleSlider.js'
import { setValue } from 'redux/actions'
import toJS from 'hocs/toJS'
import { getValue } from 'redux/selectors'

const mapStateToProps = (state, ownProps) => ({
  value: getValue(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateValue (value) {
    dispatch(setValue(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ExampleSlider))
