const SET_DASHBOARD_CURRENT_TAB_INDEX = 'SET_DASHBOARD_CURRENT_TAB_INDEX' //当前的tab标签页的序号。

export function setCurTabIndex(curTabIndex) {
    return {
        type: SET_DASHBOARD_CURRENT_TAB_INDEX,
        curTabIndex
    }
}

export const actions = {
  setCurTabIndex
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_DASHBOARD_CURRENT_TAB_INDEX]: (state,action) => {
    return ({...state, curTabIndex: action.curTabIndex})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  curTabIndex: 0
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
