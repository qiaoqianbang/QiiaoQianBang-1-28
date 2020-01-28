/*
 * @Author: Bang
 * @Date: 2020-01-08 11:50:53
 * @LastEditTime : 2020-01-10 09:31:48
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
import axios from 'axios';
import { getSession } from '../utils/mySession';
export default (method, url, data = []) => {
    let config = {};
    config.method = method;
    config.url = url;
    //判断传参是data还是params
    let type = method === 'get' ? 'params' : 'data';
    config[type] = data;
    config.headers = {
        token: getSession('token') || 'none',
    };
    return axios(config).catch(error => {
        //error.response.status
        switch (error.response.status) {
            case 404:
                alert('客户端出错');
                break;
            case 500:
                alert('服务端出错');
                break;
            default:
                return;
        }
    });
};