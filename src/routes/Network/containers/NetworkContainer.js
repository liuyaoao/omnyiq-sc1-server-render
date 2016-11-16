import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow,setScreenHeight } from './../../../reducers/ReactTabBar_reducer'
import { setNetworkData } from './../../../reducers/Common_reducer'

import NetworkView from '../components/NetworkView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setScreenHeight,
  setNetworkData
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  screenHeight: state.ReactTabBar.screenHeight,
  networkData: state.CommonReducer.networkData
})

export default connect(mapStateToProps, mapDispatchtoProps)(NetworkView)
