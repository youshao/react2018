/**
 * 微信相关接口
 */
import apiHelper from './apiHelper';
import { baseService } from './baseService';

class JsApiService {

    /**
     * 获取微信签名
     * @param {object} data
     */
    weiXinConfig(data) {
        return baseService('https://webservice.cx580.com/share/url', data);
    }

    /**
     * 获取QQ签名
     * @param {object} data
     */
    qqConfig(data) {
        return baseService('https://qq.cx580.com/ShareSign.aspx', data);
    }
}

export default new JsApiService()