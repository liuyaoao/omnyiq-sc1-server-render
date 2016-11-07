import React from 'react';
import './DashboardView.scss'
import ReactTabBar from '../../../components/ReactTabBar'
import {getDevicesChartData} from './DashboardChartData';
import DashboardHelp from './DashboardHelp';
import logoImg from '../assets/logo.png'
import shareIconImg from '../assets/shareIcon.png'
import differenceImg from '../assets/difference.png'
import goodImg from '../assets/good.png'
import okImg from '../assets/ok.png'

import dashboard_bg1 from '../assets/dashboard_bg1.png'
import dashboard_bg2 from '../assets/dashboard_bg2.png'
import dashboard_bg4 from '../assets/dashboard_bg4.png'

import scoreState0 from '../assets/scoreState0.png'
import scoreState1 from '../assets/scoreState1.png'
import scoreState2 from '../assets/scoreState2.png'
import scoreState3 from '../assets/scoreState3.png'

import wifiImg_1 from '../assets/wifi-1.png'
import wifiImg_2 from '../assets/wifi-2.png'
import wifiImg_3 from '../assets/wifi-3.png'

import House_Grey from '../assets/House_Grey.png'
import House_Green from '../assets/House_Green.png'
import House_Red from '../assets/House_Red.png'
import House_Orange from '../assets/House_Orange.png'
import Office_Grey from '../assets/Office_Grey.png'
import Office_Green from '../assets/Office_Green.png'
import Office_Red from '../assets/Office_Red.png'
import Office_Orange from '../assets/Office_Orange.png'

