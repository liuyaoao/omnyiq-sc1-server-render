import React from 'react';

import {getCpuLoadAreaChartData,getMemoryLoadAreaChartData,getTemperatureAreaChartData,getRebootsAreaChartData} from './RouterStatusChartData';
var StatusChartComponent = React.createClass({
  getInitialState:function(){
    return{
      isNeedRender_cpuLoad:true,
      isNeedRender_memoryLoad:true,
      isNeedRender_temperature:true,
      isNeedRender_reboots:true,
    }
  },
  componentDidMount:function(){

  },
  componentDidUpdate:function(){
    if(this.props.cpuLoadAreaChart && this.state.isNeedRender_cpuLoad){
      this.setState({isNeedRender_cpuLoad:false});
      zingchart.exec('cpuLoadAreaChart', 'destroy');
      var cpuLoadAreaChart = getCpuLoadAreaChartData(this.props.cpuLoadAreaChart);
      zingchart.render({id : 'cpuLoadAreaChart',data : cpuLoadAreaChart,height: '100%',width: "98%"});
      $('#cpuLoadAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
    if(this.props.memoryLoadAreaChart && this.state.isNeedRender_memoryLoad){
      this.setState({isNeedRender_memoryLoad:false});
      zingchart.exec('memoryLoadAreaChart', 'destroy');
      var memoryLoadAreaChart = getMemoryLoadAreaChartData(this.props.memoryLoadAreaChart);
      zingchart.render({id : 'memoryLoadAreaChart',data : memoryLoadAreaChart,height: '100%',width: "98%"});
      $('#memoryLoadAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
    if(this.props.temperatureAreaChart && this.state.isNeedRender_temperature){
      this.setState({isNeedRender_temperature:false});
      zingchart.exec('temperatureAreaChart', 'destroy');
      var temperatureAreaChart = getTemperatureAreaChartData(this.props.temperatureAreaChart);
      zingchart.render({id : 'temperatureAreaChart',data : temperatureAreaChart,height: '100%',width: "98%"});
      $('#temperatureAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
    if(this.props.rebootsAreaChart && this.props.rebootsAreaChart.length > 0  && this.state.isNeedRender_reboots){
      this.setState({isNeedRender_reboots:false});
      zingchart.exec('rebootsAreaChart', 'destroy');
      var rebootsAreaChart=getRebootsAreaChartData(this.props.rebootsAreaChart);
      zingchart.render({id : 'rebootsAreaChart',data : rebootsAreaChart,height: '100%',width: "98%"});
      $('#rebootsAreaChart').closest('.statusBottomContent').find('.noDataContainer').addClass('hide');
    }
  },
  onClickStatusBottomTab:function(e){ //点击了tab标签
    var that = $(e.currentTarget);
    e.preventDefault();
    var parent = that.closest('.routerStatusBottom');
    if(that.hasClass('current')){return;}
    var index = that.data('index');
    parent.find('.routerStatusBottomTab').removeClass('current');
    parent.find('.statusBottomContent').removeClass('current');
    that.addClass('current');
    parent.find('.statusBottomContent[data-index='+index+']').addClass('current');
  },
  componentWillUnmount:function(){
    // $('.routerStatusBottomTab').off();
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
              {this.props.isGetting ? <div style={{height:'100%',width:'100%',position:'relative'}}><div style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%,-50%)'}}>Please Wait Loading Data!!</div></div>: ''}
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
