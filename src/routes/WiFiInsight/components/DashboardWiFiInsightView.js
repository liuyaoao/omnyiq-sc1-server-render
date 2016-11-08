import React from 'react';
import TimeSelectionTab from '../../../components/TimeSelectionTab';
import ReactTabBar from '../../../components/ReactTabBar';

import TimeNodeSlider from '../../../components/TimeNodeSlider';
import Change2dot4To5GHz from './Change2dot4To5GHz';
import AvailCapacityContent from './AvailCapacityContent';
import ChannelScanContent from './ChannelScanContent';
import ConnectedDevicesSpeeds from '../../ConnectedDevices/components/ConnectedDevicesSpeeds';

import backImg from '../assets/back.png'

import scoreState0 from '../assets/scoreState0.png'
import scoreState1 from '../assets/scoreState1.png'
import scoreState2 from '../assets/scoreState2.png'
import scoreState3 from '../assets/scoreState3.png'

import './DashboardWiFiInsightView.scss'

var DashboardWiFiInsightView = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return{
      scoreState0,
      scoreState1,
      scoreState2,
      scoreState3,
      deviceInfo:null,
      screenHeight:0,
      timeType2Nodes:{'24H':24,'72H':24,'1W':7,'1M':30,'3M':30,'1Y':12},  //每个时间类型下的分的时间点的个数。
      tabKeyList:['wifiScan','capacity','speeds'],
      wifiscanList:[], //当前24H一个小时一条的数据。
      timeIndex2saveTime:[],  //时间timeNode的时间下标对应的真实保存时间的数组。
      wifiscanListGHz:null, //某个时间点的数据
      availableCapacityList:[],  //24H每一个小时一条的总数据。
      availableCapacityGHz:null    //{'20M':[], '40M':[], '80M':[]}
    }
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Dashboard');
    this.props.setCurTabIndex(0); //初始化数据
    this.props.setCurTabKey(this.state.tabKeyList[0]);
    this.props.setSignalType('2.4');

    var curTimeNodes = {};
    var tab2TimeTypes = {};
    for(let key in this.props.curTimeNodes){
      curTimeNodes[key] = {};
      tab2TimeTypes[key] = '24H'; //初始化时间类型为第一种24H的。
      var obj = this.props.curTimeNodes[key];
      for(let i in obj){
        curTimeNodes[key][i] = 0;
      }
    }
    this.props.setCurTimeNodes(curTimeNodes);
    this.props.setTab2TimeTypes(tab2TimeTypes);
  },
  componentDidMount:function(){
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    this.setState({
      deviceInfo:deviceInfo,
      screenHeight:parseInt(document.documentElement.clientHeight)
    });
    let _this = this;
    let props = this.props;
    let _id = deviceInfo.deviceId.substr(deviceInfo.deviceId.length-4);
    $('.navbarDiv .navTitleText .deviceInfoTitle').text(deviceInfo.deviceName+" "+deviceInfo.deviceN+" "+_id);
    var spinner = new Spinner({zIndex:999}).spin($('.loadingSpinContainer')[0]);
    $.ajax({
      type: "GET",
      url: deviceListUrl+'/GetWifiCapacityByIdServlet?id='+deviceInfo.deviceId,
      success: function(data){
        spinner.stop();
        $('.loadingSpinContainer').remove();
        data = JSON.parse(data);
        console.log('WifiCapacity ajax--->',data);
        //解析wifiscanList数据：
        var wifiscanListGHz = null;
        var timeIndex2saveTime = [];
        if(!data.wifiscanList || data.wifiscanList.length<=0){
          $('#wiFiInsightChannelScan .noDataContainer').removeClass('hide');
        }else{
          var timeNodeData = data.wifiscanList[_this.props.curTimeNodes[props.curTabKey][props.tab2TimeTypes[props.curTabKey]]];
          wifiscanListGHz = timeNodeData.wifiscan[_this.props.signalType+'G'];
          for(let obj of data.wifiscanList){
            timeIndex2saveTime.push(obj.savetime);
          }
        }
        //解析availableCapacity数据：
        var availableCapacityGHz = null;
        if(!data.availablecapacity || data.availablecapacity.length<=0){
          $('#wiFiInsightAvailableCapacity .noDataContainer').removeClass('hide');
        }else{
          var timeNodeDataCapacity = data.availablecapacity[_this.props.curTimeNodes[props.curTabKey][props.tab2TimeTypes[props.curTabKey]]];
          availableCapacityGHz = timeNodeDataCapacity[_this.props.signalType+'G'];
        }
        _this.setState({
          wifiscanList:data.wifiscanList,
          availableCapacityList:data.availablecapacity,
          wifiscanListGHz:wifiscanListGHz,
          availableCapacityGHz:availableCapacityGHz,
          timeIndex2saveTime:timeIndex2saveTime
        });
      }
    });
    $(window).resize(function(){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    $(window).scroll(function(event){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
  },
  _showWiFiInsightDiv:function(e){
    let that = $(e.currentTarget);
    if(that.find('p').hasClass('current')) {
      return;
    }
    let index = +that.data('index');
    let tabKey = this.state.tabKeyList[index];
    this.props.setCurTabIndex(index);
    this.props.setCurTabKey(tabKey);
    var timeNode = this.props.curTimeNodes[tabKey][this.props.tab2TimeTypes[tabKey]];
    this._updateState(index,this.props.signalType,timeNode);
  },
  changeSignalType:function(signalType){ //改变信号频率的类型。
    var _this = this,props = this.props;
    this.props.setSignalType(signalType+'');
    var timeNode = _this.props.curTimeNodes[props.curTabKey][props.tab2TimeTypes[props.curTabKey]];
    this._updateState(this.props.curTabIndex,signalType,timeNode);
  },
  _timeNodeValueChanged:function(tabKey,timeNode){ //改变时间点
      var curTimeNodes = {};
      for(let key in this.props.curTimeNodes){
        curTimeNodes[key] = {};
        var obj = this.props.curTimeNodes[key];
        for(let i in obj){
          curTimeNodes[key][i] = obj[i];
        }
      }
      curTimeNodes[tabKey][this.props.tab2TimeTypes[tabKey]] = timeNode;
      this.props.setCurTimeNodes(curTimeNodes);
      this._updateState(this.props.curTabIndex,this.props.signalType,timeNode);
  },
  _updateState:function(tabIndex, signalType, timeNode){ //更新数据
    if(!this.state.wifiscanList || this.state.wifiscanList.length<=0){
      return;
    }
    if(!this.state.availableCapacityList || this.state.availableCapacityList.length<=0){
      return;
    }
    var timeNodeData = this.state.wifiscanList[timeNode];
    var timeNodeDataCapacity = this.state.availableCapacityList[timeNode];
    if(+tabIndex == 0){
      this.setState({wifiscanListGHz:timeNodeData.wifiscan[signalType+'G']});
    }else if(+tabIndex == 1){
      this.setState({availableCapacityGHz:timeNodeDataCapacity[signalType+'G']});
    }
  },
  _onClickRightIcon:function(){
    this.context.router.push('/Locations');
  },
  componentWillUnmount:function(){
    $(window).off();
  },
  render:function(){
    let iconImg = this.state.deviceInfo?this.state['scoreState'+this.state.deviceInfo.deviceScoreLevel]:'';
    let signalType = this.props.signalType;
    return(
      <div>
        <div className='scrollBackground'></div>
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img src={backImg} /></a>
          </div>
          <div className='navTitle navTitleText'>
            <p>Wi-Fi Insight</p>
            <p className='deviceInfoTitle'></p>
          </div>
          <div className='navbarRight' onClick={this._onClickRightIcon}>
            <img src={iconImg} />
          </div>
        </div>

        <div className='wiFiInsightContent contentFixed' style={{height:this.state.screenHeight-110}}>
          <ul className="wiFiInsightContentUl">
            <li className='wiFiInsightChannelScan' onClick={this._showWiFiInsightDiv} data-index='0'>
              <p className={this.props.curTabIndex == 0 ? 'current' : ''}>Channel Scan</p>
            </li>
            <li className='wiFiInsightAvailableCapacity' onClick={this._showWiFiInsightDiv} data-index='1'>
              <p className={this.props.curTabIndex == 1 ? 'current' : ''}>Available Capacity</p>
            </li>
            <li className='allDevicesSpeeds' onClick={this._showWiFiInsightDiv} data-index='2'>
              <p className={this.props.curTabIndex == 2 ? 'current' : ''}>Speeds</p>
            </li>
          </ul>
          <Change2dot4To5GHz tabIndex={this.props.curTabIndex} changeSignalType={this.changeSignalType} signalType={this.props.signalType}/>
          <div id='wiFiInsightChannelScan'
              data-index='0'
              className={this.props.curTabIndex == 0?'wiFiInsightContentBox current':'wiFiInsightContentBox'}
              style={{height:this.state.screenHeight-190}}>
              <div className='loadingSpinContainer' style={{marginTop:'20%'}}></div>
              <div className='noDataContainer hide' style={{position:'absolute'}}><p style={{top:'40%'}}>No Speeds Data!!</p></div>
              <ChannelScanContent wifiscanList={this.state.wifiscanListGHz} signalType={this.props.signalType}  screenHeight={this.state.screenHeight}/>
              <TimeNodeSlider
                  tabIndex={0}
                  timeIndex2saveTime = {this.state.timeIndex2saveTime}
                  curTabIndex={this.props.curTabIndex}
                  sliderId={'wifiScan'}
                  timeNode={this.props.curTimeNodes['wifiScan'][this.props.tab2TimeTypes['wifiScan']]}
                  maxLength={this.state.timeType2Nodes[this.props.tab2TimeTypes['wifiScan']]}
                  tabKey={'wifiScan'}
                  timeNodeValueChanged={this._timeNodeValueChanged}/>
              <TimeSelectionTab/>
          </div>

          <div id='wiFiInsightAvailableCapacity'
              data-index='1'
              className={this.props.curTabIndex == 1?'wiFiInsightContentBox current':'wiFiInsightContentBox'}
              style={{height:this.state.screenHeight-190}}>
              <div className='noDataContainer hide' style={{position:'absolute'}}><p style={{top:'40%'}}>No Speeds Data!!</p></div>
              <AvailCapacityContent availableCapacityGHz={this.state.availableCapacityGHz} signalType={this.props.signalType} screenHeight={this.state.screenHeight}/>
              <TimeNodeSlider
                  tabIndex={1}
                  timeIndex2saveTime = {this.state.timeIndex2saveTime}
                  curTabIndex={this.props.curTabIndex}
                  sliderId={'capacity'}
                  timeNode={this.props.curTimeNodes['capacity'][this.props.tab2TimeTypes['capacity']]}
                  maxLength={this.state.timeType2Nodes[this.props.tab2TimeTypes['capacity']]}
                  tabKey={'capacity'}
                  timeNodeValueChanged={this._timeNodeValueChanged}/>
              <TimeSelectionTab/>
          </div>
          <div className={this.props.curTabIndex == 2 ? 'wiFiInsightContentBox current' : 'wiFiInsightContentBox'} data-index='2'>
              <div style={{padding:'1rem'}}>
                  <ConnectedDevicesSpeeds
                      isAllDevices={true}
                      screenHeight={this.state.screenHeight}
                      bandwidthList={''}/>
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

module.exports = DashboardWiFiInsightView;
