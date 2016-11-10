// const SET_LOCATIONS_CURRENT_TAB_INDEX = 'SET_LOCATIONS_CURRENT_TAB_INDEX' //当前的tab标签页的序号。
// const SET_LOCATIONS_CURRENT_TAB_KEY = 'SET_LOCATIONS_CURRENT_TAB_KEY' //当前的tab标签页的key值。
const SET_LOCATIONS_ROUTERS_DATA = 'SET_LOCATIONS_ROUTERS_DATA' //router list data
const SET_DASHBOARD_SERVER_DATA = 'SET_DASHBOARD_SERVER_DATA'
const SET_CONNECTED_DEVICES_DATA = 'SET_CONNECTED_DEVICES_DATA'  //连接的设备数据
const SET_ROUTER_CONDITIONS_DATA = 'SET_ROUTER_CONDITIONS_DATA'  //服务端的路由器的详细情况的数据
const SET_ROUTER_SPEEDS_DATA = 'SET_ROUTER_SPEEDS_DATA'  //服务端的路由器下载上传数据
const SET_WIFIINSIGHT_DATA = 'SET_WIFIINSIGHT_DATA' // 服务器端的WiFiInsight的数据
const SET_NETWORK_DATA = 'SET_NETWORK_DATA' // 服务器端的WiFiInsight的数据

export function setDashboardData(dashboardData) {
    return {
        type: SET_DASHBOARD_SERVER_DATA,
        dashboardData
    }
}
export function setRoutersData(routersData) {
    return {
        type: SET_LOCATIONS_ROUTERS_DATA,
        routersData
    }
}
export function setDevicesData(routersData) {
    return {
        type: SET_CONNECTED_DEVICES_DATA,
        routersData
    }
}
export function setRouterConditionsData(routerConditionsData) {
    return {
        type: SET_ROUTER_CONDITIONS_DATA,
        routerConditionsData
    }
}

export function setRouterSpeedsData(routerSpeedsData) {
    return {
        type: SET_ROUTER_SPEEDS_DATA,
        routerSpeedsData
    }
}
export function setWiFiInsightData(wiFiInsightData) {
    return {
        type: SET_WIFIINSIGHT_DATA,
        wiFiInsightData
    }
}
export function setNetworkData(networkData) {
    return {
        type: SET_NETWORK_DATA,
        networkData
    }
}

export const actions = {
  setDashboardData,
  setRoutersData,
  setDevicesData,
  setRouterConditionsData,
  setRouterSpeedsData,
  setWiFiInsightData,
  setNetworkData
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_DASHBOARD_SERVER_DATA]: (state,action) => {
    return ({...state, dashboardData: action.dashboardData})
  },
  [SET_LOCATIONS_ROUTERS_DATA]: (state,action) => {
    return ({...state, routersData: action.routersData})
  },
  [SET_CONNECTED_DEVICES_DATA]: (state,action) => {
    return ({...state, devicesData: action.devicesData})
  },
  [SET_ROUTER_CONDITIONS_DATA]: (state,action) => {
    return ({...state, routerConditionsData: action.routerConditionsData})
  },
  [SET_ROUTER_SPEEDS_DATA]: (state,action) => {
    return ({...state, routerSpeedsData: action.routerSpeedsData})
  },
  [SET_WIFIINSIGHT_DATA]: (state,action) => {
    return ({...state, wiFiInsightData: action.wiFiInsightData})
  },
  [SET_NETWORK_DATA]: (state,action) => {
    return ({...state, networkData: action.networkData})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  dashboardData:{},
  routersData:{},
  routersOnlineStatus:{},
  devicesData:{},
  routerConditionsData:{},
  routerSpeedsData:{},
  wiFiInsightData:{},
  networkData:{}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
