// 获取连接的设备总速度图形数据
export function getSpeedsChartData(timeLabelList, totalList , usedList){
  var speedsChartData = {
    "backgroundColor":"#F1F1F3",
    "plotarea":{ //图形离 面板间距
        "margin":"15% 5% 20% 5%"
    },
    "type": "area",
    "scaleX":{
          "values":"0:24:1",
          "max-items":9,
          "line-color":"#333",
          guide:{
           visible: true, //set to false by default on some chart types
           lineStyle:"solid",
           lineColor: "gray",
           lineWidth: 1
         },
         "minor-ticks":2,
         "minor-guide":{
           "line-color":"gray",
           "line-width":1,
           "line-style":"solid",
           "alpha":0.9
         },
         tick:{
           visible:false
         },
         "labels":timeLabelList

   },
   "legend": { //图例
     "layout":"float" //多个图例浮动横排显示
   },
   "scale-x-2":{  /*you must associate your data to the correct scale when using multiple scales*/
       "values":"0:24:1",
       "max-items":6,
       "line-color":"gray",
       "line-width":1,
       tick:{
         visible:true
       },
       "labels":[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
   },
   "scaleY":{
        //  "values":"0:120:20",
         "max-items":7,
         "line-color":"gray",
         tick:{
           visible:false
         },
         visible:false
   },
   plot:{
     "line-width":2,
     "background-state":{
       "line-color":"gray",
       "marker":{
           "background-color":"none"
       }
     },
     marker:{
       type:false
     }
   },
   "series": [
      {
        "background-color":"#85AED5",
        "alpha-area":1,
        "text":'available',
        "line-color":"#85AED5",
        "line-style":'none',
        "values": totalList
      },
      {
        "alpha-area":1,
        "text":'used',
        "background-color":"#50799E",
        "line-color":"#50799E",
        "line-style":'none',
        "values": usedList
      },
    ]
  }
  return speedsChartData;
}
