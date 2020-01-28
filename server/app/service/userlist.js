/*
 * @Author: Bang
 * @Date: 2020-01-10 14:42:49
 * @LastEditTime : 2020-01-10 15:12:25
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Service = require('egg').Service;
class UserListService extends Service {
    async list() {
        return await this.app.mysql.query(`select * from user`);
    }
}
module.exports = UserListService;