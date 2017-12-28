import React from 'react'
import 'babel-polyfill'; //兼容低版本浏览器不支持ES6语法
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { hashHistory } from 'react-router'
import other from './utils/other'; //其他JS
import Root from './containers/Root'
import configureStore from './store/configureStore'
import rootSage from './sagas'
import Redbox from 'redbox-react'
import auth from './utils/auth'; //单点登录授权
import jsApiInit from './utils/jsApiInit'; //JSDK初始化
import common from './utils/common';
const rootEl = document.getElementById('app');

let { pathname, host } = window.location
let localStorageKey = 'W_' + host + '_' + pathname.replace(/\/*/g, ''); //缓存的key
let localStorageValue = JSON.parse(localStorage.getItem(localStorageKey)) || undefined; //缓存的value

//用户信息发生改变时 清空缓存
if (localStorageValue && localStorageValue.user && localStorageValue.user.userId != sessionStorage.getItem('userId')) {
  localStorage.removeItem(localStorageKey);
  localStorageValue = undefined;
}

//创建store 以及运行saga等中间件
const store = configureStore(localStorageValue)
store.runSaga(rootSage)

//监听dispatch事件
let unsubscribe = store.subscribe(() => {
  let state = store.getState()
  localStorage.setItem(localStorageKey, JSON.stringify(state)) //实时保存缓存数据
})

//保存用户信息到全局state
store.dispatch({
  type: 'CREATE_USER', data: {
    userId: sessionStorage.getItem('userId'),
    token: sessionStorage.getItem('token'),
    userType: sessionStorage.getItem('userType'),
    authType: sessionStorage.getItem('authType')
  }
})

window.store = store

const renderDOM = () => {
  render(
    <AppContainer errorReporter={Redbox}>
      <Root store={store} history={hashHistory} />
    </AppContainer>,
    rootEl
  )
}

//页面加载中的UI
const loadingDOM = () => {
  render(
    <div></div>,
    rootEl
  )
}

const appRenderDOM = () => setTimeout(() => renderDOM(), 200); //确保deviceId已经存在
renderDOM();
// //你能看懂吗？说实话，我自己写的时候，我都想抽我自己！但是，先凑合着吧！
// if (common.isCXYApp()) {
//   //存在deviceId则直接显示页面
//   if (sessionStorage.getItem('deviceId')) {
//     renderDOM();
//   } else {
//     //APP环境需要获取到deviceID后再显示 所以这里需要等待jsdk加载完毕
//     if (window.jsApiIsLoad) {
//       appRenderDOM();
//     } else {
//       document.addEventListener('jsApiIsReady', () => appRenderDOM());
//     }
//   }
// } else {
//   //非APP都走单点登录，所以userId是肯定会存在，不存在说明需要走单点等待，因此这里显示加载中的动画，而非直接显示页面
//   if (sessionStorage.getItem('userId')) {
//     renderDOM();
//   } else {
//     //这里应该出现加载中的页面
//     loadingDOM();
//   }
// }

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (message) => { // eslint-disable-line no-console
    if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
      // Log the error as normally
      orgError.apply(console, [message]);
    }
  };

  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./containers/Root').default;
    render(
      <AppContainer errorReporter={Redbox}>
        <NextApp store={store} history={hashHistory} />
      </AppContainer>,
      rootEl
    )
  });
}