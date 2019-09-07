'use strict';
const Service = require('egg').Service;

class UserService extends Service {

  /**
   * 登录
   * @param uname
   * @param pwd
   * @return {Bluebird<TInstance[]>}
   */
  async login(uname, pwd) {
    const users = await this.ctx.model.User.findAll({
      where: {
        uname,
        pwd,
      },
    });
    return users;
  }

  async queryUsers(uname, nickname, role) {
    const { app, model } = this.ctx;
    const { Op } = app.Sequelize;
    const users = await model.User.findAll({
      where: {
        uname: {
          [Op.like]: '%' + uname + '%',
        },
        nickname: {
          [Op.like]: '%' + nickname + '%',
        },
        role,
      },
    });
    return users;
  }

  /**
   * 查询用户菜单
   * @return {Promise<void>}
   */
  async queryMenus(role) {
    const menus = await this.ctx.db.query('select t.id,t.name,t.path,t.pid from menus t,role_menus where role_menus.id = ?', role);
    return menus;
  }

  /**
   * 查询所有角色信息
   * @return {Promise<void>}
   */
  async queryRoles() {
    const roles = await this.ctx.model.Role.findAll();
    return roles;
  }
}

module.exports = UserService;
