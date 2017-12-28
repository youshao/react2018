/**
 * URL重定向
 */
import { Toast } from 'antd-mobile'

//配置文件
import config from '../config'

class Other {
    constructor() {
        this.init();
    }

    init() {
        this.cxytjInit() //埋点JS初始化
        setInterval(() => this.historyInit(), 100) //避免微信后退不刷新，所以这里定时循环
    }

    /**
     * history相关初始化
     */
    historyInit() {
        if (window.history.state) {

            let { urlReplace, historyGo } = window.history.state;

            //重定向到指定页面
            if (urlReplace) {
                document.getElementById('app').style.display = 'none' //隐藏界面，提升交互体验
                Toast.loading('', 0)
                let url = urlReplace
                window.history.replaceState({}, '', ''); //清空需要跳转的URL
                window.location.replace(url) //重定向
                return;
            }

            //页面后退
            if (historyGo) {
                window.history.go(historyGo);
                return;
            }
        }
    }

    /**
     * 埋点JS初始化
     */
    cxytjInit() {
        if (window.cxytjIsReady) {
            //初始化通用数据
            this.cxytjInitData();
        } else {
            window.cxytjReady = () => {
                this.cxytjInitData();
            }
        }
    }

    /**
     * 埋点JS初始化的数据
     */
    cxytjInitData() {
        console.warn('提示：请先到other.js中修改埋点的productId为正确的值，如果已经修改，请删除此段提示代码！');
        window.cxytj.init({ //以下为初始化示例，可新增或删减字段
            productId: 'allViolation', //产品ID
            productVersion: '1.0', //产品版本
            channel: sessionStorage.getItem('userType'), //推广渠道
            isProduction: config.production, //生产环境or测试环境 默认测试环境
            userId: sessionStorage.getItem('userId'), //用户ID
        });
    }

}

// 实例化后再导出
export default new Other()


window.onerror = function (msg, url, l) {
    var txt = '';
    txt = "There was an error on this page.\n\n";
    txt += "Error: " + msg + "\n";
    txt += "URL: " + url + "\n";
    txt += "Line: " + l + "\n\n";
    txt += "Click OK to continue.\n\n";
    if (!config.production) {
        console.log('全局异常捕获：', txt);
        return true; //正式环境屏蔽错误
    } else {
        return true; //正式环境屏蔽错误
    }
}