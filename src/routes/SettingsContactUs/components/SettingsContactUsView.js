import React from 'react';
import ReactTabBar from '../../../components/ReactTabBar'
import backImg from '../../../static/assets/back.png'
import logoImg from '../../../static/assets/logo.png'
import './SettingsContactUsView.scss'

var SettingsContactUsView = React.createClass({
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Settings');
  },
  _onClickSubmit:function(e){
    var _this = this;
    var deviceListUrl = APPCONFING.deviceListUrl;
    var title = $('.settingsContactUsContainer .SettingsPostTitle textarea').val();
    var content = $('.settingsContactUsContainer .contactUsDescription textarea').val();
    var name = $('.settingsContactUsContainer .contactUsYourName input').val();
    var connMethod = $('.settingsContactUsContainer .contactUsEmailOrTel input').val();
    $.ajax({
       type: "GET",
       url: deviceListUrl+'/SendMail?title='+title+'&content='+content+'&name='+name+'&connMethod='+connMethod,
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
      <div className='settingsContactUsContainer'>
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img src={backImg} /></a>
          </div>
          <div className='navTitle'>Contact Us</div>
        </div>

        <div className='SettingsCounter'>
          <div style={{padding:'10px'}}>
            <div className='SettingsPostTitle'>
              <span>Title:</span>
              <textarea></textarea>
            </div>
            <div className='contactUsDescription'>
              <span>Description:</span>
              <textarea></textarea>
            </div>
            <div className='contactUsYourName'>
              <span>Your Name:</span>
              <input type='text'/>
            </div>
            <div className='contactUsEmailOrTel'>
              <span>Email or PhoneNum:</span>
              <input type='text'/>
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
        <ReactTabBar
          setTabBarState={this.props.setTabBarState}
          setTabBarIsShow={this.props.setTabBarIsShow}
          tabBarState={this.props.tabBarState}
          tabBarIsShow={this.props.tabBarIsShow} />
      </div>
    );
  }
});

module.exports = SettingsContactUsView;