var DashboardView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return{
      dashboard_bg1,
      dashboard_bg2,
      dashboard_bg4,
      scoreState0,
      scoreState1,
      scoreState2,
      scoreState3,
      House_Grey,
      House_Green,
      House_Red,
      House_Orange,
      Office_Grey,
      Office_Green,
      Office_Red,
      Office_Orange,
      deviceInfo:null,
      screenHeight:0,
      ZingChartH:null,
      ZingChartR:null,
      deviceScore:null,
      bandwithScore:null, //带宽等级的图片url
      capacityScore:null,
      routerConditionScore:null,
      signalScore:null, //中间wifi信号强度数据
      speedsDL:'',
      speedsUL:'',
      myConfig:getDevicesChartData(0,0,'#B5AFAF',0),
    }
  },
  componentWillMount:function(){//请求数据
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Dashboard');
  },
  componentDidMount:function(){
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    console.log("deviceInfo:",deviceInfo);
    let screenHeight=parseInt(document.documentElement.clientHeight);
    let db = (screenHeight-110)/2; //底部的高度--->
    let tx = db/2; //图形的高度--->
    let zingChartH = tx*0.88;
    let zingChartR = zingChartH*40/122.54;  //圆心半径--->

    this.setState({
      screenHeight:screenHeight,
      deviceInfo:deviceInfo,
      ZingChartH:zingChartH,
      ZingChartR:zingChartR,
      deviceScore:deviceInfo.deviceScore,
      bandwithScore:this._getScoreLevel(deviceInfo.bandwithScore), //带宽等级的图片url
      capacityScore:this._getScoreLevel(deviceInfo.capacityScore),
      routerConditionScore:this._getScoreLevel(deviceInfo.routerConditionScore),
      signalScore:this._getSignalScoreLevel(deviceInfo.signalScore)
    });
    var _this = this;
    $(window).resize(function(){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    $(window).scroll(function(event){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    zingchart.render({id : 'DashboradChart',data : this.state.myConfig,height: '98%' ,width: this.state.ZingChartH });
    this._getServerData(deviceInfo.deviceId);
  },
  _getServerData:function(deviceId){
    var _this = this;
    // var deviceListUrl = APPCONFING.deviceListUrl;
    var deviceListUrl='http://dev.omnyiq.com/xmpp_es'; //测试用。
    let oldTimeStamp = parseInt(localStorage.getItem('dashboardTimeStamp') || 0);
    let curTimeStamp = new Date()/1;
    localStorage.setItem('dashboardTimeStamp',curTimeStamp+'');
    if(curTimeStamp - oldTimeStamp > (24*60*60*1000)){//如果间隔超过一天的话就从新进一次Locations页面。
      this.context.router.push('/Locations');
      return;
    }
    $.ajax({
       type: "GET",
       url: deviceListUrl+'/GetSpeedAndConnectedByIdServlet?id='+deviceId,
       success: function(data){
           data = JSON.parse(data);
           _this.setState({value3:data.value3});
           //获取最近一次设备数据
           let knownDevice = 0;
           let unknownDevice = 0;
           let deviceSum = 0;
           let attached_Devices = data.value3.attached_Devices || [];
           deviceSum = attached_Devices.length;
           for(let v of attached_Devices){
             (v.stations.type == 'unknown') ? unknownDevice++ : knownDevice++;
           }
          let knownDeviceColor = (knownDevice == 0) ? "#CBCBCB" : "#EDEDED";
         _this.setState({
             myConfig:getDevicesChartData(deviceSum,knownDevice,knownDeviceColor,unknownDevice)
         });
       }
    });
  },
  componentWillUnmount:function(){
    $(window).off();
    zingchart.exec('DashboradChart', 'destroy');//不销毁的话会导致第二次加载这个路由页面的时候会报错。
  },
  shouldComponentUpdate:function(nextProps, nextState){
    // console.log('nextState.myConfig',this.state.ZingChartH);
    if(this.state.myConfig != nextState.myConfig && nextState.myConfig) {
      zingchart.render({id : 'DashboradChart',data : nextState.myConfig,height: '98%' ,width: this.state.ZingChartH });
    }
    return true;
  },
  _getScoreLevel:function(score){ //获取分数等级 区分颜色
    if(score <= 3.3){
      return differenceImg;
    }else if(score <= 6.7){
      return okImg;
    }else{
      return goodImg;
    }
    return '';
  },
  _getSignalScoreLevel:function(score){
    let obj = {};
    if(score <= 3.3){
      obj.img = wifiImg_1;
    }else if(score <= 6.7){
      obj.img = wifiImg_2;
    }else{
      obj.img = wifiImg_3;
    }
    obj.p = (score*10)+'%';
    obj.span = 'Wi-Fi';
    return obj;
  },
  _onClickToSpeeds:function(){
    this.context.router.push('/Dashboard/Speeds');
  },
  _onClickToCapacity:function(){
    this.context.router.push('/Dashboard/WiFiInsight');
  },
  _onClickToConnected:function(){
    this.context.router.push('/Dashboard/ConnectedDevices');
  },
  _onClickToRouterCondition:function(){
    this.context.router.push('/Dashboard/RouterConditions');
  },
  _onClickNavTitle:function(e){
    this.context.router.push('/Locations');
  },
  _onClickRightIcon:function(){ //弹help提示气泡
    $('.dashboardHelpContainer').removeClass('hide');
  },
  _getHouseImgHtml:function(device_Type,scoreLevel){
    var houseImgColors = ['Grey','Red','Orange','Green'];
    var imgUrl = this.state[device_Type+"_"+houseImgColors[scoreLevel]];
    return <img src={imgUrl} />;
  },

  render:function(){
    if(!this.state.deviceInfo){
      return (<div></div>);
    }
    let _id = this.state.deviceInfo.deviceId.substr(this.state.deviceInfo.deviceId.length-4);
    let signalScore = this.state.signalScore;
    let iconUrl=this.state['scoreState'+this.state.deviceInfo.deviceScoreLevel];
    return (
      <div>
        <div className='scrollBackground'></div>
        <div className='navbarDiv'>
          <div className='navTitle' onClick={this._onClickNavTitle}><img src={logoImg}/></div>
          <div className='navbarRight' onClick={this._onClickRightIcon}>
            <img src={iconUrl} />
          </div>
        </div>
        <div className='Dashboard_content contentFixed' style={{height:this.state.screenHeight-110}}>
          <div className='Dashboard_contentTop'>
            <div className='Dashboard_dashboardInfo'>
              <p>OiQ Score</p>
              <p>{this.state.deviceInfo.deviceName} {this.state.deviceInfo.deviceN} {_id}<img src={shareIconImg} /></p>
            </div>
            <div className='Dashboard_dashboardDetails'>
              <div className={this.state.deviceInfo.deviceN=='House'?'Dashboard_HouseImg':'Dashboard_dashboardImg'}>
                {this._getHouseImgHtml(this.state.deviceInfo.deviceN,this.state.deviceInfo.deviceScoreLevel)}<span>{this.state.deviceScore}</span>
              </div>
            </div>
          </div>
          <div className='Dashboard_contentBottom' >
            <div className='_dashboardButtom1' onClick={this._onClickToSpeeds}>
              <p>Internet Speeds</p>
              <div>
                <img src={this.state['dashboard_bg1']} />
                <p>
                  {this.state.bandwithScore?<img src={this.state.bandwithScore}/>:'loading...' }
                </p>
              </div>
            </div>
            <div className='_dashboardButtom2' onClick={this._onClickToCapacity}>
              <p>Wi-Fi Capacity</p>
              <div>
                <img src={this.state['dashboard_bg2']} />
                <p>
                  {this.state.capacityScore?<img src={this.state.capacityScore}/>:'loading...' }
                </p>
              </div>
            </div>
            <div className='_dashboardButtom3'>
              <div className='ShapesLoad' onClick={this._onClickToConnected}>
                <div id="DashboradChart" style={{height:'100%',width:this.state.ZingChartH+"px",margin:'0 auto'}}></div>
              </div>
              <p>Connected Devices</p>
            </div>
            <div className='_dashboardButtom4' onClick={this._onClickToRouterCondition}>
              <div>
                <img src={this.state['dashboard_bg4']} />
                <p>
                  {this.state.routerConditionScore?<img src={this.state.routerConditionScore}/>:'loading...' }
                </p>
              </div>
              <span>Router Condition</span>
            </div>
            <div className='_dashboardButtomCenter'>
              <p>{signalScore.p}</p>
              {signalScore.img?<img src={signalScore.img} />:'' }
              {signalScore.img?<span>Wi-Fi</span>:'' }
            </div>
            <i></i><s></s>
          </div>
        </div>
        <DashboardHelp
          device_Type={this.state.deviceInfo.deviceN}
          scoreState0={this.state.scoreState0}
          scoreState1={this.state.scoreState1}
          scoreState2={this.state.scoreState2}
          scoreState3={this.state.scoreState3} />
        <ReactTabBar
          setTabBarState={this.props.setTabBarState}
          setTabBarIsShow={this.props.setTabBarIsShow}
          tabBarState={this.props.tabBarState}
          tabBarIsShow={this.props.tabBarIsShow} />
      </div>
    );
  }
});
module.exports = DashboardView;
