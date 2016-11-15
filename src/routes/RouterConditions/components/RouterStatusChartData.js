// 获取数据的函数
export function getCpuLoadAreaChartData(data){
    let list = JSON.parse(JSON.stringify(data)); //如果是初始化的props里传过来的这个数据就要深度clone一份，因为props是只读的
    if(!list || list.length<=0){
      return '';
    }
		var valueSeries = [],timeLabelList = [],valueSeriesObj = {},maxValueY=0;
		for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      timeLabelList.push((obj['savetime'].split('T')[1]).split(':')[0]+':00');
      for(let key in obj['cpu_load']){
        if(!valueSeriesObj[key]){
          valueSeriesObj[key] = [];
        }
        valueSeriesObj[key].push(+(obj['cpu_load'][key] ||0).toFixed(1));
        if(+(obj['cpu_load'][key] ||0).toFixed(1)>+maxValueY){
          maxValueY = +(obj['cpu_load'][key] ||0).toFixed(1);
        }
      }
		}

    maxValueY = (+maxValueY>=80) ? 100 : (maxValueY +maxValueY*0.25);
    maxValueY = Math.ceil(maxValueY/10)*10;
    // if(maxValueY<10){
    //   maxValueY = 10;
    // }
    for(let key in valueSeriesObj){
      var keyStrArr = key.split('_');
      var text = keyStrArr[0]+"_"+keyStrArr[1];
      valueSeries.push({text:text, values:valueSeriesObj[key]});
    }
		var CpuLoadAreaChartData = {
      "backgroundColor":"#F1F1F3",
			"gui":{
		    "context-menu":{
        	"empty":true
        },
		  },
			"type":"area",
			"scale-x":{
				// "values":"0:24:1",
				"step": "hour",
				"items-overlap":true,
				// "transform":{
	      //   "type":"date",
				// 	"all":interval_step.format,
        //   "item":{
        //       "visible":false
        //     }
	    	// },
        "labels":timeLabelList
			},
			"plotarea":{
				"margin-top":"10px",
				"margin-bottom":"dynamic",
				"margin-right":"15px",
				"margin-left":"50px"

			},
			"plot":{
				"aspect":"spline"
			},
			"scale-y":{
        "values":"0:"+maxValueY+":10",
        // "min-value":"0",
				// "max-value":maxValueY,
				// "step":"10",
				"format":"%v%",
				// "items-overlap":true,
			},
			"tooltip":{
				"text": "%t : %v%",
				"visible":0
			},
			"legend":{
				"layout":"float"
			},
			"crosshairX":{
				"plot-label":{
			      "text":"%t : %v%"
			  },
			},
			"series":valueSeries
		};
  return CpuLoadAreaChartData;
}

