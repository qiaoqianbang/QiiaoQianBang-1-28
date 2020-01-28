/*
 * @Author: Bang
 * @Date: 2020-01-10 14:41:09
 * @LastEditTime : 2020-01-10 15:02:22
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Controller = require('egg').Controller;
class UserListController extends Controller {
    async list() {
        const data = await this.ctx.service.userlist.list();
        if (data.length > 0) {
            this.ctx.body = {
                code: 1,
                msg: '用户列表',
                data,
            };
        }
    }
}
module.exports = UserListController;