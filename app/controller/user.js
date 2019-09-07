'use strict';

const Controller = require('./base');
class UserControl extends Controller {
  /**
   * 用户登录
   * @return {Promise<void>}
   */
  async login() {
    const { ctx, service } = this;
    const param = ctx.request.body;
    const { uname, pwd, verifyCode } = param;
    if (!uname || !pwd) {
      this.fail(-1, '用户名密码错误');
      return;
    }
    const codeInfo = this.getVerifyCode(1);
    // 判断验证码是否存在
    if (!codeInfo) {
      this.fail(-1, '验证码不存在');
      return;
    }
    const { code, addTime } = codeInfo;
    // 判断验证码是否过期
    if (Date.now() - addTime > 60 * 1000 * 2) {
      this.fail(-1, '验证码已过期');
      return;
    }

    if (verifyCode !== code) {
      this.fail(-1, '验证码错误');
      return;
    }

    const { userService } = service;
    const users = await userService.login(uname, pwd);
    if (!users || !users.length) {
      this.fail(-1, '用户名密码错误');
      return;
    }
    this.setUser(users[0]);
    this.success({});
  }

  /**
   * 查询系统新
   * @return {Promise<void>}
   */
  async queryInfo() {
    const { service } = this;
    const { userService } = service;
    const user = this.getUser();
    if (user) {
      const menus = await userService.queryMenus(user.role);
      const roles = await userService.queryRoles();
      delete user.pwd;
      this.success({
        user,
        menus,
        roles,
      });
    }
    this.fail(100, {}, '用户信息已过期');

  }

}

module.exports = UserControl;
