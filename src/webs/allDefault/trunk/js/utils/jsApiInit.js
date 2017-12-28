import JsApiService from '../services/JsApiService'
import common from './common'
import config from '../config'

class JsApiInit {

    constructor() {
        this.debug = false;
        this.userType = common.getJsApiUserType();
        this.requireJs(); //引入JSDK
    }

    requireJs() {
        let userType = this.userType;
        let jsSrc = '';
        if (userType == 'weixin') {
            jsSrc = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
        } else if (userType == 'app') {
            jsSrc = '//cx580.oss-cn-shenzhen.aliyuncs.com/cweb/js/cx580.jsApi.js';
        } else if (userType == 'qq') {
            jsSrc = '//mp.gtimg.cn/open/js/openApi.js';
        }
        if (jsSrc) {
            common.requireJs(jsSrc, () => {
                this.jsApiIsLoad(); //JsApi加载完成后执行
                window.jsApiIsLoad = true;
                window.jsApiIsReady && window.jsApiIsReady();
                let ev = new Event('jsApiIsReady', {
                    bubbles: 'true',
                    cancelable: 'true'
                });
                document.dispatchEvent(ev);
            }, () => {
                if (sessionStorage.getItem('userId')) {
                    networkError('./images/networkError-icon.png'); //存在用户信息才显示网络错误，避免走单点登录的时候 出现网络错误
                }
            })
        } else {
            this.jsApiIsLoad(); //JsApi加载完成后执行
        }
    }

    jsApiIsLoad() {
        let userType = this.userType;
        if (userType == 'weixin' || userType == 'qq' || userType == 'app') {
            //需要引入JS的文件，需要等到JS文件引入后再执行
            if (window.jsApiIsLoad) {
                this.runJsApi() //执行JsApi
            } else {
                window.jsApiIsReady = () => {
                    this.runJsApi() //执行JsApi
                }
            }
        } else {
            this.runJsApi() //执行JsApi
        }
    }

    runJsApi() {
        let userType = this.userType;
        switch (userType) {
            case 'app':
                this.appConfig() //APP环境配置
                break;
            case 'weixin':
                this.weiXinConfig() //初始化微信配置
                
                // 每次哈希路由发生变化，都需要重新获取一次微信的配置
                document.addEventListener('hashchange', () => this.weiXinConfig());
                break;
            case 'qq':
                this.qqConfig() //初始化QQ配置
                break;
            case 'alipay':
                common.alipayReady(() => AlipayJSBridge.call('hideOptionMenu')); //隐藏支付宝右上角
                break;
            default:
            //平台检测失败
        }
    }

    /**
     * APP配置
     */
    appConfig() {
        window.cx580.jsApi.config({
            jsApiList: [] //注册需要APP监听的jsApi列表
        }, function (data) {
            // alert(JSON.stringify(data))
        })
    }

    /**
     * 微信配置
     */
    weiXinConfig() {
        let shareUrl = window.location.href;
        let userType = this.userType;
        if (userType == 'weixin') {

            JsApiService.weiXinConfig({
                signUrl: encodeURIComponent(shareUrl)
            }).then(data => {
                try {
                    wx.config({
                        debug: this.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.data.appId, // 必填，公众号的唯一标识
                        timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                        signature: data.data.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onRecordEnd',
                            'playVoice',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ]
                    });
                    wx.ready(function () {
                        wx.hideAllNonBaseMenuItem(); // “基本类”按钮详见附录3
                    })
                } catch (error) {

                }
            }, error => console.error(error))

        }
    }

    /**
     * QQ配置
     */
    qqConfig() {
        let shareUrl = window.location.href;
        let userType = this.userType;
        if (userType == 'qq') {
            JsApiService.qqConfig({
                signUrl: encodeURIComponent(shareUrl)
            }).then(data => {
                try {
                    mqq.config({
                        debug: this.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        jsApiList: ['closeWindow', 'hideOptionMenu', 'hideAllNonBaseMenuItem', 'showBottomBar'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    mqq.ready(function () {
                        mqq.hideOptionMenu(); //隐藏右上角菜单接口
                        mqq.hideAllNonBaseMenuItem(); //隐藏所有非基础按钮接口
                        mqq.showBottomBar(); //显示底部功能条
                    })

                    mqq.error(function (res) {
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

                    });

                } catch (error) {

                }
            }, error => console.error(error))
        }
    }

};

// 实例化后再导出
export default new JsApiInit()