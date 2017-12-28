/**
 * 统一封装各个平台（app、qq、微信、支付宝）的JSDK
 */

import common from './common'

class JsApi {

    /**
    * 构造函数
    */
    constructor() {
        this.type = common.getJsApiUserType(); //平台类型
    }

    /**
     * 打开新的webView
     * @param {*string} url 目标URL
     * @param {*object} params 额外参数
     */
    pushWindow(url, params = {}) {
        switch (this.type) {
            //APP环境
            case 'app':
                window.cx580.jsApi.call({
                    "commandId": "",
                    "command": "openNewBrowserWithURL",
                    "data": {
                        "url": url,
                        "umengId": "cfw_youkachongzhi"
                    }
                }, function (data) {

                });
                break;
            //支付宝环境
            case 'alipay':
                common.alipayReady(() => {
                    AlipayJSBridge.call('pushWindow', {
                        url: url,
                        param: params
                    });
                });
                break;
            //默认
            default:
                window.location.href = url;
        }
    }

    /**
     * 页面后退 无法后退的时候 关闭webView
     */
    back() {
        let url = window.location.href;
        window.history.back();
        setTimeout(() => {
            if(url===window.location.href){
                switch (this.type) {
                    //APP环境
                    case 'app':
                        window.cx580.jsApi.call({
                            "commandId": "",
                            "command": "close"
                        }, function (data) {

                        });
                        break;
                    //QQ
                    case 'qq':
                        mqq && mqq.ui && mqq.ui.popBack();
                        break;
                    //支付宝环境
                    case 'weixin':
                        wx && wx.closeWindow();
                        break;
                    //支付宝环境
                    case 'alipay':
                        common.alipayReady(() => {
                            AlipayJSBridge.call('closeWebview');
                        });
                        break;
                    //默认
                    default:
                        window.close();
                }
            }
        }, 100)
    }
}

export default JsApi