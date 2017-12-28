/**
 * PS：此类只支持纯方法
 */
class Common {

    /**
     * 获取当前网址的根路径 返回的数据为：http.../#/
     */
    getRootUrl() {
        let this_url = window.location.href; //当前网址
        let substrNum = this_url.indexOf('#') + 1; //获取到哈希路由当前的位置 + 1
        let url = this_url.substr(0, substrNum) + '/';
        return url;
    }

    /**
     * 将键值对转为URL参数
     */
    _toQueryPair(key, value) {
        ///<summary>将键值对转为URL参数</summary>
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        //return key + '=' + (value == null ? '' : String(value));
    }

    /**
     * 将对象转为URL参数
     */
    toQueryString(obj) {
        var ret = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                key = encodeURIComponent(key);
                var values = obj[key];
                if (values && values.constructor === Array) { //数组 
                    var queryValues = [];
                    for (var i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(this._toQueryPair(key + '[' + i + ']', value));
                    }
                    ret = ret.concat(queryValues);
                } else { //字符串 
                    ret.push(this._toQueryPair(key, values));
                }
            }
        }
        return ret.join('&');
    }

    /**
     * 设置浏览器标题 兼容IOS 后退title不修改的bug
     */
    setViewTitle(title) {
        let body = document.getElementsByTagName('body')[0];
        document.title = title;
        try {
            if (navigator.userAgent.indexOf("AlipayClient") !== -1) {
                this.alipayReady(() => {
                    AlipayJSBridge.call("setTitle", {
                        title: title
                    });
                });
            }
            let iframe = document.createElement("iframe");
            iframe.setAttribute("src", "./favicon.ico");
            iframe.style.display = 'none';
            iframe.addEventListener('load', function () {
                setTimeout(() => {
                    try {
                        document.body.removeChild(iframe);
                    } catch (error) {

                    }
                }, 10);
            });
            document.body.appendChild(iframe);
        } catch (error) {
            console.log("setViewTitle错误：", error)
        }
    }

    /**
     * 检测是否为车行易app
     */
    isCXYApp() {
        let isCXYApp = navigator.userAgent.indexOf('appname_cxycwz') > -1 ? true : false;
        return isCXYApp;
    }

    /**
     * 获取安卓系统的版本号 非安卓手机则返回false
     */
    getAndroidVersion() {
        let re = /Android\s([^;]+)/ig;
        let _version = re.exec(navigator.userAgent);
        if (_version) {
            _version = _version[1];
        } else {
            _version = false;
        }
        return _version;
    }

    browser() {
        let u = navigator.userAgent;
        //app = navigator.appVersion;
        return {
            versions: { //移动终端浏览器版本信息 
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
                iPad: u.indexOf('iPad') > -1, //是否iPad 
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或uc浏览器 
            }
        }
    }

    /**
     * 获取APP的版本号 非APP返回false
     */
    getAppVersion() {
        const u = navigator.userAgent;
        const u_arr = /appname_cxycwz\/(\d+\.\d+\.\d)/ig.exec(u)
        if (u_arr) {
            return u_arr[1];
        }
        return false;
    }

    /**
     * 检测当前浏览器是否为iPhone(Safari)
     */
    isIPhone() {
        let browser = this.browser();
        if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
            return true;
        }
        return false;
    };

    /**
     * 检测当前浏览器是否为Android(Chrome)
     */
    isAndroid() {
        let browser = this.browser();
        if (browser.versions.android) {
            return true;
        }
        return false;
    };

    /**
     * 获取JsApi的userType
     */
    getJsApiUserType() {
        var userType = '';
        var ua = navigator.userAgent;
        if (ua.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
            userType = 'weixin';
        } else if (ua.indexOf("appname_cxycwz") !== -1) {
            userType = 'app';
        } else if (ua.indexOf("AlipayClient") !== -1) {
            userType = 'alipay';
        } else if (ua.indexOf("QQ") !== -1) {
            userType = 'qq';
        }
        return userType;
    }

    /**
     * 获取URL上的keyValue
     * @param {*string} key
     * @param {*string} url 如果存在此参数，则URL优先使用此参数
     */
    getUrlKeyValue(key, url) {
        if (!key) {
            return key;
        }
        var keyName = key; //保存keyName
        var search = url || window.location.href; //由于hash值的原因 这里不用window.location.search用window.locationhref
        key = new RegExp('[\?|&]' + key + '=([^&]+)', 'g');
        key = key.exec(search);
        key = key ? key[1] : "";
        return key.split("#")[0] //避免返回的数据带有hash值
    }

    /**
     * 后退时跳转到指定的URL，并且在指定URL后退时关闭webView 仅支持微信和支付宝
     */
    backToUrl(url = '') {
        history.replaceState({ urlReplace: url }, "", "");
        history.pushState({}, "", "");
        history.forward(); //前进
    }

    /**
     * 页面后退
     * @param {*number} number 后退的页数
     */
    historyGo(number) {
        history.replaceState({ historyGo: number }, "", "");
        history.pushState({}, "", "");
        history.forward(); //前进
    }

    /**
     * 当前地址和URL中的地址不相同时，关闭webView
     */
    noCloseWebViewUrl(url = '') {
        var userType = this.getJsApiUserType();

        if (userType == 'weixin' || userType == 'alipay') {
            sessionStorage.setItem("noCloseWebViewUrl", window.location.href); //后退到订单确认页面时关闭webView
        }
    }

    /**
     * 后退时显示确认对话框
     * @param {*string} text 
     * @param {*function} callback 
     */
    backShowConfirm(callback) {
        var userType = this.getJsApiUserType();
        if (userType == 'weixin' || userType == 'alipay' || userType == "app") {
            if (callback) {
                window['stateConfirmCallback'] = callback
                history.replaceState({ confirm: 1 }, "", "");
                history.pushState({}, "", "");
                history.forward(); //前进
            }
        }
    }

    /**
     * 支付宝JSDK加载完成
     */
    alipayReady(callback) {
        var userType = this.getJsApiUserType();
        if (userType == 'alipay') {
            if (window.AlipayJSBridge) {
                callback && callback();
            } else {
                // 如果没有注入则监听注入的事件
                document.addEventListener('AlipayJSBridgeReady', callback, false);
            }
        }
    }

    /**
     * 提交埋点
     * @param {*Object} data json格式
     */
    sendCxytj(data) {
        try {
            if (window.history.state && window.history.state.urlReplace) {
                //页面需要重定向时不需要提交埋点数据
            } else {
                window.cxytj.recordUserBehavior(Object.assign({}, {
                    userId: sessionStorage.getItem('userId'), //用户ID
                    eventType: '2', //1.时长 2.点击数
                    productUserId: sessionStorage.getItem("productUserId"), //APP端 （设备标记ID） //暂时不在APP端上线
                    eventTime: window.cxytj.getNowFormatDate(),  //触发时间
                    curPageInfo: document.title,
                    prevPageInfo: sessionStorage.getItem("prevPageInfo") //上一页信息 默认是通过hashChange生成的页面title
                }, data));
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 获取cookie
     * @param {*string} name 
     */
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    /**
     * 获取用户信息字符串
     */
    getUserInfoString() {
        let userId = sessionStorage.getItem('userId');
        let token = sessionStorage.getItem('token');
        let userType = sessionStorage.getItem('userType');
        let authType = sessionStorage.getItem('authType');
        return `userId=${userId}&token=${token}&userType=${userType}&authType=${authType}`
    }

    /**
     * 异步加载JS
     */
    requireJs(url, onload, onerror) {
        if (url) {
            let hm = document.createElement("script");
            hm.src = url;
            hm.onload = () => {
                //JsApi加载完成后执行
                onload && onload();
            }
            hm.onerror = () => {
                //js加载失败
                onerror && onerror();
            }
            let s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        }
    }
};

// 实例化后再导出
export default new Common()