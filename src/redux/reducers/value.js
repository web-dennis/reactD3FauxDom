import { SET_VALUE } from 'redux/constants'

const setValue = (state, action) => {
  return action.value
}

const valueReducer = (state, action) => {
  switch (action.type) {
    case SET_VALUE:
      return setValue(state, action)
    default:
      return state
  }
}
export default valueReducer
