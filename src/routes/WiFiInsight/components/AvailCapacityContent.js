import React from 'react';
import {getAvailCapacityChartData} from './WiFiInsightChartData';
var AvailCapacityContent = React.createClass({
  getInitialState:function(){
    return{
      bandWidthArr : ['20M','40M','80M']
    }
  },
  componentDidUpdate:function(){
    var bandWidthArr = this.state.bandWidthArr;
    if(this.props.availableCapacityGHz){
      // this.disposeZingCharts();
      for(let type of bandWidthArr){
        var data =this.getChartData(type);
        zingchart.render({id : 'wiFiInsightAvailableCapacity'+type,data : data,height: '100%',width: "100%"});
      }
    }
  },
  componentWillUnmount:function(){
    this.disposeZingCharts();
  },
  disposeZingCharts:function(){
    for(let key of this.state.bandWidthArr){
      zingchart.exec('wiFiInsightAvailableCapacity'+key, 'destroy');//不销毁的话会导致第二次加载这个路由页面的时候会报错。
    }
  },
  getChartData: function(bandWidthType){
    var {availableCapacityGHz, signalType} = this.props;
    var list = availableCapacityGHz[bandWidthType+'HZ_Channel_Capacity'];

    var monthSeries = [], monthSeriesObj = {}, monthSeriesValues = [];
    var scal_values = "0:1", bandwidth = '5px';
    if (list) {
      for (var i = 0; i < list.length; i++) {
        var wl = list[i];
        var load = [], text = '';
        var channel = parseInt(wl.Center_Channel), value = parseFloat((wl.Percentage).toFixed(1));
        if (signalType == '5' && channel < 13) {
          continue;
        }
        load.push(channel, value );
        monthSeriesValues.push(load);
      }
      if (monthSeriesValues.length < 15) {
        bandwidth = '10px';
      }
      monthSeriesObj.text = '';
      monthSeriesObj.values = monthSeriesValues;
      monthSeries.push(monthSeriesObj);
    }
    return getAvailCapacityChartData(bandWidthType,bandwidth,monthSeries);
  },
  render:function(){
    var bandWidthArr = this.state.bandWidthArr;
    var str = 'wiFiInsightAvailableCapacity';
    return(
      <div className='wiFiInsightAvailableCapacityContainer' style={{height:this.props.screenHeight-280}}>
        <div id={str+bandWidthArr[0]} style={{height:'33%',width:'98%',margin:'0 auto',borderBottom:'1px dotted grey'}}></div>
        <div id={str+bandWidthArr[1]} style={{height:'33%',width:'98%',margin:'0 auto',borderBottom:'1px dotted grey'}}></div>
        <div id={str+bandWidthArr[2]} style={{height:'33%',width:'98%',margin:'0 auto',borderBottom:'1px dotted grey'}}></div>
      </div>
    );
  }
});
module.exports = AvailCapacityContent;
