/**
 * 首页相关接口
 */

import apiHelper from './apiHelper';

class IndexService {

    /**
     * 获取banner
     * @param {*object} data
     */
    banners(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}violation/car/list`,
          data: {
            method: 'get',
            body: data
          }
        };
        return apiHelper.fetch(requestParam);
    }

     /**
     * 获取快捷入口ICONS
     * @param {*object} data
     */
    icons(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}app/icons`,
          data: {
            method: 'post',
            body: data
          }
        };
        return apiHelper.fetch(requestParam);
    }


    /**
     * 获取资讯内容列表
     * @param {*object} data
     */
    news(data) {
        let requestParam = {
          url: `${apiHelper.baseApiUrl}app/news`,
          data: {
            method: 'post',
            body: data
          }
        }; 
        return apiHelper.fetch(requestParam);
    }
}

export default new IndexService()