import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'
import { setNetworkData } from './../../../reducers/Common_reducer'

import NetworkView from '../components/NetworkView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setNetworkData
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  networkData: state.CommonReducer.networkData
})

export default connect(mapStateToProps, mapDispatchtoProps)(NetworkView)
