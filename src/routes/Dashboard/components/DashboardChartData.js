// 获取下载数据的函数
export function getDevicesChartData(deviceSum,knownDevice,knownDeviceColor,unknownDevice,unknownDeviceColor){
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
                     },
                     {
                         "text": "total",
                         "font-size": "12px",
                         "font-family": "arial",
                         "font-color": "#2F23D2",
                         "x": "52%",
                         "y": "65%",
                         "anchor": "c"
                     }
                 ],
             "plot":{
                 "slice":"68%",//中间空心大小
                 "borderWidth":"0",
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
                 },
                 "tooltip":{
                   "text": "%v %t",
                   "sticky":true,
                   "timeout":3000
                 }
             },
             "series":[
                 {
                     "text":"known",
                     "values":[knownDevice],//已知设备数
                     "background-color":knownDeviceColor,
                     "value-box": {
                             visible:false,
                         }
                 },
                 {
                     "text":"unknown",
                     "values":[unknownDevice],//未知设备
                     "background-color":unknownDeviceColor,
                    //  "alpha":"0.5",
                    "tooltip":{
                       "fontColor":"black"
                     },
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
