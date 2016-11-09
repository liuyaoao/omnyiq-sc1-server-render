import React from 'react';

import ReactTabBar from '../../../components/ReactTabBar';
import SubNavOption from '../../../components/SubNavOption';
import logoImg from '../assets/logo.png'
import menuImg from '../assets/menu.png'
import './CommunityView.scss'

var CommunityView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:()=>{
    return {
      subNav:[{ //顶部下面内容
          title:'POPULAR',
          data:[
            {img:'',contentTitle:'Mondial Kaffe 328',describe:'Cafe',starImg:'',starLater:'20 Rationgs',icon:'',score:7.5,url:''},
            {img:'',contentTitle:'Mondial Kaffe 328',describe:'Cafe',starImg:'',starLater:'20 Rationgs',icon:'',score:7.5,url:''}
          ],
        },{
          title:'LATEST',
          data:[],
        },{
          title:'CATEGORIES',
          data:[],
        },
      ],

      communityList:[
        {title:'My internet connection is the worst!!:(',details1:'Submitted 5 hours ago by <_USRNAME_>',
          details2:'Connection Problems',icon1:'',icon1Url:'',icon1Volume:'320',icon2:'',icon2Url:'',icon2Volume:'200'},
      ],
    }
  },

  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Community');
  },
  componentDidMount:function(){
    $('.SubNavOption ul li').first().addClass('current');
  },
  createCommunityList:function(datas){
    let list = [];
    for(let i in datas){
      let div = <div key={i} className='CommunityListLi' >
        <h5>{datas[i].title}</h5>
        <p>{datas[i].details1}</p>
        <div className='CommunityListFooter'>
          <span>{datas[i].details2}</span>
          <p><img src={datas[i].icon1} /><span>{datas[i].icon1Volume}</span></p>
          <p><img src={datas[i].icon2} /><span>{datas[i].icon2Volume}</span></p>
        </div>
      </div>;
      list.push(div);
    }
    return list;
  },
  _onClickRightIcon:function(e){

  },
  render:function(){
    return (
      <div>
          <div className='navbarDiv'>
            <div className='navTitle'><img src={logoImg}/></div>
            <div className='navbarRight' onClick={this._onClickRightIcon}>
              <img src={menuImg}/>
            </div>
          </div>
          <SubNavOption subNav={this.state.subNav} />
          <div className='communityList'>
            <div style={{margin:'40% auto',textAlign:'center'}}>Online On Version 2.</div>
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
module.exports = CommunityView;
