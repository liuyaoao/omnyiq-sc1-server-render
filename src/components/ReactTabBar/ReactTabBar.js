//手机底部菜单导航， 依赖react JQ
//需要父组件传值 变量 tabarList
//数据结构 [{},{}]    {url:'#',icon:'icon.png',selectedIcon:'icon-1.png',title:'iconTitle'}
// 外面通过调用这句：this.props.dispatch(TabBarAction.setTabBarState(key));来设置底部tab选中哪一个。
// key可为：'/Dashboard','/Community','/Locations','/Network'等等。

//yonggang.wei  2016.08.28
// import * as TabBarAction from '../../actions/ReactTabBar_action';
// import { connect } from 'react-redux';
import React from 'react';
import './ReactTabBar.scss';
import dashboardImg from './Dashboard.png'
import dashboardImg_1 from './Dashboard-1.png'

import Community from './Community.png'
import Community_1 from './Community-1.png'

import Locations from './Locations.png'
import Locations_1 from './Locations-1.png'

const ReactTabBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    const tabBarList = [//传给子组件  底部导航
      {url:'/Dashboard',icon:dashboardImg,selectedIcon:dashboardImg_1,title:'Dashboard'},
      {url:'/Community',icon:Community,selectedIcon:Community_1,title:'Community'},
      {url:'/Locations',icon:Locations,selectedIcon:Locations_1,title:'Locations'},
      {url:'/Network',icon:'../../static/icon/Network.png',selectedIcon:'../../static/icon/Network-1.png',title:'Network'},
      {url:'/Settings',icon:'../../static/icon/Settings.png',selectedIcon:'../../static/icon/Settings-1.png',title:'Settings'}
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
    // this.props.dispatch(TabBarAction.setTabBarIsShow(true));
  },
  componentDidUpdate:function(){
  },
  handleClick(e) {
    e.preventDefault(); //阻止滚动
    var toUrl = $(e.currentTarget).data('url');
    // this.props.dispatch(TabBarAction.setTabBarState(toUrl));
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
// test
module.exports = ReactTabBar;
// function mapReactTabBarState(state) {
//   const { tabBarState,tabBarIsShow } = state.ReactTabBarReducer
//   return {
//     tabBarState,
//   }
// }
//
// export default connect(mapReactTabBarState)(ReactTabBar);
