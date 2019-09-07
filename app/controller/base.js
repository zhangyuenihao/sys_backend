'use strict';

const { Controller } = require('egg');
// 验证码列表
const verifyArray = [];

/**
 * BaseController
 * @class
 * @author ruiyong-lee
 */
class BaseController extends Controller {
  getUser() {
    return { ...this.ctx.session.user };
  }

  setUser(user) {
    this.ctx.session.user = user;
    this.ctx.session.maxAge = 60 * 1000 * 20;
  }

  /**
     * 获取session
     */
  getSession() {
    return this.ctx.session;
  }

  /**
     * 添加验证码
     * @param info
     */
  setVerifyCode(info) {
    const index = verifyArray.findIndex(item => info.type === item.type);
    if (index < 0) {
      verifyArray.push(info);
      return;
    }
    verifyArray[index] = info;
    const session = this.getSession();
    session.verifyCode = verifyArray;

  }

  /**
     * 获取验证码
     */
  getVerifyCode(type) {
    return verifyArray.find(item => item.type === type);
  }

  /**
     * 删除验证码
     */
  delVerifyCode(type) {
    const index = verifyArray.findIndex(item => type === item.type);
    if (index >= 0) {
      verifyArray.splice(index, 1);
      const session = this.getSession();
      session.verifyCode = verifyArray;
    }
  }

  success(data, status) {
    this.ctx.body = { code: 0, data };
    this.ctx.status = status || 200;
  }

  fail(code, data, message) {
    this.ctx.body = { code, message, data: data || {} };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
