import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'Community',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CommunityView = require('./containers/CommunityContainer').default
      const ReactTabBar = require('./../../reducers/ReactTabBar_reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBar })

      /*  Return getComponent   */
      cb(null, CommunityView)

    /* Webpack named bundle   */
  })
  }
})
