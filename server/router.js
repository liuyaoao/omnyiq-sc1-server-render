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
    if (ctx.req.url == '/zen') {
      axios.get('https://api.github.com/zen').then(({data}) => {
        resolve({zen: { text: [{text: data}]} })
      })
    }else if (ctx.req.url == '/Locations') {
      let tempUrl = APPCONFINGS.deviceListUrl+"/SearchAndDashboardMServlet?page=1&size=100&keywords=";
      axios.get(tempUrl).then(({data}) => {
        let routersData = data,onlineUrl = APPCONFINGS.deviceListUrl+"/GetOnlineStatusServlet?ids="+data.ids;
        axios.get(onlineUrl).then(({data}) => {
          resolve({CommonReducer: { routersData: routersData, routersOnlineStatus:data} })
        });
      });
    }else if (ctx.req.url == '/Dashboard000') {
      axios.get('https://api.github.com/zen').then(({data}) => {
        resolve({CommonReducer: { text: [{text: data}]} })
      })
    } else {
      resolve({})
    }
  })
}
