import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'
import { setCurTabIndex, setCurTabKey,setTab2TimeTypes } from './../../../reducers/RouterConditions_reducer'

import RouterConditionsView from '../components/RouterConditionsView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setCurTabIndex,
  setCurTabKey,
  setTab2TimeTypes
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  curTabIndex: state.RouterConditionsReducer.curTabIndex,
  curTabKey: state.RouterConditionsReducer.curTabKey,
  tab2TimeTypes:state.RouterConditionsReducer.curTabKey
})

export default connect(mapStateToProps, mapDispatchtoProps)(RouterConditionsView)
