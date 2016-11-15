import React from 'react';
import axios from 'axios'
import Helmet from 'react-helmet'
import ReactTabBar from '../../../components/ReactTabBar'
import RouterNode from './routerNode';

import logoImg from '../../../static/assets/logo.png';
import InternetImg from '../assets/Internet.png';

import wifiImg from '../assets/device/wifi.png';

import NetworkImgs from './NetworkImgs';

import './NetworkView.scss'

var NetworkView = React.createClass({
  getInitialState:function(){
    return{
      InternetImg,
      NetworkImgs:NetworkImgs,
      screenHeight:0,
      deviceShortId:'',
      deviceName:'',
      deviceN:''
    }
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Network');
    this.props.setNetworkData({});
  },
  shouldComponentUpdate:function(nextProps,nextState){
    return true;
  },
  componentDidMount:function(){
    var _this = this;
    let deviceInfo = localStorage.getItem('deviceInfo');
    deviceInfo = JSON.parse(deviceInfo);
    this.setState({
      mySwiper:null,
      screenHeight:parseInt(document.documentElement.clientHeight),
      deviceShortId:deviceInfo.deviceId.substr(deviceInfo.deviceId.length-4),
      deviceName:deviceInfo.deviceName,
      deviceN:deviceInfo.deviceN,
      deviceNum:0, //在线的总设备个数
      wiredDeviceNum:0,  //在线的有线设备的个数
      value3:null,
      attached_Devices:null
    });
    $(window).resize(function(){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    $(window).scroll(function(event){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    if(!this.props.networkData||!this.props.networkData.value3){ //如果是通过前端路由跳转到改页面的则不会在服务端去拿数据。
      // window.location.reload();
      this.getServerData();
    }else{
      this.updateStateProps(this.props.networkData);
    }
  },
  getServerData:function(){
    var _this = this;
    let tempUrl = APPCONFING.deviceListUrl+'/GetConnectedDeviceByIdServlet';
    let CancelToken = axios.CancelToken;
    axios.get(tempUrl,{
      cancelToken:new CancelToken((c) => {
        _this.axiosCancel = c;
      })
    }).then(({data}) => {
      // console.log('Network ajax--->',data);
      _this.updateStateProps(data);
    }).catch((error) => {});
  },
  updateStateProps:function(networkData){
    var _this = this;
    var value3 = networkData.value3;
    var valueObj = networkData.value3[0];
    var deviceNum = valueObj.device_num;
    var wiredDeviceNum = valueObj.wireddevice_num;
    var attached_Devices = [];
    for(let obj of valueObj.attached_Devices){
      if(obj.stations && obj.stations.isOnline){
        attached_Devices.push(obj);
      }
    }
    _this.setState({
      deviceNum:deviceNum,
      wiredDeviceNum:wiredDeviceNum,
      value3:value3,
      attached_Devices:attached_Devices
    });
  },
  componentDidUpdate:function(){
    var _this = this;
    if(this.state.attached_Devices && this.state.attached_Devices.length>=0 && !this.state.mySwiper){
        var mySwiper = new Swiper('.swiper-container', {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          pagination: '.swiper-pagination',
          paginationType: 'progress',
          onSlideChangeEnd: function(swiper){
          }
        });
        this.setState({mySwiper:mySwiper});
    }
  },
  _getDeviceIconsHtml:function(){
    if(!this.state.value3){
        return (<div className="devicesContainer"><div className='row' style={{fontSize:'3rem'}}>loading...</div></div>);
    }
    if(this.state.value3 && (!this.state.attached_Devices || this.state.attached_Devices.length<=0)){
        return (<div className="devicesContainer"><div className='row'>No Connected Device!!</div></div>);
    }
    var sliderArr = [];
    var rowArr = [];
    var deviceIconArr = [];
    for(let obj of this.state.attached_Devices){
      var imgUrl = '', isWifi = false, wifiIcon = '';
      if (!obj.stations.type || obj.stations.type == 'unknown') {
        imgUrl = this.state.NetworkImgs['NetworkDeviceDetails'];
      }else {
        imgUrl =this.state.NetworkImgs[obj.stations.type];
      }
      if(obj.freq == '2.4Ghz' || obj.freq == '5Ghz'){
        wifiIcon = <img className='littleWifiIcon' src={wifiImg} />
      }
      var perIcon = <div key={Math.random()} className="perIcon">
                        <img className='perIconImg' src={imgUrl}/>
                        {wifiIcon}
                        <p>{obj.stations.name}</p>
                    </div>
      deviceIconArr.push(perIcon);
    }
    for(var i=0,len=deviceIconArr.length;i<len;i+=3){
      var rowHtml = <div key={Math.random()} className="row">
                        {deviceIconArr[i]}
                        {i+1<len ? deviceIconArr[i+1]:''}
                        {i+2<len ? deviceIconArr[i+2]:''}
                    </div>;
      rowArr.push(rowHtml);
    }
    for(var i=0,len=rowArr.length;i<len;i+=2){
      var devicesHtml = <div key={Math.random()} className="swiper-slide">
                          <div className="devicesContainer">
                            {rowArr[i]}
                            {i+1<len ? rowArr[i+1]:''}
                          </div>
                        </div>;
      sliderArr.push(devicesHtml);
    }
      return (<div className='swiper-container'>
                <div className='swiper-wrapper'>
                  {sliderArr}
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>);
  },
  componentWillUnmount:function(){
    $(window).off();
    this.axiosCancel && this.axiosCancel();
  },
  render() {
    return (
      <div>
        <Helmet title='Network'/>
        <div className='scrollBackground'></div>
        <div className='navbarDiv'>
          <div className='navTitle'><img src={logoImg}/></div>
        </div>
        <div className='networkContainer contentFixed' style={{height:this.state.screenHeight-110}}>
            <div className='networkTitleContainer'>
              <p className='networkTitle'>{this.state.deviceName} {this.state.deviceN} {this.state.deviceShortId}</p>
            </div>
            {this._getDeviceIconsHtml()}
            <RouterNode />
            <div className='internetIconContainer'>
              <div className='internetLine' style={{}}></div>
              <div className='internetIcon'>
                <img src={this.state.InternetImg}/>
                <p>Internet</p>
              </div>
            </div>
        </div>
        <ReactTabBar
          setTabBarState={this.props.setTabBarState}
          setTabBarIsShow={this.props.setTabBarIsShow}
          tabBarState={this.props.tabBarState}
          tabBarIsShow={this.props.tabBarIsShow} />
      </div>
    );
  }
});

module.exports = NetworkView;
