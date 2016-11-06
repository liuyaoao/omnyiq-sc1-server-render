import { combineReducers } from 'redux'
import {WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE,
        WIFIINSIGHT_CURRENT_TAB_INDEX,
        WIFIINSIGHT_CURRENT_TAB_KEY,
        WIFIINSIGHT_CURRENT_TIMENODES,
        WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES
} from '../actions/wifiInsight_action'

function signalType(state = '2.4', action) {
  switch (action.type) {
    case WIFIINSIGHT_SIGNAL_FREQUENCY_TYPE:
      return action.signalType;
    default:
      return state;
  }
}
function curTabIndex(state = 0, action) {
  switch (action.type) {
    case WIFIINSIGHT_CURRENT_TAB_INDEX:
      return action.curTabIndex;
    default:
      return state;
  }
}
function curTabKey(state = 'wifiScan', action) { //当前tab的key值，值可为：'wifiScan','capacity', 'speeds'
  switch (action.type) {
    case WIFIINSIGHT_CURRENT_TAB_KEY:
      return action.curTabKey;
    default:
      return state;
  }
}
function curTimeNodes(state = {'wifiScan':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0},'capacity':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0},'speeds':{'24H':0,'72H':0,'1W':0,'1M':0,'3M':0,'1Y':0}}, action) {  //所有Tab标签下所有时间点类型的当前时间点值
  switch (action.type) {
    case WIFIINSIGHT_CURRENT_TIMENODES:
      return action.curTimeNodes; //是个object对象,结构为：{'wifiScan':{'24H':0,'72H':0},'capacity':{'24H':0,'72H':0}}；
    default:
      return state;
  }
}
function tab2TimeTypes(state ={'wifiScan':'24H','capacity':'24H','speeds':'24H'} , action) { //当前时间点的类型
  switch (action.type) {
    case WIFIINSIGHT_TAB_TWO_TIMENODE_TYPES:
      return action.tab2TimeTypes;
    default:
      return state;
  }
}
const WifiInsightReducer = combineReducers({
  signalType,
  curTabIndex,
  curTabKey,
  curTimeNodes,
  tab2TimeTypes
})
export default WifiInsightReducer;
