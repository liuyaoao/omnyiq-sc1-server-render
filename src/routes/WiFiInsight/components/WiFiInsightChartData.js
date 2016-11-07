// 获取数据的函数
export function getChannelScanChartData(fontColor,rules,currentDbm,monthSeries){
  var channelScanChartData = {
      "backgroundColor":"#F1F1F3",
      "gui":{
        "context-menu":{
          "empty":true
        },
      },
      "type":"line",
      "scale-x":{
        "label": {
          "text": "Channel"
        },
        "item":{
          "font-color":fontColor,
          "rules":rules
        },
      },
      "scale-y":{
        "values": "-100:0:20"
      },
      "plotarea":{
        "margin-top":"25px",
        "margin-bottom":"dynamic",
        "margin-right":"25px",
        "margin-left":"45px"
      },
      tooltip:{
        "text": "%t: %v",
        "sticky":true,
        "timeout":3000,
      },
      "plot":{
        "aspect":"spline",
        "tooltip":{
          "text": "%t: %v",
          "sticky":true,
          "timeout":3000,
          "rules": [
            {
              "rule": "%v <= -100",
              "visible": false
            }
          ]
        },
        "marker": {
          "visible": false
        },
        "value-box":{
          "shadow":false,
          "type":"none",
          "text": "%t",
        },
        "hover-mode":"plot",
        "selection-mode":"plot", //required for selection to work!
        "hover-state":{ //sets the styling for selected marker (per series)
          "line-color":"red",
          "line-width":"2px"
        },
        "rules":[
          {
            "rule":"%p == " + currentDbm,
            "line-width":"4"
          }
        ]
      },
      "series": monthSeries
    };
  return channelScanChartData;
}

//获取数据
;export function getAvailCapacityChartData(bandWidthType,bandwidth,monthSeries){
  var availCapacityChartData = {
      "backgroundColor":"#F1F1F3",
      "padding-bottom":"0",
      "margin-bottom":"0",
      "gui":{
        "context-menu":{
          "empty":true
        },
      },
      "type":"bar",
      "scale-x":{
        "items-overlap":true,
        "margin-bottom":"-15px",
        "item":{
          "offset-y":"-10px"
        },
        "label":{
          "offset-y":"-6px",
          "padding-bottom":"-10px",
          "text": "Center Channel ("+bandWidthType+"Hz)"
        }
      },
      "plotarea":{
        "margin-top":"dynamic",
        "margin-bottom":"dynamic",
        "margin-right":"dynamic",
        "margin-left":"dynamic"
      },
      "plot":{
        "text": "%k: %v%",
        "sticky":true,
        "timeout":30000,
        "bar-width":bandwidth,
        "selection-mode":"plot",
        "selected-state":{ //sets the styling for selected marker (per series)
          "background-color":"red"
        }
      },
      "scale-y":{
        // "min-value":0,
        "values": "0:100:20",
        "label": {
          "offset-y":"8px",
          "text": "Percentage(%)"
        },
      },
      "tooltip":{
        "sticky":true,
        "timeout":3000,
        "text": "%k: %v%"
      },
      "legend":{
        "layout":"float",
        "visible" : false
      },
      // "crosshairX":{
      // },
      "series":monthSeries
    };
  return availCapacityChartData;
}
