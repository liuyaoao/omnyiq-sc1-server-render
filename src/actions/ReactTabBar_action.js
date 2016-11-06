export const SET_TABBAR_STATE = 'SET_TABBAR_STATE';//底部导航的选中状态
export const SET_TABBAR_IS_SHOW = 'SET_TABBAR_IS_SHOW';//底部导航is show or not
export const SET_SCREEN_CLIENT_HEIGHT = 'SET_SCREEN_CLIENT_HEIGHT';//浏览器可视区域的高度。

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

export function setClientHeight(clientHeight) {
  return {
    type: SET_SCREEN_CLIENT_HEIGHT,
    clientHeight
  }
}
