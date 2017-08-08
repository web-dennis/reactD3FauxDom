import { createSelector } from 'reselect'

const getProject = state => state

export const getProjectId = createSelector(getProject, project => {
  return project.get('title')
})

export const getProjectResources = createSelector(getProject, project => {
  return project.get('resources')
})

export const getProjectBudget = createSelector(getProject, project => {
  return project.get('total_budget')
})
