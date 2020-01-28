/*
 * @Author: Bang
 * @Date: 2020-01-08 19:08:28
 * @LastEditTime : 2020-01-10 14:09:27
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const WhiteList = ['/login', '/register'];
const jwt = require('jsonwebtoken');

function verifyFunc(token) {
    return new Promise(res => {
        jwt.verify(token, 'bang', (err, result) => {
            if (err) throw err;
            res(result);
        });
    });
}
module.exports = () => {
    return async function(ctx, next) {
        if (WhiteList.includes(ctx.request.path)) {
            await next();
            return;
        } else {
            const token = ctx.get('token');
            if (token === 'none') {
                ctx.body = {
                    msg: '请登录',
                    code: 101,
                };
            } else {
                let info;
                try {
                    info = await verifyFunc(token);
                } catch (err) {
                    if (err) {
                        ctx.body = {
                            code: 0,
                            msg: '登陆失效',
                        };
                    }
                }
                ctx.info = info;
                await next();
            }
        }
    };
};