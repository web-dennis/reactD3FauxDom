import { connect } from 'react-redux'
import Header from 'components/AllocationControl/Header'
import { getProjectBudget } from 'redux/selectors'
import toJS from '../../hocs/toJS'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    totalBudget: getProjectBudget(state)
  }
}

export default connect(mapStateToProps)(toJS(Header))
