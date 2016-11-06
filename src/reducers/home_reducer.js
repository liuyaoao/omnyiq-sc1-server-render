import { combineReducers } from 'redux'
// import {Map, List} from 'immutable';
import * as ACTIONS from '../actions/home_action';

var setPageSize = 5;
// state = Map()
var listDevices = function(state = {}, action){
  switch (action.type) {
    case ACTIONS.LIST_DEVICES:
      return listDevices;
    default:
      return state;
  }
}

const homeReducer = combineReducers({
    listDevices
})

export default homeReducer
