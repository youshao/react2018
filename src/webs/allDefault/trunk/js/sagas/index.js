// saga 模块化引入
import { fork } from 'redux-saga/effects'

//首页相关
import { watchCars } from './cars'

// 单一进入点，一次启动所有 Saga
export default function* rootSaga() {
  yield [
    fork(watchCars),
  ]
}