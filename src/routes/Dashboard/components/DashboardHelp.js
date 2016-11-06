import React from 'react';
var DashboardHelp = React.createClass({
  getInitialState:function(){
    return{
      mySwiper:null,
      screenHeight:parseInt(document.documentElement.clientHeight),
    }
  },
  componentDidMount:function(){
    let deviceListUrl = APPCONFING.deviceListUrl;
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    let _this = this;
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
    $(window).resize(function(){
      if(!$('.dashboardHelpContainer').hasClass('hide')){
        _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
      }
    });
  },
  onClickHideHelp:function(){
    $('.dashboardHelpContainer').addClass('hide');
  },
  render:function(){
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    return(
        <div className='dashboardHelpContainer' style={{height:this.state.screenHeight,width:'100%'}}>
          <div className=''>
            <div className='swiper-container'>
              <div className='swiper-wrapper'>
                <div className="swiper-slide" style={{height:this.state.screenHeight}}>
                    <div className='firstPageBack'>
                      <img className='imgFilter' src={'./public/icon/dashboardHelp/helpFirstBack_'+this.props.device_Type+deviceInfo.deviceScoreLevel+'.png'}/>
                    </div>
                    <div className='pAbsolute firstPageIcon' onClick={this.onClickHideHelp}><img src={'./public/icon/scoreState'+deviceInfo.deviceScoreLevel+'.png'} /></div>
                    <div className='pAbsolute firstPageArrow'><div className=''></div></div>
                    <div className='pAbsolute firstPageContent'>
                      <p>I'll be right here! Tap on me for some explanations.</p>
                    </div>
                </div>
                <div className="swiper-slide" style={{height:this.state.screenHeight}}>
                    <div className='secondPageBack0'><img src={'./public/icon/dashboardHelp/helpSecondBack_'+deviceInfo.deviceScoreLevel+'.png'}/></div>
                    <div className='secondPageBack1'>
                        <div className='secondPageBack11'><img src='./public/icon/dashboardHelp/helpSecondBack1.png'/></div>
                        <div className='pAbsolute secondPageArrow'><div className=''></div></div>
                        <div className='pAbsolute secondPageContent'>
                          <p>This is your OiQ(Omny IQ) Score out of a best of 10.Your OiQ score is a simple way for you to compare your network's performance with others.</p>
                        </div>
                    </div>
                </div>
                <div className="swiper-slide" style={{height:this.state.screenHeight}}>
                    <div className='threePageBack0'>
                      <div className='threePageBack00'><img src={'./public/icon/dashboardHelp/helpThreeBack_'+this.props.device_Type+deviceInfo.deviceScoreLevel+'.png'}/></div>
                      <div className='pAbsolute threePageArrow'><div className=''></div></div>
                      <div className='pAbsolute threePageContent'>
                        <p>Here's a summary of how your applications will perform.</p>
                      </div>
                    </div>
                    <div className='threePageBack1'><img src='./public/icon/dashboardHelp/helpThreeBack1.png'/></div>
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
