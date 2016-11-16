import React from 'react'
import LocationsItem from './LocationsItem'

var LocationsList = React.createClass({
  createNetworkList:function(datas){
    if(datas == null){
      return (<div>
        <p style={{fontSize:"1.3em",textAlign:"center"}}> Please wait </p>
        <p style={{fontSize:"1.3em",textAlign:"center"}}> Loading data list... </p>
      </div>)
    }else if(datas.length <= 0){
      return (<div><p style={{fontSize:"2em",textAlign:"center",marginTop: '50%'}}> No Data!!! </p></div>)
    }
    var ul = [];
    for(var i in datas){
      ul.push(<LocationsItem key={i} itemData={datas[i]} onClickLocationsItem={this.props.onClickLocationsItem}/>);
    }
    return ul;
  },
  render:function(){
    return(
      <div className='networkListData'>
        {this.createNetworkList(this.props.deviceList)}
      </div>
    );
  }
});
module.exports = LocationsList;
