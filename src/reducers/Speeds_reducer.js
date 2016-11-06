import { combineReducers } from 'redux'
import {
        // SPEEDS_SIGNAL_FREQUENCY_TYPE,
        SPEEDS_CURRENT_TAB_INDEX,
        SPEEDS_CURRENT_TAB_KEY,
        // SPEEDS_CURRENT_TIMENODES,
        SPEEDS_CURRENT_TIMENODE_TYPES
} from '../actions/speeds_action'

// function signalType(state = '2.4', action) {
//   switch (action.type) {
//     case SPEEDS_SIGNAL_FREQUENCY_TYPE:
//       return action.signalType;
//     default:
//       return state;
//   }
// }
function curTabIndex(state = 0, action) {
  switch (action.type) {
    case SPEEDS_CURRENT_TAB_INDEX:
      return action.curTabIndex;
    default:
      return state;
  }
}
function curTabKey(state = 'wifiScan', action) { //当前tab的key值，值可为：'download','upload','dl_ul'
  switch (action.type) {
    case SPEEDS_CURRENT_TAB_KEY:
      return action.curTabKey;
    default:
      return state;
  }
}
// function curTimeNodes(state = {'download':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0},'upload':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0}}, action) {  //所有Tab标签下所有时间点类型的当前时间点值
//   switch (action.type) {
//     case SPEEDS_CURRENT_TIMENODES:
//       return action.curTimeNodes; //是个object对象,结构为：{'wifiScan':{'24H':0,'72H':0},'capacity':{'24H':0,'72H':0}}；
//     default:
//       return state;
//   }
// }
function curTimeNodeTypes(state ={'download':'24H','upload':'24H','dl_ul':'24H'} , action) { //当前时间点的类型
  switch (action.type) {
    case SPEEDS_CURRENT_TIMENODE_TYPES:
      return action.curTimeNodeTypes;
    default:
      return state;
  }
}
const SpeedsReducer = combineReducers({
  // signalType,
  curTabIndex,
  curTabKey,
  // curTimeNodes,
  curTimeNodeTypes
})
export default SpeedsReducer;
