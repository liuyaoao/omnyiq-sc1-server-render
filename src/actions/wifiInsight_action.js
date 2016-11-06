export const WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE = 'WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE';//当前的信号GHz频率类型。
export const WIFIINSIGHT_CURRENT_TAB_INDEX = 'WIFIINSIGHT_CURRENT_TAB_INDEX';//当前的tab标签页的序号。
export const WIFIINSIGHT_CURRENT_TAB_KEY = 'WIFIINSIGHT_CURRENT_TAB_KEY';//当前的tab标签页的key值。
export const WIFIINSIGHT_CURRENT_TIMENODES = 'WIFIINSIGHT_CURRENT_TIMENODES';//当前的所选的要显示数据的时间点。
export const WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES = 'WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES';//各个tab要显示数据的时间点的类型24H/72H/1W....

export function setSignalType(signalType) {
    return {
        type: WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE,
        signalType
    }
}
export function setCurTabIndex(curTabIndex) {
    return {
        type: WIFIINSIGHT_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: WIFIINSIGHT_CURRENT_TAB_KEY,
        curTabKey
    }
}
export function setCurTimeNodes(curTimeNodes) {
    return {
        type: WIFIINSIGHT_CURRENT_TIMENODES,
        curTimeNodes
    }
}
export function setTab2TimeTypes(tab2TimeTypes) {
    return {
        type: WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES,
        tab2TimeTypes
    }
}
