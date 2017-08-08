import { connect } from 'react-redux'
import BezierNoD3HOC from 'components/BezierNoD3HOC'
import toJS from 'hocs/toJS'
import { getProject } from 'redux/selectors'

const mapStateToProps = (state, ownProps) => ({
  data: getProject(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  // functions for hours and budget modification should be added here
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(BezierNoD3HOC))
