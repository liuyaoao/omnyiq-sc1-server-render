import React from 'react';
import { connect } from 'react-redux';
import * as TabBarAction from '../../actions/ReactTabBar_action';
import './SettingsPostView.scss'

var SettingsPostView = React.createClass({
  componentWillMount:function(){
    this.props.dispatch(TabBarAction.setTabBarState('/Settings'));
  },
  _onClickSubmit:function(e){
    var _this = this;
    var deviceListUrl = APPCONFING.deviceListUrl;
    var title = $('.settingsPostContainer .SettingsPostTitle textarea').val();
    var content = $('.settingsPostContainer .SettingYourQuestion textarea').val();
    var category = $('.settingsPostContainer .SettingsCategory select').val();
    $.ajax({
       type: "GET",
       url: deviceListUrl+'/SendMail?title='+title+'&content='+content+'&category='+category,
       success: function(data){
         data = JSON.parse(data);
         console.log("SendMail-->"+data);
         $('.succFailDialog').removeClass('hide');
         setTimeout(function(){
           $('.succFailDialog').addClass('hide');
         },3000);
       }
     });
  },
  onClickSuccFailDialog:function(e){
    $(e.currentTarget).addClass('hide');
  },
  render:function(){
    return (
      <div className='settingsPostContainer'>
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img src='./public/icon/back.png' /></a>
          </div>
          <div className='navTitle'>Post</div>
        </div>

        <div className='SettingsCounter'>
          <div style={{padding:'10px'}}>
            <div className='SettingsPostTitle'>
              <span>Title:</span>
              <textarea></textarea>
            </div>
            <div className='SettingYourQuestion'>
              <span>YourQuestion:</span>
              <textarea></textarea>
            </div>
            <div className='SettingsCategory'>
              <span>Category:</span>
              <select defaultValue='Feedback/Suggestion'>
                <option value='Feedback/Suggestion'>Feedback/Suggestion</option>
                <option value='Problem/Bug'>Problem/Bug</option>
              </select>
            </div>
            <input className='SettingsButton' type='button' value='Submit' onClick={this._onClickSubmit}/>
          </div>
        </div>

        <div className='succFailDialog hide' onClick={this.onClickSuccFailDialog}>
          <div className='dialogBack'></div>
          <div className='dialogContent'>
            <div className='dialogTitle'><p>success</p></div>
            <div className='dialogTitleDesc'>
              <p style={{'textAlign':'center'}}>Submit Successed!!</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
});
function mapSettingsPost2State(state) {
  const { tabBarState } = state.ReactTabBarReducer;
  return {
    tabBarState
  }
}

export default connect(mapSettingsPost2State)(SettingsPost);
