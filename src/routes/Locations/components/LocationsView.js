import React from 'react'
import Helmet from 'react-helmet'
import LocationsList from './LocationsList'
import ReactTabBar from '../../../components/ReactTabBar'

import logoImg from '../assets/logo.png'
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
      totalPage:0
    }
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Locations');
  },
  _getServerData:function(page,size,keywords){
    var _this = this;
    // var deviceListUrl = APPCONFING.deviceListUrl;//读取配置文件内容
    var deviceListUrl='http://dev.omnyiq.com/xmpp_es'; //测试用。
    $.ajax({
       type: "GET",
       url: deviceListUrl+"/SearchAndDashboardMServlet?page="+page+"&size="+size+"&keywords="+keywords,  //先一次拿100条，相当于一次拿完。
       success: function(data){
         data = JSON.parse(data);
         console.log('ajax----',data.list);
         $.ajax({  //拿实时的是否在线的列表。
           type:"GET",
           url:deviceListUrl+"/GetOnlineStatusServlet",
           success:function(res){
             data.list = _this.formatDeviceList(data.list,JSON.parse(res));
             _this.setState({deviceList:data.list || [],totalDevices:data.totaldevices,totalPage:data.totalpage});
             //缓存第一条数据
             let _data = data.list[0].value1;
             let deviceId = _data.id;
             let deviceName = _data.geoIp.city_Name;
             let deviceScore = _data.score;
             let deviceN = _data.device_Type;
             let deviceInfo = {deviceId,deviceName,deviceScore,deviceN};
             localStorage.setItem('deviceInfo',JSON.stringify(Object.assign({},deviceInfo,_data)));
             //加载数据后把第一条数据缓存起来 作为默认
           }
         });
       }
    });
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
  formatDeviceList:function(list,onlineObj){ //前端重新解析一下后端数据,做兼容处理或者构造前端数据。
    if(!list || list.length <= 0){return []}
    for(let obj of list){
      obj.value1.geoIp = obj.value1.geoIp || {'city_Name':'unknown','area_Name':'','region_Name':'unknown','country_Name':'unknown'};
      // obj.value1.device_Type = obj.value1.geoIp.city_Name.indexOf('Changsha')==-1?'House':'Office';// 测试用数据,先写死。
      obj.value1.onlineStatus = (onlineObj[obj.value1.id] || 'OFFLINE').toUpperCase();
      obj.value1.deviceScoreLevel = this._getDeviceScoreLevel(obj.value1.score);
      obj.value1.deviceScoreLevel = (obj.value1.onlineStatus == "ONLINE") ? obj.value1.deviceScoreLevel : 0; //不在线的话就用第0张为灰色的图片。
    }
    return list;
  },
  componentDidMount:function(){
    $('.SubNavOption ul li').first().addClass('current');
    this._getServerData(1,100,'');
  },
  onClickLocationsItem:function(deviceInfo,value1){
    this.props.setTabBarState('/Dashboard');
    this.context.router.push('/Dashboard');
    localStorage.setItem('deviceInfo',JSON.stringify(Object.assign({},deviceInfo,value1)));
  },
  _onClickRightIcon:function(e){
    $('.navbarDiv').html('<div class="form-group searchForm">'+
        '<input type="text" class="form-control" />'+
        '<span class="searchWithInput"><img class="searchImg" src='+searchImg+'/>'+
        '</span></div>');
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
  },
  render() {
    return (
      <div>
        <div className='navbarDiv' onClick={this._onClickSearch}>
          <div className='navTitle'><img src={logoImg}/></div>
          <div className='navbarRight' onClick={this._onClickRightIcon}>
            <img src={searchImg}/>
          </div>
        </div>
        <div className='SubNavOption' style={{backgroundColor:'#F1F1F3'}}>
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
