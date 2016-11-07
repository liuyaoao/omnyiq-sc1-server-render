// 获取下载数据的函数
export function getSpeedsDownloadChartData(dateList,avg_download,avg_wan_Latency,avg_isp_Avg_Download){
  var downloadChartData = {
    "backgroundColor":"#F1F1F3",
    "type": "line",
    "plotarea":{ //图形离 面板间距
        "margin":"15% 0% 10% 10%"
    },
    plot:{
      marker:{
        type:false
      }
    },

    "legend": { //图例
      "marker":{
        "type":"line",
        "line-width":"4px"
      },
      "layout":"float" //多个图例浮动横排显示
    },
    "crosshairX":{//竖排显示当前点信息
      plotLabel: {
        "visible": true
      },
      scaleLabel:{
       //  backgroundColor:"red",
       //  color:"white",
        text:"%t:00 EST"
      }
    },
    "tooltip":{//每个点显示数值
      "visible":0
    },
    "scaleX":{
          "values":"0:24:1",
          "max-items":7,
          "line-color":"#333",
          labels: dateList,
          visible:false
    },
    "scaleY":{
          guide:{visible:false},
          "values":"0:120:20",
          "max-items":7,
          "line-color":"#333"
    },
    "series": [
      {
        "text":'Mbps DL',
        "line-color":"#66ACDD",
        "values":avg_download
      },
      {
        "text":'server DL',
        "line-color":"#9C9C9C",
        "line-style":"dashed",
        "values":avg_isp_Avg_Download
      },
      {
        "text":'ms latency',
        "line-color":"#A1DF83",
        "values":avg_wan_Latency
      }
    ]
  }
  return downloadChartData;
}

//获取上传图表里的数据
;export function getSpeedsUploadChartData(dateList,avg_upload,avg_isp_Avg_Upload,avg_wan_Latency){
  var uploadChartData = {
    "backgroundColor":"#F1F1F3",
    "type": "line",
    "plotarea":{ //图形离 面板间距
        "margin":"15% 0% 10% 10%"
    },
    plot:{
      marker:{
        type:false
      }
    },
    "legend": { //图例
      "marker":{
        "type":"line",
        "line-width":"4px"
      },
      "layout":"float" //多个图例浮动横排显示
    },
    "crosshairX":{//竖排显示当前点信息
      plotLabel: {
        "visible": true
      },
      scaleLabel:{
       //  backgroundColor:"red",
       //  color:"white",
        text:"%t:00 EST"
      }

    },
    "tooltip":{//每个点显示数值
      "visible":0
    },
    "scaleX":{
          "values":"0:24:1",
          "max-items":7,
          "line-color":"#333",
          labels: dateList,
          visible:false
    },
    "scaleY":{
          guide:{visible:false},
          "values":"0:120:20",
          "max-items":7,
          "line-color":"#333",
    },
    "series": [
      {
        "text":'Mbps UL',
        "line-color":"#E6798C",
        "values":avg_upload
      },
      {
        "text":'server UL',
        "line-color":"#ccc",
        "line-style":"dashed",
        "values":avg_isp_Avg_Upload
      },
      {
        "text":'ms latency',
        "line-color":"#A1DF83",
        "values":avg_wan_Latency
      }
    ]
  }
  return uploadChartData;
}

//获取下载+上传的图表里的数据
;export function getSpeedsDL_ULChartData(dateList,avg_upload,avg_download,avg_isp_Avg_Download,avg_isp_Avg_Upload,avg_wan_Latency){
  var uploadAndDownload = {
    "backgroundColor":"#F1F1F3",
    "type": "line",
    "plotarea":{ //图形离 面板间距
        "margin":"10% 0% 10% 10%"
    },
    plot:{
      marker:{
        type:false
      }
    },
    "legend": { //图例
      "marker":{
        "type":"line",
        "line-width":"4px"
      },
      "layout":"float" //多个图例浮动横排显示
    },
    "crosshairX":{//竖排显示当前点信息
      plotLabel: {
        "visible": true
      },
      scaleLabel:{
       //  backgroundColor:"red",
       //  color:"white",
        text:"%t:00 EST"
      }

    },
    "tooltip":{//每个点显示数值
      "visible":0
    },
    "scaleX":{
          "values":"0:24:1",
          "max-items":7,
          "line-color":"#333",
          labels: dateList,
          visible:false
    },
    "scaleY":{
          guide:{visible:false},
          "values":"0:120:20",
          "max-items":7,
          "line-color":"#333",
    },
    "series": [
      {
        "text":'Mbps UL',
        "line-color":"#E6798C",
        "values":avg_upload
      },
      {
        "text":'Mbps DL',
        "line-color":"#66ACDD",
        "values":avg_download
      },
      {
        "text":'server DL',
        "line-color":"#9C9C9C",
        "line-style":"dashed",
        "values":avg_isp_Avg_Download
      },
      {
        "text":'server UL',
        "line-color":"#ccc",
        "line-style":"dashed",
        "values":avg_isp_Avg_Upload
      },
      {
        "text":'ms latency',
        "line-color":"#A1DF83",
        "values":avg_wan_Latency
      }
    ]
  }
  return uploadAndDownload;
}
