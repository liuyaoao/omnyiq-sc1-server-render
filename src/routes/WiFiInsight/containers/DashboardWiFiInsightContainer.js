import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'
import { setCurTabIndex, setCurTabKey,setSignalType,setTab2TimeTypes,setCurTimeNodes } from './../../../reducers/WiFiInsight_reducer'

import DashboardWiFiInsightView from '../components/DashboardWiFiInsightView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setCurTabIndex,
  setCurTabKey,
  setSignalType,
  setTab2TimeTypes,
  setCurTimeNodes
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  curTabIndex: state.WiFiInsightReducer.curTabIndex,
  curTabKey: state.WiFiInsightReducer.curTabKey,
  signalType:state.WiFiInsightReducer.signalType,
  tab2TimeTypes:state.WiFiInsightReducer.tab2TimeTypes,
  curTimeNodes:state.WiFiInsightReducer.curTimeNodes
})

export default connect(mapStateToProps, mapDispatchtoProps)(DashboardWiFiInsightView)
