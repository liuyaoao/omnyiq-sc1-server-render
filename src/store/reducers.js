import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

// Fix: "React-Redux: Combining reducers: Unexpected Keys"
// http://stackoverflow.com/a/33678198/789076
const initialReducers = {
  counter: (state = 0) => state,
  zen: (state = require('../routes/Zen/modules/zen').initialState) => state,
  ReactTabBar: (state = require('../routes/Welcome/modules/ReactTabBar_reducer').initialState) => state,
  LocationsReducer: (state = require('../routes/Locations/modules/Locations_reducer').initialState) => state
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
