const SET_SPEEDS_CURRENT_TAB_INDEX = 'SET_SPEEDS_CURRENT_TAB_INDEX' //当前的tab标签页的序号。
const SET_SPEEDS_CURRENT_TAB_KEY = 'SET_SPEEDS_CURRENT_TAB_KEY' //当前的tab标签页的key值。
const SET_SPEEDS_CURRENT_TIMENODE_TYPES = 'SET_SPEEDS_CURRENT_TIMENODE_TYPES';//当前的所选的要显示数据的时间点的类型24H,72H,1W。

export function setCurTabIndex(curTabIndex) {
    return {
        type: SET_SPEEDS_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: SET_SPEEDS_CURRENT_TAB_KEY,
        curTabKey
    }
}
export function setCurTimeNodeTypes(curTimeNodeTypes) {//object,哪个tab对应哪个时间类型。
    return {
        type: SET_SPEEDS_CURRENT_TIMENODE_TYPES,
        curTimeNodeTypes
    }
}


export const actions = {
  setCurTabIndex,
  setCurTabKey,
  setCurTimeNodeTypes
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SPEEDS_CURRENT_TAB_INDEX]: (state,action) => {
    return ({...state, curTabIndex: action.curTabIndex})
  },
  [SET_SPEEDS_CURRENT_TAB_KEY]: (state,action) => {
    return ({...state, curTabKey: action.curTabKey})
  },
  [SET_SPEEDS_CURRENT_TIMENODE_TYPES]: (state,action) => {
    return ({...state, curTimeNodeTypes: action.curTimeNodeTypes})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  curTabIndex: 0,
  curTabKey: 'dl_ul',  //当前tab的key值，值可为：'dl_ul','download','upload'
  curTimeNodeTypes:{'dl_ul':'24H','download':'24H','upload':'24H'}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
