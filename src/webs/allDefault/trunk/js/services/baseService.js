/**
 * 基础接口
 */

import apiHelper from './apiHelper';

/**
 * 基础接口结构
 * @param {string} url 接口地址
 * @param {object} body 提交的参数
 * @param {string} method 请求的类型 默认：post
 */
export const baseService = (url, body, method = 'post') => {
    let requestParam = {
        url,
        data: {
            method,
            body,
        }
    };
    return apiHelper.fetch(requestParam);
}
