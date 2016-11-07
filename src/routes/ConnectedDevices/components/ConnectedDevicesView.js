import React from 'react';
import { connect } from 'react-redux';
import ReactNavbar from '../smallComponent/ReactNavbar';
import * as TabBarAction from '../../actions/ReactTabBar_action';
import ConnectedDevicesSpeeds from './ConnectedDevicesSpeeds';
// var ZingChart = require('zingchart-react').core;
var DashboardConnectedDivices = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return {
      screenHeight:parseInt(document.documentElement.clientHeight),
      timeType2Nodes:{'24H':24,'72H':24,'1W':7,'1M':30,'3M':30,'1Y':12},  //每个时间类型下的分的时间点的个数。
      tabKeyList:['unknown','online','speeds'],
      chooseShowSpeedsDevice:'',
      allConnectedDevices:null,
      onlineList:null,
      offlineList:null,
      unknownList:null,
      knownList:null,
      isAll:true,
      bandwidthList:null
    }
  },
  componentWillMount:function(){
    this.props.dispatch(TabBarAction.setTabBarState('/Dashboard'));
    var deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    var _this = this;
    $.ajax({
       type: "GET",
       url: deviceListUrl+'/GetConnectedDeviceByIdServlet?id='+deviceInfo.deviceId,
       success: function(data){
         _this.state.spinner && _this.state.spinner.stop();
         data = JSON.parse(data);
         let connectDevices = data.value3[0].attached_Devices;
         let _unknownList = [],_knownList = [],onlineList=[],offlineList=[];
         for(let obj of connectDevices){
           (obj.stations.type == 'unknown')?_unknownList.push(obj):_knownList.push(obj);
           (obj.stations.isOnline)?onlineList.push(obj):offlineList.push(obj);
         }
         _this.setState({allConnectedDevices:connectDevices,unknownList:_unknownList,knownList:_knownList,onlineList:onlineList,offlineList:offlineList});
       }
     });
  },
  componentDidMount:function(){
    var _this = this;
    var spinner = new Spinner({zIndex:999}).spin($('.loadingSpinContainer')[0]);
    _this.setState({spinner:spinner});
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    let _id = deviceInfo.deviceId.substr(deviceInfo.deviceId.length-4);
    $('.navTitleText .deviceInfoTitle').text(deviceInfo.deviceName+" "+deviceInfo.deviceN+" "+_id);
  },
  _onShowOneDeviceSpeeds:function(e){  //点击单个连接的设备去获取speed信息。
    var _this = this;
    var deviceListUrl = APPCONFING.deviceListUrl;
    let macAddress = $(e.currentTarget).data('macaddress');
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    $.ajax({
       type: "GET",
       url: deviceListUrl+'/GetSingleBandwithServlet?id='+deviceInfo.deviceId+'&mac='+macAddress,
       success: function(data){
         data = JSON.parse(data);
        //  console.log("GetSingleBandwithServlet-->",data);
         for(let obj of data.SingleBandwithList){
            obj.total_bandwidth = +(+obj.total_bandwidth || 0).toFixed(2);
            obj.used = +(+obj.used || 0).toFixed(2);
          }
         _this.setState({bandwidthList:data.SingleBandwithList,chooseShowSpeedsDevice:deviceInfo.deviceName});
         $('.devicesContentBox').removeClass('current');
         $('#devicesSpeeds').removeClass('hide');
       }
     });
  },
  onClickCloseSingleSpeeds:function(){
    var index = $(".devicesUl li p.current").closest('li').data("index");
    $('.devicesContentBox[data-index='+index+']').addClass('current');
    $('#devicesSpeeds').addClass('hide');
  },
  _showDevicesDiv:function(e){
    let that = $(e.currentTarget);
    let index = +that.data('index');
    $(".devicesContentBox.current").removeClass("current");
    $(".devicesUl").find('li p').removeClass("current");
    that.find('p').addClass('current');
    $('.devicesContentBox[data-index='+index+']').addClass('current');
    $('#devicesSpeeds').addClass('hide');
  },
  _createUnknownDeviceList:function(DeviceList){
    let list = [];
    for(let i in DeviceList){
      var obj = DeviceList[i];
      let average_signal_strength = null;
      if(DeviceList[i].stations.average_signal_strength){
        average_signal_strength = <p>Average Signal Strength<span> {DeviceList[i].stations.average_signal_strength}</span></p>
      }
      let li = <li key={i} onClick={this._onShowOneDeviceSpeeds} data-macaddrass={obj.stations.macAddress}>
        <div className='deviceItemContainer'>
          <div className='DeviceListImg'><img src="./public/icon/TV_Unknown.png" /></div>
          <div className='DeviceListContent'>
            <p className='contentTitle'>&lt; {DeviceList[i].stations.name} &gt;</p>
            <p>{DeviceList[i].stations.brand =='null'?'Unknown':DeviceList[i].stations.brand}</p>
            <p>Channel {DeviceList[i].freq}</p>
            {average_signal_strength}
          </div>
          {this._createWifiIcon(DeviceList[i])}
        </div>
        <s></s>
      </li>;
      list.push(li);
    }
    return <ul className='DeviceListUl'>{list}</ul>;
  },
  _createWifiIcon:function(Device){
    if(Device.freq == 'wired'){
      return;
    }
    let signalScore;
    if(Device.freq == '5Ghz'){
      signalScore = 100+Device.stations.rSSI_5G;
    }
    if(Device.freq == '2.4Ghz'){
      signalScore = 100+Device.stations.rSSI;
    }
    let signalIcon = '';
    if(signalScore<25){
      signalIcon = './public/icon/wifi-4.png';
    }else if(signalScore<50){
      signalIcon = './public/icon/wifi-3.png';
    }else if(signalScore<75){
      signalIcon = './public/icon/wifi-2.png';
    }else{
      signalIcon = './public/icon/wifi-1.png';
    }
    return <div className='DeviceListSignal'>
      <p style={{color:'#888'}}>{signalScore}%</p>
      <img src={signalIcon}/></div>;
  },

  _createOnlineDeviceList:function(DeviceList){//创建在线的设备列表
    let list = [];
    for(let i in DeviceList){
      var obj = DeviceList[i];
      let average_signal_strength = null;
      if(DeviceList[i].stations.average_signal_strength){
        average_signal_strength = <p>Average Signal Strength<span> {DeviceList[i].stations.average_signal_strength}</span></p>
      }
      let li = <li key={i} onClick={this._onShowOneDeviceSpeeds} data-macaddrass={obj.stations.macAddress}>
        <div className='deviceItemContainer'>
          <div className='DeviceListImg'><img src="./public/icon/TV_Online.png" /></div>
          <div className='DeviceListContent'>
            <p className='contentTitle'>&lt; {DeviceList[i].stations.name} &gt;</p>
            <p>{DeviceList[i].stations.brand =='null'?'Unknown':DeviceList[i].stations.brand}</p>
            <p>Channel {DeviceList[i].freq}</p>
            {average_signal_strength}
          </div>
          {this._createWifiIcon(DeviceList[i])}
        </div>
        <s></s>
      </li>;
      list.push(li);
    }
    return <ul className='DeviceListUl'>{list}</ul>;
  },
  _createOfflineDeviceList:function(DeviceList){//创建在线的设备列表
    let list = [];
    for(let i in DeviceList){
      var obj = DeviceList[i];
      let average_signal_strength = null;
      if(DeviceList[i].stations.average_signal_strength){
        average_signal_strength = <p>Average Signal Strength<span> {DeviceList[i].stations.average_signal_strength}</span></p>
      }
      let li = <li key={i} onClick={this._onShowOneDeviceSpeeds} data-macaddrass={obj.stations.macAddress}>
        <div className='deviceItemContainer'>
          <div className='DeviceListImg'><img src="./public/icon/TV_Offline.png" /></div>
          <div className='DeviceListContent'>
            <p className='contentTitle'>&lt; {DeviceList[i].stations.name} &gt;</p>
            <p>{DeviceList[i].stations.brand =='null'?'Unknown':DeviceList[i].stations.brand}</p>
            <p>Channel {DeviceList[i].freq}</p>
            {average_signal_strength}
          </div>
          {this._createWifiIcon(DeviceList[i])}
        </div>
        <s></s>
      </li>;
      list.push(li);
    }
    return <ul className='DeviceListUl'>{list}</ul>;
  },
  componentWillUnmount:function(){
    $(window).off();
  },
  _onClickRightIcon:function(){
    this.context.router.push('/Locations');
  },
  render:function(){
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    return (
      <div>
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img src='./public/icon/back.png' /></a>
          </div>
          <div className='navTitle navTitleText'>
            <p>Connected Devices</p>
            <p className='deviceInfoTitle'></p>
          </div>
          <div className='navbarRight' onClick={this._onClickRightIcon}>
            <img src={'./public/icon/scoreState'+deviceInfo.deviceScoreLevel+'.png'} />
          </div>
          <div id="dashboardPopover">
          </div>
        </div>
        <div className='loadingSpinContainer' style={{marginTop:'60%'}}></div>
        <div className='dashboardContent'>
          <ul className="devicesUl">
            <li className='devicesOnline' onClick={this._showDevicesDiv} data-index={'0'}><p className='current'>Online</p></li>
            <li className='devicesUnknown' onClick={this._showDevicesDiv} data-index={'1'}><p>Unknown</p></li>
            <li className='devicesOffline' onClick={this._showDevicesDiv} data-index={'2'}><p>Offline</p></li>
          </ul>
          <div id='devicesOnline' className='devicesContentBox current' data-index={'0'}>
          {this._createOnlineDeviceList(this.state.onlineList)}
          </div>
          <div id='devicesUnknown' className='devicesContentBox' data-index={'1'}>
            {this._createUnknownDeviceList(this.state.unknownList)}
          </div>
          <div id='devicesOffline' className='devicesContentBox' data-index={'2'}>
            {this._createOfflineDeviceList(this.state.offlineList)}
          </div>
          <div id='devicesSpeeds' className='hide'>
            <ConnectedDevicesSpeeds
                isAllDevices={false}
                deviceName={this.state.chooseShowSpeedsDevice}
                onClickCloseSingleSpeeds={this.onClickCloseSingleSpeeds}
                screenHeight={this.state.screenHeight}
                bandwidthList={this.state.bandwidthList}
             />
          </div>
        </div>
      </div>
  )}
});
//
function mapDashboardConnectedDivices(state) {
  const { tabBarState } = state.ReactTabBarReducer;
  return {
    tabBarState
  }
}
export default connect(mapDashboardConnectedDivices)(DashboardConnectedDivices);
