import React from 'react';

var DeviceNode = React.createClass({
  getInitialState:function(){
    return{
    }
  },
  componentWillMount:function(){
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = localStorage.getItem('deviceInfo');
    deviceInfo = JSON.parse(deviceInfo);

    let _this = this;
  },
  render() {
    return (
      <div>
        <div className=''>





        </div>
      </div>
    );
  }
});

module.exports = DeviceNode;
