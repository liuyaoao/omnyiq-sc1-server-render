export const SET_WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE = 'SET_WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE';//当前的信号GHz频率类型。
export const SET_WIFIINSIGHT_CURRENT_TAB_INDEX = 'SET_WIFIINSIGHT_CURRENT_TAB_INDEX';//当前的tab标签页的序号。
export const SET_WIFIINSIGHT_CURRENT_TAB_KEY = 'SET_WIFIINSIGHT_CURRENT_TAB_KEY';//当前的tab标签页的key值。
export const SET_WIFIINSIGHT_CURRENT_TIMENODES = 'SET_WIFIINSIGHT_CURRENT_TIMENODES';//当前的所选的要显示数据的时间点。
export const SET_WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES = 'SET_WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES';//各个tab要显示数据的时间点的类型24H/72H/1W....

export function setSignalType(signalType) {
    return {
        type: SET_WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE,
        signalType
    }
}
export function setCurTabIndex(curTabIndex) {
    return {
        type: SET_WIFIINSIGHT_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: SET_WIFIINSIGHT_CURRENT_TAB_KEY,
        curTabKey
    }
}
export function setCurTimeNodes(curTimeNodes) {
    return {
        type: SET_WIFIINSIGHT_CURRENT_TIMENODES,
        curTimeNodes
    }
}
export function setTab2TimeTypes(tab2TimeTypes) {
    return {
        type: SET_WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES,
        tab2TimeTypes
    }
}


export const actions = {
  setSignalType,
  setCurTabIndex,
  setCurTabKey,
  setCurTimeNodes,
  setTab2TimeTypes
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE]: (state,action) => {
    return ({...state, signalType: action.signalType})
  },
  [SET_WIFIINSIGHT_CURRENT_TAB_INDEX]: (state,action) => {
    return ({...state, curTabIndex: action.curTabIndex})
  },
  [SET_WIFIINSIGHT_CURRENT_TAB_KEY]: (state,action) => {
    return ({...state, curTabKey: action.curTabKey})
  },
  [SET_WIFIINSIGHT_CURRENT_TIMENODES]: (state,action) => {
    return ({...state, curTimeNodes: action.curTimeNodes})
  },
  [SET_WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES]: (state,action) => {
    return ({...state, tab2TimeTypes: action.tab2TimeTypes})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  signalType:'2.4',
  curTabIndex: 0,
  curTabKey: 'wifiScan',  //当前tab的key值，值可为：'wifiScan','capacity', 'speeds'
  curTimeNodes:{'wifiScan':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0},'capacity':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0},'speeds':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0}},
  tab2TimeTypes:{'wifiScan':'24H','capacity':'24H','speeds':'24H'}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
