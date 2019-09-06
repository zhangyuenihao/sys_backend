'use strict';
const Service = require('egg').Service;

class UserService extends Service {

  async login(uname, pwd) {
    const users = await this.ctx.model.User.findAll({
      where: {
        uname,
        pwd,
      },
    });
    return users;
  }
  async loginAll(uname) {
    const users = await this.ctx.model.User.findAll({
      where: {
        uname
      },
    });
    return users;
  }
  async addUser(user) {

  }

  async queryUser(uname, nickname) {
    const users = await this.ctx.model.User.findAll({
      where: {
        uname,
        nickname,
      },
    });
  }
}

module.exports = UserService;
