import React from 'react'
import Helmet from 'react-helmet'
import ReactTabBar from '../../../components/ReactTabBar'
import './WelcomeView.scss'
import Welcome1Image from '../assets/Welcome1.png'

// import * as TabBarAction from '../actions/ReactTabBar_action';
var WelcomeView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return {
      mySwiper:null,
      clientHeight:0,
      intervalKey:''
    }
  },
  componentDidMount: function() {
    var _this = this;
    this.props.setTabBarIsShow(false);
    var secondNum = 5; //显示几秒钟
    var intervalkey = setInterval(function(){
      secondNum--;
      // $('.countDownNum').text(secondNum);
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
    this.setState({intervalkey:intervalkey,mySwiper:mySwiper,clientHeight:parseInt(document.documentElement.clientHeight)});
    $(window).resize(function(){
      _this.setState({clientHeight:parseInt(document.documentElement.clientHeight)});
    });
  },
  _goIndex:function(){
    clearInterval(this.state.intervalkey);
    this.props.setTabBarIsShow(true);
    this.context.router.push('/Locations');
  },
  componentWillUnmount:function(){
    $(window).off();
  },
  render:function(){
    return (
      <div>
        <Helmet title='welcome' />
        <div className="swiper-container" style={{width:"100%",height:this.state.clientHeight-10}} >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div id="WelcomeContent" className="WelcomeContent" style={{}}>
                  <div className="WelcomeOne">
                    <div className="WelcomeOneIcon">
                      <img src={Welcome1Image} />
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
          tabBarState={this.props.tabBarState}
          tabBarIsShow={this.props.tabBarIsShow} />
      </div>
    )
  }
});
module.exports = WelcomeView;
// function mapWelcome2State(state) {
//   const { tabBarIsShow } = state.ReactTabBarReducer
//   return {
//     tabBarIsShow
//   }
// }
//
// export default connect(mapWelcome2State)(Welcome);
