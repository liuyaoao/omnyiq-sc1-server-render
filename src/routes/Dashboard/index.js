import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'Dashboard',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const DashboardView = require('./containers/DashboardContainer').default
      const ReactTabBarReducer = require('../../reducers/ReactTabBar_reducer').default
      const CommonReducer = require('./../../reducers/Common_reducer').default
      // const DashboardReducer = require('../../reducers/Dashboard_reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBarReducer })
      injectReducer(store, { key: 'CommonReducer', reducer:CommonReducer })
      // injectReducer(store, { key: 'DashboardReducer', DashboardReducer })

      /*  Return getComponent   */
      cb(null, DashboardView)

    /* Webpack named bundle   */
    })
  }
})
