import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'

import SettingsPostView from '../components/SettingsPostView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow
})

export default connect(mapStateToProps, mapDispatchtoProps)(SettingsPostView)
