import baseAuth from 'app/utils/auth';
import config from '../config'

/**
 * 登录授权
 */
class Auth extends baseAuth {

    constructor() {
        super(config);
    }
};

// 实例化后再导出
export default new Auth()