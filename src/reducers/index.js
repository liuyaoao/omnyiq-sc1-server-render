import { combineReducers } from 'redux'
import homeReducer from './home_reducer';
import LocationsReducer from './locations_reducer';
import ReactTabBarReducer from './ReactTabBar_reducer';
import DashboardReducer from './Dashboard_reducer';
import SpeedsReducer from './speeds_reducer';
import WifiInsightReducer from './wifiInsight_reducer';
import RouterConditionsReducer from './routerConditions_reducer';

const rootReducer = combineReducers({
  homeReducer,
  LocationsReducer,
  ReactTabBarReducer,
  DashboardReducer,
  SpeedsReducer,
  WifiInsightReducer,
  RouterConditionsReducer
});

export default rootReducer
