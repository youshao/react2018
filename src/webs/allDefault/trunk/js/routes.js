import React from 'react'
import { Route, IndexRoute } from 'react-router'

//antd UI
import { Toast } from 'antd-mobile'

import {
  App,
  Home,
  NotFoundPage,
} from './containers'

//显示加载中
const showLoading = () => {
  Toast.loading('', 30, () => {
    window.networkError('./images/networkError-icon.png')
  })
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    {/*按需demo start*/}
    {/*<IndexRoute getComponents={(nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, require('./containers/carList/index').default)
      }, 'index')
    }} />
    <Route path="addCar" getComponents={(nextState, cb) => {
      showLoading()
      require.ensure([], (require) => {
        Toast.hide()
        cb(null, require('./containers/carInfo/addCar').default)
      }, 'car')
    }} />*/}
    {/*按需demo end*/}

    <Route path="*" component={NotFoundPage} />
  </Route>
);