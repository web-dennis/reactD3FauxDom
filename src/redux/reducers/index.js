import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import project from './project'
import value from './value'

import data from '../../utils/data'

export const initialState = fromJS({
  project: data.projects[0],
  value: 50
})

const rootReducer = combineReducers({ project, value }, initialState)

export default rootReducer
