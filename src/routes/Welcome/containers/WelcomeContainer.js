import { connect } from 'react-redux'
import { setTabBarState,setTabBarIsShow,setScreenHeight } from './../../../reducers/ReactTabBar_reducer'

import WelcomeView from '../components/WelcomeView'
//这个文件就是把reducer和组件绑定关联起来
const mapDispatchtoProps = {
  setTabBarState,
  setTabBarIsShow,
  setScreenHeight
}

const mapStateToProps = (state) => ({
  tabBarState: state.ReactTabBar.tabBarState,
  tabBarIsShow: state.ReactTabBar.tabBarIsShow,
  screenHeight: state.ReactTabBar.screenHeight
})

export default connect(mapStateToProps, mapDispatchtoProps)(WelcomeView)
