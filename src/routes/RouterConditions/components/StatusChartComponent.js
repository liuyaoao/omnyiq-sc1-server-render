import React from 'react';

import {getCpuLoadAreaChartData,getMemoryLoadAreaChartData,getTemperatureAreaChartData,getRebootsAreaChartData} from './RouterStatusChartData';
var StatusChartComponent = React.createClass({
  getInitialState:function(){
    return{
    }
  },
  componentDidMount:function(){
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = localStorage.getItem('deviceInfo');
    deviceInfo = JSON.parse(deviceInfo);
    let _this = this;

  },
  shouldComponentUpdate:function(nextProps, nextState){
    if(nextProps.cpuLoadAreaChart){
      var cpuLoadAreaChart = getCpuLoadAreaChartData(nextProps.cpuLoadAreaChart);
      zingchart.render({id : 'cpuLoadAreaChart',data : cpuLoadAreaChart,height: '100%',width: "98%"});
      $('#cpuLoadAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
    if(nextProps.memoryLoadAreaChart){
      var memoryLoadAreaChart = getMemoryLoadAreaChartData(nextProps.memoryLoadAreaChart);
      zingchart.render({id : 'memoryLoadAreaChart',data : memoryLoadAreaChart,height: '100%',width: "98%"});
      $('#memoryLoadAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
    if(nextProps.temperatureAreaChart){
      var temperatureAreaChart = getTemperatureAreaChartData(nextProps.temperatureAreaChart);
      zingchart.render({id : 'temperatureAreaChart',data : temperatureAreaChart,height: '100%',width: "98%"});
      $('#temperatureAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
    if(nextProps.rebootsAreaChart && nextProps.rebootsAreaChart.length > 0){
      var rebootsAreaChart=getRebootsAreaChartData(nextProps.rebootsAreaChart);
      zingchart.render({id : 'rebootsAreaChart',data : rebootsAreaChart,height: '100%',width: "98%"});
      $('#rebootsAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
    return true;
  },
  onClickStatusBottomTab:function(e){ //点击了tab标签
    var that = $(e.currentTarget);
    var parent = that.closest('.routerStatusBottom');
    if(that.hasClass('current')){return;}
    var index = that.data('index');
    parent.find('.routerStatusBottomTab').removeClass('current');
    parent.find('.statusBottomContent').removeClass('current');
    that.addClass('current');
    parent.find('.statusBottomContent[data-index='+index+']').addClass('current');
  },
  componentWillUnmount:function(){
    zingchart.exec('cpuLoadAreaChart', 'destroy');//不销毁的话会导致第二次加载这个路由页面的时候会报错。
    zingchart.exec('memoryLoadAreaChart', 'destroy');
    zingchart.exec('temperatureAreaChart', 'destroy');
    zingchart.exec('rebootsAreaChart', 'destroy');
  },

  render:function(){
    return(
        <div className='routerStatusBottom' style={{}}>
            <div className='clearfix bottomTabContainer' style={{}}>
              <span className='routerStatusBottomTab current' onClick={this.onClickStatusBottomTab} data-index='0'>CPU Loads</span>
              <span className='routerStatusBottomTab' onClick={this.onClickStatusBottomTab} data-index='1'>Memory Loads</span>
              <span className='routerStatusBottomTab' onClick={this.onClickStatusBottomTab} data-index='2'>Temperature</span>
              <span className='routerStatusBottomTab' onClick={this.onClickStatusBottomTab} data-index='3'>Reboots</span>
            </div>
            <div className='clearfix statusBottomContents' style={{height:this.props.screenHeight-376}}>
              <div className='statusBottomContent current' data-index='0'>
                  <div className='noDataContainer' style={{'height':this.props.screenHeight-430,transform: 'translateY(50%)'}}>No Availabel Data!</div>
                  <div id={'cpuLoadAreaChart'} style={{height:this.props.screenHeight-370}}></div>
              </div>
              <div className='statusBottomContent' data-index='1'>
                  <div className='noDataContainer' style={{'height':this.props.screenHeight-430,transform: 'translateY(50%)'}}>No Availabel Data!</div>
                  <div id={'memoryLoadAreaChart'} style={{height:this.props.screenHeight-376}}></div>
              </div>
              <div className='statusBottomContent' data-index='2'>
                  <div className='noDataContainer' style={{'height':this.props.screenHeight-430,transform: 'translateY(50%)'}}>No Availabel Data!</div>
                  <div id={'temperatureAreaChart'} style={{height:this.props.screenHeight-376}}></div>
                </div>
              <div className='statusBottomContent' data-index='3'>
                  <div className='noDataContainer' style={{'height':this.props.screenHeight-430,transform: 'translateY(50%)'}}>No Availabel Data!</div>
                  <div id={'rebootsAreaChart'} style={{height:this.props.screenHeight-376}}></div>
              </div>
            </div>
        </div>

    );
  }
});
module.exports = StatusChartComponent;
