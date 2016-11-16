//手机底部菜单导航， 依赖react JQ
// key可为：'/Dashboard','/Community','/Locations','/Network'等等。
import React from 'react';
import './ReactTabBar.scss';
import dashboardImg from './assets/Dashboard.png'
import dashboardImg_1 from './assets/Dashboard-1.png'

import Community from './assets/Community.png'
import Community_1 from './assets/Community-1.png'

import Locations from './assets/Locations.png'
import Locations_1 from './assets/Locations-1.png'

import Network from './assets/Network.png'
import Network_1 from './assets/Network-1.png'

import Settings from './assets/Settings.png'
import Settings_1 from './assets/Settings-1.png'

const ReactTabBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    const tabBarList = [//传给子组件  底部导航
      {url:'/Dashboard',icon:dashboardImg,selectedIcon:dashboardImg_1,title:'Dashboard'},
      {url:'/Community',icon:Community,selectedIcon:Community_1,title:'Community'},
      {url:'/Locations',icon:Locations,selectedIcon:Locations_1,title:'Locations'},
      {url:'/Network',icon:Network,selectedIcon:Network_1,title:'Network'},
      {url:'/Settings',icon:Settings,selectedIcon:Settings_1,title:'Settings'}
    ];
    let tabBarMap = {};
    for(let obj of tabBarList){
      tabBarMap[obj.url] = obj;
    }
    return {
      tabBarMap:tabBarMap,
      tabBarList:tabBarList
    }
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
  },
  componentDidMount:function(){
    let _this = this;
    if(this.props.setScreenHeight){
      this.props.setScreenHeight(parseInt(document.documentElement.clientHeight));
      $(window).resize(function(){
        _this.props.setScreenHeight(parseInt(document.documentElement.clientHeight));
      });
      $(window).scroll(function(event){
        _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
      });
    }
  },
  componentWillUnmount:function(){
    $(window).off();
  },
  componentDidUpdate:function(){
  },
  handleClick(e) {
    var toUrl = $(e.currentTarget).data('url');
    this.props.setTabBarState(toUrl);
    this.context.router.push(toUrl);
  },
  createTabbar:function(tabBarList){
    var newList = [];
    var tabBarState = this.props.tabBarState;
    let i=0;
    for(let obj of tabBarList){
      var icon = (obj.url == tabBarState) ? obj.selectedIcon : obj.icon;
      var elemStr = <div key={i} style={{textAlign:'center'}} onClick={this.handleClick} data-i = {i} data-url={obj.url}>
                      <img src={icon}/>
                      <p style={{padding:'0',margin:'0'}}>{obj.title}</p>
                    </div>;
      i++;
      newList.push(elemStr);
    }
    return newList;
  },
  render() {
    var isLoading = true;
    return (
      <div style={{display:this.props.tabBarIsShow?'block':'none'}}>
        <div className="appTabBar">
          {this.createTabbar(this.state.tabBarList)}
        </div>
      </div>
    )
  }
});
module.exports = ReactTabBar;
