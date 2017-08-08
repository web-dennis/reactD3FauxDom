import { connect } from 'react-redux'
import AllocationControl from 'components/AllocationControl'
import toJS from '../../hocs/toJS'
import {
  getProjectBudget,
  getProjectId,
  getProjectResources
} from 'redux/selectors'
import { setResourceValue, setResources, setBudget } from 'redux/actions'

const mapStateToProps = (state, ownProps) => ({
  projectId: getProjectId(state),
  totalBudget: getProjectBudget(state),
  resources: getProjectResources(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateValue (project, resource, value) {
      dispatch(setResourceValue(project, resource, value))
    },
    updateBudget (project, value, resources) {
      dispatch(setResources(resources))
      dispatch(setBudget(project, value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  toJS(AllocationControl)
)
