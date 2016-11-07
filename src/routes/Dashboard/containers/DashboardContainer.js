import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow, } from './../../../reducers/ReactTabBar_reducer'
// import {  } from './../../../reducers/Dashboard_reducer'

import DashboardView from '../components/DashboardView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow
})

export default connect(mapStateToProps, mapDispatchtoProps)(DashboardView)
