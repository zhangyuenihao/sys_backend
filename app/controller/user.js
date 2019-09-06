'use strict';

const Controller = require('egg').Controller;

class UserControl extends Controller {
  /**
   * 用户登录
   * @return {Promise<void>}
   */
  async login() {
    const { ctx, service } = this;
    const param = ctx.request.query;
    const { uname, pwd } = param;
    const { userService } = service;
    const user = await userService.login(uname, pwd);
    if (user) {
      ctx.session.user = user;
    }
    ctx.body = JSON.stringify(user);
  }
  async loginAll() {
    const { ctx, service } = this;
    const param = ctx.request.query;
    const { uname } = param;
    const { userService } = service;
    const user = await userService.login(uname);
    if (user) {
      ctx.session.user = user;
    }
    ctx.body = JSON.stringify(user);
  }

  /**
   * 查询系统新
   * @return {Promise<void>}
   */
  async queryInfo() {
    const { ctx } = this;
    ctx.body = JSON.stringify(ctx.session.user);
  }
}

module.exports = UserControl;
