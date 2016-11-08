import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'
// import { setCurTabIndex, setCurTabKey } from './../../../reducers/ConnectedDevices_reducer'

import ConnectedDevicesView from '../components/ConnectedDevicesView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow
  // setCurTabIndex,
  // setCurTabKey
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow
  // curTabIndex: state.LocationsReducer.curTabIndex,
  // curTabKey: state.LocationsReducer.curTabKey
})

export default connect(mapStateToProps, mapDispatchtoProps)(ConnectedDevicesView)
