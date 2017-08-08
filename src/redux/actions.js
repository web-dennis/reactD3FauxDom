import {
  SET_VALUE,
  SET_RESOURCE,
  SET_RESOURCES,
  SET_BUDGET,
  TOGGLE_RESOURCE_LOCKED
} from 'redux/constants'

export const setValue = value => ({
  type: SET_VALUE,
  value
})

export const setResourceValue = (project, resourceLabel, value) => ({
  type: SET_RESOURCE,
  project,
  resourceLabel,
  value
})

export const setBudget = (project, value) => {
  return {
    type: SET_BUDGET,
    project,
    value
  }
}

export const toggleResourceLocked = resourceLabel => ({
  type: TOGGLE_RESOURCE_LOCKED,
  resourceLabel
})

export const setResources = resources => ({
  type: SET_RESOURCES,
  resources
})
