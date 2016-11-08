// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Welcome from './Welcome'
import LocationsView from './Locations'
import Dashboard from './Dashboard'
import Community from './Community'
import Network from './Network'
import Settings from './Settings'
import Speeds from './Speeds'
import WiFiInsight from './WiFiInsight'
import ConnectedDevices from './ConnectedDevices'
import RouterConditions from './RouterConditions'
import SettingsPost from './SettingsPost'
import SettingsDiagnostics from './SettingsDiagnostics'
import SettingsContactUs from './SettingsContactUs'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Welcome(store),
  childRoutes: [
    LocationsView(store),
    Dashboard(store),
    Community(store),
    Network(store),
    Settings(store),
    Speeds(store),
    WiFiInsight(store),
    ConnectedDevices(store),
    RouterConditions(store),
    SettingsPost(store),
    SettingsDiagnostics(store),
    SettingsContactUs(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
