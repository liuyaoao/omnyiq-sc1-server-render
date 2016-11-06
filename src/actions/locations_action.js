export const LOCATIONS_CURRENT_TAB_INDEX = 'LOCATIONS_CURRENT_TAB_INDEX';//当前的tab标签页的序号。
export const LOCATIONS_CURRENT_TAB_KEY = 'LOCATIONS_CURRENT_TAB_KEY';//当前的tab标签页的key值。

// export function setSignalType(signalType) {
//     return {
//         type: SPEEDS_SIGNAL_FREQUENCY_TYPE,
//         signalType
//     }
// }
export function setCurTabIndex(curTabIndex) {
    return {
        type: LOCATIONS_CURRENT_TAB_INDEX,
        curTabIndex
    }
}
export function setCurTabKey(curTabKey) {
    return {
        type: LOCATIONS_CURRENT_TAB_KEY,
        curTabKey
    }
}
// export function setCurTimeNodes(curTimeNodes) {
//     return {
//         type: SPEEDS_CURRENT_TIMENODES,
//         curTimeNodes
//     }
// }
