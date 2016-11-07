import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'
import { setCurTabIndex, setCurTabKey,setCurTimeNodeTypes } from './../../../reducers/Speeds_reducer'

import DashboardSpeedsView from '../components/DashboardSpeedsView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setCurTabIndex,
  setCurTabKey,
  setCurTimeNodeTypes
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  curTabIndex: state.SpeedsReducer.curTabIndex,
  curTabKey: state.SpeedsReducer.curTabKey,
  curTimeNodeTypes: state.SpeedsReducer.curTimeNodeTypes
})

export default connect(mapStateToProps, mapDispatchtoProps)(DashboardSpeedsView)
