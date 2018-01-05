import {
  delay,
  buffers,
  channel,
  eventChannel,
  END,
} from 'redux-saga'
import {
  takeEvery,
  takeLatest,
  put,
  call,
  take,
  fork,
  select,
  actionChannel,
  cancel,
  cancelled
} from 'redux-saga/effects'

// 中文API参考 https://neighborhood999.github.io/redux-saga/docs/api/index.html
// 英文API参考 https://redux-saga.js.org/docs/api/
// delay 延迟执行
// takeEvery 监控某个动作，如果该动作被触发，则执行传入的 saga，如果动作被多次触发，则依次执行
// takeLatest 监控某个动作，如果该动作被出发，则执行传入的 saga，如果动作被多次触发，则只执行最新的动作
// buffers 限制存入序列的动作数量  const requestChan = yield actionChannel('REQUEST', buffers.sliding(5))
// channel
// eventChannel 为 Redux Store 以外的事件来源建立一个 Channel
// END 事件，监控的终止

// put 调用动作，dispatch adtion
// take 监控某个动作
// call 异步调用，阻塞
// fork 异步调用，非阻塞（分流）
// actionChannel 依次处理每个被监控的动作
// select
// cancelled
