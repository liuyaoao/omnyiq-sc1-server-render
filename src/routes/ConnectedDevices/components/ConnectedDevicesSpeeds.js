import React from 'react';
import {getSpeedsChartData} from './ConnectedDevicesChartData';
import TimeSelectionTab from '../../../components/TimeSelectionTab';

var ConnectedDevicesSpeeds = React.createClass({
  getInitialState:function(){
    return{
    }
  },
  componentDidMount:function(){
    let _this = this;
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = localStorage.getItem('deviceInfo');
    deviceInfo = JSON.parse(deviceInfo);
    if(this.props.isAllDevices){
      $.ajax({
         type: "GET",
         url: deviceListUrl+'/GetBandwidthServlet?id='+deviceInfo.deviceId,
         success: function(data){
           data = JSON.parse(data);
           let allBandwidthList = data.AllBandwidthList || [];
           for(let obj of allBandwidthList){
             obj.total_bandwidth = +(+obj.total_bandwidth || 0).toFixed(2);
             obj.used = +(obj.used || 0).toFixed(2);
           }
           _this._renderSpeedsChart(allBandwidthList);
         }
       });
    }
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
  _onClickChartCall:function(e){
    var data = zingchart.exec(e.id, 'getseriesvalues', {});
    // console.log("ConnectedDevicesSpeeds_e:",e);
    // console.log("ConnectedDevicesSpeeds_ChartData:",data);
    var availableNum = data[0][e.nodeindex] ? (data[0][e.nodeindex]-data[1][e.nodeindex])/data[0][e.nodeindex] : 0;
    this._setSpeedsNum_SpeedsGrade(data[1][e.nodeindex], availableNum*100);
  },
  _renderSpeedsChart:function(bandwidthList){
    let _this = this;
    if(!bandwidthList || bandwidthList.length <= 0){
      $('.connectedDevicesSpeedsContainer .noDataContainer').removeClass('hide');
      $('.devicesSpeedsBottom').addClass('hide');
      this._setSpeedsNum_SpeedsGrade(0, 0);
      return;
    }
    $('.connectedDevicesSpeedsContainer .noDataContainer').addClass('hide');
    $('.devicesSpeedsBottom').removeClass('hide');
    let lastObj = bandwidthList[bandwidthList.length-1];
    this._setSpeedsNum_SpeedsGrade(lastObj.used||0, (+lastObj.available||0)*100);
    let timeLabelList=[], totalList=[] , usedList=[];
    var i=0;
    for(let obj of bandwidthList){
      if(i%3 == 0){
        let hour = (new Date(obj.savetime)).getHours();
        timeLabelList.push((hour<10?"0":"")+hour+':00');
      }else{
        timeLabelList.push('');
      }
      totalList.push(obj.total_bandwidth||0);
      usedList.push(obj.used||0);
      i++;
    }
    // timeLabelList.push(timeLabelList[0]);
    var chartData = getSpeedsChartData(timeLabelList,totalList,usedList);
    zingchart.render({id : 'ConnectDevicesSpeedsChart',data : chartData,height: "300",width: "100%"});
    zingchart.node_click = function(e){
      if(e.id == 'ConnectDevicesSpeedsChart'){
        _this._onClickChartCall(e);
      }
    }
  },
  componentDidUpdate:function(){
    if(!this.props.isAllDevices){
      this._renderSpeedsChart(this.props.bandwidthList);
    }
  },
  _setSpeedsNum_SpeedsGrade:function(speedsNum, speedsGrade){
    $('.devicesSpeedsTop .speedsNum').text((+speedsNum).toFixed(2));
    $('.devicesSpeedsTop .speedsGrade').text((+speedsGrade).toFixed(1));
  },
  componentWillUnmount:function(){
    zingchart.exec('ConnectDevicesSpeedsChart', 'destroy');//不销毁的话会导致第二次加载这个路由页面的时候会报错。
  },
  render:function(){
    return(
        <div className='connectedDevicesSpeedsContainer' style={{height:this.props.screenHeight-245}}>
          {this.props.isAllDevices?'':<div onClick={this.props.onClickCloseSingleSpeeds} className='closeSingleSpeedsBtn glyphicon glyphicon-remove'></div>}
          <div className='devicesSpeedsTop'>
            {this.props.deviceName? <span>{this.props.deviceName} Devices</span>:<span>All Wi-Fi Devices</span>}
            <p className='speedsTitle'><span className='speedsNum'></span> Mbps</p>
            <p className='speedsState'><span className='speedsGrade'></span>% available</p>
          </div>
          <div className='noDataContainer hide' style={{height:this.props.screenHeight-325}}><p>No Speeds Data!!</p></div>
          <div className='devicesSpeedsBottom'>
            <div id={'ConnectDevicesSpeedsChart'} style={{height:'100%',width:'98%',margin:'0 auto'}}></div>
          </div>
          <TimeSelectionTab/>
        </div>
    );
  }
});
module.exports = ConnectedDevicesSpeeds;
