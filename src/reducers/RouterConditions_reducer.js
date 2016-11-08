export const SET_ROUTERCONDITIOINS_CURRENT_TAB_INDEX = 'SET_ROUTERCONDITIOINS_CURRENT_TAB_INDEX';//当前的tab标签页的序号。
export const SET_ROUTERCONDITIOINS_CURRENT_TAB_KEY = 'SET_ROUTERCONDITIOINS_CURRENT_TAB_KEY';//当前的tab标签页的key值。
export const SET_ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES = 'SET_ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES';//各个tab要显示数据的时间点的类型24H/72H/1W....

export function setCurTabIndex(curTabIndex) {
    return {
        type: SET_ROUTERCONDITIOINS_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: SET_ROUTERCONDITIOINS_CURRENT_TAB_KEY,
        curTabKey
    }
}
export function setTab2TimeTypes(tab2TimeTypes) {
    return {
        type: SET_ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES,
        tab2TimeTypes
    }
}


export const actions = {
  setCurTabIndex,
  setCurTabKey,
  setTab2TimeTypes
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ROUTERCONDITIOINS_CURRENT_TAB_INDEX]: (state,action) => {
    return ({...state, curTabIndex: action.curTabIndex})
  },
  [SET_ROUTERCONDITIOINS_CURRENT_TAB_KEY]: (state,action) => {
    return ({...state, curTabKey: action.curTabKey})
  },
  [SET_ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES]: (state,action) => {
    return ({...state, tab2TimeTypes: action.tab2TimeTypes})
  }
}
//=======================
//  reducer
//========================
export const initialState = {
  curTabIndex: 0,
  curTabKey: 'status',  //当前tab的key值，值可为：'status','update', 'reboot'
  tab2TimeTypes:{'status':'24H','update':'24H','reboot':'24H'}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
