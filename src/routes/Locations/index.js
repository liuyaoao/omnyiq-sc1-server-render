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
      // will use reducer
      const CommonReducer = require('./../../reducers/Common_reducer').default
      const ReactTabBarReducer = require('./../../reducers/ReactTabBar_reducer').default
      const LocationsReducer = require('./../../reducers/Locations_reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'CommonReducer', reducer:CommonReducer })
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBarReducer })
      injectReducer(store, { key: 'LocationsReducer', reducer:LocationsReducer })

      /*  Return getComponent   */
      cb(null, LocationsView)

    /* Webpack named bundle   */
    })
  }
})
