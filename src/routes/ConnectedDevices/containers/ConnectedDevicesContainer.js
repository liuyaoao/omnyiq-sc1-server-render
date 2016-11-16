import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow,setScreenHeight } from './../../../reducers/ReactTabBar_reducer'
import { setDevicesData } from './../../../reducers/Common_reducer'
// import { setCurTabIndex, setCurTabKey } from './../../../reducers/ConnectedDevices_reducer'

import ConnectedDevicesView from '../components/ConnectedDevicesView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setScreenHeight,
  setDevicesData
  // setCurTabIndex,
  // setCurTabKey
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  screenHeight: state.ReactTabBar.screenHeight,
  devicesData: state.CommonReducer.devicesData
  // curTabKey: state.LocationsReducer.curTabKey
})

export default connect(mapStateToProps, mapDispatchtoProps)(ConnectedDevicesView)
