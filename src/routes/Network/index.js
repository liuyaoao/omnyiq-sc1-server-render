import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'Network',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const NetworkView = require('./containers/NetworkContainer').default
      const ReactTabBarReducer = require('./../../reducers/ReactTabBar_reducer').default

      /*  Add the reducer to the store on key 'xxx'  */
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBarReducer })

      /*  Return getComponent   */
      cb(null, NetworkView)

    /* Webpack named bundle   */
    })
  }
})
