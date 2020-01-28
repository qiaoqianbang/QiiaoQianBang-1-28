/*
 * @Author: Bang
 * @Date: 2020-01-08 11:18:53
 * @LastEditTime : 2020-01-08 19:09:09
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1578453531507_5175';

    // add your middleware config here
    config.middleware = ['index'];

    // add your user config here
    const userConfig = {
        security: {
            csrf: false,
        },
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: 'localhost',
                // 端口号
                port: '3306',
                // 用户名
                user: 'root',
                // 密码
                password: '12344321',
                // 数据库名
                database: 'egg-db',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },
    };

    return {
        ...config,
        ...userConfig,
    };
};