/*
 * @Author: Bang
 * @Date: 2020-01-08 11:18:53
 * @LastEditTime : 2020-01-12 10:11:34
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.post('/login', controller.user.login);
    router.post('/register', controller.user.register);
    router.post('/menulist', controller.menu.index);
    router.get('/userlist', controller.userlist.list);
    //
    router.get('/knowlist', controller.knowlist.list);
    router.post('/addknow', controller.knowlist.add);
    router.post('/deleteknow', controller.knowlist.del);
    router.post('/modknow', controller.knowlist.mod);
    //
    router.get('/doclist', controller.doclist.list);
    router.post('/deldoc', controller.doclist.del);
    //
    router.get('/getkname', controller.doclist.getkname);
    router.post('/moddoc', controller.doclist.mod);
};