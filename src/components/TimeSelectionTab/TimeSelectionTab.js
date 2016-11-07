
import React from 'react';
import './TimeSelectionTab.scss'
const TimeSelectionTab = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillMount:function(){
  },
  componentDidMount:function(){
  },
  componentDidUpdate:function(){
  },
  _handleOnClick(e) {
    var that = $(e.currentTarget);
    var timeKey = that.data('timekey');
    if(timeKey != '24H'){ //第一个版本只显示24H这个时间段。
      return;
    }
    // TODO，这里要调用父组件的一个回调,让父组件处理选中了那个时间段。
    that.closest('.timeSelection').find('.current').removeClass('current');
    that.addClass('current');
    // this.props.dispatch(TabBarAction.setTabBarState(toUrl));
  },
  render() {
    var currentKey = this.props.timeKey || "24H"; //当前选中哪个tab
    var timeArr = ['24H','72H','1W','1M','3M','1Y'];
    var elemArr = [];
    var i=1235649;
    for(let time of timeArr){
      var elemStr = <li key={i} className={currentKey == time?'current':''} onClick={this._handleOnClick} data-timekey={time}>
                      <p></p>
                      <p>{time}</p>
                    </li>;
      elemArr.push(elemStr);
      i++
    }
    return (
      <div>
        <div className="timeSelection">
          <ul>
            {elemArr}
          </ul>
        </div>
      </div>
    )
  }
});
module.exports = TimeSelectionTab;
