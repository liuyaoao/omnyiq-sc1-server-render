//手机底部菜单导航， 依赖react JQ
//需要父组件传值 变量 tabarList
//数据结构 [{},{}]    {url:'#',icon:'icon.png',selectedIcon:'icon-1.png',title:'iconTitle'}
// 外面通过调用这句：this.props.dispatch(TabBarAction.setTabBarState(key));来设置底部tab选中哪一个。
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
  componentDidUpdate:function(){
  },
  handleClick(e) {
    e.preventDefault(); //阻止滚动
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
                      <img style={{width:'24px',height:'24px'}} src={icon}/>
                      <p style={{padding:'0',margin:'0',fontSize:'0.8em'}}>{obj.title}</p>
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
