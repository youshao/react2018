/**
 * 登录授权
 */

import common from './common'

class Auth {

    /**
     * 构造函数
     * @param {*object} config 配置信息
     */
    constructor(config = {}) {
        this.config = config;
        this.userType = common.getJsApiUserType();
        this.init();
    }

    init() {
        //检查必须传递的配置文件是否存在
        let { authUrl, production } = this.config;
        if (!authUrl) {
            return alert("config配置缺少key:authUrl " + authUrl);
        }
        if (production === undefined) {
            return alert("config配置缺少key:production " + production);
        }

        let userInfo = this.getUserInfo();

        if (this.userType != 'app') {
            //非APP 并且userId或token不存在 则去单点登录
            if (!userInfo.userId || !userInfo.token) {
                return this.toAuthUrl();
            }
        } else {
            //APP环境 deviceId不存在 则调用getSymbol
            if (!userInfo.deviceId) {
                return this.getAppUserInfo(userInfo);
            }
        }

        //保存用户信息
        this.setUserInfo(userInfo);
    }

    /**
     * 获取用户信息（userId、token、userType、authType）
     * 先从cookie中获取，如果cookie中没有则从url上获取
     */
    getUserInfo() {
        let keyPre = ''; //cookie key值的前缀
        if (!this.config.production) {
            //测试环境
            keyPre = 'test_';
        }

        return {
            userId: common.getCookie(keyPre + 'userId') || common.getUrlKeyValue('userId') || '',
            token: common.getCookie(keyPre + 'userToken') || common.getUrlKeyValue('token') || '',
            userType: common.getUrlKeyValue('userType') || sessionStorage.getItem('userType') || common.getCookie(keyPre + 'userType') || this.userType || 'alipay',
            authType: common.getUrlKeyValue('authType') || sessionStorage.getItem('authType') || common.getCookie(keyPre + 'authType') || this.userType || 'alipay',
            deviceId: common.getCookie('deviceId') || sessionStorage.getItem('deviceId') || ''
        }
    }

    /**
     * 单点登录
     */
    toAuthUrl() {
        //走单点登录，获取用户信息
        if (!common.getUrlKeyValue('userId') || !common.getUrlKeyValue('token')) {
            //没有用户信息时跳转到单点登录
            sessionStorage.clear(); //清空sessionStorage缓存

            let url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash; //好像不用编码 编码反而出错？
            url = url.replace('#', '%23'); //替换#号
            url = url.split('?')[0]; //过滤？号
            url += '&t=' + new Date().getTime(); //加一个时间戳，避免服务器挂后，一直读取缓存的数据
            window.location.replace(this.config.authUrl + url); //跳转到单点登录
        } else {
            //保存用户信息
            this.setUserInfo({
                userId: common.getUrlKeyValue('userId'),
                token: common.getUrlKeyValue('token'),
                userType: common.getUrlKeyValue('userType'),
                authType: common.getUrlKeyValue('authType')
            })
        }
    }

    /**
     * 获取APP用户信息
     * @param {*object} user 
     */
    getAppUserInfo(user) {
        if (this.userType !== 'app') {
            return;
        }

        try {
            window.cx580.jsApi.call({
                "commandId": "",
                "command": "getSymbol",
                "data": {
                    "deviceId": "", //3.0版本
                    "userid": "", //2.0版本
                    "accountId": "",
                    "token": "",
                }
            }, res => {
                let { deviceId, userid, accountId, token } = res.data;
                deviceId = deviceId || userid;
                if (deviceId) {
                    //刷新页面 这里拿deviceId来判断 避免出现死循环
                    user.deviceId = deviceId;
                    user.userId = accountId;
                    user.token = token;
                    this.setUserInfo(user);
                }
            });
        } catch (error) {
            //JSKD未加载完成或是初始化出现延迟
            setTimeout(() => this.getAppUserInfo(user), 100);
        }
    }

    /**
     * 保存用户信息
     * @param {*object} user 
     * {
     * userId:'',
     * token:'',
     * userType:'',
     * authType:'',
     * deviceId:''
     * }
     */
    setUserInfo(user) {
        sessionStorage.setItem('userId', user.userId);
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('userType', user.userType);
        sessionStorage.setItem('authType', user.authType);
        sessionStorage.setItem('deviceId', user.deviceId || '');

        this.delUserUrlKey();
    }

    /**
     * 删除用户URL上的敏感信息
     * @param {*array} arr 需要删除的key值
     */
    delUserUrlKey(arr = ['t', 'userId', 'token', 'userType', 'authType', 'userOpenId', 'phone', 'sign', 'clientId']) {
        let url = window.location.href;
        let str = '';
        arr.map(key => {
            key = new RegExp('[\?|&]' + key + '=([^&#]+)?', 'g');
            key = key.exec(url);
            if (key) {
                key = key[0];
                //存在铭感key值
                if (key.substr(0, 1) === '?') {
                    key = key.substr(1); //过滤问号 + "&"符号 避免URL格式不正确
                }
                url = url.replace(key, '');
            }
        })

        //最后一个是字符是"?"时自动过滤"?"
        if (url.substr(-1) === '?') {
            url = url.replace('?', '');
        }

        //没有参数时 自动过滤"?"
        url = url.replace('?#', '#');

        history.replaceState(window.history.state || {}, '', url);
    }

};

// 实例化后再导出
export default Auth