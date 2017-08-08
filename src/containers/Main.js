import { connect } from 'react-redux'
import Main from 'components/Main'
import toJS from '../hocs/toJS'
import { getProject } from 'redux/selectors'

const mapStateToProps = (state, ownProps) => ({
  project: getProject(state)
})

export default connect(mapStateToProps)(toJS(Main))
