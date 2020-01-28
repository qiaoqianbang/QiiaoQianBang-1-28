/*
 * @Author: Bang
 * @Date: 2020-01-08 14:02:47
 * @LastEditTime : 2020-01-10 10:06:49
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Service = require('egg').Service;
class UserService extends Service {
    async login(username) {
        return await this.app.mysql.query(`select * from user where username="${username}"`);
    }
    async register(username, password, utype) {
        return await this.app.mysql.insert('user', { username, password, utype });
    }
}
module.exports = UserService;