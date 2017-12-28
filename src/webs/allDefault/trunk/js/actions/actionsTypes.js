/*
* 这里定义所有的action类型
* */

/**
 * fetch数据请求相关
 */
export const FETCH_FAILED = 'FETCH_FAILED' // fetch请求出错
export const FETCH_TIMEOUT = 'FETCH_TIMEOUT' // fetch请求超时


//车辆相关
export const QUERY_CAR_CONDITION_LIST = 'QUERY_CAR_CONDITION_LIST' //请求车辆违章约束条件信息
export const ADD_TO_PROVINCES = 'ADD_TO_PROVINCES' //添加约束条件
export const GET_CAR_INFORMATION = 'GET_CAR_INFORMATION' //根据车牌号码获取相关信息
export const GET_CAPTCHA = 'GET_CAPTCHA' //获取验证码
export const CHECK_CAPTCHA = 'CHECK_CAPTCHA' //手机验证码验证
export const CHECK_CARD_ID = 'CHECK_CARD_ID' //身份证信息验证


//异步请求
export const QUERY_CAR_LIST_ASYNC = 'QUERY_CAR_LIST_ASYNC' //获取车辆列表
export const QUERY_BANNERS_ASYNC = 'QUERY_BANNERS_ASYNC' //获取banner
export const QUERY_ICONS_ASYNC = 'QUERY_ICONS_ASYNC' //获取快捷入口的ICON
export const QUERY_NEWS_ASYNC = 'QUERY_NEWS_ASYNC' //获取资讯内容列表
