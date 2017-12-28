/**
 * 车辆相关
 */
import {
    takeEvery,
    delay,
    takeLatest,
    buffers,
    channel,
    eventChannel,
    END
} from 'redux-saga'
import {
    race,
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
import carService from '../services/carService'

//常用工具类
import ChMessage from '../utils/message.config'

import { normalize, schema } from 'normalizr'; //范式化库

/**
 * 获取违章查询条件信息！
 */
function* fetchCarCondition(action) {
    Toast.loading("", 0)
    try {
        let result;
        if (sessionStorage.getItem("carCondition")) {
            result = JSON.parse(sessionStorage.getItem("carCondition"))
        } else {
            const { _result, timeout } = yield race({
                _result: call(carService.carCondition, action.data),
                timeout: call(delay, 30000)
            })
            result = _result

            if (timeout) {
                window.networkError('./images/networkError-icon.png');
                return;
            }
        }
        Toast.hide()
        if (result.code == "1000") {
            sessionStorage.setItem("carCondition", JSON.stringify(result)) //成功的时候 才保存，避免网络错误时，每次都提示网络错误

            //提取城市
            const citi = new schema.Entity('citi', {}, { idAttribute: 'carNumberPrefix' });
            const citis = new schema.Array(citi)
            const province = { cities: citis }
            const provinces = new schema.Array(province)
            let normalizedData = normalize(result.data.carConditionList, provinces)

            //提取省份
            const newProvince = new schema.Entity('province', {}, { idAttribute: 'provincePrefix' })
            const newProvinces = new schema.Array(newProvince)
            const newNormalizedData = normalize(normalizedData.result, newProvinces)

            yield put({
                type: ADD_TO_PROVINCES, data: {
                    data: normalizedData.entities.citi,
                    result: newNormalizedData.result
                }
            })

            // yield put({
            //     type: ADD_TO_PROVINCES,
            //     data: {
            //         data: normalizedData.entities.citi,
            //         result: normalizedData.result
            //     }
            // })
        } else {
            Toast.info(result.msg || ChMessage.FETCH_FAILED, 1);
        }

        if (action.callback) {
            action.callback(result)
        }
    } catch (error) {
        Toast.hide()
        Toast.info(ChMessage.FETCH_FAILED, 1);
        if (action.callback) {
            action.callback(error)
        }
    }

}

/**
 * 根据车牌号码获取相关信息
 */
function* getCarInformation(action) {
    Toast.loading('', )
    try {
        const { result, timeout } = yield race({
            result: call(carService.information, action.data),
            timeout: call(delay, 30000)
        })

        Toast.hide()
        if (timeout) {
            Toast.info(ChMessage.FETCH_FAILED)
            return;
        } else {
            if (result.code == '1000') {

            } else {
                Toast.info(result.msg || ChMessage.FETCH_FAILED)
            }
            if (action.callback) {
                action.callback(result)
            }
        }
    } catch (error) {
        Toast.hide()
        if (action.callback) {
            action.callback(error)
        }
    }
}

/**
 * 获取短信验证码
 */
function* getCaptcha(action) {
    try {
        const { result, timeout } = yield race({
            result: call(carService.captcha, action.data),
            timeout: call(delay, 3000) //超时时间设为3秒
        })

        if (timeout) {
            return;
        } else {
            if (action.callback) {
                action.callback(result)
            }
        }
    } catch (error) {
        if (action.callback) {
            action.callback(error)
        }
    }
}

/**
 * 手机验证码验证
 */
function* checkCaptcha(action) {
    Toast.loading('', )
    try {
        const { result, timeout } = yield race({
            result: call(carService.checkCaptcha, action.data),
            timeout: call(delay, 30000)
        })

        Toast.hide()
        if (timeout) {
            Toast.info(ChMessage.FETCH_FAILED)
            return;
        } else {
            if (result.code == '1000') {

            } else {
                Toast.info(result.msg || ChMessage.FETCH_FAILED)
            }
            if (action.callback) {
                action.callback(result)
            }
        }
    } catch (error) {
        Toast.hide()
        if (action.callback) {
            action.callback(error)
        }
    }
}

/**
 * 身份证信息验证
 */
function* checkCardId(action) {
    Toast.loading('', )
    try {
        const { result, timeout } = yield race({
            result: call(carService.checkCardId, action.data),
            timeout: call(delay, 30000)
        })

        Toast.hide()
        if (timeout) {
            Toast.info(ChMessage.FETCH_FAILED)
            return;
        } else {
            if (result.code == '1000') {

            } else {
                Toast.info(result.msg || ChMessage.FETCH_FAILED)
            }
            if (action.callback) {
                action.callback(result)
            }
        }
    } catch (error) {
        Toast.hide()
        if (action.callback) {
            action.callback(error)
        }
    }
}


function* watchCarCondition() {
    yield takeLatest(QUERY_CAR_CONDITION_LIST, fetchCarCondition)
}


function* watchGetCarInformation() {
    yield takeLatest(GET_CAR_INFORMATION, getCarInformation)
}

function* watchGetCaptcha() {
    yield takeLatest(GET_CAPTCHA, getCaptcha)
}

function* watchCheckCaptcha() {
    yield takeLatest(CHECK_CAPTCHA, checkCaptcha)
}

function* watchCheckCardId() {
    yield takeLatest(CHECK_CARD_ID, checkCardId)
}

export function* watchCars() {
    yield [
        fork(watchCarCondition),
        fork(watchGetCarInformation),
        fork(watchGetCaptcha),
        fork(watchCheckCaptcha),
        fork(watchCheckCardId),
    ]
}