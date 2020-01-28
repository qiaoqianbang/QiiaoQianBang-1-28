/*
 * @Author: Bang
 * @Date: 2020-01-08 11:18:53
 * @LastEditTime : 2020-01-10 10:06:26
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
'use strict';

const Controller = require('egg').Controller;
const Jwt = require('jsonwebtoken');
class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;

        const result = await ctx.service.user.login(username);

        if (result.length === 0) {
            ctx.body = {
                code: 0,
                msg: '用户名未注册',
            };
            return;
        }
        if (result[0].password !== password) {
            ctx.body = {
                code: 0,
                msg: '密码错误',
            };
            return;
        }

        if (result.length > 0) {
            const token = Jwt.sign({...result[0] }, 'bang');
            ctx.body = {
                code: 1,
                msg: '登陆成功',
                type: 'login',
                username: result[0].username,
                utype: result[0].utype,
                token,
            };
        }
    }
    async register() {
        const { ctx } = this;
        const { username, password, utype } = ctx.request.body;
        console.log(utype);
        const data = await this.app.mysql.query(`select * from user where username="${username}"`);

        if (data.length > 0) {
            ctx.body = {
                msg: '用户账号已存在',
                code: 0,
            };
            return;
        } else {
            const result = await ctx.service.user.register(username, password, utype);
            if (result.affectedRows > 0) {
                ctx.body = {
                    msg: '注册成功',
                    code: 1,
                    type: 'register',
                };
            }
        }
    }
}

module.exports = UserController;