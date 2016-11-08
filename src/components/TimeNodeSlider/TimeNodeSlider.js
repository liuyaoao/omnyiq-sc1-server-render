
import React from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import './TimeNodeSlider.scss'
const TimeNodeSlider = React.createClass({
  getInitialState() {
    return {
      timeNode:0,
      interval:'',
      curPlayDateTime:0,
      timeTipInterval:''
    };
  },
  componentWillMount:function(){
    this.setState({timeNode:this.props.timeNode});
  },
  componentDidMount:function(){
    // this.props.dispatch(TabBarAction.setTabBarState('/Locations'));
  },
  componentDidUpdate:function(){
    // console.log('底部状态:',this.props.tabBarState);
  },
  _timeNodeValueChanged: function(e){
    // this.setState({timeNode: e.target.value});
    this.setState({timeNode:e.target.value});
    this.props.timeNodeValueChanged(this.props.tabKey, e.target.value);
  },
  _handlePlayTime:function(e){
    var _this = this;
    var that = $(e.currentTarget);
    var $icon = that.find('.glyphicon');
    if($icon.hasClass('glyphicon-play')){
      $icon.removeClass('glyphicon-play').addClass('glyphicon-pause');
      _this._handleNextTime();
      var interval = setInterval(function(){
        if(_this.props.curTabIndex == _this.props.tabIndex){
          _this._handleNextTime();
          if(_this.state.timeNode == 0){
            _this._stopAutoPlay($icon);
          }
        }
      },500);
      _this.setState({interval:interval});
    }else if($icon.hasClass('glyphicon-pause')){
      this._stopAutoPlay($icon);
    }
  },
  _stopAutoPlay:function($icon){
    $icon.removeClass('glyphicon-pause').addClass('glyphicon-play');
    clearInterval(this.state.interval);
    that.closest('.wi-slider').find('.tooltip.tooltip-main.top').removeClass('in');
  },
  _handleNextTime:function(e){
    var _this = this;
    var that = $(e.currentTarget);
    var timeNode = this.state.timeNode;
    timeNode++;
    if(timeNode >= this.props.maxLength){
      timeNode = 0;
    }
    this.setState({timeNode:timeNode});
    this.props.timeNodeValueChanged(this.props.tabKey, timeNode);
    if(!that.closest('.wi-slider').find('.tooltip.tooltip-main.top').hasClass('in')){ //如果是没有显示的就让它显示出来
      that.closest('.wi-slider').find('.tooltip.tooltip-main.top').addClass('in');
    }
    clearInterval(this.state.timeTipInterval);
    var interval = setInterval(function(){
      if(_this.state.curPlayDateTime && (new Date()/1) - _this.state.curPlayDateTime > 3500){ //如果两次播放的时间间隔大于3.5s才会隐藏tooltip提示
        that.closest('.wi-slider').find('.tooltip.tooltip-main.top').removeClass('in');
        clearInterval(_this.state.timeTipInterval);
      }
    },200);
    var curPlayDateTime = new Date()/1;
    this.setState({timeTipInterval:interval,curPlayDateTime:curPlayDateTime});
  },
  formatStatusValue: function(value){
    if(!this.props.timeIndex2saveTime || this.props.timeIndex2saveTime.length<=0){
      return;
    }
    var timeHour =((this.props.timeIndex2saveTime[value]).split('T')[1]).split(':')[0];
    // var timeHour = new Date(timeStr).getHours();
    return timeHour+":00";
    // return (timeHour<10 ? "0" : "")+timeHour+":00";
  },
  render() {
    return (
      <div className="wi-slider">
      <table style={{width:"94%",margin: '0 auto'}}>
          <tbody>
            <tr style={{textAlign: 'center'}}>
              <td style={{width:"2rem"}}><a className='controlBtn' href="javascript:;" onClick={this._handlePlayTime}><span className="glyphicon glyphicon-play"></span></a></td>
              <td style={{width:"3rem",paddingRight:"1.6rem"}}><a className='controlBtn' href="javascript:;" onClick={this._handleNextTime}><span className="glyphicon glyphicon-chevron-right"></span></a></td>
              <td style={{}}>
                <ReactBootstrapSlider id={"wifistatusSlider" + this.props.sliderId}
                        value = { this.props.timeNode }
                        slideStop = { this._timeNodeValueChanged }
                        max = { this.props.maxLength-1 }
                        min = { 0 }
                        step = { 1 }
                        tooltTip={true}
                        formatter = { this.formatStatusValue} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = TimeNodeSlider;
