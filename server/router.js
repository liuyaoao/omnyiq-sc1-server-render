import axios from 'axios'
// import APPCONFINGS from './appConfig'
const APPCONFINGS = {
  //本地配置
  deviceListUrl:'http://192.168.9.39:10080'
  //服务器配置
  // deviceListUrl:'http://dev.omnyiq.com/xmpp_es'
};

export default async function (ctx) {

  return new Promise((resolve, reject) => {
    let tempUrl = '';
    if (ctx.req.url == '/Locations') {
      tempUrl = APPCONFINGS.deviceListUrl+"/SearchAndDashboardMServlet?page=1&size=100&keywords=";
      axios.get(tempUrl).then(({data}) => {
        let routersData = data,onlineUrl = APPCONFINGS.deviceListUrl+"/GetOnlineStatusServlet?ids="+data.ids;
        axios.get(onlineUrl).then(({data}) => {
          resolve({CommonReducer: { routersData: routersData, routersOnlineStatus:data} })
        });
      });
    }else if (ctx.req.url == '/Dashboard') {
      tempUrl = APPCONFINGS.deviceListUrl+'/GetSpeedAndConnectedByIdServlet';
      axios.get(tempUrl).then(({data}) => {
        resolve({CommonReducer: { dashboardData: data} })
      })
    }else if(ctx.req.url == '/Dashboard/ConnectedDevices'){
      tempUrl = APPCONFINGS.deviceListUrl+'/GetConnectedDeviceByIdServlet';
      axios.get(tempUrl).then(({data}) => {
        resolve({CommonReducer:{ devicesData:data } })
      })
    }else if(ctx.req.url == '/Dashboard/WiFiInsight'){
      tempUrl = APPCONFINGS.deviceListUrl+'/GetWifiCapacityByIdServlet';
      axios.get(tempUrl).then(({data}) => {
        resolve({CommonReducer:{ wiFiInsightData:data } })
      });
    }else if(ctx.req.url == '/Dashboard/Speeds'){
      tempUrl = APPCONFINGS.deviceListUrl+'/GetInternetSpeedsByIdServlet';
      axios.get(tempUrl).then(({data}) => {
        resolve({CommonReducer:{ routerSpeedsData:data } })
      })
    }else if(ctx.req.url == '/Dashboard/RouterConditions'){
      tempUrl = APPCONFINGS.deviceListUrl+'/GetRouterConditionByIdServlet';
      axios.get(tempUrl).then(({data}) => {
        resolve({CommonReducer:{ routerConditionsData:data } })
      })
    }else if(ctx.req.url == '/Network'){
      tempUrl = APPCONFINGS.deviceListUrl+'/GetConnectedDeviceByIdServlet';
      axios.get(tempUrl).then(({data}) => {
        resolve({CommonReducer:{ networkData:data } })
      })
    }else {
      resolve({})
    }
  })
}
