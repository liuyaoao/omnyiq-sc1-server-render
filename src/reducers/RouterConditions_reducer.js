import { combineReducers } from 'redux'
import {
    ROUTERCONDITIOINS_CURRENT_TAB_INDEX,
    ROUTERCONDITIOINS_CURRENT_TAB_KEY,
    ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES
  } from '../actions/routerConditions_action'

function curTabIndex(state = 0, action) {
  switch (action.type) {
    case ROUTERCONDITIOINS_CURRENT_TAB_INDEX:
      return action.curTabIndex;
    default:
      return state;
  }
}
function curTabKey(state = 'status', action) {
  switch (action.type) {
    case ROUTERCONDITIOINS_CURRENT_TAB_KEY:
      return action.curTabKey;
    default:
      return state;
  }
}
function tab2TimeTypes(state = {'status':'24H','update':'24H','reboot':'24H'}, action) {
  switch (action.type) {
    case ROUTERCONDITIOINS_TAB_TWO_TIMENODE_TYPES:
      return action.tab2TimeTypes;
    default:
      return state;
  }
}
const RouterConditionsReducer = combineReducers({
  curTabIndex,
  curTabKey,
  tab2TimeTypes
})
export default RouterConditionsReducer;
