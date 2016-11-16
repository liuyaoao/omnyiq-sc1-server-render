import React from 'react';
import axios from 'axios'
import Helmet from 'react-helmet'
import PrivacyPolicyInfo from './PrivacyPolicyInfo'
import ReactTabBar from '../../../components/ReactTabBar'
import backImg from '../../../static/assets/back.png'
import logoImg from '../../../static/assets/logo.png'

import diagnosticsIcon_off from '../assets/diagnosticsIcon_off.png'
import diagnosticsIcon_on from '../assets/diagnosticsIcon_on.png'
import './SettingsDiagnosticsView.scss'

var SettingsDiagnosticsView = React.createClass({
  getInitialState:function(){
    return{
      diagnosticsIcon_off,
      diagnosticsIcon_on,
      sendFlag:'on',  //上报发送开关。
      isBackToSettings:true //是否是返回Settings页面。
    }
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Settings');
  },
  componentDidMount:function(){
    var _this = this;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    let deviceListUrl = APPCONFING.deviceListUrl;//读取配置文件内容
    let tempUrl = APPCONFING.deviceListUrl+"/ReportStatusServlet?flag=check&id="+deviceInfo.deviceId;  //先一次拿100条，相当于一次拿完。
    axios.get(tempUrl).then(({data}) => {
      _this.setState({sendFlag:data.result});
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
    let tempUrl = APPCONFING.deviceListUrl+"/ReportStatusServlet?flag="+toFlag+"&id="+deviceInfo.deviceId;  //先一次拿100条，相当于一次拿完。
    axios.get(tempUrl).then(({data}) => {
      callback && callback();
      _this.setState({sendFlag:toFlag});
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
  render:function(){
    return(
      <div>
        <Helmet title='Diagnostics' />
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img onClick={this.onClickBack} src={backImg} /></a>
          </div>
          <div className='navTitle'><img src={logoImg}/></div>
        </div>
        <div className='SettingsDiagnosticsContainer' style={{}}>
          <p className='diagnosticsIcon'><img src={this.state['diagnosticsIcon_'+this.state.sendFlag]} /></p>
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
            <div onClick={this._onClickCancel} className='closeBtn glyphicon glyphicon-remove'></div>
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
        <ReactTabBar
          setTabBarState={this.props.setTabBarState}
          setTabBarIsShow={this.props.setTabBarIsShow}
          tabBarState={this.props.tabBarState}
          tabBarIsShow={this.props.tabBarIsShow} />
      </div>
    );
  }
});

module.exports = SettingsDiagnosticsView;
