export const ROUTERCONDITIOINS_CURRENT_TAB_INDEX = 'ROUTERCONDITIOINS_CURRENT_TAB_INDEX';//当前的tab标签页的序号。
export const ROUTERCONDITIOINS_CURRENT_TAB_KEY = 'ROUTERCONDITIOINS_CURRENT_TAB_KEY';//当前的tab标签页的key值。
export const ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES = 'ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES';//各个tab标签页对应的时间类型。

export function setCurTabIndex(curTabIndex) {
    return {
        type: ROUTERCONDITIOINS_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: ROUTERCONDITIOINS_CURRENT_TAB_KEY,
        curTabKey
    }
}
export function setTab2TimeTypes(tab2TimeTypes) {
    return {
        type: ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES,
        tab2TimeTypes
    }
}
