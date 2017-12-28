// saga 模块化引入
import { all, fork } from 'redux-saga/effects'

//首页相关
import { watchCars } from './cars'

// 单一进入点，一次启动所有 Saga
export default function* rootSaga() {
  yield all([
    fork(watchCars),
  ])
}