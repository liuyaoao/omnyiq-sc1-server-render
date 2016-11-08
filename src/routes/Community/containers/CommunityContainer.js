import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow } from './../../../reducers/ReactTabBar_reducer'

import CommunityView from '../components/CommunityView'

const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow
})

export default connect(mapStateToProps, mapDispatchtoProps)(CommunityView)
