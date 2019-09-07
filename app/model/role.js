'use strict';
module.exports = app => {
  const { STRING, NUMBER } = app.Sequelize;
  const Role = app.model.define('role', {
    id: {
      type: NUMBER(11),
      primaryKey: true,
    },
    name: STRING(225),
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  return Role;
};
