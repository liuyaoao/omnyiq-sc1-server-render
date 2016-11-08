import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'Settings/ContactUs',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SettingsContactUsView = require('./containers/SettingsContactUsContainer').default
      const ReactTabBarReducer = require('./../../reducers/ReactTabBar_reducer').default

      /*  Add the reducer to the store on key 'xxxx'  */
      injectReducer(store, { key: 'ReactTabBar', reducer:ReactTabBarReducer })

      /*  Return getComponent   */
      cb(null, SettingsContactUsView)

    /* Webpack named bundle   */
    })
  }
})
