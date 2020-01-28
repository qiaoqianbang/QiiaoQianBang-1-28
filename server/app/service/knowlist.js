/*
 * @Author: Bang
 * @Date: 2020-01-11 14:16:11
 * @LastEditTime : 2020-01-11 16:55:56
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Service = require('egg').Service;

class KnowService extends Service {
    async list() {
        return await this.app.mysql.select('know');
    }
    async add(kname, des) {
        return await this.app.mysql.query(
            `insert into know (kname,des) values ("${kname}","${des}")`
        );
    }
    async del(kid) {
        return await this.app.mysql.query(`delete from know where kid=${kid}`);
    }
    async mod(kname, des, kid) {
        return await this.app.mysql.query(
            `update know set kname="${kname}",des="${des}"  where kid=${kid} `
        );
    }
}
module.exports = KnowService;