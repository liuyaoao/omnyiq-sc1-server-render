import React from 'react';
var Change2dot4To5GHz = React.createClass({
  _changeSignalType:function(e){
    let that = $(e.currentTarget);
    if(that.hasClass('current')) {
      return;
    }
    this.props.changeSignalType(that.data('ghz'));
  },
  render:function(){
    return(
      <div className={this.props.tabIndex == 2?'hide':''}>
        <div className='ghzSignalTags'>
          <span className={this.props.signalType == '2.4'?'ghzSignalTag current':'ghzSignalTag'} onClick={this._changeSignalType} data-ghz='2.4'>2.4</span>
          <span className={this.props.signalType == '5'?'ghzSignalTag current':'ghzSignalTag'} onClick={this._changeSignalType}  data-ghz='5'>5</span>
          <span className='desc'>GHz</span>
        </div>
      </div>
    );
  }
});
module.exports = Change2dot4To5GHz;
