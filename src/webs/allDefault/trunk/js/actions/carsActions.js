/*
* 车辆相关的actions
*/

import {
    QUERY_CAR_CONDITION_LIST,
    GET_CAR_INFORMATION,
    GET_CAPTCHA,
    CHECK_CARD_ID,
    CHECK_CAPTCHA,
} from './actionsTypes'

//请求查违章约束条件
export const queryCarCondition = (data, callback) => ({
    type: QUERY_CAR_CONDITION_LIST,
    data,
    callback
})

//根据车牌号码获取相关信息
export const getCarInformation = (data, callback) => ({ type: GET_CAR_INFORMATION, data, callback })

//获取短信验证码
export const getCaptcha = (data, callback) => ({ type: GET_CAPTCHA, data, callback })

//手机验证码验证
export const checkCaptcha = (data, callback) => ({ type: CHECK_CAPTCHA, data, callback })

//身份证信息验证
export const checkCardId = (data, callback) => ({ type: CHECK_CARD_ID, data, callback })