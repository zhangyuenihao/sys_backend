'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user, common } = controller;
  router.get('/common/loginCode', common.loginCode);
  router.get('/common/registerCode', common.registerCode);
  router.post('/user/login', user.login);
  router.post('/user/info', user.queryInfo);
};
