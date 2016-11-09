import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'
import { setCurTabIndex, setCurTabKey } from './../../../reducers/Locations_reducer'
import { setRoutersData } from './../../../reducers/Common_reducer'

import LocationsView from '../components/LocationsView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setCurTabIndex,
  setCurTabKey,
  setRoutersData
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  curTabIndex: state.LocationsReducer.curTabIndex,
  curTabKey: state.LocationsReducer.curTabKey,
  routersData: state.CommonReducer.routersData,
  routersOnlineStatus:state.CommonReducer.routersOnlineStatus
})

export default connect(mapStateToProps, mapDispatchtoProps)(LocationsView)
