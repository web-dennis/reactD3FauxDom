import { connect } from 'react-redux'
import ProjectDetails from 'components/Header/ProjectDetails'
import toJS from 'hocs/toJS'
import { getProject } from 'redux/selectors'

const mapStateToProps = (state, ownProps) => ({
  project: getProject(state)
})

export default connect(mapStateToProps)(toJS(ProjectDetails))
