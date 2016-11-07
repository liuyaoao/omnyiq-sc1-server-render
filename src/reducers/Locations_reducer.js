const SET_LOCATIONS_CURRENT_TAB_INDEX = 'SET_LOCATIONS_CURRENT_TAB_INDEX' //当前的tab标签页的序号。
const SET_LOCATIONS_CURRENT_TAB_KEY = 'SET_LOCATIONS_CURRENT_TAB_KEY' //当前的tab标签页的key值。

// export function setSignalType(signalType) {
//     return {
//         type: SPEEDS_SIGNAL_FREQUENCY_TYPE,
//         signalType
//     }
// }
export function setCurTabIndex(curTabIndex) {
    return {
        type: SET_LOCATIONS_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: SET_LOCATIONS_CURRENT_TAB_KEY,
        curTabKey
    }
}
// export function setCurTimeNodes(curTimeNodes) {
//     return {
//         type: SPEEDS_CURRENT_TIMENODES,
//         curTimeNodes
//     }
// }

export const actions = {
  setCurTabIndex,
  setCurTabKey
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_LOCATIONS_CURRENT_TAB_INDEX]: (state,action) => {
    return ({...state, curTabIndex: action.curTabIndex})
  },
  [SET_LOCATIONS_CURRENT_TAB_KEY]: (state,action) => {
    return ({...state, curTabKey: action.curTabKey})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  curTabIndex: 0,
  curTabKey: 'myLocations'
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
