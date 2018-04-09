/**
 * 车辆相关
 */
import {
    delay,
    buffers,
    channel,
    eventChannel,
    END,
} from 'redux-saga'
import {
    all,
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

import {
    ADD_TO_PROVINCES,
    QUERY_CAR_CONDITION_LIST,
    GET_CAR_INFORMATION,
    GET_CAPTCHA,
    CHECK_CARD_ID,
    CHECK_CAPTCHA,
} from '../actions/actionsTypes.js'

//antd
import { Toast } from 'antd-mobile'

//server


//常用工具类
import ChMessage from '../utils/message.config'

import { normalize, schema } from 'normalizr'; //范式化库

/**
 * 身份证信息验证
 */
function* checkCardId(action) {
    // Toast.loading('', )
    // try {
    //     const { result, timeout } = yield race({
    //         result: call(carService.checkCardId, action.data),
    //         timeout: call(delay, 30000)
    //     })

    //     Toast.hide()
    //     if (timeout) {
    //         Toast.info(ChMessage.FETCH_FAILED)
    //         return;
    //     } else {
    //         if (result.code == '1000') {

    //         } else {
    //             Toast.info(result.msg || ChMessage.FETCH_FAILED)
    //         }
    //         if (action.callback) {
    //             action.callback(result)
    //         }
    //     }
    // } catch (error) {
    //     Toast.hide()
    //     if (action.callback) {
    //         action.callback(error)
    //     }
    // }
}


function* watchCheckCardId() {
    yield takeLatest(CHECK_CARD_ID, checkCardId)
}

export function* watchCars() {
    yield all([
        fork(watchCheckCardId),
    ])
}