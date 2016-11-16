// import { combineReducers } from 'redux'
// import {SET_TABBAR_STATE,SET_TABBAR_IS_SHOW,SET_SCREEN_CLIENT_HEIGHT} from '../actions/ReactTabBar_action'
//==============================
//  actioin
//==============================
export const SET_TABBAR_STATE = 'SET_TABBAR_STATE';//底部导航的选中状态
export const SET_TABBAR_IS_SHOW = 'SET_TABBAR_IS_SHOW';//底部导航is show or not
export const SET_SCREEN_CLIENT_HEIGHT = 'SET_SCREEN_CLIENT_HEIGHT';//设置屏幕当前可视高度

export function setTabBarState(tabBarState) {
    return {
        type: SET_TABBAR_STATE,
        tabBarState
    }
}
export function setTabBarIsShow(tabBarIsShow) {
    return {
        type: SET_TABBAR_IS_SHOW,
        tabBarIsShow
    }
}
export function setScreenHeight(screenHeight) {
    return {
        type: SET_SCREEN_CLIENT_HEIGHT,
        screenHeight
    }
}

export const actions = {
  setTabBarState,
  setTabBarIsShow,
  setScreenHeight
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TABBAR_STATE]: (state,action) => {
    return ({...state, tabBarState: action.tabBarState})
  },
  [SET_TABBAR_IS_SHOW]: (state,action) => {
    return ({...state, tabBarIsShow: action.tabBarIsShow})
  },
  [SET_SCREEN_CLIENT_HEIGHT]: (state,action) => {
    return ({...state, screenHeight: action.screenHeight})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  tabBarState: '/Locations',
  tabBarIsShow: true,
  screenHeight:480
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
