import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow,setScreenHeight } from './../../../reducers/ReactTabBar_reducer'
import { setRoutersData } from './../../../reducers/Common_reducer'
// import {  } from './../../../reducers/Dashboard_reducer'

import DashboardView from '../components/DashboardView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setRoutersData,
  setScreenHeight
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  screenHeight: state.ReactTabBar.screenHeight,
  routersData: state.CommonReducer.routersData,
})

export default connect(mapStateToProps, mapDispatchtoProps)(DashboardView)
