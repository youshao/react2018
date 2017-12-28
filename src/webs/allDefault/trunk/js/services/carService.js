/**
 * 车辆相关接口
 */

import apiHelper from './apiHelper';

class CarService {

    /**
     * 获取查询违章条件列表
     * @param {*object} data
     */
    carCondition(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}car/getCarConditionList`,
          data: {
            method: 'get',
            body: data
          }
        };  
        return apiHelper.fetch(requestParam);
    }

    /**
     * 添加车辆
     * @param {*object} data
     */
    addCar(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}car/save`,
          data: {
            method: 'post',
            body: data
          }
        };   
        return apiHelper.fetch(requestParam);
    }

    /**
     * 根据车牌号码获取相关信息
     * @param {*object} data
     * {
     * carNumber:''//车牌号码
     * }
     */
    information(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}car/information`,
          data: {
            method: 'post',
            body: data
          }
        };   
        return apiHelper.fetch(requestParam);
    }

    /**
     * 获取手机短信验证接口
     * @param {*object} data
     * {
     * carNumber:''//车牌号码
     * }
     */
    captcha(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}car/captcha`,
          data: {
            method: 'post',
            body: data
          }
        };   
        return apiHelper.fetch(requestParam);
    }

    /**
     * 手机号码验证接口
     * @param {*object} data
     * {
     * phoneCode:'', //手机验证码
     * carNumber:''//车牌号码
     * }
     */
    checkCaptcha(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}car/checkCaptcha`,
          data: {
            method: 'post',
            body: data
          }
        };   
        return apiHelper.fetch(requestParam);
    }

    /**
     * 身份证验证接口
     * @param {*object} data
     * {
     * userCode:'', //身份证号
     * carNumber:''//车牌号码
     * }
     */
    checkCardId(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}car/checkCardId`,
          data: {
            method: 'post',
            body: data
          }
        };   
        return apiHelper.fetch(requestParam);
    }

}

export default new CarService()