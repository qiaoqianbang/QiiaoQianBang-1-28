/*
 * @Author: Bang
 * @Date: 2020-01-11 19:55:11
 * @LastEditTime : 2020-01-12 11:04:38
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Controller = require('egg').Controller;
class DocController extends Controller {
    async list() {
        const data = await this.ctx.service.doclist.list(this.ctx.info.key);
        if (data.length > 0) {
            this.ctx.body = {
                code: 1,
                msg: '文档列表',
                data,
            };
            return;
        }
        if (data.length === 0) {
            this.ctx.body = {
                code: 1,
                msg: '无数据',
                data: [],
            };
            return;
        }
    }
    async del() {
        const { docid } = this.ctx.request.body;
        const result = await this.ctx.service.doclist.del(docid);
        if (result.affectedRows > 0) {
            this.ctx.body = {
                code: 1,
                msg: '删除成功呢',
            };
        }
    }
    async getkname() {
        const result = await this.app.mysql.query(`select * from know`);

        this.ctx.body = {
            code: 1,
            msg: '获取成功',
            data: result,
        };
    }
    async mod() {
        const { title, content, belong, docid } = this.ctx.request.body;
        const result = await this.ctx.service.doclist.mod(title, content, belong, docid);
        if (result.affectedRows > 0) {
            this.ctx.body = {
                code: 1,
                msg: '修改成功',
                data: result,
            };
        }
    }
}
module.exports = DocController;