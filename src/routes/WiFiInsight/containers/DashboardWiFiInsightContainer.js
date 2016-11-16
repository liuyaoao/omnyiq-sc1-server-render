import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow,setScreenHeight } from './../../../reducers/ReactTabBar_reducer'
import { setCurTabIndex, setCurTabKey,setSignalType,setTab2TimeTypes,setCurTimeNodes } from './../../../reducers/WiFiInsight_reducer'
import { setWiFiInsightData } from './../../../reducers/Common_reducer'

import DashboardWiFiInsightView from '../components/DashboardWiFiInsightView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setScreenHeight,
  setCurTabIndex,
  setCurTabKey,
  setSignalType,
  setTab2TimeTypes,
  setCurTimeNodes,
  setWiFiInsightData
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  screenHeight: state.ReactTabBar.screenHeight,
  curTabIndex: state.WiFiInsightReducer.curTabIndex,
  curTabKey: state.WiFiInsightReducer.curTabKey,
  signalType:state.WiFiInsightReducer.signalType,
  tab2TimeTypes:state.WiFiInsightReducer.tab2TimeTypes,
  curTimeNodes:state.WiFiInsightReducer.curTimeNodes,
  wiFiInsightData:state.CommonReducer.wiFiInsightData
})

export default connect(mapStateToProps, mapDispatchtoProps)(DashboardWiFiInsightView)
