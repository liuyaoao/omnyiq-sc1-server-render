import { connect } from 'react-redux'
import { setTabBarState } from './../../../reducers/ReactTabBar_reducer'
// import {  } from './../../../reducers/Dashboard_reducer'

import DashboardView from '../components/DashboardView'

const mapDispatchtoProps = {
  setTabBarState
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState
})

export default connect(mapStateToProps, mapDispatchtoProps)(DashboardView)
