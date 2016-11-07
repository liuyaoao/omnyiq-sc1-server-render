// Default Helmet props
export default Object.freeze({
  htmlAttributes: {lang: 'en'},
  title: 'Title',
  defaultTitle: 'Default Title',
  titleTemplate: '%s - The Omny IQ SelfCare',
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'},
    {name: 'HandheldFriendly', content: 'true'},
    {name: 'msapplication-tap-highlight', content: 'no'},
    {'http-equiv': 'Cache-Control', content: 'no-cache'},
    {name: 'apple-mobile-web-app-capable', content: 'yes'},

    {name: 'x5-fullscreen', content: 'true'},
    {name: 'full-screen', content: 'yes'},
    {name: 'apple-mobile-web-app-capable', content: 'yes'}
  ],
  link: [
    {rel: 'shortcut icon', href: '/favicon.ico',type:'image/x-icon'},
    {rel:'stylesheet', href:'/css/bootstrap.min.css'},
    {rel:'stylesheet', href:'/css/bootstrap-slider.min.css'},
    {rel:'stylesheet', href:'/css/swiper-3.3.1.min.css'},
    {rel:'stylesheet', href:'/css/main.css'}
  ],
  script: [
    {type:'text/javascript', src:'/js/appConfig.js'},
    {type:'text/javascript', src:'/js/jquery.min.js'},
    {type:'text/javascript', src:'/js/zingchart.min.js'},
    {type:'text/javascript', src:'/js/spin.js'},
    {type:'text/javascript', src:'/js/swiper-3.3.1.jquery.min.js'}
  ],
  style: []
})
