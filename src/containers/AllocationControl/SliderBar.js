import { connect } from 'react-redux'
import SliderBar from '../../components/AllocationControl/SliderBar.js'
import {
  setResourceValue,
  setResources,
  toggleResourceLocked
} from 'redux/actions'
import { getProjectBudget } from 'redux/selectors'
import toJS from '../../hocs/toJS'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps.resource,
    ...ownProps.resources,
    total_budget: getProjectBudget(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateValue (project, resource, value) {
    dispatch(setResourceValue(project, resource, value))
  },
  toggleLocked (project, resource) {
    dispatch(toggleResourceLocked(project, resource))
  },
  updateResources (resources) {
    dispatch(setResources(resources))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SliderBar))
