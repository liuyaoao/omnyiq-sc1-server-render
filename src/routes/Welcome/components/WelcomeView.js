import React from 'react'
import Helmet from 'react-helmet'
import ReactTabBar from '../../../components/ReactTabBar'
import {Welcome1Image} from '../../../components/ImagesAssets'
import './WelcomeView.scss'

var WelcomeView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return {
      Welcome1Image:null,
      mySwiper:null,
      intervalKey:''
    }
  },
  componentDidMount: function() {
    var _this = this;
    this.props.setTabBarIsShow(false);
    var secondNum = 5; //显示几秒钟
    var intervalkey = setInterval(function(){
      secondNum--;
      if(secondNum <= 0){
        _this.state.mySwiper.slideTo(1); //跳转页面
      }
    },1000);
    var mySwiper = new Swiper('.swiper-container', {
      onSlideChangeStart: function(swiper){
      },
      onSlideChangeEnd: function(swiper){
        _this._goIndex();
      }
    });
    this.setState({
      Welcome1Image:Welcome1Image,  //这里需要这样写，不然刷新页面的时候会报一个checkSum不一致的警告。
      intervalkey:intervalkey,
      mySwiper:mySwiper
    });
  },
  _goIndex:function(){
    clearInterval(this.state.intervalkey);
    this.props.setTabBarIsShow(true);
    this.context.router.push('/Locations');
  },
  render:function(){
    return (
      <div>
        <Helmet title='welcome' />
        <div className="swiper-container" style={{width:"100%",height:this.props.screenHeight-10}} >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div id="WelcomeContent" className="WelcomeContent" style={{}}>
                  <div className="WelcomeOne">
                    <div className="WelcomeOneIcon">
                      <img src={this.state.Welcome1Image||''} />
                      <s><i></i></s>
                      <b><i></i></b>
                    </div>
                    <p>Hi there!</p>
                    <p>I'm OiQ,</p>
                    <p>your personal "network angel."</p>
                    <p>I can help you find issues with your</p>
                    <p>Wi-Fi network and connected experience.</p>
                    <p>And at times, I can even fix them for you.</p>
                    <s></s>
                    <i></i>
                  </div>
                </div>
            </div>
            <div className="swiper-slide"><div></div></div>
          </div>
          <div className="welcomeBottom">
            <span>
              <i></i>
              <i></i>
            </span>
          </div>
        </div>
        <ReactTabBar
          setTabBarState={this.props.setTabBarState}
          setTabBarIsShow={this.props.setTabBarIsShow}
          setScreenHeight={this.props.setScreenHeight}
          tabBarState={this.props.tabBarState}
          tabBarIsShow={this.props.tabBarIsShow} />
      </div>
    )
  }
});
module.exports = WelcomeView;
