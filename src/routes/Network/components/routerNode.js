import React from 'react';
import router1_Img from '../assets/router1.png';

var RouterNode = React.createClass({
  getInitialState:function(){
    return{
      router1_Img:''
    }
  },
  componentDidMount:function(){
    this.setState({router1_Img:router1_Img});
    // let deviceListUrl = APPCONFING.deviceListUrl;
    // let deviceInfo = localStorage.getItem('deviceInfo');
    // deviceInfo = JSON.parse(deviceInfo);
  },
  render() {
    return (
        <div className='routerIconContainer'>
            <div className='routerIconLine'></div>
            <div className='routerIconLine'></div>
            <div className='routerIconLine lastLine'></div>
            <div className='routerIcon'>
              <img src={this.state.router1_Img}/>
            </div>
        </div>
    );
  }
});

module.exports = RouterNode;
