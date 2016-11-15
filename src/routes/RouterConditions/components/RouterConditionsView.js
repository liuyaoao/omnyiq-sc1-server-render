import React from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import ReactTabBar from '../../../components/ReactTabBar'
import TimeSelectionTab from '../../../components/TimeSelectionTab'

import {RectChart,TemperatureChart} from './OtherStatusComponents'
import StatusChartComponent from './StatusChartComponent'

import backImg from '../../../static/assets/back.png'

import scoreState0 from '../../../static/assets/scoreState0.png'
import scoreState1 from '../../../static/assets/scoreState1.png'
import scoreState2 from '../../../static/assets/scoreState2.png'
import scoreState3 from '../../../static/assets/scoreState3.png'

import './RouterConditionsView.scss'

var RouterConditionsView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return {
      scoreState0,
      scoreState1,
      scoreState2,
      scoreState3,
      isGetting:true,
      deviceInfo:null,
      tabKeyList:['status','update','reboot'],
      screenHeight:0,
      cPU_0_Load:0,
      cPU_1_Load:0,
      cPU_Total_Load:0,
      memory_Load:0,
      temperature:0,
      cpuLoadAreaChart:'',
      memoryLoadAreaChart:'',
      temperatureAreaChart:'',
      rebootsAreaChart:''
    };
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Dashboard');
    this.props.setCurTabIndex(0); //初始化数据
    this.props.setCurTabKey(this.state.tabKeyList[0]);
    var tab2TimeTypes = {};
    for(let key of this.state.tabKeyList){
      tab2TimeTypes[key] = '24H';
    }
    this.props.setTab2TimeTypes(tab2TimeTypes);
    this.props.setRouterConditionsData({});
  },
  componentDidMount:function(){
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    this.setState({
      screenHeight:parseInt(document.documentElement.clientHeight),
      deviceInfo:deviceInfo
    });
    let _this = this;
    let _id = deviceInfo.deviceId.substr(deviceInfo.deviceId.length-4);
    $('.navbarDiv .navTitleText .deviceInfoTitle').text(deviceInfo.deviceName+" "+deviceInfo.deviceN+" "+_id);
    $(window).resize(function(){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    // $(window).scroll(function(event){
    //   _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    // });
    if(!this.props.routerConditionsData || !this.props.routerConditionsData.CurrentRouterCondition){ //如果是通过前端路由跳转到改页面的则不会在服务端去拿数据。
      // window.location.reload();
      this.getServerData();
    }else{
      this.updateStateProps(this.props.routerConditionsData);
    }
  },
  getServerData:function(){
    var _this = this;
    let tempUrl = APPCONFING.deviceListUrl+'/GetRouterConditionByIdServlet';
    let CancelToken = axios.CancelToken;
    axios.get(tempUrl,{
      cancelToken:new CancelToken((c) => {
        _this.axiosCancel = c;
      })
    }).then(({data}) => {
      // console.log('RouterCondition ajax--->',data);
      _this.updateStateProps(data);
    }).catch((error)=>{});
  },
  updateStateProps:function(routerConditionsData){
    let data = JSON.parse(JSON.stringify(routerConditionsData)); //如果是初始化的props里传过来的这个数据就要深度clone一份，因为props是只读的
    this.setState({
      isGetting:false,
      cPU_0_Load:data.CurrentRouterCondition.cPU_0_Load,
      // cPU_1_Load:data.CurrentRouterCondition.cPU_1_Load,
      cPU_Total_Load:+(data.CurrentRouterCondition.cPU_Total_Load).toFixed(2),
      memory_Load:+(data.CurrentRouterCondition.memory_Load).toFixed(2),
      temperature:data.CurrentRouterCondition.temperature,
      cpuLoadAreaChart:data.RouterSingleList,
      memoryLoadAreaChart:data.RouterSingleList,
      temperatureAreaChart:data.RouterSingleList,
      rebootsAreaChart:data.RebootsList
    });
  },
  _showRouterConditionsDiv:function(e){
    let that = $(e.currentTarget);
    e.preventDefault();
    if(that.find('p').hasClass('current')) {
      return;
    }
    let index = +that.data('index');
    let tabKey = this.state.tabKeyList[index];
    this.props.setCurTabIndex(index);
    this.props.setCurTabKey(tabKey);
    this._updateState(index);
  },
  _updateState:function(tabIndex){

  },
  _onClickRightIcon:function(e){
    this.context.router.push('/Locations');
  },
  componentWillUnmount:function(){
    // $(window).off();
    this.axiosCancel && this.axiosCancel();
  },
  render:function(){
    let iconImg = this.state.deviceInfo ? this.state['scoreState'+this.state.deviceInfo.deviceScoreLevel]:'';
    var cPU_total_load = this.state.cPU_Total_Load,memory_Load=this.state.memory_Load,dash_temperature=this.state.temperature;
    return (
      <div>
        <Helmet title='RouterConditions'/>
        <div className='scrollBackground'></div>
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img src={backImg} /></a>
          </div>
          <div className='navTitle navTitleText'>
            <p>Router Conditions</p>
            <p className='deviceInfoTitle'></p>
          </div>
          <div className='navbarRight' onClick={this._onClickRightIcon}>
            <img src={iconImg} />
          </div>
        </div>
        <div className='DashboardRouterConditionsContainer contentFixed' style={{height:this.state.screenHeight-102}}>
            <ul className="routerUl">
              <li className='routerStatus' onClick={this._showRouterConditionsDiv} data-index='0'>
                  <p className={this.props.curTabIndex == 0 ? 'current' : ''}>Status</p>
              </li>
              <li className='routerUpdate' onClick={this._showRouterConditionsDiv} data-index='1'>
                  <p className={this.props.curTabIndex == 1 ? 'current' : ''}>Update</p>
              </li>
              <li className='routerReboot' onClick={this._showRouterConditionsDiv} data-index='2'>
                  <p className={this.props.curTabIndex == 2 ? 'current' : ''}>Reboot</p>
              </li>
            </ul>
            <div id='iSlider-wrapper'>
              <div id='routerStatus' className={this.props.curTabIndex == 0 ? 'routerContentBox current' : 'routerContentBox'}>
                <div className="routerStatusContent">
                  <div className="inline" style={{ marginLeft: '1.5rem'}}>
                    <RectChart value={cPU_total_load ? cPU_total_load : 0} sizeWidth="42" sizeHeight="2" space="2"/> <p className={"p-bold " + (cPU_total_load > 80 ? "p-red" : "p-green")} style={{paddingTop:"10px"}}>{cPU_total_load ? cPU_total_load : 0} %</p>
                    <p className={cPU_total_load >= 80 ? "p-red" : "p-green"}>CPU <br/> Usage</p>
                  </div>
                  <div className="inline">
                    <RectChart value={memory_Load ? memory_Load : 0} sizeWidth="42" sizeHeight="2" space="2"/> <p className={"p-bold " + (memory_Load > 80 ? "p-red" : "p-green")} style={{paddingTop:"10px"}}>{memory_Load ? memory_Load : 0}%</p>
                    <p className={memory_Load > 80 ? "p-red" : "p-green"}>Memory <br/> Usage</p>
                  </div>
                  <div className="inline" style={{ marginRight: '2rem'}}>
                    <TemperatureChart currentTemperature={dash_temperature} tickCount={3}/>
                    <p className={(dash_temperature >= 80 ? "" : "p-green")} style={{'textAlign':'right'}}>Temperature</p>
                  </div>
                </div>
                <StatusChartComponent
                    isGetting = {this.state.isGetting}
                    screenHeight={this.state.screenHeight}
                    cpuLoadAreaChart={this.state.cpuLoadAreaChart}
                    memoryLoadAreaChart={this.state.memoryLoadAreaChart}
                    temperatureAreaChart={this.state.temperatureAreaChart}
                    rebootsAreaChart={this.state.rebootsAreaChart}
                     />
                <TimeSelectionTab/>
              </div>
              <div id='routerUpdate' className={this.props.curTabIndex == 1 ? 'routerContentBox current' : 'routerContentBox'}>
                <div style={{margin:'40% auto',textAlign:'center'}}>Online On Version 2.</div>
              </div>
              <div id='routerReboot' className={this.props.curTabIndex == 2 ? 'routerContentBox current' : 'routerContentBox'}>
                <div style={{margin:'40% auto',textAlign:'center'}}>Online On Version 2.</div>
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

module.exports = RouterConditionsView;
