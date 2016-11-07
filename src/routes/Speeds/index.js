import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'Dashboard/Speeds',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const DashboardSpeedsView = require('./containers/DashboardSpeedsContainer').default
      const ReactTabBarReducer = require('./../../reducers/ReactTabBar_reducer').default
      const SpeedsReducer = require('./../../reducers/Speeds_reducer').default

      /*  Add the reducer to the store on key 'xxx'  */
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBarReducer })
      injectReducer(store, { key: 'SpeedsReducer', reducer:SpeedsReducer })

      /*  Return getComponent   */
      cb(null, DashboardSpeedsView)

    /* Webpack named bundle   */
    })
  }
})
