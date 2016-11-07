import React from 'react';
import { connect } from 'react-redux';
import ReactTabBar from '../smallComponent/ReactTabBar';
import * as TabBarAction from '../../actions/ReactTabBar_action';
import PrivacyPolicyInfo from './PrivacyPolicyInfo';
var SettingsDiagnostics = React.createClass({
  getInitialState:function(){
    return{
      screenHeight:parseInt(document.documentElement.clientHeight),
      diagnosticsIcon:'./public/icon/diagnosticsIcon_on.png',
      sendFlag:'on',  //上报发送开关。
      isBackToSettings:true, //是否是返回Settings页面。
      navbarData:{//顶部导航
        navbarLeft:{
          url:'',
          icon:'',
        },
        navbarRight:{
          url:'',
          icon:'',
        },
        navTitle:'Settings'
      },
    }
  },
  componentWillMount:function(){
    var _this = this;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    let deviceListUrl = APPCONFING.deviceListUrl;//读取配置文件内容
    this.props.dispatch(TabBarAction.setTabBarState('/Settings'));
    $.ajax({
       type: "GET",
       url: deviceListUrl+"/ReportStatusServlet?flag=check&id="+deviceInfo.deviceId,
       success: function(data){
         data = JSON.parse(data);
         _this.setState({
           sendFlag:data.result,
           diagnosticsIcon:'./public/icon/diagnosticsIcon_'+data.result+'.png'
         });
       }
    });
  },
  componentDidMount:function(){
    var _this = this;
    $(window).resize(function(){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    $(window).scroll(function(event){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
  },
  onClickDiagnosticsON_OFF:function(e){
    let _this = this;
    var that = $(e.currentTarget);
    if(!that.hasClass('current')){
      return;
    }
    let toFlag = that.data('toflag');
    if(toFlag == "off"){
      $('.sendOffConfirm').removeClass('hide');
    }else{
      this._sendFlagToServer(toFlag);
    }
  },
  _sendFlagToServer:function(toFlag,callback){
    let _this = this;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    let deviceListUrl = APPCONFING.deviceListUrl;//读取配置文件内容
    $.ajax({
       type: "GET",
       url: deviceListUrl+"/ReportStatusServlet?flag="+toFlag+"&id="+deviceInfo.deviceId,  //先一次拿100条，相当于一次拿完。
       success: function(data){
         callback && callback();
         data = JSON.parse(data);
         _this.setState({
           sendFlag:toFlag,
           diagnosticsIcon:'./public/icon/diagnosticsIcon_'+toFlag+'.png'
         });
       }
    });
  },
  onClickPrivacyInfo:function(e){
    $('.SettingsDiagnosticsContainer').addClass('hide');
    $('.privacyPolicyInfo').removeClass('hide');
    this.setState({isBackToSettings:false});
  },
  onClickBackToDiagnostics:function(){
    $('.SettingsDiagnosticsContainer').removeClass('hide');
    $('.privacyPolicyInfo').addClass('hide');
    this.setState({isBackToSettings:true});
  },
  onClickBack:function(e){
    if(!this.state.isBackToSettings){
      e.preventDefault();
      this.onClickBackToDiagnostics();
    }else{
    }
  },
  _onClickCancel:function(e){
      $('.sendOffConfirm').addClass('hide');
  },
  _onClickOk:function(e){
    var that = $(e.currentTarget);
    if(that.attr('disabled')){return;}
    that.attr('disabled','disabled');
    this._sendFlagToServer('off',function(){
      that.removeAttr('disabled');
      $('.sendOffConfirm').addClass('hide');
    });
  },
  componentWillUnmount:function(){
    $(window).off();
  },
  render:function(){
    return(
      <div>
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img onClick={this.onClickBack} src='./public/icon/back.png' /></a>
          </div>
          <div className='navTitle'><img src="./public/icon/logo.png"/></div>
        </div>
        <div className='SettingsDiagnosticsContainer' style={{height:this.state.screenHeight-110}}>
          <p className='diagnosticsIcon'><img src={this.state.diagnosticsIcon} /></p>
          <p className='diagnosticsTitle'>Diagnostics</p>
          <p>To improve your connexted</p>
          <p>experience over your network and</p>
          <p>use the Omny IQ application,</p>
          <p>accept sending non-personal</p>
          <p>diagnostic data from your wireless router.</p>
          <p className='diagnosticsFooter' onClick={this.onClickPrivacyInfo}>About Diagnostics & Privacy</p>
          <div className={this.state.sendFlag=='off'?'diagnosticsOn current':'diagnosticsOn'} onClick={this.onClickDiagnosticsON_OFF} data-toflag='on'>send to Omny IQ</div>
          <div className={this.state.sendFlag=='on'?'diagnosticsOff current':'diagnosticsOff'} onClick={this.onClickDiagnosticsON_OFF} data-toflag='off'>don't send</div>
        </div>

        <div className='privacyPolicyInfo hide'>
          <PrivacyPolicyInfo />
        </div>

        <div className='dialogContainer sendOffConfirm hide'>
          <div className='dialogBack'></div>
          <div className='dialogContent'>
            <div className='dialogTitle'><p>Confirm</p></div>
            <div className='dialogTitleDesc'>
              <p style={{'textAlign': 'justify','fontSize':'1.5rem'}}>Please confirm that you would not want your router to send diagnostics data to help improve your connected experience.</p>
            </div>
            <div>
              <input type='button' className='btn btn_left' onClick={this._onClickOk} value='Ok'/>
              <input type='button' className='btn btn_right' onClick={this._onClickCancel} value='Cancel'/>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

function mapSettingsDiagnostics(state) {
  const { tabBarState } = state.ReactTabBarReducer;
  return {
    tabBarState
  }
}
export default connect(mapSettingsDiagnostics)(SettingsDiagnostics);
