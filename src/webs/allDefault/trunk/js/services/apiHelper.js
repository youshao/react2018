import config from '../config'
import userHelper from '../utils/userHelper';
import cxySign from '../utils/cxySign';

require('isomorphic-fetch');

const key1 = config.cxyH5Key1;
const key2 = config.cxyH5Key2;
const diySign = key1 + key2;  // 这里拼接key只是为了打包后不那么容易被看出

class ApiHelper {

    constructor() {
        this.baseApiUrl = config.baseApiUrl;
    }

    /**
     * 获取 HTTP 头
     */
    _getHeaders() {
        return {
            "Accept": "*/*",
            // "authorization": "Basic Y3h5aW06Y3g1ODBjeDU4MGN4NTgws",
        }
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
     * 封装fetch
     */
    fetch(requestParam) {
        let resolveId = -1, rejectId = -1;
        let promise = new Promise((resolve, reject) => {
            
            // 网络超时
            rejectId = setTimeout(() => {
                clearTimeout(resolveId)
                reject('网络错误')
                console.error("网络错误")
            }, 20000);

            resolveId = setTimeout(() => {
                requestParam.data.method = requestParam.data.method || "get";
                requestParam.data.headers = requestParam.data.headers || {};
                Object.assign(requestParam.data.headers, this._getHeaders());
                if (requestParam.data.method.trim().toLowerCase() == "post") {
                    requestParam.data.headers["Content-Type"] = "application/x-www-form-urlencoded";
                }
                requestParam.data.body = requestParam.data.body || {};
                //设置用户
                let UserIdAndToken = userHelper.getUserIdAndToken();
                if (!requestParam.data.body.userId) {
                    requestParam.data.body["userId"] = UserIdAndToken.userId;
                }
                if (!requestParam.data.body.token) {
                    requestParam.data.body["token"] = UserIdAndToken.token;
                }
                if (!requestParam.data.body.userType) {
                    requestParam.data.body["userType"] = UserIdAndToken.userType;
                }
                if (!requestParam.data.body.authType) {
                    requestParam.data.body["authType"] = UserIdAndToken.authType;
                }
                requestParam.data.body["deviceId"] = UserIdAndToken.deviceId;

                /** 签名 */
                requestParam.data.body["nonceStr"] = cxySign.getNonceStr(); // 随机字符串

                // 转对象为签名所需的字符串（过滤空值）
                const signStr = cxySign.toSignString(requestParam.data.body);

                // 拼接上Key后再签名
                const sign = cxySign.fetchSign(`${signStr}&cxyH5Key=${diySign}`);
                requestParam.data.body["sign"] = sign;

                console.log('签名：', sign);
                console.log('提交的数据：', requestParam.data.body);

                requestParam.data.body = this.toQueryString(requestParam.data.body);
                requestParam.data.mode = "cors";
                if (requestParam.data.method.trim().toLowerCase() == "get") {
                    var request = new Request(requestParam.url + '?' + requestParam.data.body); //get请求不能有body,否则会报错
                } else {
                    var request = new Request(requestParam.url, requestParam.data);
                }
                // console.debug("request", request);
                let result = window.fetch(request, { headers: requestParam.data.headers })
                    .then((response) => {
                        let resp = response.json();
                        resp.then(function (data) {
                            if (data.code == "2222" || data.code == "4222") {
                                userHelper.Login();
                            }
                        });
                        clearTimeout(rejectId)
                        
                        return resolve(resp);
                    })
                    .catch((e) => {
                        clearTimeout(rejectId)
                        console.error("fetch 请求出错了");
                        console.dir(e);
                        // throw e; //使用saga后 这里不能抛错误，应该把错误信息返回给对应的接口，让接口自行处理
                        return reject(e);
                    });
            }, 0);
        });
        return promise;
    }
}

// 实例化后再导出
export default new ApiHelper()