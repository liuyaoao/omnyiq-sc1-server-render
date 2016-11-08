import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

// Fix: "React-Redux: Combining reducers: Unexpected Keys"
// http://stackoverflow.com/a/33678198/789076
const initialReducers = {
  ReactTabBar: (state = require('../reducers/ReactTabBar_reducer').initialState) => state,
  LocationsReducer: (state = require('../reducers/Locations_reducer').initialState) => state,
  SpeedsReducer: (state = require('../reducers/Speeds_reducer').initialState) => state,
  WiFiInsightReducer: (state = require('../reducers/WiFiInsight_reducer').initialState) => state,
  RouterConditionsReducer: (state = require('../reducers/RouterConditions_reducer').initialState) => state
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    ...initialReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
