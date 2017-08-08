import * as fromProject from './project'

export const getProject = state => state.get('project')
export const getProjectId = state =>
  fromProject.getProjectId(state.get('project'))
export const getProjectResources = state =>
  fromProject.getProjectResources(state.get('project'))
export const getProjectBudget = state =>
  fromProject.getProjectBudget(state.get('project'))

export const getValue = state => state.get('value')
