import React from 'react'
import axios from 'axios'

import Helmet from 'react-helmet'
import LocationsList from './LocationsList'
import ReactTabBar from '../../../components/ReactTabBar'

import logoImg from '../../../static/assets/logo.png'
import searchImg from '../assets/search.png'

import './LocationsView.scss'

var LocationsView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return {
      device_Types:['House','Office'], //设备的类型。
      tabKeyList:['myLocations','publicLocations'],
      deviceList:null,
      totalDevices:0,
      totalPage:0,
      axiosSource:null
    }
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Locations');
    this.props.setRoutersData({});
  },
  componentDidMount:function(){
    var _this = this;
    $('.SubNavOption ul li').first().addClass('current');
    let curTimeStamp = new Date()/1;
    localStorage.setItem('dashboardTimeStamp',curTimeStamp+'');
    if(!this.props.routersData||!this.props.routersData.list){ //如果是通过前端路由跳转到改页面的则不会在服务端去拿数据。
      // window.location.reload();
      this._getServerData(1,100,'');
    }else{
      this.updateStateProps(this.props.routersData,this.props.routersOnlineStatus);
    }
  },
  _getServerData:function(page,size,keywords){
    var _this = this;
    var axiosSource = axios.CancelToken.source();
    this.setState({axiosSource});
    var deviceListUrl = APPCONFING.deviceListUrl;//读取配置文件内容
    // var deviceListUrl='http://dev.omnyiq.com/xmpp_es'; //测试用。
    var tempUrl = deviceListUrl+"/GetLocationsServlet?page="+page+"&size="+size+"&keywords="+keywords;
    axios.get(tempUrl,{cancelToken: axiosSource.token}).then(({data}) => {
      // console.log('axios--ajax----',data);
      _this.updateStateProps(data,{});
      _this._getRouterDeviceOnlineState(data);
    }).catch((error) => {});
  },
  _getRouterDeviceOnlineState:function(routersData){
    var _this = this;
    var deviceListUrl = APPCONFING.deviceListUrl;//读取配置文件内容
    var tempUrl = deviceListUrl+"/CheckRouterStatusServlet?ids="+routersData.ids;
    axios.get(tempUrl,{cancelToken: this.state.axiosSource.token}).then(({data}) => {
      _this.updateStateProps(routersData,data);
    }).catch((error) => {});
  },
  _getDeviceScoreLevel:function(score){
    if(score <= 3.3){
      return 1;
    }else if(score <= 6.7){
      return 2;
    }else{
      return 3;
    }
    return 0;
  },
  updateStateProps:function(routersData,onlineStatus){ //跟新待渲染的状态和属性。
    let res = JSON.parse(JSON.stringify(routersData)); //如果是初始化的props里传过来的这个数据就要深度clone一份，因为props是只读的
    res.list = this.formatDeviceList(res.list,onlineStatus);
    this.setState({deviceList:res.list,totalDevices:res.totaldevices,totalPage:res.totalpage});
    //缓存第一条数据
    let _data = res.list[0].value1;
    let deviceId = _data.id;
    let deviceName = _data.geoIp.city_Name;
    let deviceScore = _data.score;
    let deviceN = _data.device_Type;
    let deviceInfo = {deviceId,deviceName,deviceScore,deviceN};
    localStorage.setItem('deviceInfo',JSON.stringify(Object.assign({},deviceInfo,_data)));
    //加载数据后把第一条数据缓存起来 作为默认
  },
  formatDeviceList:function(list,onlineObj){ //前端重新解析一下后端数据,做兼容处理或者构造前端数据。
    if(!list || list.length <= 0){return []}
    for(let obj of list){
      obj.value1.geoIp = obj.value1.geoIp || {'city_Name':'unknown','area_Name':'','region_Name':'unknown','country_Name':'unknown'};
      // obj.value1.device_Type = obj.value1.geoIp.city_Name.indexOf('Changsha')==-1?'House':'Office';// 测试用数据,先写死。
      obj.value1.onlineStatus = (onlineObj[obj.value1.id] || 'ONLINE').toUpperCase();
      obj.value1.deviceScoreLevel = this._getDeviceScoreLevel(obj.value1.score);
      obj.value1.deviceScoreLevel = (obj.value1.onlineStatus == "ONLINE") ? obj.value1.deviceScoreLevel : 0; //不在线的话就用第0张为灰色的图片。
    }
    return list;
  },
  onClickLocationsItem:function(deviceInfo,value1){
    this.props.setTabBarState('/Dashboard');
    this.context.router.push('/Dashboard');
    localStorage.setItem('deviceInfo',JSON.stringify(Object.assign({},deviceInfo,value1)));
  },
  _onClickRightIcon:function(e){
    var searchImgEle = $('.navbarRight img').clone().addClass('searchImg');
    $('.navbarDiv').css("box-shadow",'0 0 0').html('<div class="form-group searchForm">'+
        '<input type="text" class="form-control" />'+
        '<span class="searchWithInput">'+
        '</span></div>');
    $('.navbarDiv .searchWithInput').append(searchImgEle);
    $('.searchForm input').focus();
  },
  _onClickSearch:function(e){  //搜索按钮（放大镜）的点击
    let that = $(e.currentTarget);
    let clickEle = $(e.target);
    if(!clickEle.hasClass('searchImg')){
      return;
    }
    this._getServerData(1,100,that.find('.searchForm input[type=text]').val());
  },
  _onClickTabDiv:function(e){
    let that = $(e.currentTarget);
    if(that.find('p').hasClass('current')) {
      return;
    }
    let index = +that.data('index');
    let tabKey = this.state.tabKeyList[index];
    this.props.setCurTabIndex(index);
    this.props.setCurTabKey(tabKey);
  },
  componentWillUnmount:function(){
    $(window).off();
    this.state.axiosSource && this.state.axiosSource.cancel();
  },
  render() {
    return (
      <div>
        <Helmet title='Locations' />
        <div className='navbarDiv' onClick={this._onClickSearch}>
          <div className='navTitle'><img src={logoImg}/></div>
          <div className='navbarRight' onClick={this._onClickRightIcon}>
            <img className='searchImg' src={searchImg}/>
          </div>
        </div>
        <div className='middleContent'>
          <div className='SubNavOption'>
            <ul className=''>
              <li className={this.props.curTabIndex == 0 ? 'locationsTabLi current' : 'locationsTabLi'} onClick={this._onClickTabDiv} data-index='0'>
                  <p className=''>My Locations</p>
              </li>
              <li className={this.props.curTabIndex == 1 ? 'locationsTabLi current' : 'locationsTabLi'} onClick={this._onClickTabDiv} data-index='1'>
                  <p className=''>Public Locations</p>
              </li>
            </ul>
            <div className={this.props.curTabIndex == 0 ? 'locationsContentBox current' : 'locationsContentBox'} data-index='0'>
                <LocationsList deviceList={this.state.deviceList} onClickLocationsItem={this.onClickLocationsItem}/>
            </div>
            <div className={this.props.curTabIndex == 1 ? 'locationsContentBox current' : 'locationsContentBox'} data-index='1'>
              <div style={{position:'fixed',top:'50%',left:'50%',transform:'translateX(-50%)','background':'#F1F1F3'}}>Online On Version 2.</div>
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

module.exports = LocationsView;
