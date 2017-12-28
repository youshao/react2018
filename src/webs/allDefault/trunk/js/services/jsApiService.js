/**
 * 微信相关接口
 */

import apiHelper from './apiHelper';

class JsApiService {

    /**
     * 获取微信签名
     * @param {*object} data
     */
    weiXinConfig(data) {
        let requestParam = {
            url: `https://webservice.cx580.com/share/url`,
            data: {
                method: 'post',
                body: data
            }
        };
        return apiHelper.fetch(requestParam);
    }

    /**
     * 获取QQ签名
     * @param {*object} data
     */
    qqConfig(data) {
        let requestParam = {
            url: `https://qq.cx580.com/ShareSign.aspx`,
            data: {
                method: 'post',
                body: data
            }
        };
        return apiHelper.fetch(requestParam);
    }
}

export default new JsApiService()