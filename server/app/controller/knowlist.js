/*
 * @Author: Bang
 * @Date: 2020-01-11 14:18:16
 * @LastEditTime : 2020-01-11 16:51:05
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Controller = require('egg').Controller;
class KnowListController extends Controller {
    async list() {
        const data = await this.ctx.service.knowlist.list();
        if (data.length > 0) {
            this.ctx.body = {
                code: 1,
                msg: '知识库列表',
                data,
            };
        }
    }
    async add() {
        const { kname, des } = this.ctx.request.body;
        console.log(kname, des);

        const data = await this.app.mysql.query(`select * from know where kname="${kname}"`);
        if (data.length > 0) {
            this.ctx.body = {
                code: 0,
                msg: '库名重复',
            };
        } else {
            const result = await this.ctx.service.knowlist.add(kname, des);
            if (result.affectedRows > 0) {
                this.ctx.body = {
                    code: 1,
                    msg: '创建成功',
                };
            }
        }
    }
    async del() {
        const { kid } = this.ctx.request.body;
        const data = await this.ctx.service.knowlist.del(kid);
        if (data.affectedRows > 0) {
            this.ctx.body = {
                code: 1,
                msg: '删除成功',
            };
        }
    }
    async mod() {
        const { kname, des, kid } = this.ctx.request.body;
        const data = await this.ctx.service.knowlist.mod(kname, des, kid);
        if (data.affectedRows > 0) {
            this.ctx.body = {
                code: 1,
                msg: '修改成功',
            };
        }
    }
}
module.exports = KnowListController;