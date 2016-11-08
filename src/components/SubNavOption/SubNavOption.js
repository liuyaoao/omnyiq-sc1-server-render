import React from 'react';
import './SubNavOption'

var SubNavOption = React.createClass({
  _onClickList:function(e){
    var target = e.target;
    $('.SubNavOption .current').removeClass('current');
    $(target).addClass('current');
    $('.subNavConnter ul').hide();
    var value = $(target).html();
    $('.subNavConnter').find('[class="'+value+'"]').show();
  },
  createSubNav:function(datas){
    if(datas == undefined){
      console.log('请检查传入组件SubNavOption的值！');
      return;
    }
    // var width = $(document).width()/datas.length;
    // console.log(datas);
    var list = [];
    for(var i in datas){
      var li = <li key={i} style={{width:'33%'}} onClick={this._onClickList}>
        {datas[i].title}
      </li>;
      list.push(li);
    }
    return list;
  },
  render:function(){
    return (
      <div className='SubNavOption'>
        <ul>
          {this.createSubNav(this.props.subNav)}
        </ul>
      </div>
    );
  }
});
module.exports = SubNavOption;
