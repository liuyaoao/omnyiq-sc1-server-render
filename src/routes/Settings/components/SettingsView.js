import React from 'react'
import Helmet from 'react-helmet'
import ReactTabBar from '../../../components/ReactTabBar'
import logoImg from '../../../static/assets/logo.png'
import './SettingsView.scss'

var SettingsView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Settings');
  },
  _ProvideFeedback:function(){
    this.context.router.push('/Settings/Post');
  },
  _toDiagnostics:function(){
    this.context.router.push('/Settings/Diagnostics');
  },
  login_Logout:function(){
    $('.loginLogout').removeClass('hide');
  },
  _onClickCancel:function(){
    $('.loginLogout').addClass('hide');
  },
  _onClickOk:function(){
    $('.loginLogout').addClass('hide');
  },
  onClickRate:function(){  //评价这个应用

  },
  onClickContactUs:function(){
    this.context.router.push('/Settings/ContactUs');
  },
  render:function(){
    return (
      <div>
        <Helmet title='Settings' />
        <div className='navbarDiv'>
          <div className='navTitle'><img src={logoImg}/></div>
        </div>
        <div className='SettingsCounter'>
          <ul>
            <li>Scan Network</li>
            <li onClick={this._ProvideFeedback}>Provide Feedback/Report Problem</li>
            <li>Tell a friend about this app</li>
            <li onClick={this.onClickRate}>Rate this Application</li>
            <li onClick={this._toDiagnostics}>Diagnostics</li>
            <li>About Us</li>
            <li onClick={this.onClickContactUs}>Contact Us</li>
            <li onClick={this.login_Logout}>Login/Logout</li>
          </ul>
        </div>

        <div className='dialogContainer loginLogout hide'>
          <div className='dialogBack'></div>
          <div className='dialogContent'>
            <div onClick={this._onClickCancel} className='closeBtn glyphicon glyphicon-remove'></div>
            <div className='dialogTitle'><p>Create an account</p></div>
            <div className='dialogTitleDesc'>
              <p>Enter password to save your data,see trends and join the Community.</p>
            </div>
            <div className="input-group">
              <input type="text" className="form-control" placeholder='Enter Name...'/>
            </div>
            <div className="input-group">
              <input type="text" className="form-control" placeholder='Enter Password...'/>
            </div>
            <div>
              <input type='button' className='btn btn_Cancel' onClick={this._onClickCancel} value='No Thanks'/>
              <input type='button' className='btn btn_Ok' onClick={this._onClickOk} value='Ok'/>
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

module.exports = SettingsView;
