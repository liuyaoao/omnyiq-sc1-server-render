import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'Dashboard/WiFiInsight',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const WiFiInsightView = require('./containers/DashboardWiFiInsightContainer').default
      const ReactTabBarReducer = require('./../../reducers/ReactTabBar_reducer').default
      const WiFiInsightReducer = require('./../../reducers/WiFiInsight_reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBarReducer })
      injectReducer(store, { key: 'WiFiInsightReducer', reducer:WiFiInsightReducer })

      /*  Return getComponent   */
      cb(null, WiFiInsightView)

    /* Webpack named bundle   */
    })
  }
})
