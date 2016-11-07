import React from 'react';
import TimeSelectionTab from '../../../components/TimeSelectionTab';
import ReactTabBar from '../../../components/ReactTabBar'

import {getSpeedsDownloadChartData, getSpeedsUploadChartData, getSpeedsDL_ULChartData} from './SpeedsChartData';

import backImg from '../assets/back.png'

import scoreState0 from '../assets/scoreState0.png'
import scoreState1 from '../assets/scoreState1.png'
import scoreState2 from '../assets/scoreState2.png'
import scoreState3 from '../assets/scoreState3.png'

import './DashboardSpeedsView.scss'
var DashboardSpeedsView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState:function(){
    return {
      scoreState0,
      scoreState1,
      scoreState2,
      scoreState3,
      mySwiper:null,
      deviceInfo:null,
      tabKeyList:['dl_ul','download','upload'],
      isNeedRender:{'dl_ul':true,'download':true,'upload':true},
      screenHeight:0,
      downloadChartData:null,
      uploadChartData:null,
      uploadAndDownload:null
    }
  },
  componentWillMount:function(){
    this.props.setTabBarIsShow(true);
    this.props.setTabBarState('/Dashboard');
    this.props.setCurTabIndex(0); //初始化数据
    this.props.setCurTabKey(this.state.tabKeyList[0]);

  },
  componentDidMount:function(){
    let deviceInfo = JSON.parse(localStorage.getItem('deviceInfo'));
    this.setState({screenHeight:parseInt(document.documentElement.clientHeight),deviceInfo:deviceInfo});
    let deviceListUrl = APPCONFING.deviceListUrl;
    let _this = this;
    let _id = deviceInfo.deviceId.substr(deviceInfo.deviceId.length-4);
    $('.navbarDiv .navTitleText .deviceInfoTitle').text(deviceInfo.deviceName+" "+deviceInfo.deviceN+" "+_id);
    // var mySwiper = new Swiper('.swiper-container', {
    //   speed:200,
    //   onSlideChangeStart: function(swiper){
    //     _this._changeCurrentTab(swiper.activeIndex);
    //   },
    //   onSlideChangeEnd: function(swiper){
    //     let tabKey = _this.state.tabKeyList[swiper.activeIndex];
    //     _this.props.dispatch(SpeedsAction.setCurTabIndex(swiper.activeIndex));
    //     _this.props.dispatch(SpeedsAction.setCurTabKey(tabKey));
    //   }
    // });
    // this.setState({mySwiper:mySwiper});
    $(window).resize(function(){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    $(window).scroll(function(event){
      _this.setState({screenHeight:parseInt(document.documentElement.clientHeight)});
    });
    var spinner = new Spinner({zIndex:999}).spin($('.loadingSpinContainer')[0]);
    // deviceListUrl='http://dev.omnyiq.com/xmpp_es'; //测试用。
    $.ajax({
      type: "GET",
      url: deviceListUrl+'/GetInternetSpeedsByIdServlet?id='+deviceInfo.deviceId,
      success: function(data){
        spinner.stop();
        $('.loadingSpinContainer').remove();
        data = JSON.parse(data);
        console.log('DashboardSpeeds ajax--->',data);
        if(!data.value4 || data.value4.length<=0){
          $('.noDataContainer').removeClass('hide');
          return;
        }
        let dataList = data.value4;
        let avg_download = [];//下载速度
        let avg_wan_Latency = [];//延迟
        let avg_upload = [];//上传速度
        let avg_isp_Avg_Download = [];//下载平均（灰色线条）
        let avg_isp_Avg_Upload = [];//上传平均（灰色线条）
        let dateList = [];
        let lastValue = data.value4[data.value4.length-1];
        let newDownload = parseInt(lastValue.avg_download || 0);
        let newUpload = parseInt(lastValue.avg_wan_Latency || 0);
        let newLatency = parseInt(lastValue.avg_wan_Latency || 0);
        for(let v of data.value4){
          if(v.avg_download == null){
            avg_download.push(null);
            avg_wan_Latency.push(null);
            avg_upload.push(null);
            avg_isp_Avg_Download.push(null);
            avg_isp_Avg_Upload.push(null);
            dateList.push(null);
          }else{
            avg_download.push(parseInt(v.avg_download));
            avg_wan_Latency.push(parseInt(v.avg_wan_Latency));
            avg_upload.push(parseInt(v.avg_upload));
            avg_isp_Avg_Download.push(parseInt(v.avg_isp_Avg_Download));
            avg_isp_Avg_Upload.push(parseInt(v.avg_isp_Avg_Upload));
            let date = new Date(v.savetime);
            dateList.push(date.getHours());
          }
        }
        _this.setState({newDownload:newDownload,newUpload:newUpload,newLatency:newLatency});
        _this.setState({
          downloadChartData:getSpeedsDownloadChartData(dateList,avg_download,avg_wan_Latency,avg_isp_Avg_Download),
          uploadChartData:getSpeedsUploadChartData(dateList,avg_upload,avg_isp_Avg_Upload,avg_wan_Latency),
          uploadAndDownload:getSpeedsDL_ULChartData(dateList,avg_upload,avg_download,avg_isp_Avg_Download,avg_isp_Avg_Upload,avg_wan_Latency)
        });
      }
    });
  },
  _changeCurrentTab:function(curTabIndex){
    $('.speedsUl li p.current').removeClass('current');
    $('.speedsUl li[data-index='+curTabIndex+'] p').addClass('current');
  },
  _onClickChartCall:function(e){
    var data = zingchart.exec(e.id, 'getseriesvalues', {});
    switch(e.id){
      case "downloadChart":
        $('.download_Mbps').text(data[0][e.nodeindex]);
        $('.download_Latency').text(data[2][e.nodeindex]);
        break;
      case "uploadChart":
        $('.upload_Mbps').text(data[0][e.nodeindex]);
        $('.upload_Latency').text(data[2][e.nodeindex]);
        break;
      case "UploadAndDownload":
        $('.DLUL_download_Mbps').text(data[1][e.nodeindex]);
        $('.DLUL_upload_Mbps').text(data[0][e.nodeindex]);
        $('.DLUL_Latency').text(data[4][e.nodeindex]);
        break;
      default:break;
    }
  },
  _showSpeedsDiv:function(e){
    let that = $(e.currentTarget);
    if(that.find('p').hasClass('current')) {
      return;
    }
    let index = +that.data('index');
    let tabKey = this.state.tabKeyList[index];
    this.props.setCurTabIndex(index);
    this.props.setCurTabKey(tabKey);
    var timeNodeType = this.props.curTimeNodeTypes[tabKey];
    this._updateState(index,timeNodeType);
  },
  _updateState:function(index,timeNodeType){
    // this.state.mySwiper.slideTo(index);
  },
  shouldComponentUpdate:function(nextProps, nextState){
    let _this = this;
    if(nextState.downloadChartData && nextState.isNeedRender['download']){
      zingchart.render({id : 'downloadChart',data : nextState.downloadChartData,height: '100%',width: "98%"});
    }
    if(nextState.uploadChartData  && nextState.isNeedRender['upload']){
      zingchart.render({id : 'uploadChart',data : nextState.uploadChartData,height: '100%',width: "98%"});
    }
    if(nextState.uploadChartData&&nextState.downloadChartData && nextState.isNeedRender['dl_ul']){
      zingchart.render({id : 'UploadAndDownload',data : nextState.uploadAndDownload,height: '100%',width: "98%"});
      zingchart.node_click = function(e){
        _this._onClickChartCall(e);
      }
      this.setState({'isNeedRender':{'download':false,'upload':false,'dl_ul':false}});
    }
    return true;
  },
  _onClickRightIcon:function(){
    this.context.router.push('/Locations');
  },
  componentWillUnmount:function(){
    $(window).off();
  },
  render:function(){
    let iconImg = this.state.deviceInfo?this.state['scoreState'+this.state.deviceInfo.deviceScoreLevel]:'';
    return (
      <div>
        <div className='scrollBackground'></div>
        <div className='navbarDiv'>
          <div className='navbarLeft'>
            <a href='javascript:history.go(-1)'><img src={backImg} /></a>
          </div>
          <div className='navTitle navTitleText'>
            <p>Internet Speeds</p>
            <p className='deviceInfoTitle'></p>
          </div>
          <div className='navbarRight' onClick={this._onClickRightIcon}>
            <img src={iconImg} />
          </div>
        </div>
        <div className='dashboardSpeedsContent contentFixed' style={{height:this.state.screenHeight-110}}>
          <ul className="speedsUl">
            <li className='speedsDLUL' onClick={this._showSpeedsDiv} data-index='0'>
                <p className={this.props.curTabIndex == 0 ? 'current' : ''}>DL+UL</p>
            </li>
            <li className='speedsDownload' onClick={this._showSpeedsDiv} data-index='1'>
                <p className={this.props.curTabIndex == 1 ? 'current' : ''}>Download</p>
            </li>
            <li className='speedsUpload' onClick={this._showSpeedsDiv} data-index='2'>
                <p className={this.props.curTabIndex == 2 ? 'current' : ''}>Upload</p>
            </li>
          </ul>
          <div className='swiper-container' style={{height:this.state.screenHeight-140}}>
              <div className={this.props.curTabIndex == 0 ? 'speedsContentBox current' : 'speedsContentBox'} data-index='0'>
                  <div className='noDataContainer hide' style={{position:'absolute'}}><p style={{top:'40%'}}>No Speeds Data!!</p></div>
                  <div className='speedsUploadAndDownloadTitle'>
                    <div>
                      <p><span>DL:<span className='DLUL_download_Mbps'>{this.state.newDownload}</span> Mbps</span>
                          <span>UL:<span className='DLUL_upload_Mbps'>{this.state.newUpload}</span> Mbps</span>
                      </p>
                      <p><span className='DLUL_Latency'>{this.state.newLatency}</span>ms latency</p>
                    </div>
                  </div>
                  <div className='loadingSpinContainer' style={{marginTop:'40%'}}></div>
                  <div id='UploadAndDownload' style={{marginTop:'65px',marginBottom:'70px',height:this.state.screenHeight-240}}></div>
                  <div className='timeSelectTab_speeds'><TimeSelectionTab/></div>
              </div>
              <div className={this.props.curTabIndex == 1 ? 'speedsContentBox current' : 'speedsContentBox'} data-index='1'>
                  <div className='noDataContainer hide' style={{position:'absolute'}}><p style={{top:'40%'}}>No Speeds Data!!</p></div>
                  <div className='speedsDownloadTitle'>
                    <div>
                      <p><span className='download_Mbps'>{this.state.newDownload}</span> Mbps</p><p><span className='download_Latency'>{this.state.newLatency}</span>ms latency</p>
                    </div>
                  </div>
                  <div id='downloadChart' style={{marginTop:'65px',marginBottom:'70px',height:this.state.screenHeight-240}}></div>
                  <div className='timeSelectTab_speeds'><TimeSelectionTab/></div>
              </div>
              <div className={this.props.curTabIndex == 2 ? 'speedsContentBox current' : 'speedsContentBox'} data-index='2' >
                  <div className='noDataContainer hide' style={{position:'absolute'}}><p style={{top:'40%'}}>No Speeds Data!!</p></div>
                  <div className='speedsDownloadTitle'><div><p><span className='upload_Mbps'>{this.state.newUpload}</span> Mbps</p><p><span className='upload_Latency'>{this.state.newLatency}</span>ms latency</p></div></div>
                   <div id='uploadChart' style={{marginTop:'65px',marginBottom:'70px',height:this.state.screenHeight-240}}></div>
                   <div className='timeSelectTab_speeds'><TimeSelectionTab/></div>
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

module.exports = DashboardSpeedsView;
