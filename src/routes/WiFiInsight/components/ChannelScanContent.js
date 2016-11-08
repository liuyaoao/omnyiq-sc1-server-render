import React from 'react';
import {getChannelScanChartData} from './WiFiInsightChartData';
var ChannelScanContent = React.createClass({
  getInitialState:function(){
    return{
      monthData : null
    }
  },
  componentDidMount:function(){
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = localStorage.getItem('deviceInfo');
    deviceInfo = JSON.parse(deviceInfo);
    let _this = this;

  },
  shouldComponentUpdate:function(nextProps, nextState){

    // if(nextState.uploadChartData){
    //   zingchart.render({id : 'uploadChart',data : nextState.uploadChartData,height: 300,width: "98%"});
    // }
    // if(nextState.uploadChartData&&nextState.downloadChartData){
    //   zingchart.render({id : 'UploadAndDownload',data : nextState.uploadAndDownload,height: 300,width: "98%"});
    // }
    return true;
  },
  componentDidUpdate:function(){
    if(this.props.wifiscanList){
      // zingchart.exec('wiFiInsightChannelScanChart', 'destroy');//不销毁的话会导致第二次加载这个路由页面的时候会报错。
      var data =this.getChartData();
      zingchart.render({id : 'wiFiInsightChannelScanChart',data : data,height: "100%",width: "100%"});
    }
  },
  componentWillUnmount:function(){
    zingchart.exec('wiFiInsightChannelScanChart', 'destroy');//不销毁的话会导致第二次加载这个路由页面的时候会报错。
  },
  getChartData: function(){
    var {wifiscanList, signalType} = this.props;
    var monthSeries = [];

		var monthSeries = [], monthSeriesObj = {}, monthSeriesValues = [];
		var wl_data = [], text = '', maxChannel = 0, currentDbm = 0;
		var channels = [], fontColor = null, signals = [], signalArr = [];
    if (wifiscanList) {
      for (var i = 0; i < wifiscanList.length; i++) {
        var scan = wifiscanList[i];
				var obj = {}, values = [];
				var step = scan.Bandwidth / 10, center_channel = scan.Center_Channel, single_dbm = scan.SIGNAL_dBm;
				values = [ [center_channel - step, -100], [center_channel, single_dbm], [center_channel + step, -100]];
        maxChannel = (center_channel > maxChannel)? center_channel : maxChannel;
        channels.push(center_channel);
				if (single_dbm == 0) {
					if (signals.indexOf(center_channel) > -1) {
						var key = signals.indexOf(center_channel);
						signalArr[key].ssid = signalArr[key].ssid + '\n' + scan.SSID;
					}else {
						signals.push(center_channel);
						var obj2 = {
							key: currentDbm,
							ssid: scan.SSID
						}
						signalArr.push(obj2);
					}
					obj = {
						"line-width":"4"
					}
          obj.text = scan.SSID;
          obj.values = values;
          monthSeries.push(obj);
          currentDbm ++;
				}else {
					obj = {
						"line-color":"#aaa",
					}
				}
        obj.text = scan.SSID;
        obj.values = values;
        monthSeries.push(obj);
        currentDbm ++;
			}

      for (var i = 0; i < signalArr.length; i++) {
				var key = signalArr[i].key;
				monthSeries[key].text = signalArr[i].ssid;
				var tool = {
					"background-color":"#2592b8",  //cae8f3 2592b8
					"paddingBottom": 0
				}
				monthSeries[key].tooltip = tool;
			}

      if (channels.length) {
        var tempArr = [];
        for(let i of channels){
          if(tempArr.indexOf(i) == -1){
            tempArr.push(i);
          }
        }
        channels = tempArr;
      }
    }

    var rules = [
      {
        "rule":"%v<=0",
        "font-color":"#F1F1F3"
      }
    ];
    if (signalType == '2.4') {
      var rule1 = {
        "rule":"%v>14",
        "font-color":"#F1F1F3"
      }
      rules.push(rule1);
    }
    if (channels.length) {
      var str = '';
      for (var i = 0; i < channels.length; i++) {
        var ch = '';
        if (i == 0) {
          ch = "%v == " + channels[i];
        }else {
          ch = " || %v == " + channels[i];
        }
        str = str + ch;
      }
      var rule2 = {
        "rule":str,
        "font-color":"red"
      }
      rules.push(rule2);
    }
    return getChannelScanChartData(fontColor,rules,currentDbm,monthSeries);
  },
  render:function(){
    return(
        <div className='wiFiInsightChannelScanContainer' style={{height:this.props.screenHeight-280}}>
          <div id={'wiFiInsightChannelScanChart'} style={{height:'100%',width:'98%',margin:'0 auto'}}></div>
        </div>
    );
  }
});
module.exports = ChannelScanContent;
