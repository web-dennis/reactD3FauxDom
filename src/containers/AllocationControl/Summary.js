import { connect } from 'react-redux'
import Summary from 'components/AllocationControl/Summary'
import { setResources } from 'redux/actions'
import {
  getProjectBudget,
  getProjectResources,
  getProjectId
} from 'redux/selectors'
import toJS from '../../hocs/toJS'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    projectId: getProjectId(state),
    resources: getProjectResources(state),
    total_budget: getProjectBudget(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateResources (resources) {
    dispatch(setResources(resources))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Summary))
