// const SET_LOCATIONS_CURRENT_TAB_INDEX = 'SET_LOCATIONS_CURRENT_TAB_INDEX' //当前的tab标签页的序号。
// const SET_LOCATIONS_CURRENT_TAB_KEY = 'SET_LOCATIONS_CURRENT_TAB_KEY' //当前的tab标签页的key值。
const SET_LOCATIONS_ROUTERS_DATA = 'SET_LOCATIONS_ROUTERS_DATA' //router list data
const SET_DASHBOARD_SERVER_DATA = 'SET_DASHBOARD_SERVER_DATA'

export function setDashboardData(dashboardData) {
    return {
        type: SET_DASHBOARD_SERVER_DATA,
        dashboardData
    }
}
// export function setCurTabIndex(curTabIndex) {
//     return {
//         type: SET_LOCATIONS_CURRENT_TAB_INDEX,
//         curTabIndex
//     }
// }
// export function setCurTabKey(curTabKey) {
//     return {
//         type: SET_LOCATIONS_CURRENT_TAB_KEY,
//         curTabKey
//     }
// }
export function setRoutersData(routersData) {
    return {
        type: SET_LOCATIONS_ROUTERS_DATA,
        routersData
    }
}
export const actions = {
  setDashboardData,
  // setCurTabKey,
  setRoutersData
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_DASHBOARD_SERVER_DATA]: (state,action) => {
    return ({...state, dashboardData: action.dashboardData})
  },
  // [SET_LOCATIONS_CURRENT_TAB_KEY]: (state,action) => {
  //   return ({...state, curTabKey: action.curTabKey})
  // },
  [SET_LOCATIONS_ROUTERS_DATA]: (state,action) => {
    return ({...state, routersData: action.routersData})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  dashboardData:{},
  routersData:{},
  routersOnlineStatus:{}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
