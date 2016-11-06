// 获取下载数据的函数
export function getDevicesChartData(deviceSum,knownDevice,knownDeviceColor,unknownDevice){
  var connectedDevicesChartData = {
     "globals": {
       "font-family":"Arial",
       "font-weight":"normal"
     },
     "graphset":[
         {
             "type":"ring",
             "backgroundColor":"#F1F1F3",
             "height":"100%", //占比
             "width":"100%",
             "border-radius":4,
             "plotarea":{ //图形离 面板间距
                 "margin":"0% 0% 0% 0%"
             },
             "labels": [
                     {
                         "text": deviceSum,//设备总数
                         "font-size": "30px",
                         "font-family": "arial",
                         "font-color": "#2F23D2",
                         "font-weight": "bold",
                         "x": "50%",
                         "y": "50%",
                         "shadow":true,
                         "shadow-color":"yellow",
                         "anchor": "c"
                     }
                 ],
             "plot":{
                 "slice":"80%",//中间空心大小
                 "ref-angle":270,//圆的角度
                 "detach":false,
                 "value-box":{ //文字说明
                     "visible":true,
                     "type":"first",
                     "connected":false,
                     "text":"%v",
                     "font-color":"#000000",
                     "font-size":"20px"
                 },
                 "animation":{
                     "delay":0,
                     "effect":2,
                     "speed":"600",
                     "method":"0",
                     "sequence":"1"
                 }
             },
             "series":[
                 {
                     "values":[knownDevice],//已知设备数
                     "background-color":knownDeviceColor,
                     "border-color":"#9C9494",
                     "border-width":"1px",
                     "value-box": {
                             visible:false,
                         }
                 },
                 {
                     "values":[unknownDevice],//未知设备
                     "background-color":"#dadada",
                     "alpha":"0.5",
                     "border-color":"#907E7E",
                     "border-width":"2px",
                     "line-style": "dotted",
                     "shadow":0,
                     "value-box":{
                       "font-size":"16px"
                     }
                 }
             ]
         }
     ]
   }
  return connectedDevicesChartData;
}