//获取数据
;export function getMemoryLoadAreaChartData(data){
    let list = JSON.parse(JSON.stringify(data)); //如果是初始化的props里传过来的这个数据就要深度clone一份，因为props是只读的
    if(!list || list.length<=0){
        return '';
      }
      var valueSeries = [],timeLabelList = [], text='memory_Load',values=[],maxValueY=0,minValueY=1000;
  		for (var i = 0; i < list.length; i++) {
        var obj = list[i];
        var timeHour =(obj['savetime'].split('T')[1]).split(':')[0]+":00";
        timeLabelList.push(timeHour);
  			values.push(+(obj[text]||0).toFixed(1));
        minValueY = (+(obj[text]||0).toFixed(1)<minValueY) ? (+(obj[text]||0).toFixed(1)) : +minValueY;//取最小值
        maxValueY = (+(obj[text]||0).toFixed(1)>maxValueY) ? (+(obj[text]||0).toFixed(1)) : +maxValueY;//取最大值
  		}
      valueSeries.push({
        text:text,
        values:values
      });
      minValueY = Math.floor(+minValueY);
      maxValueY = (+maxValueY>=80) ? 100 : (maxValueY +maxValueY*0.25);
      maxValueY = Math.ceil(maxValueY/10)*10;
  		var memoryLoadAreaChart = {
        "backgroundColor":"#F1F1F3",
  			"gui":{
  		    "context-menu":{
          	"empty":true
          },
  		  },
  			"type":"area",
  			"scale-x":{
  				// "values":"0:24:1",
  				"step":"hour",
  				"items-overlap":true,
  				// "transform":{
  	      //   "type":"date",
  				// 	"all":interval_step.format,
          //   "item":{
          //       "visible":false
          //     }
  	    	// },
          "labels":timeLabelList
  			},
  			"plotarea":{
  				"margin-top":"10px",
  				"margin-bottom":"dynamic",
  				"margin-right":"15px",
  				"margin-left":"50px"

  			},
  			"plot":{
  				"aspect":"spline"
  			},
  			"scale-y":{
  				"values":"0:"+maxValueY+":10",
  				"format":"%v%",
  				// "items-overlap":true,
  			},
  			"tooltip":{
  				"text": "%t : %v%",
  				"visible":0
  			},
  			"legend":{
  				"layout":"float"
  			},
  			"crosshairX":{
  				"plot-label":{
  			      "text":"%t : %v%"
  			  },
  			},
  			"series":valueSeries
  		};
  return memoryLoadAreaChart;
}
//获取数据
;export function getTemperatureAreaChartData(data){
  let list = JSON.parse(JSON.stringify(data));
  if(!list || list.length<=0){
      return '';
    }
    var valueSeries = [],timeLabelList = [], text='temperature',values=[],maxVal = 0;
		for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      var timeHour =(obj['savetime'].split('T')[1]).split(':')[0]+":00";
      timeLabelList.push(timeHour);
			values.push(+(obj[text]||0).toFixed(1));
      if (+obj[text] > maxVal) {
        maxVal = obj[text];
      }
		}
    valueSeries.push({
      text:text,
      values:values
    });
    maxVal = (+maxVal>=80) ? 100 : (maxVal +maxVal*0.25);
    maxVal = Math.ceil(maxVal/10)*10;
    var temperatureAreaChartData = {
      "backgroundColor":"#F1F1F3",
      "gui":{
        "context-menu":{
          "empty":true
        },
      },
      "type":"area",
      "scale-x":{
        // "values":"0:24:1",
        "step": "hour",
        "items-overlap":true,
        // "transform":{
        //   "type":"date",
        //   "all":interval_step.format,
        //   "item":{
        //       "visible":false
        //     }
        // },
        "labels":timeLabelList
      },
      "scale-y":{
        "values":"0:"+maxVal+":10",
        "format":"%v°C",
        "items-overlap":true,
      },
      "plotarea":{
        "margin-top":"10px",
        "margin-bottom":"dynamic",
        "margin-right":"15px",
        "margin-left":"50px"
      },
      "plot":{
        "aspect":"spline"
      },
      "tooltip":{
        "text": "%v°C",
        "visible":0
      },
      "crosshairX":{
        "plot-label":{
            "text":"%t : %v°C"
        },
      },
      "legend":{
        "layout":"float"
      },
      "series":valueSeries
    };
    if (maxVal <= 1) {
      temperatureAreaChartData.scaleY = {
        "max-value":0,
        "step": 1
      }
    }
  return temperatureAreaChartData;
}
//获取数据
;export function getRebootsAreaChartData(data){
    let list = JSON.parse(JSON.stringify(data));
    if(!list || list.length<=0){
      return '';
    }
    var valueSeries = [],timeLabelList = [], text='routerReboot',values=[],maxVal = 0;
		for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      var timeHour =(obj['savetime'].split('T')[1]).split(':')[0]+":00";
      timeLabelList.push(timeHour);
      obj[text] = +(obj[text]||0);
			values.push([timeHour,+obj[text].toFixed(1)]);
      if (+obj[text] > maxVal) {
        maxVal = obj[text];
      }
		}
    maxVal = Math.ceil((maxVal + maxVal*0.25)/10)*10;
    var barWidth = null;
    if (values.length < 10) {
      barWidth = '20px';
    }
    valueSeries.push({
      text:text,
      values:values
    });
    var rebootsAreaChartData = {
      "backgroundColor":"#F1F1F3",
      "gui":{
        "context-menu":{
          "empty":true
        },
      },
      "type":"bar",
      "scale-x":{
        // "values":"0:24:1",
        "step": "hour",
        "items-overlap":true,
        // "transform":{
        //   "type":"date",
        //   "all":interval_step.format,
        //   "item":{
        //       "visible":false
        //     }
        // },
        "labels":timeLabelList
      },
      // "scale-y":{
      //   "max-value":0,
      //   "step": 1
      // },
      "plotarea":{
        "margin-top":"10px",
        "margin-bottom":"dynamic",
        "margin-right":"15px",
        "margin-left":"50px"
      },
      "plot":{
        "bar-width":barWidth
      },
      "tooltip":{
        "text": "%v",
        "visible":0
      },
      "crosshairX":{
      },
      "legend":{
        "layout":"float"
      },
      "series":valueSeries
    };
    if (maxVal <= 1) {
      rebootsAreaChartData.scaleY = {
        "max-value":0,
        "step": 1
      }
    }
  return rebootsAreaChartData;
}
