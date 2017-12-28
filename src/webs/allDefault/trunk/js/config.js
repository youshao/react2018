/**
 * 配置
 */
import common from './utils/common'

const userType = sessionStorage.getItem('userType') || common.getUrlKeyValue('userType') || common.getJsApiUserType() || 'alipay'
const authType = sessionStorage.getItem('authType') || common.getUrlKeyValue('authType') || common.getJsApiUserType() || 'alipay'
const production = window.location.host.indexOf('daiban.cx580.com') > -1 || window.location.host.indexOf('pre.cx580.com') > -1; //是否为生产环境 或预发布环境
const authUrl = (production ? 'https://auth.cx580.com/Auth.aspx' : 'http://testauth.cx580.com/Auth.aspx') + `?forceLogin=true&userType=${userType}&authType=${authType}&clientId=CheWu&redirect_uri=`;

export default {
    //是否为生产环境
    production: production,

    //接口地址
    baseApiUrl: production ? window.location.protocol + "//" + window.location.host + "/" : "http://192.168.1.165:9021/",

    //单点登录地址 回调地址需自行补全
    authUrl: authUrl,

    //违章首页路径
    violationUrl: production ? `https://daiban.cx580.com/Violation/index.html` : `http://webtest.cx580.com:9021/Violation/index.html`, 

     //H5首页路径
    h5IndexUrl: production ? `https://daiban.cx580.com/H5Index/index.html` : `http://webtest.cx580.com:9021/H5Index/index.html`,
    
    //调试的userId
    debugUsers: ['B406E4D73A704585AB64B35E2A7896BA', 'B4C02D709C9E41AAB3F7B40BD073B4B5'], //debug的userId账号
}