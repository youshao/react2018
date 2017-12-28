/**
 * 用户帮助类
 */

import config from '../config';

class UserHelper {

    constructor() {

    }

    /**
     * 跳转到单点登录
     */
    toAuthUrl() {
        sessionStorage.clear(); //清空sessionStorage缓存
        let url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash; //好像不用编码 编码反而出错？
        url = url.replace('#', '%23'); //替换#号
        url = url.split('?')[0]; //过滤？号     
        window.location.replace(config.authUrl + url); //跳转到单点登录
    }

    /**
     * 获取 userId 和 token
     */
    getUserIdAndToken() {
        return {
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('token'),
            userType: sessionStorage.getItem('userType'),
            authType: sessionStorage.getItem('authType'),
            deviceId: sessionStorage.getItem('deviceId')
        }
    }

    /**
     * 登陆
     * @param callback function 登陆成功之后的回调
     */
    Login(callback) {
        //先判断是否已经存在userType 和 authType 避免页面接口返回4222时触发多个授权登录
        if (sessionStorage.getItem("userType") && sessionStorage.getItem("authType")) {
            this.toAuthUrl() //跳转到单点登录
        }
    }
};

// 实例化后再导出
export default new UserHelper()