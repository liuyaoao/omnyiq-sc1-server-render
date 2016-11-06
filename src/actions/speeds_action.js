// export const SPEEDS_SIGNAL_FREQUENCY_TYPE = 'SPEEDS_SIGNAL_FREQUENCY_TYPE';//当前的信号GHz频率类型。
export const SPEEDS_CURRENT_TAB_INDEX = 'SPEEDS_CURRENT_TAB_INDEX';//当前的tab标签页的序号。
export const SPEEDS_CURRENT_TAB_KEY = 'SPEEDS_CURRENT_TAB_KEY';//当前的tab标签页的key值。
// export const SPEEDS_CURRENT_TIMENODES = 'SPEEDS_CURRENT_TIMENODES';//当前的所选的要显示数据的时间点。
export const SPEEDS_CURRENT_TIMENODE_TYPES = 'SPEEDS_CURRENT_TIMENODE_TYPES';//当前的所选的要显示数据的时间点的类型24H,72H,1W。

// export function setSignalType(signalType) {
//     return {
//         type: SPEEDS_SIGNAL_FREQUENCY_TYPE,
//         signalType
//     }
// }
export function setCurTabIndex(curTabIndex) {
    return {
        type: SPEEDS_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: SPEEDS_CURRENT_TAB_KEY,
        curTabKey
    }
}
// export function setCurTimeNodes(curTimeNodes) {
//     return {
//         type: SPEEDS_CURRENT_TIMENODES,
//         curTimeNodes
//     }
// }
export function setCurTimeNodeTypes(curTimeNodeTypes) {//object,哪个tab对应哪个时间类型。
    return {
        type: SPEEDS_CURRENT_TIMENODE_TYPES,
        curTimeNodeTypes
    }
}
