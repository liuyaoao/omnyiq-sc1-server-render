import React from 'react';
import router1_Img from '../assets/router1.png';

var RouterNode = React.createClass({
  getInitialState:function(){
    return{

    }
  },
  componentWillMount:function(){
    // let deviceListUrl = APPCONFING.deviceListUrl;
    // let deviceInfo = localStorage.getItem('deviceInfo');
    // deviceInfo = JSON.parse(deviceInfo);

    let _this = this;
  },
  render() {
    return (
        <div className='routerIconContainer'>
            <div className='routerIconLine'></div>
            <div className='routerIconLine'></div>
            <div className='routerIconLine lastLine'></div>
            <div className='routerIcon'>
              <img src={router1_Img}/>
            </div>
        </div>
    );
  }
});

module.exports = RouterNode;
