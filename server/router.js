import axios from 'axios'
// import APPCONFINGS from './appConfig'
const APPCONFINGS = {
  //本地配置
  // deviceListUrl:'http://192.168.9.39:10080'
  //服务器配置
  deviceListUrl:'http://dev.omnyiq.com/xmpp_es'
};

export default async function (ctx) {

  return new Promise((resolve, reject) => {
    let tempUrl = '';
    if (ctx.req.url == '/Locations') {
      tempUrl = APPCONFINGS.deviceListUrl+"/GetLocationsServlet?page=1&size=100&keywords=";
      axios.get(tempUrl).then(({data}) => {
        let routersData = data,onlineUrl = APPCONFINGS.deviceListUrl+"/CheckRouterStatusServlet?ids="+data.ids;
        axios.get(onlineUrl).then(({data}) => {
          resolve({CommonReducer: { routersData: routersData, routersOnlineStatus:data} })
        });
      });
    }else if(ctx.req.url == '/Dashboard/ConnectedDevices'){
      tempUrl = APPCONFINGS.deviceListUrl+'/GetConnectedDeviceByIdServlet';
      axios.get(tempUrl).then(({data}) => {
        resolve({CommonReducer:{ devicesData:data } })
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

//  这几个不能在服务端获取数据渲染，因为zingchart这个插件不兼容在服务端渲染。
// else if (ctx.req.url == '/Dashboard_9999') {
//   tempUrl = APPCONFINGS.deviceListUrl+'/GetDashboardByIdServlet';
//   axios.get(tempUrl).then(({data}) => {
//     resolve({CommonReducer: { dashboardData: data} })
//   })
// }else if(ctx.req.url == '/Dashboard/WiFiInsight_99999999'){
//   tempUrl = APPCONFINGS.deviceListUrl+'/GetWifiCapacityByIdServlet';
//   axios.get(tempUrl).then(({data}) => {
//     resolve({CommonReducer:{ wiFiInsightData:data } })
//   });
// }else if(ctx.req.url == '/Dashboard/Speeds_999999'){
//   tempUrl = APPCONFINGS.deviceListUrl+'/GetInternetSpeedsByIdServlet';
//   axios.get(tempUrl).then(({data}) => {
//     resolve({CommonReducer:{ routerSpeedsData:data } })
//   })
// }else if(ctx.req.url == '/Dashboard/RouterConditions_99999999'){
//   tempUrl = APPCONFINGS.deviceListUrl+'/GetRouterConditionByIdServlet';
//   axios.get(tempUrl).then(({data}) => {
//     resolve({CommonReducer:{ routerConditionsData:data } })
//   })
// }
