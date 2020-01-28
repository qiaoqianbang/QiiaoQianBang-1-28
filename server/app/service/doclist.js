/*
 * @Author: Bang
 * @Date: 2020-01-11 19:55:26
 * @LastEditTime : 2020-01-12 10:59:14
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Service = require('egg').Service;
class KnowService extends Service {
    async list(uid) {
        return await this.app.mysql.query(
            `SELECT  kid, kname,docid,title,content  FROM doc ,user,know WHERE doc.uid=user.key AND doc.uid=${uid} AND doc.belong=know.kid`
        );
    }
    async del(docid) {
        return await this.app.mysql.query(`delete from doc where docid=${docid}`);
    }
    async mod(title, content, belong, docid) {
        return await this.app.mysql.query(
            `update doc set title='${title}',content='${content}',belong='${belong}' where docid=${docid}`
        );
    }
}
module.exports = KnowService;