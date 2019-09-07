'use strict';

const Controller = require('./base');
const svgCaptcha = require('svg-captcha');

/**
 * 获取验证码
 * @return {*}
 */
function getVerifyCode() {
  const options = {// 参数
    width: 100,
    height: 40, // height of captcha
    fontSize: 50, // captcha text size
    color: true,
    noise: 2,
  };
  return svgCaptcha.createMathExpr(options);// 生成验证码
}
class CommonControl extends Controller {
  /**
     * 用户登录验证码
     * @return {Promise<void>}
     */
  async loginCode() {
    const Captcha = getVerifyCode();
    const { text, data } = Captcha;
    this.setVerifyCode({
      type: 1,
      code: text,
      addTime: Date.now(),
    });
    this.success(data);
  }

  /**
     * 用户注册验证码
     * @return {Promise<void>}
     */
  async registerCode() {
    const Captcha = getVerifyCode();
    const { text, data } = Captcha;
    this.setVerifyCode({
      type: 2,
      code: text,
      addTime: Date.now(),
    });
    this.success(data);

  }
}

module.exports = CommonControl;
