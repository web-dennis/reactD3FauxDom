import {
  SET_RESOURCE,
  SET_RESOURCES,
  SET_BUDGET,
  TOGGLE_RESOURCE_LOCKED
} from 'redux/constants'
import { Map, List } from 'immutable'

const setResourceValue = (state, action) => {
  return state.updateIn(['resources'], resources =>
    resources.map(
      resource =>
        resource.get('label') === action.resourceLabel
          ? resource.set('value', action.value)
          : resource
    )
  )
}

const toggleResourceLocked = (state, action) => {
  return state.updateIn(['resources'], resources => {
    return resources.map(resource => {
      return resource.get('label') === action.resourceLabel
        ? resource.set('locked', !resource.get('locked'))
        : resource
    })
  })
}

const setResources = (state, action) => {
  return state.updateIn(['resources'], resources => {
    return List(action.resources.map(res => Map(res)))
  })
}

const setBudget = (state, action) => {
  return state.set('total_budget', action.value)
}

const projectReducer = (state, action) => {
  switch (action.type) {
    case SET_RESOURCE:
      return setResourceValue(state, action)
    case SET_RESOURCES:
      return setResources(state, action)
    case SET_BUDGET:
      return setBudget(state, action)
    case TOGGLE_RESOURCE_LOCKED:
      return toggleResourceLocked(state, action)
    default:
      return state
  }
}

export default projectReducer
