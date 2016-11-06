import { combineReducers } from 'redux'
import {DEVICE_INFORMATION,DASHBOARD_SPEEDS,CONNECT_DIVICES} from '../actions/Dashboard_action'

function curDeviceInfo(state = {}, action) {
  switch (action.type) {
    case DEVICE_INFORMATION:
      return action.curDeviceInfo;
    default:
      return state;
  }
}

function dashboardSpeedsState(state = [],action){
  switch (action.type) {
    case DASHBOARD_SPEEDS:
      return action.dashboardSpeedsState;
    default:
      return state;
  }
}

function connectDivivesState(state = [],action){
  switch (action.type) {
    case CONNECT_DIVICES:
      return action.connectDivivesState;
    default:
      return state;
  }
}

const DashboardReducer = combineReducers({
  curDeviceInfo,
  dashboardSpeedsState,
  connectDivivesState
})
export default DashboardReducer;
