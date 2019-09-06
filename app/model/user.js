'use strict';
module.exports = app => {
  const { STRING, NUMBER } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: NUMBER(11),
      primaryKey: true,
    },
    pwd: STRING(225),
    uname: STRING(225),
    nickname: STRING(225),
    role: NUMBER,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  return User;
};
