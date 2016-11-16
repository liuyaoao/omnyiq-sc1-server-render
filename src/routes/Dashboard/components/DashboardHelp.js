import React from 'react';

import helpSecondBack1 from '../assets/dashboardHelp/helpSecondBack1.png'
import helpThreeBack1 from '../assets/dashboardHelp/helpThreeBack1.png'

import helpFirstBack_House0 from '../assets/dashboardHelp/helpFirstBack_House0.png'
import helpFirstBack_House1 from '../assets/dashboardHelp/helpFirstBack_House1.png'
import helpFirstBack_House2 from '../assets/dashboardHelp/helpFirstBack_House2.png'
import helpFirstBack_House3 from '../assets/dashboardHelp/helpFirstBack_House3.png'

import helpFirstBack_Office0 from '../assets/dashboardHelp/helpFirstBack_Office0.png'
import helpFirstBack_Office1 from '../assets/dashboardHelp/helpFirstBack_Office1.png'
import helpFirstBack_Office2 from '../assets/dashboardHelp/helpFirstBack_Office2.png'
import helpFirstBack_Office3 from '../assets/dashboardHelp/helpFirstBack_Office3.png'

import helpSecondBack_0 from '../assets/dashboardHelp/helpSecondBack_0.png'
import helpSecondBack_1 from '../assets/dashboardHelp/helpSecondBack_1.png'
import helpSecondBack_2 from '../assets/dashboardHelp/helpSecondBack_2.png'
import helpSecondBack_3 from '../assets/dashboardHelp/helpSecondBack_3.png'

import helpThreeBack_House0 from '../assets/dashboardHelp/helpThreeBack_House0.png'
import helpThreeBack_House1 from '../assets/dashboardHelp/helpThreeBack_House1.png'
import helpThreeBack_House2 from '../assets/dashboardHelp/helpThreeBack_House2.png'
import helpThreeBack_House3 from '../assets/dashboardHelp/helpThreeBack_House3.png'

import helpThreeBack_Office0 from '../assets/dashboardHelp/helpThreeBack_Office0.png'
import helpThreeBack_Office1 from '../assets/dashboardHelp/helpThreeBack_Office1.png'
import helpThreeBack_Office2 from '../assets/dashboardHelp/helpThreeBack_Office2.png'
import helpThreeBack_Office3 from '../assets/dashboardHelp/helpThreeBack_Office3.png'


var DashboardHelp = React.createClass({
  getInitialState:function(){
    return{
      helpFirstBack_House0,
      helpFirstBack_House1,
      helpFirstBack_House2,
      helpFirstBack_House3,

      helpFirstBack_Office0,
      helpFirstBack_Office1,
      helpFirstBack_Office2,
      helpFirstBack_Office3,

      helpSecondBack_0,
      helpSecondBack_1,
      helpSecondBack_2,
      helpSecondBack_3,

      helpThreeBack_House0,
      helpThreeBack_House1,
      helpThreeBack_House2,
      helpThreeBack_House3,

      helpThreeBack_Office0,
      helpThreeBack_Office1,
      helpThreeBack_Office2,
      helpThreeBack_Office3,
      mySwiper:null,
      screenHeight:0,
    }
  },
  componentDidMount:function(){
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    let _this = this;
    this.setState({screenHeight:this.props.screenHeight});
    var mySwiper = new Swiper('.swiper-container', {
      speed:200,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      onSlideChangeStart: function(swiper){
      },
      onSlideChangeEnd: function(swiper){
        if(swiper.activeIndex == 3){
          _this.state.mySwiper.slideTo(0,10);
          $('.dashboardHelpContainer').addClass('hide');
        }
      }
    });
    this.setState({mySwiper:mySwiper});
    $('.dashboardHelpContainer').addClass('hide');
    // $(window).resize(function(){
    //   if(!$('.dashboardHelpContainer').hasClass('hide')){
    //     _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    //   }
    // });
  },
  componentWillUnmount:function(){
    // $(window).off();
  },
  onClickHideHelp:function(){
    $('.dashboardHelpContainer').addClass('hide');
  },
  render:function(){
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    let helpFirstBack_Img = this.state['helpFirstBack_'+this.props.device_Type+deviceInfo.deviceScoreLevel];
    let helpSecondBack_Img = this.state['helpSecondBack_'+deviceInfo.deviceScoreLevel];
    let helpThreeBack_Img = this.state['helpThreeBack_'+this.props.device_Type+deviceInfo.deviceScoreLevel];

    let scoreState_Img = this.props['scoreState'+deviceInfo.deviceScoreLevel];
    return(
        <div className='dashboardHelpContainer' style={{height:this.state.screenHeight,width:'100%'}}>
          <div className=''>
            <div className='swiper-container'>
              <div className='swiper-wrapper'>
                <div className="swiper-slide" style={{height:this.state.screenHeight}}>
                    <div className='firstPageBack'>
                      <img className='imgFilter' src={helpFirstBack_Img}/>
                    </div>
                    <div className='pAbsolute firstPageIcon' onClick={this.onClickHideHelp}><img src={scoreState_Img} /></div>
                    <div className='pAbsolute firstPageArrow'><div className=''></div></div>
                    <div className='pAbsolute firstPageContent'>
                      <p>I'll be right here! Tap on me for some explanations.</p>
                    </div>
                </div>
                <div className="swiper-slide" style={{height:this.state.screenHeight}}>
                    <div className='secondPageBack0'><img src={helpSecondBack_Img}/></div>
                    <div className='secondPageBack1'>
                        <div className='secondPageBack11'><img src={helpSecondBack1}/></div>
                        <div className='pAbsolute secondPageArrow'><div className=''></div></div>
                        <div className='pAbsolute secondPageContent'>
                          <p>This is your OiQ(Omny IQ) Score out of a best of 10.Your OiQ score is a simple way for you to compare your network's performance with others.</p>
                        </div>
                    </div>
                </div>
                <div className="swiper-slide" style={{height:this.state.screenHeight}}>
                    <div className='threePageBack0'>
                      <div className='threePageBack00'><img src={helpThreeBack_Img}/></div>
                      <div className='pAbsolute threePageArrow'><div className=''></div></div>
                      <div className='pAbsolute threePageContent'>
                        <p>Here's a summary of how your applications will perform.</p>
                      </div>
                    </div>
                    <div className='threePageBack1'><img src={helpThreeBack1}/></div>
                </div>
                <div className="swiper-slide" style={{height:this.state.screenHeight}}>
                    <div className='firstPageBack'>
                    </div>
                </div>
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>
    );
  }
});
module.exports = DashboardHelp;
