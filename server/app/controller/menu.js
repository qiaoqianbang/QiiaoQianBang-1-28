/*
 * @Author: Bang
 * @Date: 2020-01-09 19:37:51
 * @LastEditTime : 2020-01-09 20:38:48
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
const Controller = require('egg').Controller;
const defaultMenuList = require('../../config/menu_list.js');
class MenuController extends Controller {
    async index() {
        const result = await this.app.mysql.query(
            `SELECT * FROM limits_menu WHERE TYPE="${this.ctx.info.utype}"`
        );
        let menuArr = result.map(i => defaultMenuList[i.power]);

        let List = [];
        menuArr.forEach(item => {
            let index = List.findIndex(j => j.classType === item.classType);
            if (index !== -1) {
                List[index].sub.push({
                    key: item.key,
                    name: item.name,
                    path: item.path,
                });
                return;
            }
            List.push({
                key: 'sub' + item.key,
                iconType: item.iconType,
                classType: item.classType,
                sub: [{
                    key: item.key,
                    name: item.name,
                    path: item.path,
                }, ],
            });
        });

        this.ctx.body = {
            List,
        };
    }
}
module.exports = MenuController;