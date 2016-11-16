import React from 'react'

import {scoreState0,scoreState1,scoreState2,scoreState3,
        Dashboard_House0,Dashboard_House1,Dashboard_House2,Dashboard_House3,
      Dashboard_Office0,Dashboard_Office1,Dashboard_Office2,Dashboard_Office3} from '../../../components/ImagesAssets'

var LocationsItem = React.createClass({
  getInitialState:function(){
    return{
      scoreState0,
      scoreState1,
      scoreState2,
      scoreState3,
      Dashboard_House0,
      Dashboard_House1,
      Dashboard_House2,
      Dashboard_House3,
      Dashboard_Office0,
      Dashboard_Office1,
      Dashboard_Office2,
      Dashboard_Office3
    }
  },
  _onClickToDetails:function(e){
    var that = $(e.currentTarget);
    var deviceId = that.attr("data-deviceId");
    var deviceScore = that.attr("data-deviceScore");
    var deviceName = that.attr("data-deviceName");
    var deviceN = that.attr("data-device_Type");
    var deviceScoreLevel = that.attr("data-deviceScoreLevel");
    this.props.onClickLocationsItem({deviceId,deviceName,deviceScore,deviceN,deviceScoreLevel},that.data('value1'));
  },
  getItemHtml:function(item){
    var deviceIcon=this.state['Dashboard_'+item.value1.device_Type+item.value1.deviceScoreLevel];
    let iconUrl=this.state['scoreState'+item.value1.deviceScoreLevel];
    let scoreColorArr=['#9E9B9B', '#DC3B30','#F3A533','#00BF19'];
    let value1Str = JSON.stringify(item.value1);
    var _id = item.value1.id.substr(item.value1.id.length-4);
    var li = <div className='deviceList'
                  data-value1={value1Str}
                  data-deviceId={item.value1.id}
                  data-deviceName={item.value1.geoIp.city_Name}
                  data-deviceScore={item.value1.score}
                  data-device_Type={item.value1.device_Type}
                  data-deviceScoreLevel={item.value1.deviceScoreLevel}
                  onClick={this._onClickToDetails}>
                <p className='deviceIcon'><img src={deviceIcon} /></p>
                <p className='deviceTitle'><span>{item.value1.geoIp.city_Name}</span><span> {item.value1.device_Type}</span><span>{_id}</span></p>
                <p className='deviceScoreIcon'><img src={iconUrl}/><span style={{color:scoreColorArr[item.value1.deviceScoreLevel]}}>{item.value1.score}</span></p>
              </div>;
    return li;
  },
  render:function(){
    return(
        <div>{this.getItemHtml(this.props.itemData)}</div>
    );
  }
});
module.exports = LocationsItem;
