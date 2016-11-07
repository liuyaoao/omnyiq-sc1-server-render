import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'Locations',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LocationsView = require('./containers/LocationsContainer').default
      const ReactTabBarReducer = require('./../../reducers/ReactTabBar_reducer').default
      const WifiInsightReducer = require('./../../reducers/WifiInsight_reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBarReducer })
      injectReducer(store, { key: 'WifiInsightReducer', reducer:WifiInsightReducer })

      /*  Return getComponent   */
      cb(null, LocationsView)

    /* Webpack named bundle   */
    })
  }
})
