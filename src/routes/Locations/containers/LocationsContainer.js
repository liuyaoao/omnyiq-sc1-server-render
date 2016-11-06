import { connect } from 'react-redux'
import { setTabBarState } from './../../Welcome/modules/ReactTabBar_reducer'
import { setCurTabIndex, setCurTabKey } from './../modules/Locations_reducer'

import LocationsView from '../components/LocationsView'

const mapDispatchtoProps = {
  setTabBarState,
  setCurTabIndex,
  setCurTabKey
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  curTabIndex: state.LocationsReducer.curTabIndex,
  curTabKey: state.LocationsReducer.curTabKey
})

export default connect(mapStateToProps, mapDispatchtoProps)(LocationsView)
