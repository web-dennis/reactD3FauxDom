import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import BezierCubic from 'components/BezierCubic/BezierCubic'
import toJS from 'hocs/toJS'
import { getProject } from 'redux/selectors'

const mapStateToProps = (state, ownProps) => ({
  selectedProject: getProject(state)
})

export default connect(mapStateToProps)(toJS(BezierCubic))
